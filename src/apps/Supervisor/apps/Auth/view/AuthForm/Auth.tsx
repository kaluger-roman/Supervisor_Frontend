import { RejectButton, StandardButton } from "components/Buttons"
import { StandardContainer } from "components/Containers"
import { SectionHeader } from "components/Headers"
import { Input } from "components/Inputs"
import { InputWidth } from "components/Inputs/types"
import { Link } from "components/Text/styled"
import { ThemeVariant } from "components/types"
import React, { useCallback, useEffect } from "react"
import { useQueryError, useSESelector, useTypedDispatch } from "Supervisor/redux/hooks"
import { useAuthMutation } from "Supervisor/redux/reducers/api/auth.api"
import { changeAuthPage, changePasswordInput, changeUserNameInput } from "Supervisor/redux/reducers/auth"
import { changeAuthToken, changeIsBlockingLoader } from "Supervisor/redux/reducers/main"
import { AUTH_ERRORS } from "../../constants"
import { AuthPage } from "../../types"
import { AuthContainer, ButtonsContainer, InnerContainer } from "../styled"

export const AuthForm: React.FC = () => {
    const dispatch = useTypedDispatch()
    const { userNameInput, passwordInput } = useSESelector((state) => state.auth)
    const [tryAuth, { isSuccess, isLoading, error, data }] = useAuthMutation()
    const onAuthClick = useCallback(
        () => tryAuth({ username: userNameInput, password: passwordInput }),
        [userNameInput, passwordInput, tryAuth]
    )
    useEffect(() => {
        dispatch(changeIsBlockingLoader(isLoading))

        if (isSuccess && data?.access_token) {
            dispatch(changeAuthToken(data.access_token))
        }
    }, [isLoading])
    const isEmptyFields = !userNameInput || !passwordInput
    const errorAuth = useQueryError(error)

    return (
        <AuthContainer>
            <StandardContainer variant={ThemeVariant.dark}>
                <InnerContainer height={350}>
                    <SectionHeader>Авторизация</SectionHeader>
                    <div>
                        <Input
                            inputWidth={InputWidth.long}
                            label="Логин"
                            onChange={(val) => dispatch(changeUserNameInput(val.trim()))}
                            value={userNameInput}
                            hasError={() => errorAuth?.all && " "}
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            isPassword
                            label="Пароль"
                            onChange={(val) => dispatch(changePasswordInput(val.trim()))}
                            value={passwordInput}
                            hasError={() => errorAuth?.all}
                        />
                    </div>
                    <ButtonsContainer width={280}>
                        <StandardButton
                            data-tip={isEmptyFields ? AUTH_ERRORS.REQUIRED_FIELDS : ""}
                            disabled={isEmptyFields}
                            onClick={onAuthClick}
                        >
                            Вход
                        </StandardButton>
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
