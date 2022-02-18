import React, { useEffect, useState } from "react"
import moment from "moment"

export const Timer: React.FC<{ startAt: number }> = ({ startAt }) => {
    const [msDiff, setMsDiff] = useState<number>(moment(Date.now()).diff(moment(startAt)))

    useEffect(() => {
        const interval = setInterval(() => {
            setMsDiff((prev) => prev + 1000)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return <div>{moment(msDiff).format("mm:ss")}</div>
}
