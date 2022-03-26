import { AnyAction, Middleware } from "@reduxjs/toolkit"
import { UserStatuses } from "components/Navbar/types"
import { CallPages, Pages } from "Supervisor/apps/WebRTC/types"
import { agentApi } from "../reducers/api/agent.api"
import { CallStatus } from "../reducers/api/types"
import { changeAuthToken, logout } from "../reducers/main"
import { changeCallEndCode, changeCallPage, changeCurrentCall, changeDialNumber, changePage } from "../reducers/webRTC"
import store from "../store"

const changeCallEndCodeSideEffect = (action: ReturnType<typeof changeCallEndCode>) => {
    const state = store.getState()

    if (
        !action.payload &&
        !state.webRTC.currentCall &&
        state.webRTC.callPage !== CallPages.none &&
        state.webRTC.page === Pages.call
    ) {
        store.dispatch(changeCallPage(CallPages.none))
        store.dispatch(changePage(Pages.keypad))
        store.dispatch(changeDialNumber(""))
    }
}

const changeCurrentCallSideEffect = (action: ReturnType<typeof changeCurrentCall>) => {
    const state = store.getState()

    if (action.payload?.status === CallStatus.answerWaiting && action.payload.callee.id === state.main.userId) {
        store.dispatch(changePage(Pages.call))
        store.dispatch(changeCallPage(CallPages.ringingInbound))
    }

    if (action.payload?.status === CallStatus.active) {
        store.dispatch(changePage(Pages.call))
        store.dispatch(changeCallPage(CallPages.call))
    }
}

const logoutSideEffect = () => {
    store.dispatch(agentApi.endpoints.changeStatus.initiate(UserStatuses.offline))
}

const changeAuthTokenSideEffect = (action: ReturnType<typeof changeAuthToken>) => {
    if (action.payload) {
        store.dispatch(agentApi.endpoints.changeStatus.initiate(UserStatuses.away))
    }
}

export const sideEffectsMiddleware: Middleware = () => (next) => (action: AnyAction) => {
    // before state change
    switch (action.type) {
        case changeCallEndCode.toString():
            changeCallEndCodeSideEffect(action as ReturnType<typeof changeCallEndCode>)
            break
        case changeCurrentCall.toString():
            changeCurrentCallSideEffect(action as ReturnType<typeof changeCurrentCall>)
            break
        case logout.toString():
            logoutSideEffect()
            break
    }

    next(action)

    // after state change
    switch (action.type) {
        case changeAuthToken.toString():
            changeAuthTokenSideEffect(action as ReturnType<typeof changeAuthToken>)
            break
    }
}
