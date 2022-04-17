import styled from "@emotion/styled"
import { CSS_CONSTANTS } from "config/globalStyles/common"
import NOISE_IMG from "./../assets/images/noise.jpg"

export const CenteredDivStyle = `
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ControlStyle = `
    width: max-content;
    cursor: pointer;
    user-select: none;
`

export const FullSizeStyle = `
    width: 100%;
    height: 100%;
`

export const FullScreenStyle = `
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
`

export const CenteredDiv = styled.div`
    ${CenteredDivStyle}
`

export const Control = styled(CenteredDiv)`
    ${ControlStyle}
`

export const FullSize = styled.div`
    ${FullSizeStyle}
`

export const FullSizeCentered = styled(CenteredDiv)`
    ${FullSizeStyle}
`

export const NormalizedInput = styled.input`
    &:focus {
        outline: none;
    }
`

export const BackThemeImage = styled.div<{
    borderRadius?: string
    width?: string
    withMargin?: boolean
}>`
    background-image: url(${NOISE_IMG});
    background-attachment: fixed;
    background-size: cover;
    position: relative;
    border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : 0)};
    width: ${({ width }) => width};
    margin: ${({ withMargin }) => withMargin && CSS_CONSTANTS.margin};
`
