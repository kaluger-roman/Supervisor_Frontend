import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppPage, MainSlice } from "./types"

const initialState: MainSlice = {
    page: AppPage.Authentication,
    isAuthorized: false
}

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        changeAppPage: (state, action: PayloadAction<AppPage>) => void (state.page = action.payload),
        changeIsAuthorized: (state, action: PayloadAction<boolean>) => void (state.isAuthorized = action.payload)
    }
})

export const { changeAppPage, changeIsAuthorized } = mainSlice.actions

export default mainSlice.reducer
