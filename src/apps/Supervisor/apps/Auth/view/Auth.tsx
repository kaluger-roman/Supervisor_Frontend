import { always, cond, equals, T } from "ramda"
import React from "react"
import { useSESelector } from "Supervisor/redux/hooks"
import { AuthPage } from "../types"
import { AuthForm } from "./AuthForm"
import { ChangePasswordForm } from "./ChangePasswordForm"
import { RecoverForm } from "./RecoverForm"
import { RegisterForm } from "./Register"

export const Auth: React.FC = () => {
    const { page } = useSESelector((state) => state.auth)

    return cond<AuthPage, JSX.Element>([
        [equals<AuthPage>(AuthPage.auth), always(<AuthForm />)],
        [equals<AuthPage>(AuthPage.register), always(<RegisterForm />)],
        [equals<AuthPage>(AuthPage.changePassword), always(<ChangePasswordForm />)],
        [equals<AuthPage>(AuthPage.recover), always(<RecoverForm />)],

        [T, always(<AuthForm />)]
    ])(page)
}
