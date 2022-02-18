import React from "react"
import { SubHeader } from "components/Headers"
import { BRAND_NAME } from "Supervisor/constants"
import { DRAGGABLE_CLASS } from "../constants"
import { HeaderWrapper } from "./styled"

export const Header: React.FC = () => {
    return (
        <HeaderWrapper className={DRAGGABLE_CLASS}>
            <SubHeader>{BRAND_NAME}</SubHeader>
        </HeaderWrapper>
    )
}
