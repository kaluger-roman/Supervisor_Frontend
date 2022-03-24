import { COLORS } from "config/globalStyles/colors"
import { UserStatuses } from "./types"

export const EXIT_HANDLER = "logout"
export const STATUS_HANDLER = "changeStatus"

export const STATUS_COLOR = {
    [UserStatuses.online]: COLORS.success,
    [UserStatuses.offline]: COLORS.lightDark,
    [UserStatuses.away]: COLORS.error
}

export const STATUS_LABELS = {
    [UserStatuses.online]: "Online",
    [UserStatuses.offline]: "Offline",
    [UserStatuses.away]: "Away"
}
