import styled from "@emotion/styled"
import { COLORS } from "../../config/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { CenteredDiv } from "../styled"

const ButtonBase = styled(CenteredDiv)<{ disabled?: boolean }>`
  padding: 8px;
  height: 20px;
  font-size: 16px;
  width: min-content;
  min-width: 100px;
  border-radius: ${CSS_CONSTANTS.borderRadius};
  cursor: pointer;
  user-select: none;
`

export const StandardButton = styled(ButtonBase)<{ disabled?: boolean }>`
  border: ${CSS_CONSTANTS.borderWidth} solid ${COLORS.deepMain};
  color: ${COLORS.deepLightSecondary};
  background: ${({ disabled }) => (disabled ? COLORS.fullMain : COLORS.primaryMain)};
  &:hover {
    background: ${COLORS.lightMain};
  }
  &:active {
    background: ${COLORS.deepMain};
  }
`

export const RejectButton = styled(ButtonBase)<{ disabled?: boolean }>`
  border: ${CSS_CONSTANTS.borderWidth} solid ${COLORS.deepDark};
  color: ${COLORS.deepLightSecondary};
  background: ${({ disabled }) => (disabled ? COLORS.fullDark : COLORS.deepLightDark)};
  &:hover {
    background: ${COLORS.lightDark};
  }
  &:active {
    background: ${COLORS.deepDark};
  }
`
