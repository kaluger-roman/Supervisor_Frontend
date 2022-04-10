export type CallAction = {
    name: string
    icon: string
    label: string
    active?: boolean
    onClick?: () => void
}

export enum ButtonType {
    answer = "answer",
    reject = "reject",
    break = "break",
    call = "call"
}
