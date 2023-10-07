import { last } from "lodash"
import React, { useEffect, useMemo, useState } from "react"
import { CallPages } from "Supervisor/apps/WebRTC/types"
import { useSESelector } from "Supervisor/redux/hooks"
import { CallInfoWrapper, HoldNotice } from "./styled"
import { Timer } from "./Timer"

export const CallInfo: React.FC = () => {
    const { callPage, currentCall, isRemoteHolded } = useSESelector((state) => state.webRTC)
    const { userId } = useSESelector((state) => state.main)
    const [animationOn, setAnimationOn] = useState<boolean>(false)

    const otherSide = useMemo(
        () => [currentCall?.callee, currentCall?.caller].find((side) => side?.id !== userId),
        [currentCall, userId]
    )

    useEffect(() => {
        if (isRemoteHolded && !animationOn) setAnimationOn(true)
    }, [isRemoteHolded])

    return (
        <CallInfoWrapper>
            <div>{otherSide?.username}</div>
            <div>{otherSide?.webrtcNumber}</div>
            {callPage === CallPages.call && <Timer startAt={Number(last(currentCall?.statusTimestampsSequence))} />}
            <HoldNotice shown={isRemoteHolded} animationOn={animationOn}>
                You are on hold
            </HoldNotice>
        </CallInfoWrapper>
    )
}
