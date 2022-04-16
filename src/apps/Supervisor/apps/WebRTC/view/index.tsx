import { CSS_CONSTANTS } from "config/globalStyles/common"
import React, { useMemo } from "react"
import Draggable from "react-draggable"
import { Body } from "./Body"
import { CID } from "./CID"
import { DRAGGABLE_CLASS } from "./constants"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { WebRTCWrapper, WEB_RTC_HEIGHT } from "./styled"

export const WebRTC = () => {
    const inititalWebrtcY = useMemo(
        () =>
            window.innerHeight -
            parseInt(CSS_CONSTANTS.navBarHeight) -
            parseInt(CSS_CONSTANTS.paddingLarge) -
            WEB_RTC_HEIGHT,
        []
    )

    return (
        <Draggable
            defaultPosition={{
                x: parseInt(CSS_CONSTANTS.padding),
                y: inititalWebrtcY
            }}
            handle={`.${DRAGGABLE_CLASS}`}
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
