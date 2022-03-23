import { NavBar } from "components/Navbar"
import { always, cond, equals, T } from "ramda"
import { useEffect, useLayoutEffect } from "react"
import { Auth } from "./apps/Auth"
import { WebRTC } from "./apps/WebRTC"
import { WebRTCAgent } from "./apps/WebRTC/WebRTCAgent"
import { menuStructure } from "./menu"
import { useSESelector, useTypedDispatch } from "./redux/hooks"
import { useVerifyTokenQuery } from "./redux/reducers/api/auth.api"
import { changeAppPage, changeAuthToken, changeIsBlockingLoader, logout } from "./redux/reducers/main"
import { AppPage } from "./redux/reducers/types"
import { EventSocket } from "./redux/socket"

export const Supervisor: React.FC = () => {
    const { page, authToken } = useSESelector((state) => state.main)
    const dispatch = useTypedDispatch()
    const { isError, isSuccess, isLoading } = useVerifyTokenQuery()

    useLayoutEffect(() => {
        dispatch(changeIsBlockingLoader(isLoading))
    }, [isLoading])

    useEffect(() => {
        if (isSuccess && localStorage.authToken) {
            dispatch(changeAuthToken(localStorage.authToken))
        }

        if (isError && localStorage.authToken) {
            dispatch(logout())
        }

        console.log(isSuccess, isError)
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

    return (
        <>
            {authToken && <NavBar {...menuStructure} />}
            {cond<AppPage, JSX.Element>([
                [equals<AppPage>(AppPage.Authentication), always(<Auth />)],
                [equals<AppPage>(AppPage.AgentWorkPlace), always(<WebRTC />)],
                [T, always(<Auth />)]
            ])(page)}
        </>
    )
}
