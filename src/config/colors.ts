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
  fullSecondary = "#7D7D5E"
}

export const hexToRgba = (hex: COLORS, alpha: number): string => {
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `rgba(${r},${g},${b},${alpha})`
}
