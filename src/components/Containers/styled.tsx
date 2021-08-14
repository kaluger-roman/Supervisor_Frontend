import styled from "@emotion/styled"
import { COLORS } from "../../config/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { BackThemeImage } from "../common/styled"
import { FullSize } from "../styled"

export const ContainerBase = styled.div`
    padding: ${CSS_CONSTANTS.padding};
    border: ${CSS_CONSTANTS.borderWidth} solid ${COLORS.primaryMain};
    border-radius: ${CSS_CONSTANTS.borderRadius};
    z-index: 2;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BackThemeColor = styled(FullSize)`
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${COLORS.lightDark};
    opacity: 0.95;
    z-index: 1;
    border-radius: ${CSS_CONSTANTS.borderRadius};
`

export const StandardContainer: React.FC = (props) => (
    <BackThemeImage borderRadius={CSS_CONSTANTS.borderRadius}>
        <BackThemeColor />
        <ContainerBase>{props.children}</ContainerBase>
    </BackThemeImage>
)
