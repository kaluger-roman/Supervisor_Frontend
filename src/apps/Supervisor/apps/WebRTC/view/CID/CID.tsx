import React from "react"
import { CIDWrapper } from "./styled"
import { useSESelector } from "Supervisor/redux/hooks"

export const CID: React.FC = () => {
    const { webrtcNumber } = useSESelector((state) => state.main)

    return <CIDWrapper>Ваш номер - {webrtcNumber}</CIDWrapper>
}
