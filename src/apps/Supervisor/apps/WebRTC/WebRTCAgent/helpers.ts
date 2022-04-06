import { ANALIZER_FFT, ANALIZER_MIN_DB, ANALIZER_MAX_DB, ANALIZER_SMOOTH, ANALIZER_POLL_INTERVAL } from "./const"

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
