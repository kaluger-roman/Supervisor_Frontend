import styled from "@emotion/styled"
import { CenteredDivStyle, FullScreenStyle } from "components/styled"
import { CSS_CONSTANTS } from "config/globalStyles/common"

export const InnerContainer = styled.div<{ height: number }>`
    height: ${({ height }) => height}px;
    width: 500px;
    padding: ${CSS_CONSTANTS.padding};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

export const ButtonsContainer = styled.div<{ width: number }>`
    display: flex;
    justify-content: space-between;
    padding: ${CSS_CONSTANTS.padding};
    width: ${({ width }) => width}px;
`

export const AuthContainer = styled.div`
    ${CenteredDivStyle}
    ${FullScreenStyle}
`
