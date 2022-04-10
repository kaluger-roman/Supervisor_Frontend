import React from "react"
import { useSESelector } from "Supervisor/redux/hooks"
import HoldIcon from "Supervisor/icons/hold.svg"
import MuteIcon from "Supervisor/icons/mute.svg"
import { WebRTCAgent } from "Supervisor/apps/WebRTC/WebRTCAgent"
import { CallAction } from "../../../types"
import {
    CallActionButton,
    CallActionButtonContainer,
    CallActionButtonIcon,
    CallActionButtonLabel,
    CallActionButtonsContainer
} from "../styled"
import { useDispatch } from "react-redux"
import { changeIsMuted } from "Supervisor/redux/reducers/webRTC"

const CallActButton: React.FC<CallAction> = ({ label, icon, onClick, active }) => (
    <CallActionButtonContainer>
        <CallActionButton isActive={active} onClick={onClick}>
            <CallActionButtonIcon icon={icon} />
        </CallActionButton>
        <CallActionButtonLabel>{label}</CallActionButtonLabel>
    </CallActionButtonContainer>
)

export const CallActionButtons: React.FC = () => {
    const dispatch = useDispatch()
    const { isMuted } = useSESelector((state) => state.webRTC)

    return (
        <CallActionButtonsContainer>
            <CallActButton
                icon={MuteIcon}
                name="mute"
                label="Mute"
                active={isMuted}
                onClick={() => {
                    dispatch(changeIsMuted(!isMuted))
                    WebRTCAgent.mute(!isMuted)
                }}
            />
            <CallActButton icon={HoldIcon} name="hold" label="Hold" onClick={() => {}} />
        </CallActionButtonsContainer>
    )
}
