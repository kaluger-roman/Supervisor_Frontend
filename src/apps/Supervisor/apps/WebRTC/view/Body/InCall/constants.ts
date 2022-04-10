import { CallEndCodes } from "Supervisor/apps/WebRTC/WebRTCAgent/types"

export const CALL_ENDED_LABEL = {
    [CallEndCodes.AgentOffline]: "Вызываемый абонент не в сети",
    [CallEndCodes.Busy]: "Вызываемый абонент занят",
    [CallEndCodes.Standard]: "Звершение звонка",
    [CallEndCodes.WrongCalleeWebrtcNumber]: "Вызываемый абонент не найден",
    [CallEndCodes.WrongCallerWebrtcNumber]: "Не удалось вас идентифицировать",
    [CallEndCodes.Cancelled]: "Звонок был отменен",
    [CallEndCodes.AgentAway]: "Абонента нет на месте",
    [CallEndCodes.Rejected]: "Вызов был отклонен",
    [CallEndCodes.TimeExceed]: "Превышено время ожидания звонка",
    [CallEndCodes.failed]: "Не удалось установить соединение, повторите попытку"
}
