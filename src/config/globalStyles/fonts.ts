import slab from "./../../assets/fonts/Slab.otf"
import voronov from "./../../assets/fonts/underdog.ttf"

export const MAIN_FONT_NAME = "Slab"
export const MAGIC_FONT_NAME = "Magic"

export const FONTS = `
@font-face {
    font-family: ${MAIN_FONT_NAME};
    src: url(${slab}) format("opentype");       
   }

@font-face {
    font-family: ${MAGIC_FONT_NAME};
    src: url(${voronov}) format("truetype");       
}
`
