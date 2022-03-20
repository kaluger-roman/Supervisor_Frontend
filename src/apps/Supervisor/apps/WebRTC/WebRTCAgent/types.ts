import { CallRecord } from "Supervisor/redux/reducers/api/types"

export type AgentConfiguration = {
    iceServers: { urls: string }[]
}

export type MakeCallPayload = {
    callNumber: string
}

export type CallOffer = {
    offer: RTCSessionDescriptionInit
}

export type ChangeCallPayload = {
    call: CallRecord
}

export enum ConnectionState {
    connected = "connected",
    disconnected = "disconnected",
    failed = "failed",
    closed = "closed"
}
