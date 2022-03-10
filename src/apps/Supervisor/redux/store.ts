import { configureStore } from "@reduxjs/toolkit"
import webRTC from "./reducers/webRTC"
import auth from "./reducers/auth"
import main from "./reducers/main"
import authApi from "./reducers/api/auth.api"

const store = configureStore({
    reducer: {
        webRTC,
        auth,
        main,
        authApi
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
