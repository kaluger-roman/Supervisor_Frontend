import { keyframes } from "@emotion/css"
import styled from "@emotion/styled"
import { CenteredDiv } from "components/styled"
import { COLORS, withOpacity } from "config/globalStyles/colors"
import { CSS_CONSTANTS } from "config/globalStyles/common"
import InfoSvg from "Supervisor/icons/info.svg"
import { CallStatus } from "Supervisor/redux/reducers/api/types"
import OutboundPNG from "../icons/outbound.png"
import InboundPNG from "../icons/inbound.png"
import JumpPNG from "../icons/jump.png"
import { AuthenticityToColor } from "../../helpers"
import { CallRole } from "../../types"

export const RecordItemContainer = styled.div<{ header?: boolean }>`
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    border-radius: ${CSS_CONSTANTS.borderRadius};
    background: ${withOpacity(COLORS.deepLightDark, 0.4)};
    border: 1px solid ${COLORS.deepLightDark};
    gap: 20px;

    &:hover {
        background: ${withOpacity(COLORS.deepLightDark, 0.7)};
    }

    ${({ header }) =>
        header
            ? `position: sticky; top: 0; left: 0; 
        padding: 0 11px;
        background: ${withOpacity(COLORS.fullDark, 0.5)};
        &:hover {
            background: ${withOpacity(COLORS.fullDark, 0.5)};
        } 
        height: 40px; margin-top: -10px; width: calc(100% + 20px);
        border-radius: ${CSS_CONSTANTS.borderRadius} ${CSS_CONSTANTS.borderRadius} 0 0;
        border: none;
        border-bottom: ${CSS_CONSTANTS.borderWidth} solid ${COLORS.primaryMain};
        `
            : `&:first-child {
            margin-top: 10px;
        }`}

    &> div {
        width: 100%;
        text-align: center;

        & > div {
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    & > div:nth-child(1) {
        width: 60px;
        flex-basis: 60px;
    }
    & > div:nth-child(2) {
        width: 150px;
        flex-basis: 150px;
        flex-grow: 1;
    }
    & > div:nth-child(3) {
        width: 150px;
        flex-basis: 150px;
        flex-grow: 1;
    }
    & > div:nth-child(4) {
        width: 140px;
        flex-basis: 180px;
        flex-grow: 1;
    }
    & > div:nth-child(5) {
        width: 100px;
        flex-basis: 140px;
    }
    & > div:nth-child(6) {
        width: 80px;
    }
    & > div:nth-child(7) {
        width: 150px;
    }
    & > div:nth-child(8) {
        width: 80px;
    }
`

export const MoreButton = styled.div`
    mask-image: url(${InfoSvg});
    background-color: ${COLORS.primaryMain};
    mask-repeat: no-repeat;
    mask-size: 21px;
    width: 20px;
    height: 30px;
    mask-position: center;
    cursor: pointer;

    &:hover {
        background-color: ${COLORS.lightMain};
    }
`

const openFrame = keyframes`
    0% {
        height: 0;
        opacity: 0;
        padding: 0;
    }

    100% {
        opacity: 1;
        height: 633px;
        padding: ${CSS_CONSTANTS.padding};
    }

`

const closeFrame = keyframes`
    0% {
        height: 633px;
        opacity: 1;
        padding: ${CSS_CONSTANTS.padding};
    }

    100% {
        opacity: 0;
        height: 0;
        padding: 0;
    }
`

export const MoreInfoContainer = styled.div<{ shown?: boolean; animationOn?: boolean }>`
    opacity: 0;
    height: 0;
    animation: ${({ shown, animationOn }) =>
        animationOn ? (shown ? `${openFrame} 0.5s forwards` : `${closeFrame} 0.5s forwards`) : "none"};
    border-radius: ${CSS_CONSTANTS.borderRadius};
    background: ${withOpacity(COLORS.lightSecondary, 0.3)};
    border: 1px solid ${COLORS.primarySecondary};
    margin-top: 2px;
    overflow: hidden;
    padding: 0;
    will-change: auto;
    margin-bottom: ${({ shown }) => (shown ? 6 : 0)}px;
`

export const NoTranscriptsContainer = styled(CenteredDiv)`
    height: 355px;
`

const StatusToColor: { [key: string]: string } = {
    [CallStatus.active]: COLORS.success,
    [CallStatus.ended]: COLORS.error,
    [CallStatus.failed]: COLORS.error
}

export const CallStatusLabel = styled.div<{ status: CallStatus }>`
    text-transform: capitalize;
    color: ${({ status }) => StatusToColor[status]};
`

export const LoadingContainer = styled(CenteredDiv)`
    height: 100px;
`

export const TranscriptionContainer = styled.div`
    width: 100%;
    height: 400px;
    border: ${CSS_CONSTANTS.borderWidth} solid ${COLORS.primaryDark};
    border-radius: ${CSS_CONSTANTS.borderRadius};
    overflow-x: hidden;
`

export const TranscriptionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: ${CSS_CONSTANTS.padding} 20px;
    position: sticky;
    top: 0;
    left: 0;
    background: ${withOpacity(COLORS.deepDark, 0.75)};
    z-index: 1;
