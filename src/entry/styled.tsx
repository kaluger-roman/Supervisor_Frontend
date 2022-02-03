import styled from "@emotion/styled"
import { BackThemeImage, FullScreenStyle } from "../components/styled"
import { COLORS } from "../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../config/globalStyles/common"
import { MAIN_FONT_NAME } from "../config/globalStyles/fonts"

const BackThemeColor = styled.div`
    ${FullScreenStyle}
    background-color: ${COLORS.primaryDark};
    opacity: 0.95;
    z-index: 1;
`

const Container = styled.div`
    min-height: 100vh;
    min-width: 100vw;
    font-family: ${MAIN_FONT_NAME};
    font-weight: 800;
    z-index: 2;
    position: relative;
    padding: ${CSS_CONSTANTS.padding};
`
export const AppContainer: React.FC = (props) => (
    <BackThemeImage>
        <BackThemeColor />
        <Container>{props.children}</Container>
    </BackThemeImage>
)
