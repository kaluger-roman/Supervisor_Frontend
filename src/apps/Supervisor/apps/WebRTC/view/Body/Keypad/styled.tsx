import styled from "@emotion/styled"
import { CenteredDiv } from "components/styled"
import { withOpacity, COLORS } from "config/globalStyles/colors"
import { CSS_CONSTANTS } from "config/globalStyles/common"

export const InputWrapper = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`

export const KeypadButtonsWrapper = styled(CenteredDiv)`
    flex-wrap: wrap;
    display: flex;
    gap: 20px;
    gap: 4px 20px;
    width: 100%;
    overflow: hidden;
    padding: 8px 26px 0 26px;
`

export const KeypadNumberButton = styled(CenteredDiv)`
    min-width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${withOpacity(COLORS.lightSecondary, 0.7)};
    color: ${COLORS.deepDark};
    box-shadow: ${CSS_CONSTANTS.shadowLight} ${CSS_CONSTANTS.shadowLight} ${CSS_CONSTANTS.shadowLight}
        ${COLORS.deepDark};
    font-size: 20px;
    &:hover {
        background: ${withOpacity(COLORS.deepLightSecondary, 0.7)};
    }
    &:active {
        background: ${COLORS.deepSecondary};
    }
`
