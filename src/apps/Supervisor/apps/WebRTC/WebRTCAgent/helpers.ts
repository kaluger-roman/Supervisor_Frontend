import {
    ANALIZER_FFT,
    ANALIZER_MIN_DB,
    ANALIZER_MAX_DB,
    ANALIZER_SMOOTH,
    ANALIZER_POLL_INTERVAL,
    MIN_CHUNK_DURATION,
    MAX_CHUNK_DURATION,
    ANALIZER_LAST_BINS_SIZE,
    ANALIZER_ALERT_QUANTILE,
    ABSOLUTE_SILENCE_LEVEL_PERC
} from "./const"

export const createAudioAnalizer = (stream: MediaStream) => {
    const audioContext = new AudioContext()
    const audioSource = audioContext.createMediaStreamSource(stream)
    const analyser = audioContext.createAnalyser()
    analyser.fftSize = ANALIZER_FFT
    analyser.minDecibels = ANALIZER_MIN_DB
    analyser.maxDecibels = ANALIZER_MAX_DB
    analyser.smoothingTimeConstant = ANALIZER_SMOOTH
    audioSource.connect(analyser)

    return analyser
}

export const processPercentStreamVolume = (stream: MediaStream, callback: (percentVolume: number) => void) => {
    const analyser = createAudioAnalizer(stream)

    const volumes = new Uint8Array(analyser.frequencyBinCount)
    let timeout: NodeJS.Timeout | null = null

    const volumeCallback = () => {
        analyser.getByteFrequencyData(volumes)
        let volumeSum = 0

        volumes.forEach((volume) => {
            volumeSum += volume
        })

        const averageVolume = volumeSum / volumes.length
        const percentVolume = (averageVolume * 100) / Math.max(Math.abs(ANALIZER_MIN_DB), Math.abs(ANALIZER_MAX_DB))

        callback(percentVolume)
        timeout = setTimeout(volumeCallback, ANALIZER_POLL_INTERVAL)
    }

    volumeCallback()

    return {
        unsubscrube: () => {
            timeout && clearTimeout(timeout)
            analyser.disconnect()
        }
    }
}

const asc = (arr: number[]) => arr.sort((a, b) => a - b)

export const quantile = (arr: number[], q: number) => {
    const sorted = asc(arr.concat([]))
    const pos = (sorted.length - 1) * q
    const base = Math.floor(pos)
    const rest = pos - base
    if (sorted[base + 1] !== undefined) {
        const res = sorted[base] + rest * (sorted[base + 1] - sorted[base])
        return res
    } else {
        return sorted[base]
    }
}

export const catchSilenceProcessor = () => {
    let lastEmittedTimestamp = Date.now()
    let lastBins: number[] = []
    let curToFill = 0

    ;(window as any).lastBins = lastBins

    return (vol: number) => {
        const now = Date.now()
        const spentTime = now - lastEmittedTimestamp

        lastBins[curToFill] = vol
        curToFill = curToFill > ANALIZER_LAST_BINS_SIZE ? 0 : curToFill + 1

        const quant = quantile(lastBins, ANALIZER_ALERT_QUANTILE)

        //console.log(quant)

        console.log(quant)
        const isSilence = vol < quant
        if ((isSilence && spentTime > MIN_CHUNK_DURATION) || spentTime > MAX_CHUNK_DURATION) {
            lastEmittedTimestamp = now

            return true
        }

        return false
    }
}
