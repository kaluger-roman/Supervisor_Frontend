import { Timer } from "Supervisor/helpers"
import yallist from "yallist"
import {
    ANALIZER_ALERT_MULTIPLICATOR,
    ANALIZER_POLL_INTERVAL,
    ANALIZER_STORE_COUNT,
    ANALIZER_STORE_SILENCE_COUNT,
    MAX_CHUNK_DURATION,
    MIN_CHUNK_DURATION
} from "./const"

export const silenceProcessor = (stream: MediaStream, silenceCallback: (vol: number) => void) => {
    const audioContext = new AudioContext()
    const mediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream)
    const analyserNode = audioContext.createAnalyser()
    mediaStreamAudioSourceNode.connect(analyserNode)

    const pcmData = new Float32Array(analyserNode.fftSize)

    const lastValsList = yallist.create(new Array(ANALIZER_STORE_COUNT).fill(0))
    const lastSilenceValsList = yallist.create(new Array(ANALIZER_STORE_SILENCE_COUNT).fill(Math.PI))

    const cycleLists = (isCycle: boolean) => {
        lastValsList.tail!.next = isCycle ? lastValsList.head! : null
        lastSilenceValsList.tail!.next = isCycle ? lastSilenceValsList.head! : null
    }

    let curListItem = lastValsList.head!
    let curSilenceListItem = lastValsList.head!

    const timer = new Timer(MIN_CHUNK_DURATION, MAX_CHUNK_DURATION)

    const process = () => {
        analyserNode.getFloatTimeDomainData(pcmData)
        const sumSquares = pcmData.reduce((acc, amplitude) => (acc += amplitude * amplitude), 0.0) * 100

        cycleLists(true)

        curListItem.value = Math.sqrt(sumSquares / pcmData.length)
        curListItem = curListItem.next!

        curSilenceListItem.value = sumSquares
        curSilenceListItem = curSilenceListItem.next!

        cycleLists(false)

        if (
            (timer.checkRangeUpperMin() &&
                Math.max(...lastValsList.toArray()) <
                    Math.min(...lastSilenceValsList.toArray()) * ANALIZER_ALERT_MULTIPLICATOR) ||
            timer.checkRangeUpperMax()
        ) {
            timer.update()
            silenceCallback(sumSquares)
        }

        timeout = setTimeout(process, ANALIZER_POLL_INTERVAL)
    }

    let timeout = setTimeout(process, ANALIZER_POLL_INTERVAL)

    return () => clearTimeout(timeout)
}
