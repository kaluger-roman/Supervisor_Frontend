import React from "react"
import { IconCircle } from "../../../../../components/Buttons"
import { FooterWrapper } from "./styled"
import CallIcon from "../../../icons/call.svg"

export const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            <IconCircle icon={CallIcon} />
        </FooterWrapper>
    )
}
