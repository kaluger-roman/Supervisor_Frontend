import React from "react"
import { useSESelector, useHandlerTypedDispatch } from "Supervisor/redux/hooks"
import { clickAnswerBtn, clickBreakBtn } from "Supervisor/redux/reducers/webRTC"
import { CallPages } from "../../../types"
import { ButtonType } from "../../types"
import { CallInfo } from "../CallInfo"
import { CallBtn, CallButtonsContainer, PhonePageWrapper } from "../styled"
import { CallActionButtons } from "./parts/CallActions"
import { CallEnded } from "./parts/CallEnded"
import { RingingAnimation, WaitAnimation } from "./styled"

export const InCall: React.FC = () => {
    const { callPage } = useSESelector((state) => state.webRTC)
    const handlerDispatch = useHandlerTypedDispatch()

    return (
        <PhonePageWrapper>
            <CallInfo />
            {callPage === CallPages.call && <CallActionButtons />}
            {callPage === CallPages.waitingOutbound && <WaitAnimation />}
            {callPage === CallPages.ringingInbound && <RingingAnimation />}
            <CallButtonsContainer>
                {callPage === CallPages.ringingInbound && (
                    <CallBtn onClick={handlerDispatch(clickAnswerBtn())} btnType={ButtonType.answer} />
                )}
                <CallBtn
                    onClick={handlerDispatch(clickBreakBtn())}
                    btnType={callPage === CallPages.ringingInbound ? ButtonType.reject : ButtonType.break}
                />
            </CallButtonsContainer>
            {callPage === CallPages.callEnded && <CallEnded />}
        </PhonePageWrapper>
    )
}
