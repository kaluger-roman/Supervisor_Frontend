import quantile from "compute-quantile"
import { Timer } from "Supervisor/helpers"
import yallist from "yallist"
import {
    ANALIZER_ALERT_QUANTILE,
    ANALIZER_POLL_INTERVAL,
    ANALIZER_STORE_COUNT,
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

    const cycleList = (isCycle: boolean) => {
        lastValsList.tail!.next = isCycle ? lastValsList.head! : null
    }

    let curList = lastValsList.head!

    const timer = new Timer(MIN_CHUNK_DURATION, MAX_CHUNK_DURATION)

    const process = () => {
        analyserNode.getFloatTimeDomainData(pcmData)
        const sumSquares = pcmData.reduce((acc, amplitude) => (acc += amplitude * amplitude), 0.0) * 100

        cycleList(true)
        curList.value = Math.sqrt(sumSquares / pcmData.length)
        curList = curList.next!

        cycleList(false)
        const quant = quantile(lastValsList.toArray(), ANALIZER_ALERT_QUANTILE)

        console.log(sumSquares, quant)
        if ((timer.checkRangeUpperMin() && sumSquares < quant) || timer.checkRangeUpperMax()) {
            timer.update()
            silenceCallback(sumSquares)
        }

        timeout = setTimeout(process, ANALIZER_POLL_INTERVAL)
    }

    let timeout = setTimeout(process, ANALIZER_POLL_INTERVAL)

    return () => clearTimeout(timeout)
}
