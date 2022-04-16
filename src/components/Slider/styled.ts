import { css } from "@emotion/css"
import styled from "@emotion/styled"
import { LENHTCH_COEFS } from "components/Inputs/constants"
import { InputWidth } from "components/Inputs/types"
import { COLORS } from "config/globalStyles/colors"
import { CSS_CONSTANTS } from "config/globalStyles/common"

export const Thumb = css`
    height: 14px;
    width: 14px;
    background: ${COLORS.lightMain};
    border-radius: 50%;
    top: -4px;
    box-shadow: 1px 1px 1px ${COLORS.deepDark};

    &:active,
    &:focus {
        outline: none;
    }
`

export const Track = css`
    height: 6px;
    background: ${COLORS.deepSecondary};
    border-radius: 5px;
    box-shadow: 1px 1px 1px ${COLORS.deepDark};
`

export const SliderValuesLabel = styled.div`
    display: flex;
    justify-content: center;
    font-size: 14px;
    color: ${COLORS.primarySecondary};
    margin-bottom: 8px;
`

export const SliderLabelsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 2px;
    margin-top: 12px;
`

export const SliderContainer = styled.div<{ inputWidth?: InputWidth }>`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: ${({ inputWidth }) => inputWidth && parseInt(CSS_CONSTANTS.controlWidth) * LENHTCH_COEFS[inputWidth]}px;

    .slider {
        min-width: 100%;
    }
`

export const SliderThrasholdLabel = styled.div`
    font-size: 12px;
    color: ${COLORS.deepSecondary};
`

export const SelectedRange = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4px;
`
