import React from "react"
import { CallInfoWrapper } from "./styled"
import { Timer } from "./Timer"

export const CallInfo: React.FC = () => {
    return (
        <CallInfoWrapper>
            <div>Name</div>
            <div>Number</div>
            <Timer startAt={Date.now() - 4774} />
        </CallInfoWrapper>
    )
}
