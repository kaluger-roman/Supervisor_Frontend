// export type MotificationsProps = {
//     header?: string
//     text?: string
//     size?: ModalSize
//     onAccept?: () => void
//     onDecline?: () => void
//     acceptLabel?: string
//     declineLabel?: string
//     hasAccept?: boolean
//     hasDecline?: boolean
//     children?: JSX.Element
// }

// export type ModalPropsInner = ModalProps & { closeModal: () => void }

export enum ModalSize {
    large = "large",
    standard = "standard",
    small = "small"
}
