export const DIAL_NUMBER_REGEXP = /^\d{0,11}$/

export const HOST = "http://localhost:3051"
export const BASE_API = HOST + "/api"

export const ROUTES = {
    AUTH: {
        BASE: BASE_API + "/auth",
        LOGIN: "/login",
        REGISTER: "/register",
        LOGOUT: "/logout",
        VERIFY: "/verify_token",
        RECOVER_PASSWORD: "/recover_password",
        CHANGE_PASSWORD: "/change_password"
    },
    AGENT: {
        BASE: BASE_API + "/agent",
        STATUS: "/status"
    },
    SUPERVISOR: {
        BASE: BASE_API,
        USERS: "/users",
        FULL_RECORDS: "/records/full",
        SRC_RECORD: "/records/src",
        TRANSCRIPTION_RECORD: "/records/transcription"
    }
}
