import { Option } from "../Checkboxes/types"

export type SelectorProps = {
    onChange: (value: string) => void
    value: string
    label?: string
    placeholder?: string
    hasError?: (value: string) => null | string
    centered?: boolean
    inputWidth?: InputWidth
    options: Option<string>[]
}

export enum InputWidth {
    standard = "standard",
    long = "long"
}

export enum SelectorType {
    single = "single",
    multiple = "multiple"
}
