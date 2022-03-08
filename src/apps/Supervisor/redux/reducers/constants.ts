export const DIAL_NUMBER_REGEXP = /^\d{0,11}$/

export const BASE_API = "localhost:8080"

export const ROUTES = {
    AUTH: {
        BASE: BASE_API + "/auth",
        LOGIN: "/login",
        REGISTER: "/register"
    }
}
