import React from "react"
import { CallAction } from "../../../types"
import { CallActions } from "../constants"
import {
    CallActionButton,
    CallActionButtonContainer,
    CallActionButtonIcon,
    CallActionButtonLabel,
    CallActionButtonsContainer
} from "../styled"

const CallActButton: React.FC<{ action: CallAction }> = ({ action }) => (
    <CallActionButtonContainer>
        <CallActionButton>
            <CallActionButtonIcon icon={action.icon} />
        </CallActionButton>
        <CallActionButtonLabel>{action.label}</CallActionButtonLabel>
    </CallActionButtonContainer>
)

export const CallActionButtons: React.FC = () => {
    return (
        <CallActionButtonsContainer>
            {CallActions.map((action) => (
                <CallActButton key={action.name} action={action} />
            ))}
        </CallActionButtonsContainer>
    )
}
