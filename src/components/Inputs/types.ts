export type InputProps = {
    onChange: (value: string) => void
    value: string
    label?: string
    placeholder?: string
    hasError?: (value: string) => null | string
    customizedStyles?: CustomizedInputStyles
    centered?: boolean
}

export type CustomizedInputStyles = {}
