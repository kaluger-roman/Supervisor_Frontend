export enum SocketStandardActions {
    connect = "connect",
    disconnect = "disconnect",
    exception = "exception"
}

export type SocketException = { status: number; message: string }
