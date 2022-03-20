export type AuthPayload = {
    username: string
    password: string
}

export type RegisterPayload = {
    username: string
    password: string
    secret: string
    secretAnswer: string
    email: string
}

export type RecoverPasswordPayload = {
    email: string
    secret: string
    secretAnswer: string
}

export type ChangePasswordPayload = {
    email: string
    secret: string
    secretAnswer: string
}

export type EmittedToken = {
    access_token?: string
    error?: string
}

export enum Roles {
    admin = "admin",
    user = "user",
    supervisor = "supervisor"
}

export type DecodedToken = {
    userName: string
    userId: number
    role: Roles
}

export type CallRecord = {
    id: number
    statusSequence: CallStatus[]
    statusTimestampsSequence: number[]
    calleeWebrtcNumber: string
    callerWebrtcNumber: string
    callerId: number
    caller: User
    calleeId: number
    callee: User
}

export enum CallStatus {
    signaling = "signaling",
    answerWaiting = "answerWaiting",
    rejected = "rejected",
    active = "active",
    ended = "ended",
    failed = "failed"
}

export type User = {
    id: number
    username: string
    passwordHash: string
    role: Roles
    secret: string
    secretAnswer: string
    email: string
    webrtcNumber: string
}
