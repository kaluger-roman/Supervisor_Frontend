import { CallAction } from "../../types"
import HoldIcon from "Supervisor/icons/hold.svg"
import MuteIcon from "Supervisor/icons/mute.svg"

export const CallActions: CallAction[] = [
    { name: "mute", label: "Mute", icon: MuteIcon },
    { name: "hold", label: "Hold", icon: HoldIcon }
]
