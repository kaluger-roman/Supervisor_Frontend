import { RejectButton, StandardButton } from "components/Buttons"
import { StandardContainer } from "components/Containers"
import { SectionHeader } from "components/Headers"
import { Input } from "components/Inputs"
import { InputWidth } from "components/Inputs/types"
import { Selector } from "components/Selectors"
import { ThemeVariant } from "components/types"
import React from "react"
import { useSESelector, useTypedDispatch } from "Supervisor/redux/hooks"
import { changeAuthPage, changeEmail, changeSecretAnswer, changeSecretQuestion } from "Supervisor/redux/reducers/auth"
import EmailValidator from "email-validator"
import { AUTH_ERRORS, SECRET_QUESTS_OPTIONS } from "../../constants"
import { AuthPage, SecretQuestsKey } from "../../types"
import { SecretInput } from "../ChangePasswordForm/styled"
import { AuthContainer, ButtonsContainer, InnerContainer } from "../styled"
import { usernameValidate } from "../../helpers"

export const RecoverForm: React.FC = () => {
    const dispatch = useTypedDispatch()
    const { emailInput, secretAnswerInput, secretQuestion } = useSESelector((state) => state.auth)

    const emailError = emailInput && !EmailValidator.validate(emailInput) && AUTH_ERRORS.EMAIL
    const secretAnswerError = !usernameValidate(secretAnswerInput) && AUTH_ERRORS.USERNAME

    const someError =
        emailError || secretAnswerError || !emailInput || !secretQuestion || !secretAnswerInput || !secretQuestion

    return (
        <AuthContainer>
            <StandardContainer variant={ThemeVariant.dark}>
                <InnerContainer height={450}>
                    <SectionHeader>Восстановление пароля</SectionHeader>
                    <div>
                        <Input
                            inputWidth={InputWidth.long}
                            label="Почта"
                            onChange={(val) => dispatch(changeEmail(val))}
                            value={emailInput}
                            hasError={() => emailError}
                        />
                        <SecretInput>
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
                                hasError={() => secretAnswerError}
                            />
                        </SecretInput>
                    </div>
                    <ButtonsContainer width={300}>
                        <StandardButton data-tip={someError ? AUTH_ERRORS.REQUIRED_FIELDS : ""} disabled={!!someError}>
                            Восстановить
                        </StandardButton>
                        <RejectButton onClick={() => dispatch(changeAuthPage(AuthPage.auth))}>Авторизация</RejectButton>
                    </ButtonsContainer>
                </InnerContainer>
            </StandardContainer>
        </AuthContainer>
    )
}
