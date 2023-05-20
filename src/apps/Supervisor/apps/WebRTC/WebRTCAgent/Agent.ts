import { ShowModal } from "components/Modals"
import { ModalSize } from "components/Modals/types"
import OfflineSound from "Supervisor/sounds/offlineError.mp3"
import RingingSound from "Supervisor/sounds/ringing.mp3"
import HoldSound from "Supervisor/sounds/hold.mp3"
import {
    changeCallEndCode,
    changeCurrentCall,
    changeIsPeersConnected,
    changeIsRemoteHolded
} from "Supervisor/redux/reducers/webRTC"
import { EventSocket } from "Supervisor/redux/socket"
import { EVENT_TYPES, WS_ERR_STATUS } from "Supervisor/redux/socket/constants"
import store from "Supervisor/redux/store"
import {
    AgentConfiguration,
    CallEndCodes,
    CallOffer,
    ChangeCallPayload,
    ConnectionState,
    MakeCallPayload,
    WebrtcDataChannelActions
} from "./types"
import { SocketErrors, SocketException, SocketStandardActions } from "Supervisor/redux/socket/types"
import { CallStatus } from "Supervisor/redux/reducers/api/types"
import { silenceProcessor } from "./helpers"
import { CHUNK_MIME_TYPE, DATA_CHANNEL_NAME } from "./const"
import { Action } from "@reduxjs/toolkit"

class Agent {
    configuration: AgentConfiguration = {
        iceServers: [
            {
                urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
            }
        ]
    }
    peerConnection: RTCPeerConnection | null = null
    localAudioStream: MediaStream | null = null
    attachedTrack: RTCRtpSender | null = null
    playingAudio: HTMLAudioElement | null = null
    playingPeerAudio: HTMLAudioElement | null = null
    localIcesCache: RTCIceCandidate[] = []
    remoteIcesCache: RTCIceCandidate[] = []
    mediaRecorder: MediaRecorder | null = null
    mediaRecorderTimer: NodeJS.Timer | null = null
    spyVolumeUnsunscribe: (() => void) | null = null
    dataChannel: RTCDataChannel | null = null
    remoteDataChannel: RTCDataChannel | null = null

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

    emitIce(iceCandidate: RTCIceCandidate) {
        EventSocket.socket!.emit(EVENT_TYPES.SIGNALING.NEW_ICE, {
            iceCandidate,
            callId: store.getState().webRTC.currentCall?.id
        })
    }

