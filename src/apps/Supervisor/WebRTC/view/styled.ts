import styled from "@emotion/styled"
import { COLORS } from "../../../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../../../config/globalStyles/common"

export const WebRTCWrapper = styled.div`
    width: 260px;
    height: 450px;
    position: relative;
    background: ${COLORS.primaryDark};
    background: linear-gradient(135deg, ${COLORS.primarySecondary} 0%, ${COLORS.primaryDark} 100%);
    box-shadow: ${CSS_CONSTANTS.shadowBase} ${CSS_CONSTANTS.shadowBase} ${CSS_CONSTANTS.shadowBase} ${COLORS.deepDark};
    border-radius: ${CSS_CONSTANTS.borderRadius};
    overflow: hidden;
    cursor: pointer;
`
