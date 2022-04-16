import styled from "@emotion/styled"
import { COLORS, withOpacity } from "config/globalStyles/colors"
import { CSS_CONSTANTS } from "config/globalStyles/common"
import { MAGIC_FONT_NAME } from "config/globalStyles/fonts"
import ExitSVG from "assets/images/exit.svg"
import { CenteredDiv } from "components/styled"

export const NavBarContainer = styled.div`
    width: 100vw;
    height: ${CSS_CONSTANTS.navBarHeight};
    display: flex;
    justify-content: space-between;
    background: ${withOpacity(COLORS.deepDark, 0.7)};
    z-index: 10;
`

export const NavBarLogo = styled(CenteredDiv)`
    height: 100%;
    font-size: ${parseInt(CSS_CONSTANTS.controlHeight) - 6}px;
    font-weight: 900;
    letter-spacing: 1px;
    font-family: ${MAGIC_FONT_NAME};
    color: ${COLORS.primaryMain};
    cursor: pointer;
    padding: 0 ${CSS_CONSTANTS.paddingLarge};
    border-right: 1px solid ${COLORS.lightDark};
    background: ${withOpacity(COLORS.lightDark, 0.7)};
    width: 250px;
`
export const NavBarMain = styled(CenteredDiv)`
    flex-grow: 1;
`
export const NavBarSide = styled.div`
    position: relative;
    height: 100%;
    padding: 0 ${CSS_CONSTANTS.paddingLarge};
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 10;
`

export const ExitIcon = styled.div`
    height: ${parseInt(CSS_CONSTANTS.controlHeight) * 0.8}px;
    width: ${parseInt(CSS_CONSTANTS.controlHeight) * 0.8}px;
    mask: url(${ExitSVG});
    background: ${COLORS.primaryMain};
    mask-size: contain;
    mask-repeat: no-repeat;
    cursor: pointer;

    &:hover {
        background: ${COLORS.primarySecondary};
    }
`

export const NavGroupLabel = styled(CenteredDiv)`
    color: ${COLORS.primaryMain};
    height: 100%;
    font-size: ${parseInt(CSS_CONSTANTS.controlHeight) - 10}px;
    text-align: center;
`

export const NavGroupItem = styled(CenteredDiv)`
    height: 44px;
    width: 100%;
    color: ${COLORS.lightDark};

    &:hover {
        background: ${withOpacity(COLORS.lightDark, 0.5)};
    }
`

const OptionsContainer = `
    display: none;
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
    background: ${COLORS.deepDark};
    border-radius: 0 0 ${CSS_CONSTANTS.borderRadius} ${CSS_CONSTANTS.borderRadius};
    overflow: hidden;
`

const SelectorContainer = `
    position: relative;
    height: 100%;
    align-items: center;
    cursor: pointer;
    width: 20%;
    min-width: fit-content;
    padding: 0 ${CSS_CONSTANTS.padding};
    z-index: 10;

    &:hover {
        background: ${withOpacity(COLORS.lightDark, 0.7)};

        & > div:last-child {
            display: block;
        }
    }
`

export const NavGroupItems = styled.div`
    ${OptionsContainer}
    text-align: center;
`

export const NavGroup = styled(CenteredDiv)`
    ${SelectorContainer}
`

export const UserStatusOptions = styled.div`
    ${OptionsContainer}
`

export const UserStatusContainer = styled(CenteredDiv)`
    ${SelectorContainer}
    padding: 0 ${CSS_CONSTANTS.padding};
    margin-right: ${CSS_CONSTANTS.paddingLarge};
`

export const StatusCircle = styled.div<{ color: string }>`
    border-radius: 50%;
    background: ${({ color }) => color};
    width: 10px;
    height: 10px;
`

export const UserNameLabel = styled.div`
    font-size: ${parseInt(CSS_CONSTANTS.controlHeight) - 18}px;
    color: ${COLORS.primarySecondary};
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 0 0 ${CSS_CONSTANTS.padding};
`

export const StatusOptionLabel = styled.div`
    padding: 0 ${CSS_CONSTANTS.padding};
    font-size: 16px;
`

export const StatusOption = styled(CenteredDiv)<{ isSelected?: boolean }>`
    height: 32px;
    width: 100%;
    color: ${({ isSelected }) => (isSelected ? COLORS.lightSecondary : COLORS.fullSecondary)};
    font-size: 18px;
    justify-content: flex-start;
    padding: 0 ${CSS_CONSTANTS.padding};
    background: ${({ isSelected }) => isSelected && withOpacity(COLORS.lightSecondary, 0.3)}!important;
    user-select: none;
    &:hover {
        background: ${withOpacity(COLORS.lightDark, 0.5)};
    }
`
