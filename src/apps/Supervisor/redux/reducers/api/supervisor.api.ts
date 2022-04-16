import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../constants"
import { addAuthHeader } from "./helpers"
import { FindUsersPayload, User } from "./types"

export const supervisorApi = createApi({
    reducerPath: "supervisorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ROUTES.SUPERVISOR.BASE,
        prepareHeaders: addAuthHeader
    }),
    endpoints: (builder) => ({
        users: builder.query<User[], FindUsersPayload>({
            query: (body) => ({
                url: ROUTES.SUPERVISOR.USERS,
                body,
                method: "POST"
            })
        })
    })
})

export const { useUsersQuery } = supervisorApi
export default supervisorApi.reducer
