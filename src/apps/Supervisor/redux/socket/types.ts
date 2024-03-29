export enum SocketStandardActions {
    connect = "connect",
    disconnect = "disconnect",
    exception = "exception"
}

export type SocketException = { status: number | string; message: string }

export enum SocketErrors {
    WrongCallerWebrtcNumber = "WrongCallerWebrtcNumber",
    WrongCalleeWebrtcNumber = "WrongCalleeWebrtcNumber",
    AgentOffline = "AgentOffline",
    AgentAway = "AgentAway",
    Busy = "Busy",
    Rejected = "Rejected",
    TimeExceed = "TimeExceed"
}
