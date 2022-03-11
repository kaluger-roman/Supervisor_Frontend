import { RejectButton, StandardButton } from "components/Buttons"
import ReCAPTCHA from "react-google-recaptcha"
import { StandardContainer } from "components/Containers"
import { SectionHeader } from "components/Headers"
import { Input } from "components/Inputs"
import { InputWidth } from "components/Inputs/types"
import { Selector } from "components/Selectors"
import { ThemeVariant } from "components/types"
import React, { useCallback, useEffect } from "react"
import { useQueryError, useSESelector, useTypedDispatch } from "Supervisor/redux/hooks"
import {
    changeAuthPage,
    changeCaptchaPassed,
    changeEmail,
    changePasswordInput,
    changeSecondPasswordInput,
    changeSecretAnswer,
    changeSecretQuestion,
    changeUserNameInput
} from "Supervisor/redux/reducers/auth"
import { AUTH_ERRORS, CAPTCHA_KEY, SECRET_QUESTS_OPTIONS } from "../../constants"
import { AuthPage, SecretQuestsKey } from "../../types"
import { InputsContainer, ReCAPTCHAWrapper } from "./styled"
import { AuthContainer, ButtonsContainer, InnerContainer } from "../styled"
import EmailValidator from "email-validator"
import { passwordValidate, usernameValidate } from "../../helpers"
import { useRegisterMutation } from "Supervisor/redux/reducers/api/auth.api"
import { changeAppPage, changeAuthToken, changeIsBlockingLoader } from "Supervisor/redux/reducers/main"
import { AppPage } from "Supervisor/redux/reducers/types"

export const RegisterForm: React.FC = () => {
    const dispatch = useTypedDispatch()
    const {
        capthaPassed,
        userNameInput,
        passwordInput,
        emailInput,
        secondPasswordInput,
        secretQuestion,
        secretAnswerInput
    } = useSESelector((state) => state.auth)
    const emailError = emailInput && !EmailValidator.validate(emailInput) && AUTH_ERRORS.EMAIL
    const usernameError = !usernameValidate(userNameInput) && AUTH_ERRORS.USERNAME
    const passwordError = !passwordValidate(passwordInput) && AUTH_ERRORS.PASWORD
    const secondPasswordError =
        secondPasswordInput && passwordInput !== secondPasswordInput && AUTH_ERRORS.SECOND_PASWORD
    const secretError = !usernameValidate(secretAnswerInput) && AUTH_ERRORS.USERNAME

    const someError =
        emailError ||
        usernameError ||
        passwordError ||
        secondPasswordError ||
        secretError ||
        !capthaPassed ||
        !userNameInput ||
        !passwordInput ||
        !emailInput ||
        !secondPasswordInput ||
        !secretQuestion ||
        !secretAnswerInput ||
        !secretQuestion

    const [tryReg, { isLoading, error, data, isSuccess }] = useRegisterMutation()
    const onRegClick = useCallback(
        () =>
            tryReg({
                username: userNameInput,
                password: passwordInput,
                secret: secretQuestion,
                secretAnswer: secretAnswerInput,
                email: emailInput
            }),
        [userNameInput, passwordInput, secretQuestion, secretAnswerInput, emailInput, tryReg]
    )
    useEffect(() => {
        dispatch(changeIsBlockingLoader(isLoading))

        if (isSuccess && data?.access_token) {
            dispatch(changeAuthToken(data.access_token))
        }
    }, [isLoading, isSuccess, data])
    const errorReg = useQueryError(error)

    return (
        <AuthContainer>
            <StandardContainer variant={ThemeVariant.dark}>
                <InnerContainer height={600}>
                    <SectionHeader>Регистрация</SectionHeader>
                    <InputsContainer>
                        <Input
                            inputWidth={InputWidth.long}
                            label="Почта"
                            onChange={(val) => dispatch(changeEmail(val))}
                            value={emailInput}
                            hasError={() => emailError || (errorReg?.all && " ")}
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            label="Логин"
                            onChange={(val) => dispatch(changeUserNameInput(val))}
                            value={userNameInput}
                            hasError={() => usernameError || errorReg?.all}
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            isPassword
                            label="Пароль"
                            onChange={(val) => dispatch(changePasswordInput(val))}
                            value={passwordInput}
                            hasError={() => passwordError}
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            isPassword
                            label="Пароль x2"
                            onChange={(val) => dispatch(changeSecondPasswordInput(val))}
                            value={secondPasswordInput}
                            hasError={() => secondPasswordError}
                        />
                        <Selector
                            withEmpty
                            options={SECRET_QUESTS_OPTIONS}
                            inputWidth={InputWidth.long}
                            label="Секретный вопрос"
                            onChange={(val) => dispatch(changeSecretQuestion(val as SecretQuestsKey))}
                            value={secretQuestion}
                            required
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            label="Ответ"
                            onChange={(val) => dispatch(changeSecretAnswer(val))}
                            value={secretAnswerInput}
                            hasError={() => secretError}
                        />
                        <ReCAPTCHAWrapper>
                            <ReCAPTCHA
                                theme="dark"
                                sitekey={CAPTCHA_KEY}
                                onChange={() => dispatch(changeCaptchaPassed(true))}
                            />
                        </ReCAPTCHAWrapper>
                    </InputsContainer>
                    <ButtonsContainer width={400}>
                        <StandardButton
                            data-tip={someError ? AUTH_ERRORS.CAPTCHA : ""}
                            disabled={!!someError}
                            width={180}
                            onClick={onRegClick}
                        >
                            Зарегистрироваться
                        </StandardButton>
                        <RejectButton width={180} onClick={() => dispatch(changeAuthPage(AuthPage.auth))}>
                            Авторизация
                        </RejectButton>
                    </ButtonsContainer>
                </InnerContainer>
            </StandardContainer>
        </AuthContainer>
    )
}
