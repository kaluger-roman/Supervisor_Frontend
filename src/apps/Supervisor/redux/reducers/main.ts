import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ShowBlockingLoader } from "components/Modals"
import { UserStatuses } from "components/Navbar/types"
import jwt from "jsonwebtoken"
import { DecodedToken, Roles } from "./api/types"
import { AppPage, MainSlice } from "./types"

const initialState: MainSlice = {
    page: AppPage.Authentication,
    authToken: null,
    role: null,
    userName: null,
    userId: null,
    isBlockingLoader: true,
    isSocketConected: false,
    status: UserStatuses.offline,
    webrtcNumber: null
}

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        changeAppPage: (state, action: PayloadAction<AppPage>) => void (state.page = action.payload),
        changeAuthToken: (state, action: PayloadAction<string>) => {
            state.authToken = action.payload

            const decoded = jwt.decode(action.payload) as DecodedToken
            state.role = decoded.role
            state.userName = decoded.userName
            state.userId = decoded.userId
            state.webrtcNumber = decoded.webrtcNumber
            state.page =
                decoded.role === Roles.user
                    ? AppPage.AgentWorkPlace
                    : decoded.role === Roles.supervisor
                    ? AppPage.SupervisorWorkPlace
                    : AppPage.AgentWorkPlace

            localStorage.authToken = action.payload
        },
        changeIsBlockingLoader: (state, action: PayloadAction<boolean>) => {
            state.isBlockingLoader = action.payload
            ShowBlockingLoader({ isShown: action.payload })
        },
        changeIsSocketConected: (state, action: PayloadAction<boolean>) =>
            void (state.isSocketConected = action.payload),
        changeStatus: (state, action: PayloadAction<UserStatuses>) => void (state.status = action.payload),
        logout: (state) => {
            localStorage.authToken = ""

            state.page = AppPage.Authentication
            state.authToken = null
            state.role = null
            state.userId = null
            state.userName = null
            state.webrtcNumber = null
        }
    }
})

export const { changeAppPage, changeAuthToken, changeIsBlockingLoader, changeIsSocketConected, logout, changeStatus } =
    mainSlice.actions

export default mainSlice.reducer
