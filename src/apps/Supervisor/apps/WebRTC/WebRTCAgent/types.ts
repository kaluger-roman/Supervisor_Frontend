import { CurrentCall } from "Supervisor/redux/reducers/api/types"

export type AgentConfiguration = {
    iceServers: { urls: string[] }[]
}

export type MakeCallPayload = {
    callNumber: string
}

export type CallOffer = {
    offer: RTCSessionDescriptionInit
}

export type ChangeCallPayload = {
    call: CurrentCall
}

export enum ConnectionState {
    connected = "connected",
    disconnected = "disconnected",
    failed = "failed",
    closed = "closed"
}

export enum CallEndCodes {
    WrongCallerWebrtcNumber = "WrongCallerWebrtcNumber",
    WrongCalleeWebrtcNumber = "WrongCalleeWebrtcNumber",
    AgentOffline = "AgentOffline",
    AgentAway = "AgentAway",
    Busy = "Busy",
    Standard = "Standard",
    Cancelled = "Cancelled",
    Rejected = "Rejected",
    TimeExceed = "TimeExceed",
    failed = "failed"
}

export enum WebrtcDataChannelActions {
    hold = "hold",
    unhold = "unhold"
}
