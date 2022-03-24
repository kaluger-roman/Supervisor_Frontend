import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { UserStatuses } from "components/Navbar/types"
import { RootState } from "Supervisor/redux/store"
import { ROUTES } from "../../constants"
import { changeStatus } from "../main"
import { addAuthHeader } from "./helpers"

export const agentApi = createApi({
    reducerPath: "agentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ROUTES.AGENT.BASE,
        prepareHeaders: addAuthHeader
    }),
    endpoints: (builder) => ({
        changeStatus: builder.mutation<{ status: UserStatuses }, UserStatuses>({
            query: (status) => ({
                url: ROUTES.AGENT.STATUS,
                method: "POST",
                body: { status }
            }),
            async onQueryStarted(status, { dispatch, getState, queryFulfilled }) {
                const oldStatus = (getState() as RootState).main.status
                dispatch(changeStatus(status))
                try {
                    const newStatus = await queryFulfilled

                    if (newStatus.data.status !== status) {
                        dispatch(changeStatus(oldStatus))
                    }
                } catch {
                    dispatch(changeStatus(oldStatus))
                }
            }
        })
    })
})

export const { useChangeStatusMutation } = agentApi
export default agentApi.reducer
