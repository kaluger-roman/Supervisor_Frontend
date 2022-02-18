import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { CenteredDiv } from "../../../../../../components/styled"
import { COLORS } from "../../../../../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../../../../../config/globalStyles/common"

export const CallActionButtonsContainer = styled(CenteredDiv)`
    flex-wrap: wrap;
    display: flex;
    gap: 4px 20px;
    width: 100%;
    height: 170px;
    overflow: hidden;
    padding: 0 26px;
    left: 0;
    top: 96px;
    position: absolute;
`

export const CallActionButtonContainer = styled(CenteredDiv)`
    display: flex;
    flex-direction: column;
    width: 50px;
    height: 70px;
    aligh-items: center;
    justify-content: space-between;
`

export const CallActionButtonLabel = styled.div`
    font-size: 10px;
    color: ${COLORS.fullDark};
`

export const CallActionButton = styled(CenteredDiv)<{ isActive?: boolean }>`
    width: 50px;
    height: 50px;
    box-shadow: ${CSS_CONSTANTS.shadowLight} ${CSS_CONSTANTS.shadowLight} ${CSS_CONSTANTS.shadowLight}
        ${COLORS.deepDark};
    background-color: ${({ isActive }) => (isActive ? COLORS.primaryMain : COLORS.primarySecondary)};
    border-radius: 50%;

    &:hover {
        background-color: ${({ isActive }) => (isActive ? COLORS.deepMain : COLORS.fullDark)};
        & > div {
            background: ${({ isActive }) => (isActive ? COLORS.fullDark : COLORS.primarySecondary)};
        }
    }

    &:active {
        background-color: ${({ isActive }) => (isActive ? COLORS.fullMain : COLORS.primaryDark)};
        & > div {
            background: ${({ isActive }) => (isActive ? COLORS.fullDark : COLORS.primarySecondary)};
        }
    }
`

export const CallActionButtonIcon = styled.div<{ icon: string }>`
    mask-image: ${({ icon }) => `url(${icon})`};
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
    background: ${COLORS.fullDark};
    width: 60%;
    height: 40%;
`

export const CallEndedLabel = styled(CenteredDiv)`
    width: 100%;
    height: 100%;
`

