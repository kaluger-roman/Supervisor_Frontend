import React from "react"
import { ButtonType } from "../../types"
import { CallInfo } from "../CallInfo"
import { CallBtn, CallDismissBtnIcon, PhonePageWrapper } from "../styled"
import { CallActionButtons } from "./parts/CallActions"
import { CallEnded } from "./parts/CallEnded"
import { WaitAnimation } from "./styled"

export const InCall: React.FC = () => {
    return (
        <PhonePageWrapper>
            <CallInfo />
            {/* <CallActionButtons /> */}
            <WaitAnimation />
            <CallBtn btnType={ButtonType.reject}>
                <CallDismissBtnIcon />
            </CallBtn>
            {/* <CallEnded /> */}
        </PhonePageWrapper>
    )
}
