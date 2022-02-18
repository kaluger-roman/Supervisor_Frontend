import React from "react"
import { useSESelector } from "../../../../../redux/hooks"
import { CallPages } from "../../../types"
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
