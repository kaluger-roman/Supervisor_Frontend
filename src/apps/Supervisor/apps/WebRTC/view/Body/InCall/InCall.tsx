import React, { useCallback } from "react"
import { WebRTCAgent } from "Supervisor/apps/WebRTC/WebRTCAgent"
import { useSESelector } from "Supervisor/redux/hooks"
import { CallStatus } from "Supervisor/redux/reducers/api/types"
import { CallPages } from "../../../types"
import { ButtonType } from "../../types"
import { CallInfo } from "../CallInfo"
import { CallBtn, CallButtonsContainer, PhonePageWrapper } from "../styled"
import { CallActionButtons } from "./parts/CallActions"
import { CallEnded } from "./parts/CallEnded"
import { RingingAnimation, WaitAnimation } from "./styled"

export const InCall: React.FC = () => {
    const { callPage, callEndCode, currentCall } = useSESelector((state) => state.webRTC)
    const breakBtnHandler = useCallback(() => {
        if (currentCall?.status === CallStatus.answerWaiting) {
            WebRTCAgent.cancelCall()
        }
    }, [currentCall])

    return (
        <PhonePageWrapper>
            {callEndCode && <CallEnded callEndCode={callEndCode} />}
            {!callEndCode && currentCall && (
                <>
                    <CallInfo />
                    {callPage === CallPages.call && <CallActionButtons />}
                    {callPage === CallPages.waitingOutbound && <WaitAnimation />}
                    {callPage === CallPages.ringingInbound && <RingingAnimation />}
                    <CallButtonsContainer>
                        {callPage === CallPages.ringingInbound && (
                            <CallBtn onClick={() => WebRTCAgent.answerCall()} btnType={ButtonType.answer} />
                        )}
                        <CallBtn
                            onClick={breakBtnHandler}
                            btnType={callPage === CallPages.ringingInbound ? ButtonType.reject : ButtonType.break}
                        />
                    </CallButtonsContainer>
                </>
            )}
        </PhonePageWrapper>
    )
}
