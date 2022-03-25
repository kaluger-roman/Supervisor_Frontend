import { UserStatuses } from "components/Navbar/types"
import React, { useCallback, useEffect } from "react"
import { WebRTCAgent } from "Supervisor/apps/WebRTC/WebRTCAgent"
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
    const { dialInput, callEndCode } = useSESelector((state) => state.webRTC)
    const onCallClick = useCallback(() => {
        dispatch(clickCallBtn())
        triggerStatus(UserStatuses.online)
        WebRTCAgent.makeCall({ callNumber: dialInput })
    }, [dialInput])

    useEffect(() => {
        const mouseDown = (e: KeyboardEvent) => {
            if (e.key === "Enter" && dialInput && !callEndCode) {
                onCallClick()
            }
        }

        document.addEventListener("keypress", mouseDown)

        return () => document.removeEventListener("keypress", mouseDown)
    }, [dialInput, callEndCode])

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
