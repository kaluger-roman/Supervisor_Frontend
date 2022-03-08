import { Option } from "components/Checkboxes/types"
import { SecretQuestsKey } from "./types"

export const SECRET_QUESTS: { [key in SecretQuestsKey]: string } = {
    [SecretQuestsKey.mother]: "Девичья фамилия матери",
    [SecretQuestsKey.firstPet]: "Кличка первого питомца",
    [SecretQuestsKey.favouriteTeacher]: "Фамилия любимого преподавателя"
}

export const SECRET_QUESTS_OPTIONS: Option<SecretQuestsKey>[] = Object.entries(SECRET_QUESTS).map(([key, label]) => ({
    key,
    value: key as SecretQuestsKey,
    label
}))

export const CAPTCHA_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

export const AUTH_ERRORS = {
    EMAIL: "Некорректный логин, допустимы только буквы/цифры от 6 знаков",
    PASWORD:
        "Пароль должен содержать минимум 6 символов, хотя бы 1 заглавную, 1 строчную букву латиницей, 1 цифру, 1 спецсимвол _.-!=",
    SECOND_PASWORD: "Пароли не совпадают",
    USERNAME: "Некорректные данные, допустимы только буквы/цифры от 6 знаков",
    CAPTCHA: "Пройдите капчу и заполните все поля",
    REQUIRED_FIELDS: "Заполните все поля"
}
