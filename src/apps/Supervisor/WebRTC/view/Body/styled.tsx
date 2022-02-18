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

export const CallBtnContainer = styled(CenteredDiv)<{ btnType?: ButtonType; disabled?: boolean }>`
    ${({ disabled }) => disabled && "pointer-events:none; opacity: 0.5; "}
    width: ${({ btnType }) => ([ButtonType.reject, ButtonType.answer].includes(btnType as ButtonType) ? 100 : 120)}px;
    height: 40px;
    border-radius: ${CSS_CONSTANTS.borderRadius};
    background: ${({ btnType }) =>
        [ButtonType.call, ButtonType.answer].includes(btnType as ButtonType)
            ? COLORS.success
            : [ButtonType.reject, ButtonType.break].includes(btnType as ButtonType)
            ? COLORS.error1
            : COLORS.primaryMain};
    box-shadow: 1px 1px 1px ${COLORS.deepDark};
    &:hover {
        background: ${({ btnType }) =>
            [ButtonType.call, ButtonType.answer].includes(btnType as ButtonType)
                ? COLORS.success1
                : [ButtonType.reject, ButtonType.break].includes(btnType as ButtonType)
                ? COLORS.error2
                : COLORS.lightMain};
    }
    &:active {
        background: ${({ btnType }) =>
            [ButtonType.call, ButtonType.answer].includes(btnType as ButtonType)
                ? COLORS.success2
                : [ButtonType.reject, ButtonType.break].includes(btnType as ButtonType)
                ? COLORS.error
                : COLORS.fullMain};
    }
`

export const CallBtn: React.FC<{ btnType?: ButtonType; onClick?: () => void; disabled?: boolean }> = ({
    btnType,
    onClick,
    disabled
}) => (
    <CallBtnContainer disabled={disabled} onClick={onClick} btnType={btnType}>
        {[ButtonType.reject, ButtonType.break].includes(btnType as ButtonType) && <CallDismissBtnIcon />}
        {[ButtonType.call, ButtonType.answer].includes(btnType as ButtonType) && <CallBtnIcon />}
    </CallBtnContainer>
)

export const CallButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    bottom: 22px;
    left: 0;
    gap: 20px;
`

export const PhonePageWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 40px;
    width: 100%;
    height: 350px;
`
