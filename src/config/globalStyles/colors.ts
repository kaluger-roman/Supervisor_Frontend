export enum COLORS {
    primaryDark = "#343a40",
    lightDark = "#637282",
    deepLightDark = "#7b96b3",
    deepDark = "#292D30",
    fullDark = "#111D2A",

    primaryMain = "#ff7b0c",
    lightMain = "#FF9640",
    deepLightMain = "#FFB273",
    deepMain = "#BF7130",
    fullMain = "#A64B00",

    primarySecondary = "#cccc5c",
    lightSecondary = "#FCFC72",
    deepLightSecondary = "#FDFDBE",
    deepSecondary = "#C9C95B",
    fullSecondary = "#7D7D5E",

    error = "#a30000",
    error1 = "#dd1d1d",
    error2 = "#b72d2d",

    success = "#03d800",
    success1 = "#3b9a39",
    success2 = "#1b7c19"
}

export const hexToRgba = (hex: COLORS, alpha: number): string => {
    const bigint = parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `rgba(${r},${g},${b},${alpha})`
}

export const withOpacity = (colorHex: string, alpha: number): string | never => {
    let result: string | number = ""
    let component = [] as string[]

    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(colorHex)) {
        component = colorHex.substring(1).split("")

        if (component.length === 3) {
            component = [component[0], component[0], component[1], component[1], component[2], component[2]]
        }
        result = `0x${component.join("")}`

        /* eslint-disable no-bitwise */
        return `rgba(${[
            ((result as unknown as number) >> 16) & 255,
            ((result as unknown as number) >> 8) & 255,
            (result as unknown as number) & 255
        ].join(",")}, ${alpha})`
        /* eslint-enable no-bitwise */
    }
    throw new Error("Bad Hex")
}
