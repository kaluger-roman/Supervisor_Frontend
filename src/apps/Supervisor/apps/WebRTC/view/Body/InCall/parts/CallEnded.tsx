import React from "react"
import { CallEndCodes } from "Supervisor/apps/WebRTC/WebRTCAgent/types"
import { CALL_ENDED_LABEL } from "../constants"
import { CallEndedLabel } from "../styled"

export const CallEnded: React.FC<{ callEndCode: CallEndCodes }> = ({ callEndCode }) => {
    return <CallEndedLabel>{CALL_ENDED_LABEL[callEndCode]}</CallEndedLabel>
}
