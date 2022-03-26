import { ShowModal } from "components/Modals"
import { ModalSize } from "components/Modals/types"
import OfflineSound from "Supervisor/sounds/offlineError.mp3"
import { changeCallEndCode, changeCurrentCall, changeIsPeersConnected } from "Supervisor/redux/reducers/webRTC"
import { EventSocket } from "Supervisor/redux/socket"
import { EVENT_TYPES } from "Supervisor/redux/socket/constants"
import store from "Supervisor/redux/store"
import {
    AgentConfiguration,
    CallEndCodes,
    CallOffer,
    ChangeCallPayload,
    ConnectionState,
    MakeCallPayload
} from "./types"

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
                console.log(data.call)
                store.dispatch(changeCurrentCall(data.call))
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

    async answerCall() {
        const answer = await this.peerConnection!.createAnswer()
        await this.peerConnection!.setLocalDescription(answer)
        EventSocket.socket!.emit(EVENT_TYPES.SIGNALING.ANSWER, { answer })
    }

    async makeCall({ callNumber }: MakeCallPayload) {
        this.initPeer()
        this.attachAudioToConnection()
        const offer = await this.peerConnection!.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: false
        })
        await this.peerConnection!.setLocalDescription(offer)

        EventSocket.socket!.emit(EVENT_TYPES.SIGNALING.OFFER, { offer, callNumber })
    }

    async cancelCall() {
        EventSocket.socket!.emit(EVENT_TYPES.SIGNALING.CANCEL, {
            callId: store.getState().webRTC.currentCall?.id
        })

        this.peerConnection?.close()

        store.dispatch(changeCurrentCall(null))
        store.dispatch(changeCallEndCode(CallEndCodes.Cancelled))

        setTimeout(() => store.dispatch(changeCallEndCode(null)), 1000)
    }

    async offlineReject(callEndCode: CallEndCodes) {
        this.playingAudio = new Audio(OfflineSound)
        store.dispatch(changeCallEndCode(callEndCode))
        this.playAudio()
    }

    async playAudio() {
        this.peerConnection?.close()
        if (this.playingAudio) {
            this.playingAudio.play()
            this.playingAudio.addEventListener("ended", () => {
                store.dispatch(changeCallEndCode(null))
            })
        }
    }
}

export const WebRTCAgent = new Agent()
