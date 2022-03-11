import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import jwt_decode from "jwt-decode"
import { DecodedToken, Roles } from "./api/types"
import { AppPage, MainSlice } from "./types"

const initialState: MainSlice = {
    page: AppPage.Authentication,
    authToken: null,
    role: null,
    userName: null,
    userId: null,
    isBlockingLoader: true
}

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        changeAppPage: (state, action: PayloadAction<AppPage>) => void (state.page = action.payload),
        changeAuthToken: (state, action: PayloadAction<string>) => {
            state.authToken = action.payload

            if (action.payload) {
                const decoded = jwt_decode<DecodedToken>(action.payload)
                state.role = decoded.role
                state.userName = decoded.userName
                state.userId = decoded.userId
                state.page =
                    decoded.role === Roles.user
                        ? AppPage.AgentWorkPlace
                        : decoded.role === Roles.supervisor
                        ? AppPage.SupervisorWorkPlace
                        : AppPage.AgentWorkPlace

                localStorage.authToken = action.payload
            } else {
                state.role = null
                state.userName = null
                state.userId = null
                state.page = AppPage.Authentication
                localStorage.authToken = ""
            }
        },
        changeIsBlockingLoader: (state, action: PayloadAction<boolean>) =>
            void (state.isBlockingLoader = action.payload)
    }
})

export const { changeAppPage, changeAuthToken, changeIsBlockingLoader } = mainSlice.actions

export default mainSlice.reducer
