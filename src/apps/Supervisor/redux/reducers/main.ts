import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppPage, MainSlice } from "./types"

const initialState: MainSlice = {
    page: AppPage.Authentication,
    authToken: "",
    isBlockingLoader: true
}

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        changeAppPage: (state, action: PayloadAction<AppPage>) => void (state.page = action.payload),
        changeAuthToken: (state, action: PayloadAction<string>) => void (state.authToken = action.payload),
        changeIsBlockingLoader: (state, action: PayloadAction<boolean>) =>
            void (state.isBlockingLoader = action.payload)
    }
})

export const { changeAppPage, changeAuthToken, changeIsBlockingLoader } = mainSlice.actions

export default mainSlice.reducer
