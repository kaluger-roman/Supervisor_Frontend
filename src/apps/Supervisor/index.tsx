import { always, cond, equals, T } from "ramda"
import { useEffect } from "react"
import { Auth } from "./apps/Auth"
import { WebRTC } from "./apps/WebRTC"
import { useSESelector, useTypedDispatch } from "./redux/hooks"
import { changeAppPage, changeAuthToken } from "./redux/reducers/main"
import { AppPage } from "./redux/reducers/types"

export const Supervisor: React.FC = () => {
    const { page, authToken } = useSESelector((state) => state.main)
    const dispatch = useTypedDispatch()

    if (!authToken) {
        dispatch(changeAppPage(AppPage.Authentication))
    }

    useEffect(() => {
        if (localStorage.authToken) {
            dispatch(changeAuthToken(localStorage.authToken))
        }
    }, [])

    return cond<AppPage, JSX.Element>([
        [equals<AppPage>(AppPage.Authentication), always(<Auth />)],
        [equals<AppPage>(AppPage.AgentWorkPlace), always(<WebRTC />)],
        [T, always(<Auth />)]
    ])(page)
}
