import styled from "@emotion/styled"
import { CenteredDiv } from "components/styled"
import { COLORS } from "config/globalStyles/colors"

export const CIDWrapper = styled(CenteredDiv)`
    position: absolute;
    bottom: 50px;
    line-height: 16px;
    width: 120px;
    left: calc(50% - 60px);
    text-align: center;
    color: ${COLORS.primaryMain};
    background: ${COLORS.deepDark};
    font-size: 10px;
    border-radius: 8px 8px 0 0;
`
