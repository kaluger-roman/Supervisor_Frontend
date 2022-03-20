import React, { useCallback } from "react"
import { useSESelector, useTypedDispatch } from "Supervisor/redux/hooks"
import { clickCallBtn } from "Supervisor/redux/reducers/webRTC"
import { ButtonType } from "../../types"
import { CallBtn, CallButtonsContainer, PhonePageWrapper } from "../styled"
import { KeypadNumbersInput } from "./parts/KeypadButtons"
import { KeypadInput } from "./parts/KeypadInput"

export const Keypad: React.FC = () => {
    const dispatch = useTypedDispatch()
    const { dialInput } = useSESelector((state) => state.webRTC)
    const onCallClick = useCallback(() => {
        dispatch(clickCallBtn())
    }, [])

    return (
        <PhonePageWrapper>
            <KeypadInput />
            <KeypadNumbersInput />
            <CallButtonsContainer>
                <CallBtn disabled={!dialInput} onClick={onCallClick} btnType={ButtonType.call} />
            </CallButtonsContainer>
        </PhonePageWrapper>
    )
}
