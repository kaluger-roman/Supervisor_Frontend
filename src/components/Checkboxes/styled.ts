import styled from "@emotion/styled"
import { COLORS } from "../../config/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { CenteredDiv } from "../styled"

export const CheckboxContainer = styled.div`
  margin: ${CSS_CONSTANTS.margin};
`

export const OptionContainer = styled.div`
  margin: ${CSS_CONSTANTS.margin};
  display: flex;
  align-items: center;
`

export const OptionLabel = styled.div`
  font-size: 16px;
  color: ${COLORS.deepLightSecondary};
  margin-left: ${CSS_CONSTANTS.margin};
  line-height: 16px;
`

export const CheckboxCircleOuter = styled(CenteredDiv)`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: ${COLORS.deepLightDark};
  border: 1px solid ${COLORS.fullDark};
  box-sizing: border-box;
  transform: translateY(-1px);
  &:hover {
    background-color: ${COLORS.lightDark};
  }
  &:active {
    background: ${COLORS.deepDark};
  }
`
export const CheckboxCircleInner = styled.div`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: ${COLORS.primaryDark};
`
