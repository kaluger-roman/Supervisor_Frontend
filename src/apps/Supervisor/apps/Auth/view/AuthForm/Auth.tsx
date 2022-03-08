import { RejectButton, StandardButton } from "components/Buttons"
import { StandardContainer } from "components/Containers"
import { SectionHeader } from "components/Headers"
import { Input } from "components/Inputs"
import { InputWidth } from "components/Inputs/types"
import { Link } from "components/Text/styled"
import { ThemeVariant } from "components/types"
import React from "react"
import { useSESelector, useTypedDispatch } from "Supervisor/redux/hooks"
import { changeAuthPage, changePasswordInput, changeUserNameInput } from "Supervisor/redux/reducers/auth"
import { AuthPage } from "../../types"
import { AuthContainer, ButtonsContainer, InnerContainer } from "../styled"

export const AuthForm: React.FC = () => {
    const dispatch = useTypedDispatch()
    const { userNameInput, passwordInput } = useSESelector((state) => state.auth)

    return (
        <AuthContainer>
            <StandardContainer variant={ThemeVariant.dark}>
                <InnerContainer height={350}>
                    <SectionHeader>Авторизация</SectionHeader>
                    <div>
                        <Input
                            inputWidth={InputWidth.long}
                            label="Логин"
                            onChange={(val) => dispatch(changeUserNameInput(val))}
                            value={userNameInput}
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            isPassword
                            label="Пароль"
                            onChange={(val) => dispatch(changePasswordInput(val))}
                            value={passwordInput}
                        />
                    </div>
                    <ButtonsContainer width={280}>
                        <StandardButton>Вход</StandardButton>
                        <RejectButton onClick={() => dispatch(changeAuthPage(AuthPage.register))}>
                            Регистрация
                        </RejectButton>
                    </ButtonsContainer>
                    <Link onClick={() => dispatch(changeAuthPage(AuthPage.recover))}>Я забыл пароль</Link>
                    <Link onClick={() => dispatch(changeAuthPage(AuthPage.changePassword))}>Сменить пароль</Link>
                </InnerContainer>
            </StandardContainer>
        </AuthContainer>
    )
}
