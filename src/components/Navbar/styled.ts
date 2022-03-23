import styled from "@emotion/styled"
import { COLORS, withOpacity } from "config/globalStyles/colors"
import { CSS_CONSTANTS } from "config/globalStyles/common"
import { MAGIC_FONT_NAME } from "config/globalStyles/fonts"
import ExitSVG from "assets/images/exit.svg"
import { CenteredDiv } from "components/styled"

export const NavBarContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 44px;
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
    width: 250px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

export const NavGroup = styled(CenteredDiv)`
    position: relative;
    height: 100%;
    align-items: end;
    cursor: pointer;
    width: 20%;
    min-width: fit-content;
    padding: 0 ${CSS_CONSTANTS.padding};

    &:hover {
        background: ${withOpacity(COLORS.lightDark, 0.7)};
    }
`

export const NavGroupItem = styled(CenteredDiv)`
    height: 44px;
    width: 100%;
    color: ${COLORS.lightDark};

    &:hover {
        background: ${withOpacity(COLORS.lightDark, 0.5)};
    }
`

export const NavGroupItems = styled.div<{ isShown?: boolean }>`
    display: ${({ isShown }) => (isShown ? "block" : "none")};
    width: 100%;
    position: absolute;
    left: 0;
    top: 100%;
    background: ${withOpacity(COLORS.deepDark, 0.7)};
    border-radius: 0 0 ${CSS_CONSTANTS.borderRadius} ${CSS_CONSTANTS.borderRadius};
    overflow: hidden;
    text-align: center;
`
