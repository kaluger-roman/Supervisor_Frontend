import styled from "@emotion/styled"
import ArrowUpIcon from "assets/images/arrow-up.svg"
import { LENHTCH_COEFS } from "components/Inputs/constants"
import { COLORS } from "../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { InputWidth } from "./types"

const ActiveSelector = (isError?: boolean) =>
    !isError &&
    `
& > div:nth-child(1) {
    background: ${COLORS.primaryMain};
}
& > div:nth-child(2) > div:first-child {
    color: ${COLORS.primaryMain};
}
input {
    border-color: ${COLORS.primaryMain};
}
`

export const SelectorContainer = styled.div<{ isOpened: boolean; inputWidth?: InputWidth; isError?: boolean }>`
    position: relative;
    cursor: pointer;
    user-select: none;
    width: ${({ inputWidth }) => inputWidth && parseInt(CSS_CONSTANTS.controlWidth) * LENHTCH_COEFS[inputWidth]}px;

    & > div:nth-child(1) {
        background: ${COLORS.deepDark};
    }

    ${({ isOpened, isError }) => isOpened && ActiveSelector(isError)}

    &:hover {
        ${({ isError }) => ActiveSelector(isError)}
    }
`

export const SelectorArrow = styled.div<{ isOpened: boolean }>`
    width: 12px;
    height: 12px;
    mask-size: 12px;
    mask-image: url(${ArrowUpIcon});
    transform: rotate(${({ isOpened }) => (isOpened ? 0 : 180)}deg);
    mask-repeat: no-repeat;
    position: absolute;
    right: 15px;
    top: 25px;
`

export const OptionsContainer = styled.div<{ isOpened: boolean; inputWidth?: InputWidth }>`
    box-shadow: ${CSS_CONSTANTS.shadowLight} ${CSS_CONSTANTS.shadowLight} ${CSS_CONSTANTS.shadowLight}
        ${COLORS.primaryDark};
    display: ${({ isOpened }) => (isOpened ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    border-radius: ${CSS_CONSTANTS.borderRadius};
    overflow: hidden scroll;
    width: ${({ inputWidth }) => parseInt(CSS_CONSTANTS.controlWidth) * (inputWidth === InputWidth.long ? 1.5 : 1)}px;
    top: 48px;
    z-index: 1;
`

export const ListOption = styled.div<{ isSelected: boolean }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: ${CSS_CONSTANTS.padding};
    background-color: ${({ isSelected }) => (isSelected ? COLORS.lightDark : COLORS.deepLightDark)};
    height: ${CSS_CONSTANTS.controlHeight};

    &:hover {
        background-color: ${COLORS.lightDark};
    }
`
