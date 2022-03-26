import React, { useEffect, useState } from "react"
import moment from "moment"

export const Timer: React.FC<{ startAt?: number }> = ({ startAt }) => {
    const [msDiff, setMsDiff] = useState<number | null>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            setMsDiff((prev) => (prev || moment(Date.now()).diff(moment(startAt))) + 1000)
        }, 1000)

        return () => clearInterval(interval)
    }, [startAt])

    if (!startAt) return null

    return <div>{msDiff ? moment(msDiff).format("mm:ss") : "00:00"}</div>
}
