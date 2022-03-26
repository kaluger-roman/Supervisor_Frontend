import { NavBar } from "components/Navbar"
import { UserStatuses } from "components/Navbar/types"
import { always, cond, equals, T } from "ramda"
import { useEffect, useLayoutEffect } from "react"
import { Auth } from "./apps/Auth"
import { WebRTC } from "./apps/WebRTC"
import { WebRTCAgent } from "./apps/WebRTC/WebRTCAgent"
import { menuStructure } from "./menu"
import { useSESelector, useTypedDispatch } from "./redux/hooks"
import { useChangeStatusMutation } from "./redux/reducers/api/agent.api"
import { useVerifyTokenQuery } from "./redux/reducers/api/auth.api"
import { changeAppPage, changeAuthToken, changeIsBlockingLoader, logout } from "./redux/reducers/main"
import { AppPage } from "./redux/reducers/types"
import { EventSocket } from "./redux/socket"

export const Supervisor: React.FC = () => {
    const { page, authToken, userName, status } = useSESelector((state) => state.main)
    const dispatch = useTypedDispatch()
    const { isError, isSuccess, isLoading } = useVerifyTokenQuery()
    const [triggerStatus] = useChangeStatusMutation()

    useLayoutEffect(() => {
        dispatch(changeIsBlockingLoader(isLoading))
    }, [isLoading])

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            triggerStatus(UserStatuses.offline)
            WebRTCAgent.endCall()
        })
    }, [])

    useEffect(() => {
        if (isSuccess && localStorage.authToken) {
            dispatch(changeAuthToken(localStorage.authToken))

            triggerStatus(UserStatuses.away)
        }

        if (isError && localStorage.authToken) {
            dispatch(logout())
            triggerStatus(UserStatuses.offline)
        }
    }, [isSuccess, isError])

    useEffect(() => {
        if (authToken) {
            EventSocket.init()
            WebRTCAgent.init()
        } else {
            dispatch(changeAppPage(AppPage.Authentication))

            EventSocket.close()
            WebRTCAgent.close()
        }
    }, [authToken])

    if (!isError && !isSuccess) return null

    return (
        <>
            {authToken && <NavBar {...menuStructure} userInfo={{ userName, status }} />}
            {cond<AppPage, JSX.Element>([
                [equals<AppPage>(AppPage.Authentication), always(<Auth />)],
                [equals<AppPage>(AppPage.AgentWorkPlace), always(<WebRTC />)],
                [T, always(<Auth />)]
            ])(page)}
        </>
    )
}
