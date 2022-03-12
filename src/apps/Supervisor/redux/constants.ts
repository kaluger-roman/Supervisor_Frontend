export const DIAL_NUMBER_REGEXP = /^\d{0,11}$/

export const HOST = "http://localhost:3000"
export const BASE_API = HOST + "/api"

export const ROUTES = {
    AUTH: {
        BASE: BASE_API + "/auth",
        LOGIN: "/login",
        REGISTER: "/register",
        RECOVER_PASSWORD: "/recover_password",
        CHANGE_PASSWORD: "/change_password"
    }
}
