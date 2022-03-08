import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthPage, SecretQuestsKey } from "Supervisor/apps/Auth/types"
import { AuthSlice } from "./types"

const initialState: AuthSlice = {
    page: AuthPage.auth,
    userNameInput: "",
    oldPasswordInput: "",
    passwordInput: "",
    secondPasswordInput: "",
    secretQuestion: SecretQuestsKey.favouriteTeacher,
    secretAnswerInput: "",
    emailInput: "",
    capthaPassed: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        changeUserNameInput: (state, action: PayloadAction<string>) => void (state.userNameInput = action.payload),
        changeOldPasswordInput: (state, action: PayloadAction<string>) =>
            void (state.oldPasswordInput = action.payload),
        changePasswordInput: (state, action: PayloadAction<string>) => void (state.passwordInput = action.payload),
        changeSecondPasswordInput: (state, action: PayloadAction<string>) =>
            void (state.secondPasswordInput = action.payload),
        changeAuthPage: (state, action: PayloadAction<AuthPage>) => void (state.page = action.payload),
        changeEmail: (state, action: PayloadAction<string>) => void (state.emailInput = action.payload),

        changeSecretAnswer: (state, action: PayloadAction<string>) => void (state.secretAnswerInput = action.payload),
        changeCaptchaPassed: (state, action: PayloadAction<boolean>) => void (state.capthaPassed = action.payload),
        changeSecretQuestion: (state, action: PayloadAction<SecretQuestsKey>) =>
            void (state.secretQuestion = action.payload)
    }
})

export const {
    changeUserNameInput,
    changePasswordInput,
    changeAuthPage,
    changeSecondPasswordInput,
    changeEmail,
    changeSecretAnswer,
    changeSecretQuestion,
    changeCaptchaPassed,
    changeOldPasswordInput
} = authSlice.actions

export default authSlice.reducer
