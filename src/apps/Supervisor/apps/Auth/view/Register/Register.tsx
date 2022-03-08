import { RejectButton, StandardButton } from "components/Buttons"
import ReCAPTCHA from "react-google-recaptcha"
import { StandardContainer } from "components/Containers"
import { SectionHeader } from "components/Headers"
import { Input } from "components/Inputs"
import { InputWidth } from "components/Inputs/types"
import { Selector } from "components/Selectors"
import { ThemeVariant } from "components/types"
import React, { useState } from "react"
import { useSESelector, useTypedDispatch } from "Supervisor/redux/hooks"
import {
    changeAuthPage,
    changeEmail,
    changePasswordInput,
    changeSecondPasswordInput,
    changeSecretAnswer,
    changeSecretQuestion,
    changeUserNameInput
} from "Supervisor/redux/reducers/auth"
import { CAPTCHA_KEY, SECRET_QUESTS_OPTIONS } from "../../constants"
import { AuthPage, SecretQuestsKey } from "../../types"
import { InputsContainer, ReCAPTCHAWrapper } from "./styled"
import { AuthContainer, ButtonsContainer, InnerContainer } from "../styled"
import { Tooltip } from "components/Text/styled"
import EmailValidator from "email-validator"

const usernameValidate = (val: string) => /^[a-zA-Z0-9_.-]{6,}$/g.test(val)

export const RegisterForm: React.FC = () => {
    const dispatch = useTypedDispatch()
    const [captchaValidated, setCaptchaValidated] = useState<boolean>(false)
    const { userNameInput, passwordInput, emailInput, secondPasswordInput, secretQuestion, secretAnswerInput } =
        useSESelector((state) => state.auth)
    const emailInvalid = emailInput && !EmailValidator.validate(emailInput)

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
                            hasError={() => (emailInvalid ? "Некорректный Email" : null)}
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            label="Логин"
                            onChange={(val) => dispatch(changeUserNameInput(val))}
                            value={userNameInput}
                            hasError={(val) =>
                                usernameValidate(val)
                                    ? null
                                    : "Некорректный логин, допустимы только буквы/цифры от 6 знаков"
                            }
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            isPassword
                            label="Пароль"
                            onChange={(val) => dispatch(changePasswordInput(val))}
                            value={passwordInput}
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            isPassword
                            label="Пароль x2"
                            onChange={(val) => dispatch(changeSecondPasswordInput(val))}
                            value={secondPasswordInput}
                        />
                        <Selector
                            options={SECRET_QUESTS_OPTIONS}
                            inputWidth={InputWidth.long}
                            label="Секретный вопрос"
                            onChange={(val) => dispatch(changeSecretQuestion(val as SecretQuestsKey))}
                            value={secretQuestion}
                        />
                        <Input
                            inputWidth={InputWidth.long}
                            label="Ответ"
                            onChange={(val) => dispatch(changeSecretAnswer(val))}
                            value={secretAnswerInput}
                        />
                        <ReCAPTCHAWrapper>
                            <ReCAPTCHA theme="dark" sitekey={CAPTCHA_KEY} onChange={() => setCaptchaValidated(true)} />
                        </ReCAPTCHAWrapper>
                    </InputsContainer>
                    <ButtonsContainer width={400}>
                        <Tooltip />
                        <StandardButton
                            data-tip={captchaValidated ? "" : "Пройдите капчу и заполните все поля"}
                            disabled={!captchaValidated}
                            width={180}
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
