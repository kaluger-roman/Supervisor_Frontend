import styled from "@emotion/styled"
import { CenteredDiv } from "components/styled"
import { COLORS } from "config/globalStyles/colors"

export const FooterWrapper = styled(CenteredDiv)`
    position: absolute;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
    background: ${COLORS.deepDark};
`
