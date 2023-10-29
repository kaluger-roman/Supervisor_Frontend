import styled from "@emotion/styled"
import ReactTooltip from "react-tooltip"
import { COLORS } from "../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { ThemeVariant } from "../types"

export const StandardText = styled.div<{
    colorType?: ThemeVariant
    centered?: boolean
    oneLine?: boolean
    noIndent?: boolean
}>`
    font-size: ${CSS_CONSTANTS.standardFontSize};
    letter-spacing: ${CSS_CONSTANTS.standardLetterSpacing};
    line-height: ${CSS_CONSTANTS.standardLineHeight};
    color: ${({ colorType }) => (colorType === ThemeVariant.light ? COLORS.deepLightDark : COLORS.primaryDark)};
    text-indent: ${({ noIndent }) => (noIndent ? "" : CSS_CONSTANTS.standardIndent)};
    text-align: ${({ centered }) => (centered ? "center" : "left")};
    ${({ oneLine }) => oneLine && "text-overflow:ellipsis; overflow: hidden; white-space: nowrap;"}
`

export const LargeText = styled(StandardText)`
    font-size: ${CSS_CONSTANTS.largeFontSize};
    line-height: ${CSS_CONSTANTS.largeLineHeight};
`

export const Link = styled.div<{ colorType?: ThemeVariant; centered?: boolean }>`
    font-size: ${CSS_CONSTANTS.standardFontSize};
    letter-spacing: ${CSS_CONSTANTS.standardLetterSpacing};
    line-height: ${CSS_CONSTANTS.standardLineHeight};
    color: ${COLORS.primaryDark};
    text-indent: ${CSS_CONSTANTS.standardIndent};
    text-align: ${({ centered }) => (centered ? "center" : "left")};
    cursor: pointer;
    user-select: none;

    &:hover {
        color: ${COLORS.deepMain};
        text-decoration: underline;
    }

    &:active {
        color: ${COLORS.lightMain};
    }
`

export const Tooltip: React.FC = () => (
    <ReactTooltip delayShow={300} className="ReactTooltip" place="bottom" id="tooltip" />
)
