import React, { useCallback, useState } from "react"
import ReactDOM from "react-dom"
import { Triangle } from "react-loader-spinner"
import { COLORS } from "config/globalStyles/colors"
import { convertCssSecondsToIntMs, CSS_CONSTANTS } from "../../config/globalStyles/common"
import { StandardButton, RejectButton, IconCircle } from "../Buttons"
import { StandardContainer } from "../Containers"
import { Header, LargeHeader } from "../Headers"
import { StandardText } from "../Text"
import { ThemeVariant } from "../types"
import { BLOCKING_LOADER_ID, MODAL_PORTAL_ID, STANDARD_ACCEPT_LABEL, STANDARD_DECLINE_LABEL } from "./constants"
import { Backdrop, Cancel, InnerContainer, ButtonsContainer, TextContainer, HeaderWrapper } from "./styled"
import { ModalProps, ModalSize, ModalPropsInner, BlockingLoaderProps } from "./types"
import CrossIcon from "./../../assets/images/cross.svg"

const Modal: React.FC<ModalPropsInner> = ({
    children,
    header,
    text,
    size,
    onAccept,
    onDecline,
    closeModal,
    acceptLabel,
    declineLabel,
    hasAccept,
    hasDecline
}) => {
    const [beforeUnmount, setBeforeUnmount] = useState<boolean>(false)

    const CloseWrapper = useCallback(
        (fn?: Function) => () => {
            setBeforeUnmount(true)
            setTimeout(() => {
                if (fn) fn()
                closeModal()
            }, convertCssSecondsToIntMs(CSS_CONSTANTS.shortAnimationDuraion))
        },
        []
    )

    const HeaderComponent = size === ModalSize.small ? Header : LargeHeader
    return (
        <Backdrop beforeUnmount={beforeUnmount}>
            <StandardContainer variant={ThemeVariant.dark}>
                <InnerContainer sizeType={size || ModalSize.standard}>
                    {children || (
                        <>
                            <Cancel onClick={CloseWrapper()}>
                                <IconCircle icon={CrossIcon} />
                            </Cancel>
                            {header && (
                                <HeaderWrapper>
                                    <HeaderComponent noTopMargin>{header}</HeaderComponent>
                                </HeaderWrapper>
                            )}
                            <TextContainer> {text && <StandardText centered>{text}</StandardText>}</TextContainer>
                            {(hasAccept || hasDecline) && (
                                <ButtonsContainer>
                                    {hasAccept && (
                                        <StandardButton onClick={CloseWrapper(onDecline)}>
                                            {acceptLabel || STANDARD_ACCEPT_LABEL}
                                        </StandardButton>
                                    )}
                                    {hasDecline && (
                                        <RejectButton onClick={CloseWrapper(onAccept)}>
                                            {declineLabel || STANDARD_DECLINE_LABEL}
                                        </RejectButton>
                                    )}
                                </ButtonsContainer>
                            )}
                        </>
                    )}
                </InnerContainer>
            </StandardContainer>
        </Backdrop>
    )
}

export const ModalPortal: React.FC = () => <div id={MODAL_PORTAL_ID} />
export const LoaderPortal: React.FC = () => <div id={BLOCKING_LOADER_ID} />

export const ShowModal = (props: ModalProps) => {
    const portal: HTMLDivElement | null = document.querySelector(`#${MODAL_PORTAL_ID}`)
    const closeModal = () => portal?.firstChild?.remove()
    if (portal)
        ReactDOM.render(
            <Modal {...props} closeModal={closeModal}>
                {props.children}
            </Modal>,
            portal
        )
}

export const ShowBlockingLoader = (props: BlockingLoaderProps) => {
    const portal: HTMLDivElement | null = document.querySelector(`#${BLOCKING_LOADER_ID}`)
    if (portal) {
        ReactDOM.render(props.isShown ? <BlockingLoader /> : <></>, portal)
    }
}

export const BlockingLoader: React.FC = () => (
    <Backdrop>
        <Triangle height="100" width="100" color={COLORS.primaryMain} ariaLabel="loading" />
    </Backdrop>
)
