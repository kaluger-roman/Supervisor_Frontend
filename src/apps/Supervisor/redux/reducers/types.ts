import { AuthPage, SecretQuestsKey } from "Supervisor/apps/Auth/types"
import { Pages, CallPages } from "../../apps/WebRTC/types"

export enum AppPage {
    Authentication = "Authentication",
    AgentWorkPlace = "AgentWorkPlace",
    SupervisorWorkPlace = "SupervisorWorkPlace"
}

export type WebRTCSlice = {
    page: Pages
    callPage: CallPages
    dialInput: string
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
    isAuthorized: boolean
}
