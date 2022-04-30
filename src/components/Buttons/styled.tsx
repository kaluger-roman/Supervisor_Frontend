import styled, { StyledComponent } from "@emotion/styled"
import React from "react"
import { COLORS } from "../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { CenteredDiv, Control } from "../styled"
import { ButtonProps, IconProps } from "./types"

const useButton = (
    disabled: boolean,
    color: COLORS,
    background: COLORS,
    backgroundDisable: COLORS,
    hover: COLORS,
    active: COLORS,
    border: COLORS,
    width?: number
) => `
  width: ${width ? `${width}px` : "auto"};
  border: ${CSS_CONSTANTS.borderWidth} solid ${border};
  color: ${color};
  background: ${disabled ? backgroundDisable : background};
  cursor: ${disabled ? "not-allowed" : "pointer"};
  &:hover {
    background: ${disabled ? backgroundDisable : hover};
  }
  &:active {
    background: ${disabled ? backgroundDisable : active};
  }`

const ButtonBase = styled(Control)<{ disabled?: boolean }>`
    height: ${CSS_CONSTANTS.controlHeight};
    font-size: ${CSS_CONSTANTS.controlFontSize};
    min-width: ${CSS_CONSTANTS.buttonWidth};
    border-radius: ${CSS_CONSTANTS.borderRadius};
    padding: ${CSS_CONSTANTS.padding};
`

const IconCircleOuter = styled(CenteredDiv)<{ scale?: number }>`
    width: ${CSS_CONSTANTS.iconBigSize};
    height: ${CSS_CONSTANTS.iconBigSize};
    border-radius: 50%;
    background: ${COLORS.primaryDark};
    ${({ scale }) => `scale: ${scale};`}
    cursor: pointer;

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

const IconCircleInner = styled.div<IconProps>`
    width: ${CSS_CONSTANTS.iconSize};
    height: ${CSS_CONSTANTS.iconSize};
    ${({ scale }) => `scale: ${scale};`}
    mask-image: ${({ icon }) => `url(${icon})`};
    -webkit-mask-box-image: ${({ icon }) => `url(${icon})`};
`

export const MaskIcon = styled.div<IconProps>`
    width: ${CSS_CONSTANTS.iconSize};
    height: ${CSS_CONSTANTS.iconSize};
    mask-image: ${({ icon }) => `url(${icon})`};
    -webkit-mask-box-image: ${({ icon }) => `url(${icon})`};
    background: ${COLORS.primaryDark};
    mask-size: ${CSS_CONSTANTS.iconSize};

    &:hover {
        background: ${COLORS.lightMain};
    }
    &:active {
        background: ${COLORS.fullMain};
    }
`

export const IconCircle: React.FC<IconProps> = ({ icon, scale }) => (
    <IconCircleOuter scale={scale}>
        <IconCircleInner icon={icon} />
    </IconCircleOuter>
)

const ButtonHoc = (Component: StyledComponent<ButtonProps>) => (props: ButtonProps) =>
    (
        <Component {...props} onClick={props.disabled ? undefined : props.onClick}>
            {props.children}
        </Component>
    )

export const StandardButton = ButtonHoc(styled(ButtonBase)<ButtonProps>`
    ${({ disabled, width }) =>
        useButton(
            !!disabled,
            COLORS.deepLightSecondary,
            COLORS.primaryMain,
            COLORS.fullMain,
            COLORS.lightMain,
            COLORS.deepMain,
            COLORS.deepDark,
            width
        )}
`)

export const RejectButton = ButtonHoc(styled(ButtonBase)<ButtonProps>`
    ${({ disabled, width }) =>
        useButton(
            !!disabled,
            COLORS.deepLightSecondary,
            COLORS.deepLightDark,
            COLORS.fullDark,
            COLORS.lightDark,
            COLORS.deepDark,
            COLORS.deepDark,
            width
        )}
`)
