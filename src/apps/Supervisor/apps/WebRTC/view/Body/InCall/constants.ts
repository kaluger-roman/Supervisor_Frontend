import { CallAction } from "../../types"
import HoldIcon from "../../../../../icons/hold.svg"
import MuteIcon from "../../../../../icons/mute.svg"

export const CallActions: CallAction[] = [
    { name: "mute", label: "Mute", icon: MuteIcon },
    { name: "hold", label: "Hold", icon: HoldIcon }
]
