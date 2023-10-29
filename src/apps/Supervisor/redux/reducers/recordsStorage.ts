import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Option } from "components/Checkboxes/types"
import { MAX_DURATION_TRASHOLD, MIN_DURATION_TRASHOLD } from "Supervisor/apps/RecordsStorage/view/Filters/const"
import { SortOrder } from "root/types"
import { RecordsStorageSlice, SortedFieldsRecordFilters } from "./types"
import { CallStatus } from "./api/types"

const initialState: RecordsStorageSlice = {
    durationFilter: {
        to: MAX_DURATION_TRASHOLD,
        from: MIN_DURATION_TRASHOLD
    },
    crimeRateFilter: 0,
    calleesList: [],
    callersList: [],
    searchCallerValue: "",
    searchCalleeValue: "",
    page: 1,
    order: [],
    searchStatuses: [CallStatus.ended]
}

const recordsStorageSlice = createSlice({
    name: "recordsStorage",
    initialState,
    reducers: {
        changeCrimeRateFilter: (state, action: PayloadAction<number>) => void (state.crimeRateFilter = action.payload),
        changeMinDuration: (state, action: PayloadAction<number>) => void (state.durationFilter.from = action.payload),
        changeMaxDuration: (state, action: PayloadAction<number>) => void (state.durationFilter.to = action.payload),
        changeCalleesList: (state, action: PayloadAction<Option<string>[]>) =>
            void (state.calleesList = action.payload),
        changeCallersList: (state, action: PayloadAction<Option<string>[]>) =>
            void (state.callersList = action.payload),
        changeSearchCallerValue: (state, action: PayloadAction<string>) =>
            void (state.searchCallerValue = action.payload),
        changeSearchCalleeValue: (state, action: PayloadAction<string>) =>
            void (state.searchCalleeValue = action.payload),
        changeRecordsPage: (state, action: PayloadAction<number>) => void (state.page = action.payload),
        changeSortOrder: (state, action: PayloadAction<{ key: SortedFieldsRecordFilters; order: SortOrder }>) => {
            state.order = state.order.filter((item) => item.key !== action.payload.key)
            if (action.payload.order !== SortOrder.unset) {
                state.order.push(action.payload)
            }
        },
        changeSearchStatuses: (state, action: PayloadAction<CallStatus[]>) =>
            void (state.searchStatuses = action.payload)
    }
})

export const {
    changeCrimeRateFilter,
    changeMinDuration,
    changeMaxDuration,
    changeSearchCallerValue,
    changeSearchCalleeValue,
    changeCalleesList,
    changeCallersList,
    changeRecordsPage,
    changeSortOrder,
    changeSearchStatuses
} = recordsStorageSlice.actions

export default recordsStorageSlice.reducer
