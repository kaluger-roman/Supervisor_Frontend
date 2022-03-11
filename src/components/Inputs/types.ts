export type InputProps = {
    onChange?: (value: string) => void
    value: string
    label?: string
    placeholder?: string
    hasError?: (value: string) => null | false | string | undefined
    customizedStyles?: CustomizedInputStyles
    centered?: boolean
    isPassword?: boolean
    notEditable?: boolean
    inputWidth?: InputWidth
}

export enum InputWidth {
    standard = "standard",
    long = "long"
}

export enum InputTypes {
    password = "password",
    text = "text"
}

export type CustomizedInputStyles = {}
