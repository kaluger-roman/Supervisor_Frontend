import { CallAction } from "../../types"
import HoldIcon from "Supervisor/icons/hold.svg"
import MuteIcon from "Supervisor/icons/mute.svg"
import { CallEndCodes } from "Supervisor/apps/WebRTC/WebRTCAgent/types"

export const CallActions: CallAction[] = [
    { name: "mute", label: "Mute", icon: MuteIcon },
    { name: "hold", label: "Hold", icon: HoldIcon }
]

export const CALL_ENDED_LABEL = {
    [CallEndCodes.AgentOffline]: "Вызываемый абонент не в сети",
    [CallEndCodes.Busy]: "Вызываемый абонент занят",
    [CallEndCodes.Standard]: "Звершение звонка",
    [CallEndCodes.WrongCalleeWebrtcNumber]: "Вызываемый абонент не найден",
    [CallEndCodes.WrongCallerWebrtcNumber]: "Не удалось вас идентифицировать",
    [CallEndCodes.Cancelled]: "Вы отменили звонок",
    [CallEndCodes.AgentAway]: "Абонента нет на месте"
}
