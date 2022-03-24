import { configureStore } from "@reduxjs/toolkit"
import webRTC from "./reducers/webRTC"
import auth from "./reducers/auth"
import main from "./reducers/main"
import authApi, { authApi as authApiSlice } from "./reducers/api/auth.api"
import agentApi, { agentApi as agentApiSlice } from "./reducers/api/agent.api"

const store = configureStore({
    reducer: {
        webRTC,
        auth,
        main,
        authApi,
        agentApi
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApiSlice.middleware, agentApiSlice.middleware])
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
