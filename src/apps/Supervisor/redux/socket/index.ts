import { ShowModal } from "components/Modals"
import { ModalSize } from "components/Modals/types"
import { io, Socket } from "socket.io-client"
import { WebRTCAgent } from "Supervisor/apps/WebRTC/WebRTCAgent"
import { CallEndCodes } from "Supervisor/apps/WebRTC/WebRTCAgent/types"
import { HOST } from "../constants"
import { changeIsSocketConected, logout } from "../reducers/main"
import store from "../store"
import { WS_ERR_STATUS } from "./constants"
import { SocketErrors, SocketException, SocketStandardActions } from "./types"

class CableSocket {
    socket: Socket | null = null

    init() {
        this.socket = io(HOST, {
            transports: ["websocket"],
            query: { token: store.getState().main.authToken }
        })

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

        EventSocket.socket!.on(SocketStandardActions.exception, async (data: SocketException) => {
            if (data.status === WS_ERR_STATUS) {
                switch (data.message) {
                    case SocketErrors.AgentOffline:
                    case SocketErrors.Busy:
                    case SocketErrors.WrongCalleeWebrtcNumber:
                    case SocketErrors.WrongCallerWebrtcNumber:
                        WebRTCAgent.offlineReject(data.message as unknown as CallEndCodes)
                        break
                    default:
                        return
                }
            }
            if (data.status === 401) {
                store.dispatch(logout())
                ShowModal({
                    header: "Время сеанс истекло",
                    text: "Вы были автоматически разлогинены, пожалуйста, авторизуйтесь снова",
                    size: ModalSize.small
                })
            }
        })
    }
}

export const EventSocket = new CableSocket()
