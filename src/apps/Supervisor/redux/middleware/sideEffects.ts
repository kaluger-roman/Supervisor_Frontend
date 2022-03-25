import { AnyAction, Middleware } from "@reduxjs/toolkit"
import { CallPages, Pages } from "Supervisor/apps/WebRTC/types"
import { changeCallEndCode, changeCallPage, changeDialNumber, changePage } from "../reducers/webRTC"
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

export const sideEffectsMiddleware: Middleware = () => (next) => (action: AnyAction) => {
    switch (action.type) {
        case changeCallEndCode.toString():
            changeCallEndCodeSideEffect(action as ReturnType<typeof changeCallEndCode>)
    }

    next(action)
}
