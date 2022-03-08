import { RejectButton, StandardButton } from "components/Buttons"
import { StandardContainer } from "components/Containers"
import { SectionHeader } from "components/Headers"
import { Input } from "components/Inputs"
import { InputWidth } from "components/Inputs/types"
import { Link, StandardText } from "components/Text/styled"
import { ThemeVariant } from "components/types"
import React from "react"
import { useSESelector, useTypedDispatch } from "Supervisor/redux/hooks"
import { changeAuthPage, changePasswordInput, changeUserNameInput } from "Supervisor/redux/reducers/auth"
import { AuthPage } from "../../types"
import { SecretInput } from "../ChangePasswordForm/styled"
import { AuthContainer, ButtonsContainer, InnerContainer } from "../styled"

export const RecoverForm: React.FC = () => {
    const dispatch = useTypedDispatch()
    const { userNameInput, passwordInput } = useSESelector((state) => state.auth)

    return (
        <AuthContainer>
            <StandardContainer variant={ThemeVariant.dark}>
                <InnerContainer height={350}>
                    <SectionHeader>Восстановление пароля</SectionHeader>
                    <div>
                        <Input
                            inputWidth={InputWidth.long}
                            label="Почта"
                            onChange={(val) => dispatch(changeUserNameInput(val))}
                            value={userNameInput}
                        />
                        <SecretInput>
                            <StandardText centered noIndent>
                                Cекретный вопрос: <br /> "вопрос вопрос вопрос вопрос вопрос вопрос вопрос вопрос"
                            </StandardText>
                            <Input
                                inputWidth={InputWidth.long}
                                isPassword
                                label="Ответ"
                                onChange={(val) => dispatch(changePasswordInput(val))}
                                value={passwordInput}
                            />
                        </SecretInput>
                    </div>
                    <ButtonsContainer width={270}>
                        <StandardButton>Восстановить</StandardButton>
                        <RejectButton onClick={() => dispatch(changeAuthPage(AuthPage.auth))}>Авторизация</RejectButton>
                    </ButtonsContainer>
                </InnerContainer>
            </StandardContainer>
        </AuthContainer>
    )
}