    private initSocketListeners() {
        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.ANSWER, async (data: { answer: RTCSessionDescriptionInit }) => {
            if (data.answer && this.peerConnection && this.peerConnection.signalingState !== ConnectionState.closed) {
                this.pauseDropAudio()
                const remoteDesc = new RTCSessionDescription(data.answer)
                await this.peerConnection.setRemoteDescription(remoteDesc)

                this.localIcesCache.forEach((ice) => this.emitIce(ice))
                this.localIcesCache = []

                this.remoteIcesCache.forEach((ice) => this.peerConnection?.addIceCandidate(ice))
                this.remoteIcesCache = []
            }
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.OFFER, async (data: CallOffer) => {
            this.initPeer()
            if (data.offer) this.peerConnection?.setRemoteDescription(new RTCSessionDescription(data.offer))
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.NEW_ICE, (message: { iceCandidate: RTCIceCandidate }) => {
            try {
                if (message.iceCandidate && this.peerConnection) {
                    if (
                        !this.peerConnection?.remoteDescription ||
                        this.peerConnection?.signalingState === ConnectionState.closed
                    ) {
                        this.remoteIcesCache.push(message.iceCandidate)
                        return
                    }

                    this.peerConnection.addIceCandidate(message.iceCandidate)
                }
            } catch {
                console.error("addIceCandidate error")
            }
        })

        EventSocket.socket!.on(EVENT_TYPES.CALL.CHANGE, async (data: ChangeCallPayload) => {
            if (data.call) {
                store.dispatch(changeCurrentCall(data.call))

                if (data.call.status === CallStatus.active && this.localAudioStream) {
                    this.startSpy(this.localAudioStream)
                }

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

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.FAILED, async () => {
            this.interruptCall(CallEndCodes.failed)
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.CANCEL, async () => {
            this.interruptCall(CallEndCodes.Cancelled)
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.REJECT, async () => {
            this.interruptCall(CallEndCodes.Rejected)
        })

        EventSocket.socket!.on(EVENT_TYPES.SIGNALING.ENDED, async () => {
            this.interruptCall(CallEndCodes.Standard)
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
            this.peerConnection.addEventListener("track", async (event) => {
                if (!this.playingPeerAudio) {
                    this.playingPeerAudio = new Audio()
                }

                const [remoteStream] = event.streams
                this.playingPeerAudio.srcObject = remoteStream
                this.playingPeerAudio.play()
            })

            this.peerConnection?.addEventListener("icecandidate", (event) => {
                if (!event.candidate) return

                if (!this.peerConnection?.remoteDescription) {
                    this.localIcesCache.push(event.candidate)
                    return
                }

                this.emitIce(event.candidate)
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

            this.dataChannel = this.peerConnection.createDataChannel(DATA_CHANNEL_NAME)

            this.peerConnection.addEventListener("datachannel", (event) => {
                this.remoteDataChannel = event.channel
            })

            this.dataChannel.addEventListener("message", (event) => {
                const message: Action<WebrtcDataChannelActions> = JSON.parse(event.data)

                console.log("message", message)
                if ([WebrtcDataChannelActions.hold, WebrtcDataChannelActions.unhold].includes(message.type)) {
                    this.remoteHold(message.type)
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
                    if (this.peerConnection)
                        this.attachedTrack = this.peerConnection.addTrack(track, this.localAudioStream!)
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

    pauseDropAudio() {
        if (this.playingAudio) {
            this.playingAudio.pause()
            this.playingAudio.remove()
            this.playingAudio = null
        }
    }

    async answerCall() {
        this.pauseDropAudio()
        this.attachAudioToConnection()

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

        EventSocket.socket?.emit(EVENT_TYPES.SIGNALING.OFFER, { offer, callNumber })
    }

    async interruptCall(endCode: CallEndCodes, actionType?: string) {
        if (actionType && EventSocket.socket) {
            EventSocket.socket.emit(actionType, {
                callId: store.getState().webRTC.currentCall?.id
            })
        }

        this.stopSpy()

        this.peerConnection?.close()
        this.attachedTrack = null

        store.dispatch(changeCurrentCall(null))
        store.dispatch(changeCallEndCode(endCode))

        setTimeout(() => store.dispatch(changeCallEndCode(null)), 1000)

        this.pauseDropAudio()
    }

    async cancelCall() {
        this.interruptCall(CallEndCodes.Cancelled, EVENT_TYPES.SIGNALING.CANCEL)
    }

    async rejectCall() {
        this.interruptCall(CallEndCodes.Rejected, EVENT_TYPES.SIGNALING.REJECT)
    }

    async endCall() {
        this.interruptCall(CallEndCodes.Standard, EVENT_TYPES.SIGNALING.ENDED)
    }

    async offlineReject(callEndCode: CallEndCodes) {
        this.pauseDropAudio()
        this.playingAudio = new Audio(OfflineSound)
        store.dispatch(changeCallEndCode(callEndCode))
        this.peerConnection?.close()
        this.playAudio()
    }

    startSpy(stream: MediaStream) {
        const call = store.getState().webRTC.currentCall

        if (call?.caller.id === store.getState().main.userId) {
            EventSocket.socket?.emit(EVENT_TYPES.RECORD.START, {
                callId: call?.id
            })
        }

        this.mediaRecorder = new MediaRecorder(stream, { mimeType: CHUNK_MIME_TYPE })
        this.mediaRecorder.start()

        this.spyVolumeUnsunscribe = silenceProcessor(stream, () => {
            this.mediaRecorder?.stop()
            this.mediaRecorder?.start()
        })

        this.mediaRecorder.addEventListener("dataavailable", (ev) =>
            EventSocket.socket?.emit(EVENT_TYPES.RECORD.APPEND, {
                recordBlob: ev.data,
                format: CHUNK_MIME_TYPE,
                callId: call?.id
            })
        )
    }

    stopSpy() {
        this.spyVolumeUnsunscribe && this.spyVolumeUnsunscribe()

        if (this.mediaRecorder) {
            this.mediaRecorder.stop()
            this.mediaRecorderTimer && clearInterval(this.mediaRecorderTimer)
            this.mediaRecorder = null
            this.mediaRecorderTimer = null
            EventSocket.socket?.emit(EVENT_TYPES.RECORD.STOP, {
                callId: store.getState().webRTC.currentCall?.id
            })
        }
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

    mute(isMute: boolean): void {
        if (this.attachedTrack?.track) {
            this.attachedTrack.track.enabled = !isMute
        }
    }

    playHoldAudio() {
        this.playingAudio = new Audio(HoldSound)
        this.playingAudio.loop = true
        this.playingAudio.play()
    }

    hold(isHold: boolean): void {
        this.mute(isHold)

        this.remoteDataChannel?.send(
            JSON.stringify({ type: isHold ? WebrtcDataChannelActions.hold : WebrtcDataChannelActions.unhold })
        )

        EventSocket.socket!.emit(EVENT_TYPES.CALL.HOLD, { isHold })

        if (this.playingAudio && isHold) {
            this.pauseDropAudio()
        }

        if (!isHold && store.getState().webRTC.isRemoteHolded) {
            this.playHoldAudio()
        }
    }

    remoteHold(signal: WebrtcDataChannelActions) {
        const state = store.getState()

        store.dispatch(changeIsRemoteHolded(signal === WebrtcDataChannelActions.hold))

        if (signal === WebrtcDataChannelActions.hold && !state.webRTC.isHolded) {
            this.playHoldAudio()
        }

        if (this.playingAudio && signal === WebrtcDataChannelActions.unhold) {
            this.pauseDropAudio()
        }
    }
}

export const WebRTCAgent = new Agent()
