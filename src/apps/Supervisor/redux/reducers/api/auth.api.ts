import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../constants"
import { AuthPayload, ChangePasswordPayload, EmittedToken, RecoverPasswordPayload, RegisterPayload } from "./types"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ROUTES.AUTH.BASE,
        prepareHeaders: (headers) => {
            headers.set("Authorization", `Bearer ${localStorage.authToken}`)
            return headers
        }
    }),
    endpoints: (builder) => ({
        verifyToken: builder.query<void, void>({
            query: () => ({
                url: ROUTES.AUTH.VERIFY
            })
        }),
        auth: builder.mutation<EmittedToken, AuthPayload>({
            query: (body) => ({
                url: ROUTES.AUTH.LOGIN,
                method: "POST",
                body
            })
        }),
        register: builder.mutation<EmittedToken, RegisterPayload>({
            query: (body) => ({
                url: ROUTES.AUTH.REGISTER,
                method: "POST",
                body
            })
        }),
        recoverPassword: builder.mutation<EmittedToken, RecoverPasswordPayload>({
            query: (body) => ({
                url: ROUTES.AUTH.RECOVER_PASSWORD,
                method: "POST",
                body
            })
        }),
        changePassword: builder.mutation<EmittedToken, ChangePasswordPayload>({
            query: (body) => ({
                url: ROUTES.AUTH.CHANGE_PASSWORD,
                method: "POST",
                body
            })
        })
    })
})

export const {
    useAuthMutation,
    useRegisterMutation,
    useRecoverPasswordMutation,
    useChangePasswordMutation,
    useVerifyTokenQuery
} = authApi
export default authApi.reducer
