import React from "react"
import { useHandlerTypedDispatch, useSESelector } from "../../../../../redux/hooks"
import { clickCallBtn } from "../../../../../redux/reducers/webRTC"
import { ButtonType } from "../../types"
import { CallBtn, CallButtonsContainer, PhonePageWrapper } from "../styled"
import { KeypadNumbersInput } from "./parts/KeypadButtons"
import { KeypadInput } from "./parts/KeypadInput"

export const Keypad: React.FC = () => {
    const dispatchHandler = useHandlerTypedDispatch()
    const { dialInput } = useSESelector((state) => state.webRTC)

    return (
        <PhonePageWrapper>
            <KeypadInput />
            <KeypadNumbersInput />
            <CallButtonsContainer>
                <CallBtn disabled={!dialInput} onClick={dispatchHandler(clickCallBtn())} btnType={ButtonType.call} />
            </CallButtonsContainer>
        </PhonePageWrapper>
    )
}
