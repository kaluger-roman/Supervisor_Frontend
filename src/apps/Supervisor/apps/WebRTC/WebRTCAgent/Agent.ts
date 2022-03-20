import { ShowModal } from "components/Modals"
import { ModalSize } from "components/Modals/types"
import { changeCurrentCall, changeIsPeersConnected } from "Supervisor/redux/reducers/webRTC"
import { EventSocket } from "Supervisor/redux/socket"
import { EVENT_TYPES } from "Supervisor/redux/socket/constants"
import store from "Supervisor/redux/store"
import { AgentConfiguration, CallOffer, ChangeCallPayload, ConnectionState, MakeCallPayload } from "./types"

class Agent {
    configuration: AgentConfiguration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }
    peerConnection: RTCPeerConnection | null = null
    localAudioStream: MediaStream | null = null
    attachedTrack: RTCRtpSender | null = null
    async init() {
        this.peerConnection = new RTCPeerConnection(this.configuration)
        ;(window as any).peer = this.peerConnection

        await this.getMediaPermissions()

        this.initSocketListeners()
        this.initPeerListeners()
    }

    initSocketListeners() {
        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.ANSWER, async (data: { answer: RTCSessionDescriptionInit }) => {
            if (data.answer) {
                const remoteDesc = new RTCSessionDescription(data.answer)
                await this.peerConnection!.setRemoteDescription(remoteDesc)
            }
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.OFFER, async (data: CallOffer) => {
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
            }
        })
    }

    initPeerListeners() {
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

    async createOfferConnection(callNumber: string) {
        const offer = await this.peerConnection!.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: false
        })
        await this.peerConnection!.setLocalDescription(offer)

        EventSocket.socket!.emit(EVENT_TYPES.SIGNALING.OFFER, { offer, callNumber })
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
        this.attachAudioToConnection()
        await this.createOfferConnection(callNumber)
    }
}

export const WebRTCAgent = new Agent()
