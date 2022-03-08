import styled from "@emotion/styled"
import { COLORS } from "../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { CenteredDiv } from "../styled"
import { HeaderBaseProps } from "./types"

export const HeaderBase = styled(CenteredDiv)<{ fontSize: number; noTopMargin?: boolean }>`
    margin: ${CSS_CONSTANTS.margin} auto;
    color: ${COLORS.primaryMain};
    text-shadow: ${CSS_CONSTANTS.shadowBase} ${CSS_CONSTANTS.shadowBase} ${CSS_CONSTANTS.shadowBase} ${COLORS.deepDark};
    font-size: ${({ fontSize }) => fontSize}px;
    ${({ noTopMargin }) => noTopMargin && "margin-top: 0;"}
    text-align: center;
`

export const PageHeader: React.FC<HeaderBaseProps> = ({ children, ...props }) => (
    <HeaderBase {...props} fontSize={60}>
        {children}
    </HeaderBase>
)
export const SectionHeader: React.FC<HeaderBaseProps> = ({ children, ...props }) => (
    <HeaderBase {...props} fontSize={50}>
        {children}
    </HeaderBase>
)
export const LargeHeader: React.FC<HeaderBaseProps> = ({ children, ...props }) => (
    <HeaderBase {...props} fontSize={40}>
        {children}
    </HeaderBase>
)
export const Header: React.FC<HeaderBaseProps> = ({ children, ...props }) => (
    <HeaderBase {...props} fontSize={30}>
        {children}
    </HeaderBase>
)
export const SubHeader: React.FC<HeaderBaseProps> = ({ children, ...props }) => (
    <HeaderBase {...props} fontSize={20}>
        {children}
    </HeaderBase>
)
