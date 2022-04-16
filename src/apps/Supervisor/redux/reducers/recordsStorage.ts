import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MAX_DURATION_TRASHOLD, MIN_DURATION_TRASHOLD } from "Supervisor/apps/RecordsStorage/view/Filters/const"
import { RecordsStorageSlice } from "./types"

const initialState: RecordsStorageSlice = {
    durationFilter: {
        to: MAX_DURATION_TRASHOLD,
        from: MIN_DURATION_TRASHOLD
    },
    calleesList: [],
    callersList: [],
    selectUsersInput: ""
}

const recordsStorageSlice = createSlice({
    name: "recordsStorage",
    initialState,
    reducers: {
        changeMinDuration: (state, action: PayloadAction<number>) => void (state.durationFilter.from = action.payload),
        changeMaxDuration: (state, action: PayloadAction<number>) => void (state.durationFilter.to = action.payload),
        changeSelectUsersInput: (state, action: PayloadAction<string>) => void (state.selectUsersInput = action.payload)
    }
})

export const { changeMinDuration, changeMaxDuration, changeSelectUsersInput } = recordsStorageSlice.actions

export default recordsStorageSlice.reducer
