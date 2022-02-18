import React from "react"
import { useHandlerTypedDispatch } from "../../../../../../../config/redux/hooks"
import { clickDialNumber } from "../../../../../../../config/redux/reducers/webRTC"
import { KeypadButtonsWrapper, KeypadNumberButton } from "../styled"

const NUMBER_BUTTONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

export const KeypadNumbersInput: React.FC = () => {
    const handlerDispatch = useHandlerTypedDispatch()

    return (
        <KeypadButtonsWrapper>
            {NUMBER_BUTTONS.map((number) => (
                <KeypadNumberButton key={number} onClick={handlerDispatch(clickDialNumber(number))}>
                    {number}
                </KeypadNumberButton>
            ))}
        </KeypadButtonsWrapper>
    )
}
