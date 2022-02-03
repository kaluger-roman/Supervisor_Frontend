export const COMMON = `
    body, html {
        margin: 0;
        padding: 0;
    }

    * {
      box-sizing: border-box;
    }
`

export const CSS_CONSTANTS = {
    borderRadius: "20px",
    borderWidth: "2px",
    thinBorderWidth: "1px",
    margin: "10px",
    padding: "10px",
    paddingMore: "14px",
    betweenControls: "10px",
    controlFontSize: "16px",
    hintFontSize: "10px",
    standardFontSize: "14px",
    standardLetterSpacing: "0.5px",
    standardLineHeight: "16px",
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
    shadowBase: "4px"
}

export const convertCssSecondsToIntMs = (value: string) => (parseFloat(value) || 0) * 1000
