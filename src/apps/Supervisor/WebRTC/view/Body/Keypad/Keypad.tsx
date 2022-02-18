import React from "react"
import { useHandlerTypedDispatch } from "../../../../../../config/redux/hooks"
import { clickCallBtn } from "../../../../../../config/redux/reducers/webRTC"
import { ButtonType } from "../../types"
import { CallBtn, CallBtnIcon, PhonePageWrapper } from "../styled"
import { KeypadNumbersInput } from "./parts/KeypadButtons"
import { KeypadInput } from "./parts/KeypadInput"

export const Keypad: React.FC = () => {
    const dispatchHandler = useHandlerTypedDispatch()

    return (
        <PhonePageWrapper>
            <KeypadInput />
            <KeypadNumbersInput />
            <CallBtn onClick={dispatchHandler(clickCallBtn())} btnType={ButtonType.call}>
                <CallBtnIcon />
            </CallBtn>
        </PhonePageWrapper>
    )
}
