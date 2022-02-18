import React from "react"
import Draggable from "react-draggable"
import { Body } from "./Body"
import { DRAGGABLE_CLASS } from "./constants"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { WebRTCWrapper } from "./styled"

export const WebRTC = () => {
    return (
        <Draggable handle={`.${DRAGGABLE_CLASS}`}>
            <WebRTCWrapper>
                <Header />
                <Body />
                <Footer />
            </WebRTCWrapper>
        </Draggable>
    )
}
