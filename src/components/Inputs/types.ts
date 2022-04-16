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
    onFocus?: () => void
    onBlur?: () => void
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
