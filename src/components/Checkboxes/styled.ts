import styled from "@emotion/styled"
import { COLORS } from "../../config/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { Control } from "../styled"

const CHECKBOX_SIZE = "20px"
const CHECK_SIGN_SIZE = "10px"
const CHECKBOX_BACKGROUND_ACTIVE = `{ background: ${COLORS.deepDark};}`
const CHECKBOX_BACKGROUND_HOVER = `{ background: ${COLORS.lightDark};}`

export const OptionLabel = styled.div`
  font-size: ${CSS_CONSTANTS.controlFontSize};
  color: ${COLORS.deepLightSecondary};
  margin-left: ${CSS_CONSTANTS.margin};
`

export const CheckboxCircleInner = styled.div`
  border-radius: 50%;
  width: ${CHECK_SIGN_SIZE};
  height: ${CHECK_SIGN_SIZE};
  background-color: ${COLORS.primaryDark};
`
export const CheckboxCircleOuter = styled(Control)`
  border-radius: 50%;
  width: ${CHECKBOX_SIZE};
  height: ${CHECKBOX_SIZE};
  background-color: ${COLORS.deepLightDark};
  border: 1px solid ${COLORS.fullDark};
`

export const CheckboxBox = styled(Control)`
  border-radius: 6px;
  width: ${CHECKBOX_SIZE};
  height: ${CHECKBOX_SIZE};
  background-color: ${COLORS.deepLightDark};
  border: 1px solid ${COLORS.fullDark};
  font-size: ${CHECK_SIGN_SIZE};
  color: ${COLORS.primaryDark};
`

export const OptionContainer = styled(Control)`
  margin: ${CSS_CONSTANTS.margin};
  width: max-content;
  cursor: pointer;
  user-select: none;

  &:hover {
    ${CheckboxCircleOuter} ${CHECKBOX_BACKGROUND_HOVER}
    ${CheckboxBox} ${CHECKBOX_BACKGROUND_HOVER}
    ${OptionLabel} {
      color: ${COLORS.lightSecondary};
    }
  }
  &:active {
    ${CheckboxCircleOuter} ${CHECKBOX_BACKGROUND_ACTIVE}
    ${CheckboxBox} ${CHECKBOX_BACKGROUND_ACTIVE}
    ${OptionLabel} {
      color: ${COLORS.deepSecondary};
    }
  }
`
export const CheckboxContainer = styled.div``
