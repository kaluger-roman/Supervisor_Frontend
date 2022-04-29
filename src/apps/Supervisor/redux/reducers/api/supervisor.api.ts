import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "Supervisor/redux/store"
import { ROUTES } from "../../constants"
import { changeRecordsPage } from "../recordsStorage"
import { addAuthHeader } from "./helpers"
import {
    FilteredRecords,
    FindUsersPayload,
    RecordFiltersPayload,
    RecordSrcPayload,
    RecordTranscription,
    TranscriptionPayload,
    TranscriptionUnit,
    User
} from "./types"

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
        }),
        records: builder.mutation<FilteredRecords, RecordFiltersPayload>({
            query: (body) => ({
                url: ROUTES.SUPERVISOR.FULL_RECORDS,
                body,
                method: "POST"
            }),
            async onQueryStarted(_, { dispatch }) {
                dispatch(changeRecordsPage(1))
            }
        }),
        recordSrc: builder.mutation<{ data: Buffer }, RecordSrcPayload>({
            query: (body) => ({
                url: ROUTES.SUPERVISOR.SRC_RECORD,
                body,
                method: "POST"
            })
        }),
        recordTranscription: builder.query<RecordTranscription, TranscriptionPayload>({
            query: (body) => ({
                url: ROUTES.SUPERVISOR.TRANSCRIPTION_RECORD,
                body,
                method: "POST"
            })
        })
    })
})

export const { useUsersQuery, useRecordsMutation, useRecordSrcMutation, useRecordTranscriptionQuery } = supervisorApi
export default supervisorApi.reducer