`
export const TranscriptionSide = styled(CenteredDiv)<{ first?: boolean }>`
    display: flex;
    height: 100%;
    color: ${COLORS.deepDark};
    padding: 4px 20px;
    background: ${({ first }) => (first ? COLORS.primarySecondary : COLORS.deepLightMain)};
    border-radius: 30px;
    height: 30px;
    font-size: 18px;

    gap: 20px;
`
export const NumberTag = styled(CenteredDiv)`
    display: flex;
    height: 100%;
    color: ${COLORS.primaryMain};
    padding: 10px 20px;
    background: ${COLORS.fullDark};
    border-radius: 10px;
    height: 20px;
    font-size: 14px;
`
export const AuthenticityRate = styled.div`
    color: ${COLORS.primaryMain};
    font-size: 16px;
`

export const AuthenticityValue = styled.span<{ value: number; isNegative?: boolean }>`
    font-weight: bold;
    color: ${COLORS.deepDark};
    border-radius: 20px;
    background: ${({ value, isNegative }) => AuthenticityToColor(isNegative ? 100 - value : value)};
    padding: 2px 10px;
    margin: 4px;
    display: inline-flex;
    align-items: center;
`

export const LiveLabel = styled.span`
    font-weight: bold;
    color: ${COLORS.success1};
    border-radius: 20px;
    background: ${COLORS.fullDark};
    padding: 4px 20px;
    margin-left: 10px;
`

const CallIcon = styled.i`
    width: 20px;
    height: 20px;
    mask-repeat: no-repeat;
    mask-size: 20px;
    mask-position: center;
`

export const IconCall = styled(CallIcon)`
    mask-image: url(${OutboundPNG});
    background: ${COLORS.primarySecondary};
    -webkit-mask-box-image: url(${OutboundPNG});
`
export const IconAnswer = styled(CallIcon)`
    mask-image: url(${InboundPNG});
    background: ${COLORS.deepLightMain};
    -webkit-mask-box-image: url(${InboundPNG});
`

export const TranscriptionBody = styled.div`
    width: 100%;
    padding: 20px 30px;
`

export const Stats = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    font-size: 10px;
    margin-top: 10px;
    gap: 4px;
`
export const ConfStat = styled.div<{ isAction?: boolean }>`
    padding: 2px 6px;
    background: ${({ isAction }) => (isAction ? COLORS.deepLightSecondary : COLORS.primaryDark)};
    color: ${({ isAction }) => (isAction ? COLORS.deepDark : COLORS.primaryMain)};
    border-radius: 10px;
    position: relative;

    ${({ isAction }) =>
        isAction &&
        `
        cursor: pointer;
        padding-right: 18px;
        &:hover{
            background: ${COLORS.lightSecondary};
        }
        :after{
            content: "";
            position: absolute;
            right: 4px;
            top: 1px;
            display: block;
            width: 12px;
            height: 12px;
            mask-image: url(${JumpPNG});
            mask-size: contain;
            mask-repeat: no-repeat;
            background: ${COLORS.deepDark};
            transform: rotate(90deg);
        }
    
    `}
`

export const MessageBlock = styled.div<{ side: CallRole }>`
    max-width: 40%;
    width: fit-content;
    ${({ side }) => (side === CallRole.caller ? "margin-right: auto" : "margin-left: auto")};
    background: ${({ side }) =>
        withOpacity(side === CallRole.caller ? COLORS.primarySecondary : COLORS.deepLightMain, 0.8)};;
    border-radius: 15px 15px ${({ side }) => (side === CallRole.caller ? "15px" : "0")}
        ${({ side }) => (side === CallRole.caller ? "0" : "15px")};
    padding: 5px 10px 5px 10px;
    position: relative;

    &:after {
        content: "";
        position: absolute;
        ${({ side }) => (side === CallRole.caller ? "left: -20px;" : "right: -20px;")};
        bottom: 0px;
        display: block;
        border: 30px solid transparent;
        border-width:  ${({ side }) => (side === CallRole.caller ? "20px 0 15px 20px" : "20px 20px  15px 0")};
        border-color:  transparent  transparent ${({ side }) =>
            withOpacity(side === CallRole.caller ? COLORS.primarySecondary : COLORS.deepLightMain, 0.8)};; transparent;
        border-color: 
        width: 0;
        height: 0;
    }

    ${Stats}{
        justify-content: flex-${({ side }) => (side === CallRole.caller ? "end" : "start")};;
    }
`
export const MainText = styled.div`
    width: fit-content;
`
export const Word = styled.span<{ conf: number; syn: number; w2v: number }>`
    padding: 0 2px;
    color: ${({ conf, syn, w2v }) => AuthenticityToColor(Math.min(conf, 100 - syn, 100 - w2v) * 100)};
    display: inline-block;
`

export const StatusLabel = styled.label<{ status: CallStatus }>`
    color: ${({ status }) => (status === CallStatus.active ? COLORS.success1 : "inherit")};
`

export const StatsLabelsHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

export const CircleSuspicion = styled.div<{ value: number }>`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: ${({ value }) => AuthenticityToColor(100 - value)};
`

export const CirclesContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 4px;
    align-items: center;
`
