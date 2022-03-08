import styled from "@emotion/styled"
import { COLORS } from "../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { NormalizedInput } from "../styled"
import { LENHTCH_COEFS } from "./constants"
import { InputWidth } from "./types"

export const InputContainer = styled.div<{ inputWidth?: InputWidth }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: ${({ inputWidth }) => inputWidth && parseInt(CSS_CONSTANTS.controlWidth) * LENHTCH_COEFS[inputWidth]}px;
`
export const InputLabel = styled.div<{ isError?: boolean; isFocused?: boolean; hasValue?: boolean }>`
    font-size: ${CSS_CONSTANTS.hintFontSize};
    padding-left: ${CSS_CONSTANTS.paddingMore};
    color: ${({ isError, isFocused }) => (isError ? COLORS.error : isFocused ? COLORS.primaryMain : COLORS.deepDark)};
    visibility: ${({ isFocused, hasValue }) => (isFocused || hasValue ? "visible" : "hidden")};
    height: ${CSS_CONSTANTS.hintFontSize};
    margin-bottom: ${CSS_CONSTANTS.smallMargin};
`
export const InputBody = styled(NormalizedInput)<{
    isError?: boolean
    isFocused?: boolean
    notEditable?: boolean
    centered?: boolean
}>`
    border: ${CSS_CONSTANTS.borderWidth} solid ${COLORS.lightDark};
    border-radius: ${CSS_CONSTANTS.borderRadius};
    height: ${CSS_CONSTANTS.controlHeight};
    background: ${COLORS.deepLightDark};
    border-color: ${({ isError, isFocused }) =>
        isError ? COLORS.error : isFocused ? COLORS.primaryMain : COLORS.deepDark};
    text-overflow: ellipsis;
    padding-left: ${parseInt(CSS_CONSTANTS.paddingMore) - parseInt(CSS_CONSTANTS.borderWidth)}px;
    padding-right: ${CSS_CONSTANTS.paddingLarge};
    color: ${COLORS.deepDark};
    font-size: ${CSS_CONSTANTS.controlFontSize};
    width: 100%;
    ${({ centered }) => centered && "text-align: center;"}
    ${({ isFocused }) => isFocused && "&::placeholder { color: transparent; }"};
    ${({ notEditable }) => notEditable && "pointer-events: none;"}
`
export const InputError = styled.div<{ isError?: boolean }>`
    font-size: ${CSS_CONSTANTS.hintFontSize};
    color: ${COLORS.error};
    padding-left: ${CSS_CONSTANTS.paddingMore};
    height: ${CSS_CONSTANTS.hintFontSize};
    margin-top: ${CSS_CONSTANTS.smallMargin};
    width: min-content;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: ${CSS_CONSTANTS.labelLineHeight};
    visibility: ${({ isError }) => (isError ? "visible" : "hidden")};
`
