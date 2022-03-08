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
