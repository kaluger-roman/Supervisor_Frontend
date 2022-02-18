import React from "react"
import { CallPages } from "Supervisor/apps/WebRTC/types"
import { useSESelector } from "Supervisor/redux/hooks"
import { CallInfoWrapper } from "./styled"
import { Timer } from "./Timer"

export const CallInfo: React.FC = () => {
    const { callPage } = useSESelector((state) => state.webRTC)

    return (
        <CallInfoWrapper>
            <div>Name</div>
            <div>Number</div>
            {callPage === CallPages.call && <Timer startAt={Date.now() - 4774} />}
        </CallInfoWrapper>
    )
}
