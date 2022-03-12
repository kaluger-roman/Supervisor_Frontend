import { chanheIsPeersConnected } from "Supervisor/redux/reducers/webRTC"
import { EventSocket } from "Supervisor/redux/socket"
import { EVENT_TYPES } from "Supervisor/redux/socket/constants"
import store from "Supervisor/redux/store"
import { AgentConfiguration } from "./types"

export class Agent {
    configuration: AgentConfiguration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] }
    peerConnection: RTCPeerConnection
    constructor() {
        this.peerConnection = new RTCPeerConnection(this.configuration)
        EventSocket.socket.on(EVENT_TYPES.SIGNALING.ANSWER, async (data: { answer: RTCSessionDescriptionInit }) => {
            if (data.answer) {
                const remoteDesc = new RTCSessionDescription(data.answer)
                await this.peerConnection.setRemoteDescription(remoteDesc)
            }
        })

        EventSocket.socket.on(EVENT_TYPES.SIGNALING.OFFER, async (data: { offer: RTCSessionDescriptionInit }) => {
            if (data.offer) {
                this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer))
                const answer = await this.peerConnection.createAnswer()
                await this.peerConnection.setLocalDescription(answer)
                EventSocket.socket.emit(EVENT_TYPES.SIGNALING.ANSWER, { answer: answer })
            }
        })

        EventSocket.socket.on(EVENT_TYPES.SIGNALING.NEW_ICE, async (message) => {
            if (message.iceCandidate) {
                try {
                    await this.peerConnection.addIceCandidate(message.iceCandidate)
                } catch (e) {
                    console.error("Error adding received ice candidate", e)
                }
            }
        })

        this.peerConnection.addEventListener("icecandidate", (event) => {
            if (event.candidate) {
                EventSocket.socket.emit(EVENT_TYPES.SIGNALING.NEW_ICE, { candidate: event.candidate })
            }
        })

        this.peerConnection.addEventListener("connectionstatechange", (event) => {
            if (this.peerConnection.connectionState === "connected") {
                store.dispatch(chanheIsPeersConnected(true))
            }
            if (["disconnected", "failed", "closed"].includes(this.peerConnection.connectionState)) {
                store.dispatch(chanheIsPeersConnected(false))
            }
        })
    }

    async createOfferConnection() {
        const offer = await this.peerConnection.createOffer()
        await this.peerConnection.setLocalDescription(offer)

        EventSocket.socket.emit(EVENT_TYPES.SIGNALING.OFFER, { offer: offer })
    }

    async attachAudio() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
        stream.getTracks().forEach((track) => {
            this.peerConnection.addTrack(track, stream)
        })
    }

    async makeCall() {
        this.attachAudio()
        this.createOfferConnection()
    }
}
