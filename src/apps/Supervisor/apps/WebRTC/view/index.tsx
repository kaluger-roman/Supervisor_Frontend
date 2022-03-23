import { CSS_CONSTANTS } from "config/globalStyles/common"
import React from "react"
import Draggable from "react-draggable"
import { Body } from "./Body"
import { DRAGGABLE_CLASS } from "./constants"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { WebRTCWrapper, WEB_RTC_HEIGHT } from "./styled"

export const WebRTC = () => {
    return (
        <Draggable
            defaultPosition={{
                x: parseInt(CSS_CONSTANTS.padding),
                y: window.innerHeight - parseInt(CSS_CONSTANTS.padding) - WEB_RTC_HEIGHT
            }}
            handle={`.${DRAGGABLE_CLASS}`}
        >
            <WebRTCWrapper>
                <Header />
                <Body />
                <Footer />
            </WebRTCWrapper>
        </Draggable>
    )
}