const dotSpin = keyframes`
    0%,
    100% {
      box-shadow: 0 -18px 0 0${COLORS.deepSecondary}, 12.72984px -12.72984px 0 0${COLORS.deepSecondary}, 18px 0 0 0${COLORS.deepSecondary}, 12.72984px 12.72984px 0 -5px ${COLORS.deepSecondary}, 0 18px 0 -5px ${COLORS.deepSecondary}, -12.72984px 12.72984px 0 -5px ${COLORS.deepSecondary}, -18px 0 0 -5px ${COLORS.deepSecondary}, -12.72984px -12.72984px 0 -5px ${COLORS.deepSecondary};
    }
    12.5% {
      box-shadow: 0 -18px 0 -5px ${COLORS.deepSecondary}, 12.72984px -12.72984px 0 0${COLORS.deepSecondary}, 18px 0 0 0${COLORS.deepSecondary}, 12.72984px 12.72984px 0 0${COLORS.deepSecondary}, 0 18px 0 -5px ${COLORS.deepSecondary}, -12.72984px 12.72984px 0 -5px ${COLORS.deepSecondary}, -18px 0 0 -5px ${COLORS.deepSecondary}, -12.72984px -12.72984px 0 -5px ${COLORS.deepSecondary};
    }
    25% {
      box-shadow: 0 -18px 0 -5px ${COLORS.deepSecondary}, 12.72984px -12.72984px 0 -5px ${COLORS.deepSecondary}, 18px 0 0 0${COLORS.deepSecondary}, 12.72984px 12.72984px 0 0${COLORS.deepSecondary}, 0 18px 0 0${COLORS.deepSecondary}, -12.72984px 12.72984px 0 -5px ${COLORS.deepSecondary}, -18px 0 0 -5px ${COLORS.deepSecondary}, -12.72984px -12.72984px 0 -5px ${COLORS.deepSecondary};
    }
    37.5% {
      box-shadow: 0 -18px 0 -5px ${COLORS.deepSecondary}, 12.72984px -12.72984px 0 -5px ${COLORS.deepSecondary}, 18px 0 0 -5px ${COLORS.deepSecondary}, 12.72984px 12.72984px 0 0${COLORS.deepSecondary}, 0 18px 0 0${COLORS.deepSecondary}, -12.72984px 12.72984px 0 0${COLORS.deepSecondary}, -18px 0 0 -5px ${COLORS.deepSecondary}, -12.72984px -12.72984px 0 -5px ${COLORS.deepSecondary};
    }
    50% {
      box-shadow: 0 -18px 0 -5px ${COLORS.deepSecondary}, 12.72984px -12.72984px 0 -5px ${COLORS.deepSecondary}, 18px 0 0 -5px ${COLORS.deepSecondary}, 12.72984px 12.72984px 0 -5px ${COLORS.deepSecondary}, 0 18px 0 0${COLORS.deepSecondary}, -12.72984px 12.72984px 0 0${COLORS.deepSecondary}, -18px 0 0 0${COLORS.deepSecondary}, -12.72984px -12.72984px 0 -5px ${COLORS.deepSecondary};
    }
    62.5% {
      box-shadow: 0 -18px 0 -5px ${COLORS.deepSecondary}, 12.72984px -12.72984px 0 -5px ${COLORS.deepSecondary}, 18px 0 0 -5px ${COLORS.deepSecondary}, 12.72984px 12.72984px 0 -5px ${COLORS.deepSecondary}, 0 18px 0 -5px ${COLORS.deepSecondary}, -12.72984px 12.72984px 0 0${COLORS.deepSecondary}, -18px 0 0 0${COLORS.deepSecondary}, -12.72984px -12.72984px 0 0${COLORS.deepSecondary};
    }
    75% {
      box-shadow: 0 -18px 0 0${COLORS.deepSecondary}, 12.72984px -12.72984px 0 -5px ${COLORS.deepSecondary}, 18px 0 0 -5px ${COLORS.deepSecondary}, 12.72984px 12.72984px 0 -5px ${COLORS.deepSecondary}, 0 18px 0 -5px ${COLORS.deepSecondary}, -12.72984px 12.72984px 0 -5px ${COLORS.deepSecondary}, -18px 0 0 0${COLORS.deepSecondary}, -12.72984px -12.72984px 0 0${COLORS.deepSecondary};
    }
    87.5% {
      box-shadow: 0 -18px 0 0${COLORS.deepSecondary}, 12.72984px -12.72984px 0 0${COLORS.deepSecondary}, 18px 0 0 -5px ${COLORS.deepSecondary}, 12.72984px 12.72984px 0 -5px ${COLORS.deepSecondary}, 0 18px 0 -5px ${COLORS.deepSecondary}, -12.72984px 12.72984px 0 -5px ${COLORS.deepSecondary}, -18px 0 0 -5px ${COLORS.deepSecondary}, -12.72984px -12.72984px 0 0${COLORS.deepSecondary};
    }
`

export const WaitAnimation = styled.div`
    position: absolute;
    left: 125px;
    top: 150px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: transparent;
    color: transparent;
    box-shadow: 0 -18px 0 0 ${COLORS.deepSecondary}, 12.72984px -12.72984px 0 0 ${COLORS.deepSecondary},
        18px 0 0 0 ${COLORS.deepSecondary}, 12.72984px 12.72984px 0 0 ${COLORS.deepSecondary},
        0 18px 0 0 ${COLORS.deepSecondary}, -12.72984px 12.72984px 0 0 ${COLORS.deepSecondary},
        -18px 0 0 0 ${COLORS.deepSecondary}, -12.72984px -12.72984px 0 0 ${COLORS.deepSecondary};
    animation: ${dotSpin} 1.5s infinite linear;
`
