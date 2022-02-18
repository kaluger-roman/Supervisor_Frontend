import styled from "@emotion/styled"
import { CenteredDiv } from "../../../../../../components/styled"
import { COLORS } from "../../../../../../config/globalStyles/colors"

export const HeaderWrapper = styled(CenteredDiv)`
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    width: 100%;
    background: ${COLORS.deepDark};
`
