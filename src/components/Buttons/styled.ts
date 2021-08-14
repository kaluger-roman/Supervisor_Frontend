import styled from "@emotion/styled"
import { COLORS } from "../../config/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { Control } from "../styled"

const useButton = (
  disabled: boolean,
  color: COLORS,
  background: COLORS,
  backgroundDisable: COLORS,
  hover: COLORS,
  active: COLORS,
  border: COLORS
) => `
  border: ${CSS_CONSTANTS.borderWidth} solid ${border};
  color: ${color};
  background: ${disabled ? backgroundDisable : background};
  &:hover {
    background: ${hover};
  }
  &:active {
    background: ${active};
  }`

const ButtonBase = styled(Control)<{ disabled?: boolean }>`
  height: 36px;
  font-size: ${CSS_CONSTANTS.controlFontSize};
  min-width: 116px;
  border-radius: ${CSS_CONSTANTS.borderRadius};
`

export const StandardButton = styled(ButtonBase)<{ disabled?: boolean }>`
  ${({ disabled }) =>
    useButton(
      !!disabled,
      COLORS.deepLightSecondary,
      COLORS.primaryMain,
      COLORS.fullMain,
      COLORS.lightMain,
      COLORS.deepMain,
      COLORS.deepDark
    )}
`

export const RejectButton = styled(ButtonBase)<{ disabled?: boolean }>`
  ${({ disabled }) =>
    useButton(
      !!disabled,
      COLORS.deepLightSecondary,
      COLORS.deepLightDark,
      COLORS.fullDark,
      COLORS.lightDark,
      COLORS.deepDark,
      COLORS.deepDark
    )}
`
