import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CallEndCodes } from "Supervisor/apps/WebRTC/WebRTCAgent/types"
import { Pages, CallPages } from "../../apps/WebRTC/types"
import { DIAL_NUMBER_REGEXP } from "../constants"
import { CurrentCall } from "./api/types"
import { WebRTCSlice } from "./types"

const initialState: WebRTCSlice = {
    page: Pages.keypad,
    callPage: CallPages.none,
    dialInput: "",
    isPeersConnected: false,
    currentCall: null,
    callEndCode: null,
    isMuted: false
}

const webRTCSlice = createSlice({
    name: "webRTC",
    initialState,
    reducers: {
        changePage: (state, action: PayloadAction<Pages>) => void (state.page = action.payload),
        changeCallPage: (state, action: PayloadAction<CallPages>) => void (state.callPage = action.payload),
        clickDialNumber: (state, action: PayloadAction<string>) => void (state.dialInput += action.payload),
        changeDialNumber: (state, action: PayloadAction<string>) => {
            if (DIAL_NUMBER_REGEXP.test(action.payload)) state.dialInput = action.payload
        },
        clickClearDialNumber: (state) => void (state.dialInput = ""),
        clickRemoveOneDialNumber: (state) =>
            void (state.dialInput = state.dialInput.slice(0, state.dialInput.length - 1)),
        clickBreakBtn: (state) => state,
        clickCallBtn: (state) => {
            state.page = Pages.call
            state.callPage = CallPages.waitingOutbound
        },
        changeIsPeersConnected: (state, action: PayloadAction<boolean>) =>
            void (state.isPeersConnected = action.payload),
        changeCurrentCall: (state, action: PayloadAction<CurrentCall | null>) =>
            void (state.currentCall = action.payload),
        changeCallEndCode: (state, action: PayloadAction<CallEndCodes | null>) =>
            void (state.callEndCode = action.payload),
        changeIsMuted: (state, action: PayloadAction<boolean>) => void (state.isMuted = action.payload)
    }
})

export const {
    changePage,
    changeCallPage,
    clickBreakBtn,
    clickCallBtn,
    clickDialNumber,
    clickClearDialNumber,
    clickRemoveOneDialNumber,
    changeDialNumber,
    changeIsPeersConnected,
    changeCurrentCall,
    changeCallEndCode,
    changeIsMuted
} = webRTCSlice.actions

export default webRTCSlice.reducer
