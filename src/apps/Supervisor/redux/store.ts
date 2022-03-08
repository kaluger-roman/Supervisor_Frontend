import { configureStore } from "@reduxjs/toolkit"
import webRTC from "./reducers/webRTC"
import auth from "./reducers/auth"
import main from "./reducers/main"

const store = configureStore({
    reducer: {
        webRTC,
        auth,
        main
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
