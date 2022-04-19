import { LargeText } from "components/Text"
import moment from "moment"
import React, { useState } from "react"
import ReactAudioPlayer from "react-audio-player"
import { CallStatus } from "Supervisor/redux/reducers/api/types"
import { MoreButton, RecordItemContainer, MoreInfoContainer } from "./styled"
import { RecordItemProps } from "./types"

const getStart = (statusSequence: string[], statusTimestampsSequence: number[]): string => {
    const activeIndex = statusSequence.findIndex((val) => val === CallStatus.active)

    return moment(statusTimestampsSequence[activeIndex]).format("HH:mm DD.MM")
}

const MoreInfo: React.FC<RecordItemProps & { shown: boolean }> = ({ record, shown }) => {
    return <MoreInfoContainer shown={shown}></MoreInfoContainer>
}

export const RecordItem: React.FC<RecordItemProps> = ({ record }) => {
    const [moreShown, setMoreShown] = useState<boolean>(false)

    return (
        <>
            <RecordItemContainer>
                <LargeText>{record.id}</LargeText>
                <LargeText>
                    {record.call?.caller?.username} ({record.call.callerWebrtcNumber})
                </LargeText>
                <LargeText>
                    {record.call?.callee?.username} ({record.call.calleeWebrtcNumber})
                </LargeText>
                <LargeText>{getStart(record.call.statusSequence, record.call.statusTimestampsSequence)}</LargeText>
                <LargeText>{record.duration}</LargeText>
                <MoreButton onClick={() => setMoreShown(!moreShown)} />
            </RecordItemContainer>
            <MoreInfo record={record} shown={moreShown} />
        </>
    )
}
