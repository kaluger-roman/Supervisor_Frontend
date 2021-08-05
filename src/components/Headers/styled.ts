import styled from "@emotion/styled"
import { COLORS } from "../../config/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"

export const ButtonBase = styled(CenteredDiv)<{ disabled?: boolean }>`
  padding: 8px;
  height: 20px;
  font-size: 16px;
  width: min-content;
  min-width: 100px;
  border-radius: ${CSS_CONSTANTS.borderRadius};
  cursor: pointer;
  user-select: none;
`
