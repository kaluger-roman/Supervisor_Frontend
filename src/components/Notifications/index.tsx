import React, { useCallback, useState } from "react"
// import ReactDOM from "react-dom"
// import { convertCssSecondsToIntMs, CSS_CONSTANTS } from "../../config/globalStyles/common"
// import { StandardButton, RejectButton, CancelCross } from "../Buttons"
// import { StandardContainer } from "../Containers"
// import { SectionHeader } from "../Headers"
// import { StandardText } from "../Text"
// import { ThemeVariant } from "../types"
// import { NOTIFICATIONS_PORTAL_ID, STANDARD_ACCEPT_LABEL, STANDARD_DECLINE_LABEL } from "./constants"
// import { Backdrop, Cancel, InnerContainer, ButtonsContainer, TextContainer } from "./styled"
// import { ModalProps, ModalSize, ModalPropsInner } from "./types"

// const Modal: React.FC<ModalPropsInner> = ({
//     children,
//     header,
//     text,
//     size,
//     onAccept,
//     onDecline,
//     closeModal,
//     acceptLabel,
//     declineLabel,
//     hasAccept,
//     hasDecline
// }) => {
//     const [beforeUnmount, setBeforeUnmount] = useState<boolean>(false)

//     const CloseWrapper = useCallback(
//         (fn?: Function) => () => {
//             setBeforeUnmount(true)
//             setTimeout(() => {
//                 if (fn) fn()
//                 closeModal()
//             }, convertCssSecondsToIntMs(CSS_CONSTANTS.shortAnimationDuraion))
//         },
//         []
//     )

//     return (
//         <Backdrop beforeUnmount={beforeUnmount}>
//             <StandardContainer variant={ThemeVariant.dark}>
//                 <InnerContainer sizeType={size || ModalSize.standard}>
//                     {children || (
//                         <>
//                             <Cancel onClick={CloseWrapper()}>
//                                 <CancelCross />
//                             </Cancel>
//                             {header && <SectionHeader noTopMargin>{header}</SectionHeader>}
//                             <TextContainer> {text && <StandardText centered>{text}</StandardText>}</TextContainer>
//                             <ButtonsContainer>
//                                 {hasAccept && (
//                                     <StandardButton onClick={CloseWrapper(onDecline)}>
//                                         {acceptLabel || STANDARD_ACCEPT_LABEL}
//                                     </StandardButton>
//                                 )}
//                                 {hasDecline && (
//                                     <RejectButton onClick={CloseWrapper(onAccept)}>
//                                         {declineLabel || STANDARD_DECLINE_LABEL}
//                                     </RejectButton>
//                                 )}
//                             </ButtonsContainer>
//                         </>
//                     )}
//                 </InnerContainer>
//             </StandardContainer>
//         </Backdrop>
//     )
// }

// export const NotificationsPortal: React.FC = () => <div id={NOTIFICATIONS_PORTAL_ID} />

// export const ShowModal = (props: ModalProps) => {
//     const portal: HTMLDivElement | null = document.querySelector(`#${MODAL_PORTAL_ID}`)
//     const closeModal = () => portal?.firstChild?.remove()
//     if (portal)
//         ReactDOM.render(
//             <Modal {...props} closeModal={closeModal}>
//                 {props.children}
//             </Modal>,
//             portal
//         )
// }

// setTimeout(
//     () =>
//         ShowModal({
//             header: "Test",
//             text: "Test Test TestTestTestTestTestTestTest Test",
//             size: ModalSize.standard,
//             hasAccept: true,
//             hasDecline: true
//         }),
//     1000
// )
