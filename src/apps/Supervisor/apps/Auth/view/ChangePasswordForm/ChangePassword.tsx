import { RejectButton, StandardButton } from "components/Buttons"
import { StandardContainer } from "components/Containers"
import { SectionHeader } from "components/Headers"
import { Input } from "components/Inputs"
import { InputWidth } from "components/Inputs/types"
import { ThemeVariant } from "components/types"
import React from "react"
import { useSESelector, useTypedDispatch } from "Supervisor/redux/hooks"
import { changeOldPasswordInput, changePasswordInput, changeSecondPasswordInput } from "Supervisor/redux/reducers/auth"
import { AUTH_ERRORS } from "../../constants"
import { passwordValidate } from "../../helpers"
import { AuthContainer, ButtonsContainer, InnerContainer } from "../styled"

export const ChangePasswordForm: React.FC = () => {
    const dispatch = useTypedDispatch()
    const { passwordInput, oldPasswordInput, secondPasswordInput } = useSESelector((state) => state.auth)

    const oldPasswordError = !passwordValidate(oldPasswordInput) && AUTH_ERRORS.PASWORD
    const passwordError = !passwordValidate(passwordInput) && AUTH_ERRORS.PASWORD
    const secondPasswordError =
        secondPasswordInput && passwordInput !== secondPasswordInput && AUTH_ERRORS.SECOND_PASWORD
    const someError =
        oldPasswordError ||
        passwordError ||
        secondPasswordError ||
        !passwordInput ||
        !oldPasswordInput ||
        !secondPasswordInput

    return (
        <AuthContainer>
            <StandardContainer variant={ThemeVariant.dark}>
                <InnerContainer height={350}>
                    <SectionHeader>Смена пароля</SectionHeader>
                    <div>
                        <Input
                            inputWidth={InputWidth.long}
                            isPassword
                            label="Старый пароль"
                            onChange={(val) => dispatch(changeOldPasswordInput(val))}
                            value={oldPasswordInput}
                            hasError={() => oldPasswordError}
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            isPassword
                            label="Новый пароль"
                            onChange={(val) => dispatch(changePasswordInput(val))}
                            value={passwordInput}
                            hasError={() => passwordError}
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            isPassword
                            label="Новый пароль еще раз"
                            onChange={(val) => dispatch(changeSecondPasswordInput(val))}
                            value={secondPasswordInput}
                            hasError={() => secondPasswordError}
                        />
                    </div>
                    <ButtonsContainer width={270}>
                        <StandardButton data-tip={someError ? AUTH_ERRORS.REQUIRED_FIELDS : ""} disabled={!!someError}>
                            Сменить
                        </StandardButton>
                        <RejectButton onClick={() => {}}>Назад</RejectButton>
                    </ButtonsContainer>
                </InnerContainer>
            </StandardContainer>
        </AuthContainer>
    )
}
