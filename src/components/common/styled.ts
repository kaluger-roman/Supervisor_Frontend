import styled from "@emotion/styled"
import NOISE_IMG from "./../../assets/images/noise.jpg"

export const BackThemeImage = styled.div<{ borderRadius?: string }>`
  background-image: url(${NOISE_IMG});
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 0)};
`
