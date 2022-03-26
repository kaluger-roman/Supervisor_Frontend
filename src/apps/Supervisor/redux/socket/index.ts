import { io, Socket } from "socket.io-client"
import { HOST } from "../constants"
import { changeIsSocketConected } from "../reducers/main"
import store from "../store"
import { EVENT_TYPES } from "./constants"
import { SocketStandardActions } from "./types"

class CableSocket {
    socket: Socket | null = null

    init() {
        this.socket = io(HOST, {
            transports: ["websocket"],
            query: { token: store.getState().main.authToken }
        })

        this.socket.emit(EVENT_TYPES.INIT, {})

        this.initListeners()
    }

    close() {
        this.socket?.close()
    }

    private initListeners() {
        this.socket!.on(SocketStandardActions.connect, () => {
            store.dispatch(changeIsSocketConected(true))
        })

        this.socket!.on(SocketStandardActions.disconnect, () => {
            store.dispatch(changeIsSocketConected(false))
        })
    }
}

export const EventSocket = new CableSocket()
