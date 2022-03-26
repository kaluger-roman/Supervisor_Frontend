import { AnyAction, Middleware } from "@reduxjs/toolkit"
import { CallPages, Pages } from "Supervisor/apps/WebRTC/types"
import { CallStatus } from "../reducers/api/types"
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
}

export const sideEffectsMiddleware: Middleware = () => (next) => (action: AnyAction) => {
    switch (action.type) {
        case changeCallEndCode.toString():
            changeCallEndCodeSideEffect(action as ReturnType<typeof changeCallEndCode>)
            break
        case changeCurrentCall.toString():
            changeCurrentCallSideEffect(action as ReturnType<typeof changeCurrentCall>)
            break
    }

    next(action)
}
