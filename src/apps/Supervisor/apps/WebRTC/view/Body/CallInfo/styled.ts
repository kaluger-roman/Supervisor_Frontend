import styled from "@emotion/styled"
import { CenteredDiv } from "../../../../../../../components/styled"
import { COLORS } from "../../../../../../../config/globalStyles/colors"

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
