import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Pages, CallPages } from "../../apps/WebRTC/types"
import { DIAL_NUMBER_REGEXP } from "./constants"
import { WebRTCSlice } from "./types"

const initialState: WebRTCSlice = {
    page: Pages.keypad,
    callPage: CallPages.none,
    dialInput: ""
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
        clickAnswerBtn: (state) => state,
        clickRejectBtn: (state) => state
    }
})

export const {
    changePage,
    changeCallPage,
    clickBreakBtn,
    clickCallBtn,
    clickAnswerBtn,
    clickRejectBtn,
    clickDialNumber,
    clickClearDialNumber,
    clickRemoveOneDialNumber,
    changeDialNumber
} = webRTCSlice.actions

export default webRTCSlice.reducer
