import { COLORS } from "./colors"
import { MAIN_FONT_NAME } from "./fonts"

export const CSS_CONSTANTS = {
    borderRadius: "20px",
    borderWidth: "2px",
    thinBorderWidth: "1px",
    margin: "10px",
    padding: "10px",
    paddingMore: "14px",
    paddingLarge: "28px",
    betweenControls: "10px",
    controlFontSize: "16px",
    hintFontSize: "10px",
    standardFontSize: "14px",
    standardLetterSpacing: "0.5px",
    standardLineHeight: "16px",
    labelLineHeight: "8px",
    controlHeight: "36px",
    controlWidth: "152px",
    buttonWidth: "116px",
    opacityOne: "0.95",
    shortAnimationDuraion: "0.3s",
    iconSize: "16px",
    iconBigSize: "36px",
    smallMargin: "2px",
    standardIndent: "10px",
    zIndexImportant: "999",
    shadowBase: "4px",
    shadowLight: "1px",
    navBarHeight: "44px"
}

export const COMMON = `
    body, html {
        margin: 0;
        padding: 0;
    }

    * {
      box-sizing: border-box;
      font-family: ${MAIN_FONT_NAME};
    }

    input:focus{
        outline: none;
    }

    .ReactTooltip{
        border-radius: ${CSS_CONSTANTS.borderRadius}!important;
        backgtound-color: ${COLORS.deepDark}!important;
        color: ${COLORS.deepLightSecondary}!important;
        opacity: 1!important;
        max-width: 250px;
        text-align: center
    }
`

export const convertCssSecondsToIntMs = (value: string) => (parseFloat(value) || 0) * 1000
