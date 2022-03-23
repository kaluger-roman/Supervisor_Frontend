import styled from "@emotion/styled"
import { COLORS } from "config/globalStyles/colors"
import { CSS_CONSTANTS } from "config/globalStyles/common"

export const WEB_RTC_HEIGHT = 450

export const WebRTCWrapper = styled.div`
    width: 260px;
    height: ${WEB_RTC_HEIGHT}px;
    position: relative;
    background: ${COLORS.primaryDark};
    background: linear-gradient(135deg, ${COLORS.primarySecondary} 0%, ${COLORS.primaryDark} 100%);
    box-shadow: ${CSS_CONSTANTS.shadowBase} ${CSS_CONSTANTS.shadowBase} ${CSS_CONSTANTS.shadowBase} ${COLORS.deepDark};
    border-radius: ${CSS_CONSTANTS.borderRadius};
    overflow: hidden;
    cursor: pointer;
    z-index: 12;
`
