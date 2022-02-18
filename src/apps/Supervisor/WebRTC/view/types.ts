export type CallAction = {
    name: string
    icon: string
    label: string
    onClick?: () => void
}

export enum ButtonType {
    answer = "answer",
    reject = "reject",
    call = "call"
}
