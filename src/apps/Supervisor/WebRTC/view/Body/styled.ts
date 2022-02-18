import styled from "@emotion/styled"
import { CenteredDiv } from "../../../../../components/styled"
import { COLORS } from "../../../../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../../../../config/globalStyles/common"
import CallIcon from "../../../icons/call-icon.svg"
import CallDismissIcon from "../../../icons/call-dismiss.svg"
import { ButtonType } from "../types"

export const CallBtnIcon = styled.div`
    width: 20px;
    height: 20px;
    mask-image: url(${CallIcon});
    mask-size: cover;
    -webkit-mask-box-image: url(${CallIcon});
    background: ${COLORS.primaryDark};
`

export const CallDismissBtnIcon = styled.div`
    width: 20px;
    height: 20px;
    mask-image: url(${CallDismissIcon});
    mask-size: cover;
    -webkit-mask-box-image: url(${CallDismissIcon});
    background: ${COLORS.fullDark};
`

export const BreakBtnIcon = styled.div`
    width: 20px;
    height: 20px;
    mask-image: url(${CallIcon});
    mask-size: cover;
    -webkit-mask-box-image: url(${CallIcon});
    background: ${COLORS.primaryDark};
`

export const CallBtn = styled(CenteredDiv)<{ btnType?: ButtonType }>`
    width: 120px;
    height: 40px;
    position: absolute;
    bottom: 22px;
    left: calc(50% - 60px);
    border-radius: ${CSS_CONSTANTS.borderRadius};
    background: ${({ btnType }) =>
        btnType === ButtonType.call
            ? COLORS.primaryMain
            : btnType === ButtonType.reject
            ? COLORS.error1
            : COLORS.primaryMain};
    box-shadow: 1px 1px 1px ${COLORS.deepDark};
    &:hover {
        background: ${({ btnType }) =>
            btnType === ButtonType.call
                ? COLORS.lightMain
                : btnType === ButtonType.reject
                ? COLORS.error2
                : COLORS.lightMain};
    }
    &:active {
        background: ${({ btnType }) =>
            btnType === ButtonType.call
                ? COLORS.fullMain
                : btnType === ButtonType.reject
                ? COLORS.error
                : COLORS.fullMain};
    }
`

export const PhonePageWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    height: 350px;
`
