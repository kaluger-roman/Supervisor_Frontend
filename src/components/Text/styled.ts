import styled from "@emotion/styled"
import { COLORS } from "../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { ThemeVariant } from "../types"

export const StandardText = styled.div<{ colorType?: ThemeVariant; centered?: boolean }>`
    font-size: ${CSS_CONSTANTS.standardFontSize};
    letter-spacing: ${CSS_CONSTANTS.standardLetterSpacing};
    line-height: ${CSS_CONSTANTS.standardLineHeight};
    color: ${({ colorType }) => (colorType === ThemeVariant.light ? COLORS.deepLightDark : COLORS.primaryDark)};
    text-indent: ${CSS_CONSTANTS.standardIndent};
    text-align: ${({ centered }) => (centered ? "center" : "left")};
`
