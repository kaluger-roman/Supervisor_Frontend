import { UserStatuses } from "components/Navbar/types"
import React, { useCallback } from "react"
import { useSESelector, useTypedDispatch } from "Supervisor/redux/hooks"
import { useChangeStatusMutation } from "Supervisor/redux/reducers/api/agent.api"
import { clickCallBtn } from "Supervisor/redux/reducers/webRTC"
import { ButtonType } from "../../types"
import { CallBtn, CallButtonsContainer, PhonePageWrapper } from "../styled"
import { KeypadNumbersInput } from "./parts/KeypadButtons"
import { KeypadInput } from "./parts/KeypadInput"

export const Keypad: React.FC = () => {
    const dispatch = useTypedDispatch()
    const [triggerStatus] = useChangeStatusMutation()
    const { dialInput } = useSESelector((state) => state.webRTC)
    const onCallClick = useCallback(() => {
        dispatch(clickCallBtn())
        triggerStatus(UserStatuses.online)
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
