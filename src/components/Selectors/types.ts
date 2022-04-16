import { Option } from "../Checkboxes/types"

export type SelectorProps = {
    onChange: (value: string | string[]) => void
    value: string | string[]
    label?: string
    placeholder?: string
    centered?: boolean
    inputWidth?: InputWidth
    options: Option<string>[]
    withEmpty?: boolean
    required?: boolean
    searchable?: boolean
    searchValue?: string
    onSearchChange?: (value: string) => void
    multipleChoice?: boolean
    isOnlineSearching?: boolean
}

export enum InputWidth {
    standard = "standard",
    long = "long"
}

export enum SelectorType {
    single = "single",
    multiple = "multiple"
}
