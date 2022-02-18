import { configureStore } from "@reduxjs/toolkit"
import webRTC from "./reducers/webRTC"

const store = configureStore({
    reducer: {
        webRTC
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
