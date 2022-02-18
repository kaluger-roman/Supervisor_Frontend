import { always, cond, equals, T } from "ramda"
import React from "react"
import { useSESelector } from "../../../../../config/redux/hooks"
import { Pages } from "../../types"
import { InCall } from "./InCall"
import { Keypad } from "./Keypad"

const PageElement = cond<Pages, JSX.Element>([
    [equals<Pages>(Pages.call), always(<InCall />)],
    [equals<Pages>(Pages.keypad), always(<Keypad />)],
    [T, always(<Keypad />)]
])

export const Body: React.FC = () => {
    const { page } = useSESelector((state) => state.webRTC)

    return PageElement(page)
}
