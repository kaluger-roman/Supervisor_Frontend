import React from "react"
import { FooterWrapper } from "./styled"
import CallIcon from "Supervisor/icons/call.svg"
import { IconCircle } from "components/Buttons"

export const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            <IconCircle icon={CallIcon} />
        </FooterWrapper>
    )
}
