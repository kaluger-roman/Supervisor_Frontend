import { io, Socket } from "socket.io-client"
import { HOST } from "../constants"
import { changeIsSocketConected } from "../reducers/main"
import store from "../store"

class CableSocket {
    socket: Socket | null = null

    init() {
        this.socket = io(HOST, {
            transports: ["websocket"],
            query: { token: store.getState().main.authToken }
        })

        this.socket.on("connect", () => {
            store.dispatch(changeIsSocketConected(true))
        })

        this.socket.on("disconnect", () => {
            store.dispatch(changeIsSocketConected(false))
        })
    }
}

export const EventSocket = new CableSocket()
