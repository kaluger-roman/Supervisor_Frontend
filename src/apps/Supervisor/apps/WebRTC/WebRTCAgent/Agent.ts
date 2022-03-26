import { ShowModal } from "components/Modals"
import { ModalSize } from "components/Modals/types"
import OfflineSound from "Supervisor/sounds/offlineError.mp3"
import RingingSound from "Supervisor/sounds/ringing.mp3"
import { changeCallEndCode, changeCurrentCall, changeIsPeersConnected } from "Supervisor/redux/reducers/webRTC"
import { EventSocket } from "Supervisor/redux/socket"
import { EVENT_TYPES, WS_ERR_STATUS } from "Supervisor/redux/socket/constants"
import store from "Supervisor/redux/store"
import {
    AgentConfiguration,
    CallEndCodes,
    CallOffer,
    ChangeCallPayload,
    ConnectionState,
    MakeCallPayload
} from "./types"
import { SocketErrors, SocketException, SocketStandardActions } from "Supervisor/redux/socket/types"
import { CallStatus } from "Supervisor/redux/reducers/api/types"

class Agent {
    configuration: AgentConfiguration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }
    peerConnection: RTCPeerConnection | null = null
    localAudioStream: MediaStream | null = null
    attachedTrack: RTCRtpSender | null = null
    playingAudio: HTMLAudioElement | null = null

    async init() {
        await this.getMediaPermissions()

        this.initSocketListeners()
    }

    close() {
        this.peerConnection?.close()
    }

    initPeer() {
        this.peerConnection = new RTCPeerConnection(this.configuration)
        this.initPeerListeners()
    }

    private initSocketListeners() {
        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.ANSWER, async (data: { answer: RTCSessionDescriptionInit }) => {
            if (data.answer) {
                const remoteDesc = new RTCSessionDescription(data.answer)
                await this.peerConnection!.setRemoteDescription(remoteDesc)
            }
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.OFFER, async (data: CallOffer) => {
            this.initPeer()
            if (data.offer) {
                this.peerConnection!.setRemoteDescription(new RTCSessionDescription(data.offer))
            }
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.NEW_ICE, async (message: { iceCandidate: RTCIceCandidate }) => {
            if (message.iceCandidate) {
                try {
                    await this.peerConnection!.addIceCandidate(message.iceCandidate)
                } catch (e) {
                    console.error("Error adding received ice candidate", e)
                }
            }
        })

        EventSocket.socket!.on(EVENT_TYPES.CALL.CHANGE, async (data: ChangeCallPayload) => {
            if (data.call) {
                store.dispatch(changeCurrentCall(data.call))

                if (
                    data.call.status === CallStatus.answerWaiting &&
                    store.getState().main.userId === data.call.callee.id
                ) {
                    this.ringingAudioPlay()
                }
            }
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.TIME_EXCEED, async () => {
            this.interruptCall(CallEndCodes.TimeExceed)
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.CANCEL, async () => {
            this.interruptCall(CallEndCodes.Cancelled)
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.REJECT, async () => {
            this.interruptCall(CallEndCodes.Rejected)
        })

        EventSocket.socket!.on(SocketStandardActions.exception, async (data: SocketException) => {
            if (data.status === WS_ERR_STATUS) {
                switch (data.message) {
                    case SocketErrors.AgentOffline:
                    case SocketErrors.Busy:
                    case SocketErrors.WrongCalleeWebrtcNumber:
                    case SocketErrors.WrongCallerWebrtcNumber:
                    case SocketErrors.AgentAway:
                    case SocketErrors.Rejected:
                        this.offlineReject(data.message as unknown as CallEndCodes)
                        break
                    default:
                        return
                }
            }
        })
    }

    private initPeerListeners() {
        if (this.peerConnection) {
            this.peerConnection.addEventListener("icecandidate", (event) => {
                if (event.candidate) {
                    EventSocket.socket!.emit(EVENT_TYPES.SIGNALING.NEW_ICE, {
                        iceCandidate: event.candidate,
                        callId: store.getState().webRTC.currentCall?.id
                    })
                }
            })

            this.peerConnection.addEventListener("connectionstatechange", (event) => {
                if (this.peerConnection!.connectionState === ConnectionState.connected) {
                    store.dispatch(changeIsPeersConnected(true))
                }
                if (
                    [ConnectionState.disconnected, ConnectionState.failed, ConnectionState.closed].includes(
                        this.peerConnection!.connectionState as ConnectionState
                    )
                ) {
                    store.dispatch(changeIsPeersConnected(false))
                }

                if (
                    [ConnectionState.disconnected, ConnectionState.closed].includes(
                        this.peerConnection!.connectionState as ConnectionState
                    )
                ) {
                    EventSocket.socket!.emit(EVENT_TYPES.SIGNALING.ENDED, {
                        callId: store.getState().webRTC.currentCall?.id
                    })
                }

                if (ConnectionState.failed === this.peerConnection!.connectionState) {
                    EventSocket.socket!.emit(EVENT_TYPES.SIGNALING.FAILED, {
                        callId: store.getState().webRTC.currentCall?.id
                    })
                }
            })
        }
    }

    async getMediaPermissions() {
        try {
            const media = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            this.localAudioStream = media
            ;(window as any).localAudioStream = media
        } catch {
            ShowModal({
                header: "Требуется разрешение",
                text: "Пожалуйста, предоставьте доступ к микрофону во вскплывающем окне, в противном случае, использование программы становится невозможным",
                size: ModalSize.small
            })
            this.getMediaPermissions()
        }
    }

    attachAudioToConnection() {
        if (this.localAudioStream) {
            this.localAudioStream.getTracks().forEach((track) => {
                try {
                    this.attachedTrack = this.peerConnection!.addTrack(track, this.localAudioStream!)
                } catch (e) {
                    console.error(e)
                }
            })
        }
    }

    async removeAudioFromConnection() {
        if (this.attachedTrack) {
            this.peerConnection!.removeTrack(this.attachedTrack)
        }
    }

    ringingAudioPlay() {
        this.playingAudio = new Audio(RingingSound)
        this.playingAudio.loop = true
        this.playingAudio.play()
    }

    async answerCall() {
        const answer = await this.peerConnection!.createAnswer()
        await this.peerConnection!.setLocalDescription(answer)
        EventSocket.socket!.emit(EVENT_TYPES.SIGNALING.ANSWER, { answer })
    }

    async makeCall({ callNumber }: MakeCallPayload) {
        this.ringingAudioPlay()

        this.initPeer()
        this.attachAudioToConnection()
        const offer = await this.peerConnection!.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: false
        })
        await this.peerConnection!.setLocalDescription(offer)

        EventSocket.socket!.emit(EVENT_TYPES.SIGNALING.OFFER, { offer, callNumber })
    }

    async interruptCall(endCode: CallEndCodes, actionType?: string) {
        if (actionType) {
            EventSocket.socket!.emit(actionType, {
                callId: store.getState().webRTC.currentCall?.id
            })
        }

        this.peerConnection?.close()

        store.dispatch(changeCurrentCall(null))
        store.dispatch(changeCallEndCode(endCode))

        setTimeout(() => store.dispatch(changeCallEndCode(null)), 1000)

        if (this.playingAudio) {
            this.playingAudio.pause()
            this.playingAudio = null
        }
    }

    async cancelCall() {
        this.interruptCall(CallEndCodes.Cancelled, EVENT_TYPES.SIGNALING.CANCEL)
    }

    async rejectCall() {
        this.interruptCall(CallEndCodes.Rejected, EVENT_TYPES.SIGNALING.REJECT)
    }

    async offlineReject(callEndCode: CallEndCodes) {
        if (this.playingAudio) {
            this.playingAudio.pause()
            this.playingAudio = null
        }
        this.playingAudio = new Audio(OfflineSound)
        store.dispatch(changeCallEndCode(callEndCode))
        this.peerConnection?.close()
        this.playAudio()
    }

    async playAudio() {
        if (this.playingAudio) {
            this.playingAudio.play()
            this.playingAudio.addEventListener("ended", () => {
                store.dispatch(changeCallEndCode(null))
                this.playingAudio = null
            })
        }
    }
}

export const WebRTCAgent = new Agent()
