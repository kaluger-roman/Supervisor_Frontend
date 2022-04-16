import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Option } from "components/Checkboxes/types"
import { MAX_DURATION_TRASHOLD, MIN_DURATION_TRASHOLD } from "Supervisor/apps/RecordsStorage/view/Filters/const"
import { RecordsStorageSlice } from "./types"

const initialState: RecordsStorageSlice = {
    durationFilter: {
        to: MAX_DURATION_TRASHOLD,
        from: MIN_DURATION_TRASHOLD
    },
    calleesList: [],
    callersList: [],
    searchCallerValue: "",
    searchCalleeValue: ""
}

const recordsStorageSlice = createSlice({
    name: "recordsStorage",
    initialState,
    reducers: {
        changeMinDuration: (state, action: PayloadAction<number>) => void (state.durationFilter.from = action.payload),
        changeMaxDuration: (state, action: PayloadAction<number>) => void (state.durationFilter.to = action.payload),
        changeCalleesList: (state, action: PayloadAction<Option<string>[]>) =>
            void (state.calleesList = action.payload),
        changeCallersList: (state, action: PayloadAction<Option<string>[]>) =>
            void (state.callersList = action.payload),
        changeSearchCallerValue: (state, action: PayloadAction<string>) =>
            void (state.searchCallerValue = action.payload),
        changeSearchCalleeValue: (state, action: PayloadAction<string>) =>
            void (state.searchCalleeValue = action.payload)
    }
})

export const {
    changeMinDuration,
    changeMaxDuration,
    changeSearchCallerValue,
    changeSearchCalleeValue,
    changeCalleesList,
    changeCallersList
} = recordsStorageSlice.actions

export default recordsStorageSlice.reducer
