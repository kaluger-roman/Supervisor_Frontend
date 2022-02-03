import styled from "@emotion/styled"
import React from "react"
import { COLORS } from "../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { CenteredDiv, Control } from "../styled"
import CrossIcon from "../../assets/images/cross.svg"

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
    height: ${CSS_CONSTANTS.controlHeight};
    font-size: ${CSS_CONSTANTS.controlFontSize};
    min-width: ${CSS_CONSTANTS.buttonWidth};
    border-radius: ${CSS_CONSTANTS.borderRadius};
`

const CancelCircle = styled(CenteredDiv)`
    width: ${CSS_CONSTANTS.iconBigSize};
    height: ${CSS_CONSTANTS.iconBigSize};
    border-radius: 50%;
    background: ${COLORS.primaryDark};

    & > div {
        background: ${COLORS.primaryMain};
    }

    &:hover {
        background: ${COLORS.primaryMain};

        & > div {
            background: ${COLORS.primaryDark};
        }
    }
    &:active {
        background: ${COLORS.fullDark};
        & > div {
            background: ${COLORS.fullMain};
        }
    }
`

const CancelCrossInner = styled.div`
    width: ${CSS_CONSTANTS.iconSize};
    height: ${CSS_CONSTANTS.iconSize};
    mask-image: url(${CrossIcon});
    -webkit-mask-box-image: url(${CrossIcon});
`

export const CancelCross: React.FC = () => (
    <CancelCircle>
        <CancelCrossInner />
    </CancelCircle>
)

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
