import styled from "@emotion/styled"
import { COLORS } from "../config/colors"
import { MAIN_FONT_NAME } from "../config/globalStyles/fonts"
import NOISE_IMG from "./../assets/images/noise.jpg"

const BackThemeImage = styled.div`
  background-image: url(${NOISE_IMG});
  background-attachment: fixed;
  background-size: cover;
`

const BackThemeColor = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
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
`
export const AppContainer: React.FC = (props) => (
  <BackThemeImage>
    <BackThemeColor />
    <Container>{props.children}</Container>
  </BackThemeImage>
)
