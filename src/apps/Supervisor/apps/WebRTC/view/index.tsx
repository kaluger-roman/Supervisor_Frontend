import { CSS_CONSTANTS } from "config/globalStyles/common"
import React, { useEffect, useState } from "react"
import Draggable from "react-draggable"
import { Body } from "./Body"
import { CID } from "./CID"
import { DRAGGABLE_CLASS, DRAGGABLE_CONTAINER_CLASS } from "./constants"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { WebRTCWrapper, WEB_RTC_HEIGHT, WEB_RTC_WIDTH } from "./styled"
import "./styles.scss"

const countBounds = () => ({
    left: 0,
    top: parseInt(CSS_CONSTANTS.navBarHeight),
    right: window.innerWidth - WEB_RTC_WIDTH,
    bottom: window.innerHeight - WEB_RTC_HEIGHT
})

const countY = () =>
    window.innerHeight - parseInt(CSS_CONSTANTS.navBarHeight) - parseInt(CSS_CONSTANTS.paddingLarge) - WEB_RTC_HEIGHT

export const WebRTC = () => {
    const [bounds, setBounds] = useState(countBounds())
    const [initialY, setInitialY] = useState(countY())

    useEffect(() => {
        const fn = () => {
            setBounds(countBounds())
            setInitialY(countY())
        }
        window.addEventListener("resize", fn)

        return () => window.removeEventListener("resize", fn)
    }, [])

    return (
        <Draggable
            defaultPosition={{
                x: parseInt(CSS_CONSTANTS.padding),
                y: initialY
            }}
            handle={`.${DRAGGABLE_CLASS}`}
            bounds={bounds}
            defaultClassName={DRAGGABLE_CONTAINER_CLASS}
        >
            <WebRTCWrapper>
                <Header />
                <Body />
                <CID />
                <Footer />
            </WebRTCWrapper>
        </Draggable>
    )
}
