import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../constants"
import { AuthPayload, EmittedToken } from "./types"

export const pokemonApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: ROUTES.AUTH.BASE }),
    endpoints: (builder) => ({
        tryAuth: builder.mutation<AuthPayload, EmittedToken>({
            query: (body) => ({
                url: ROUTES.AUTH.LOGIN,
                method: "POST",
                body
            })
        })
    })
})

export const { useTryAuthMutation } = pokemonApi
