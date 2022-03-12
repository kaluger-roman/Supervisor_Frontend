import { io, Socket } from "socket.io-client"
import { HOST } from "../constants"
import { changeIsSocketConected } from "../reducers/main"
import store from "../store"

class CableSocket {
    socket: Socket

    constructor() {
        this.socket = io(HOST)
        this.socket.on("connect", () => {
            store.dispatch(changeIsSocketConected(true))
        })

        this.socket.on("disconnect", () => {
            store.dispatch(changeIsSocketConected(false))
        })
    }
}

export const EventSocket = new CableSocket()
