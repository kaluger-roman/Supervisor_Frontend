import { UserStatuses } from "components/Navbar/types"
import { AuthPage, SecretQuestsKey } from "Supervisor/apps/Auth/types"
import { CallEndCodes } from "Supervisor/apps/WebRTC/WebRTCAgent/types"
import { Pages, CallPages } from "../../apps/WebRTC/types"
import { CurrentCall } from "./api/types"

export enum AppPage {
    Authentication = "Authentication",
    AgentWorkPlace = "AgentWorkPlace",
    SupervisorWorkPlace = "SupervisorWorkPlace"
}

export type WebRTCSlice = {
    page: Pages
    callPage: CallPages
    dialInput: string
    isPeersConnected: boolean
    currentCall: CurrentCall | null
    callEndCode: CallEndCodes | null
}

export type AuthSlice = {
    page: AuthPage
    userNameInput: string
    oldPasswordInput: string
    passwordInput: string
    secondPasswordInput: string
    secretQuestion: SecretQuestsKey | ""
    secretAnswerInput: string
    emailInput: string
    capthaPassed: boolean
}

export type MainSlice = {
    page: AppPage
    authToken: string | null
    role: string | null
    userName: string | null
    userId: number | null
    isBlockingLoader: boolean
    isSocketConected: boolean
    status: UserStatuses
}
