export type InputProps = {
    onChange: (value: string) => void
    value: string
    label: string
    hasError?: (value: string) => null | string
}
