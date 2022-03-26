import React, { useMemo } from "react"
import { CallPages } from "Supervisor/apps/WebRTC/types"
import { useSESelector } from "Supervisor/redux/hooks"
import { CallInfoWrapper } from "./styled"
import { Timer } from "./Timer"

export const CallInfo: React.FC = () => {
    const { callPage, currentCall } = useSESelector((state) => state.webRTC)
    const { userId } = useSESelector((state) => state.main)

    const otherSide = useMemo(
        () => [currentCall?.callee, currentCall?.caller].find((side) => side?.id !== userId),
        [currentCall, userId]
    )

    return (
        <CallInfoWrapper>
            <div>{otherSide?.username}</div>
            <div>{otherSide?.webrtcNumber}</div>
            {callPage === CallPages.call && <Timer startAt={Date.now() - 4774} />}
        </CallInfoWrapper>
    )
}
