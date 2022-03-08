import { always, cond, equals, T } from "ramda"
import { Auth } from "./apps/Auth"
import { WebRTC } from "./apps/WebRTC"
import { useSESelector } from "./redux/hooks"
import { AppPage } from "./redux/reducers/types"

export const Supervisor: React.FC = () => {
    const { page } = useSESelector((state) => state.main)

    return cond<AppPage, JSX.Element>([
        [equals<AppPage>(AppPage.Authentication), always(<Auth />)],
        [equals<AppPage>(AppPage.AgentWorkPlace), always(<WebRTC />)],
        [T, always(<Auth />)]
    ])(page)
}
