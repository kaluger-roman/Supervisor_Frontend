import { keyframes } from "@emotion/css"
import styled from "@emotion/styled"
import { CenteredDiv } from "components/styled"
import { COLORS } from "config/globalStyles/colors"
import { CSS_CONSTANTS } from "config/globalStyles/common"

export const CallInfoWrapper = styled(CenteredDiv)`
    position: absolute;
    top: 25px;
    left: 0;
    width: 100%;
    flex-direction: column;
    color: ${COLORS.fullDark};
    & > div {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    & > div:nth-child(1) {
        font-size: 18px;
    }
    & > div:nth-child(2) {
        font-size: 16px;
    }
    & > div:last-child {
        margin-top: 10px;
        font-size: 14px;
    }
`

const showHold = keyframes`
    0% {
        opacity: 0;
        transform: translateX(60px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }

`

const hideHold = keyframes`
    0% {
        transform: translateX(0);
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: translateX(60px);
    }
`

export const HoldNotice = styled(CenteredDiv)<{ shown?: boolean; animationOn?: boolean }>`
    animation: ${({ shown, animationOn }) =>
        animationOn ? (shown ? `${showHold} 0.5s forwards` : `${hideHold} 0.5s forwards`) : "none"};
    padding: 4px 10px;
    border-radius: 10px;
    background-color: ${COLORS.lightMain};
    box-shadow: ${CSS_CONSTANTS.shadowLight} ${CSS_CONSTANTS.shadowLight} ${CSS_CONSTANTS.shadowLight}
        ${COLORS.deepDark};
`
