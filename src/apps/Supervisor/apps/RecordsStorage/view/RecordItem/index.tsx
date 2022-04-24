import { useOverflow } from "components/helpers"
import { Table } from "components/Tables"
import { LargeText } from "components/Text"
import { Tooltip } from "components/Text/styled"
import { range } from "lodash"
import moment from "moment"
import React, { useEffect, useState } from "react"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import { CallStatus } from "Supervisor/redux/reducers/api/types"
import { useRecordSrcMutation } from "Supervisor/redux/reducers/api/supervisor.api"
import { MoreButton, RecordItemContainer, MoreInfoContainer, CallStatusLabel } from "./styled"
import { RecordItemProps } from "./types"
import "./player.scss"

const getStatusTime = (
    statusSequence: string[],
    statusTimestampsSequence: number[],
    statuses: CallStatus[]
): string => {
    const activeIndex = statusSequence.findIndex((val) => statuses.includes(val as CallStatus))

    return moment(statusTimestampsSequence[activeIndex]).format("HH:mm DD.MM")
}

const Transcription: React.FC = () => {
    return null
}

const MoreInfo: React.FC<RecordItemProps & { shown: boolean }> = ({ record, shown }) => {
    const [animationOn, setAnimationOn] = useState<boolean>(false)
    const [URISrc, setURISrc] = useState<string>()
    const [trigger, { data }] = useRecordSrcMutation()

    useEffect(() => {
        if (shown && !animationOn) setAnimationOn(true)

        if (shown && !data) trigger({ id: record.id })

        if (data && !URISrc)
            setURISrc(URL.createObjectURL(new Blob([Uint8Array.from(data.data)], { type: "audio/mpeg" })))

        if (!shown && URISrc) URL.revokeObjectURL(URISrc)
    }, [shown, data, URISrc, animationOn, record.id, trigger])

    return (
        <MoreInfoContainer shown={shown} animationOn={animationOn}>
            <Table
                config={{
                    flex: true,
                    template: [range(1, 10).map((x) => "1" + x), range(1, 10).map((x) => "2" + x)],
                    cellsHeight: [60, 50],
                    cellsWidth: [4, 7, 7, 10, 10, 7, 8, 8, 6],
                    rowFractions: 2,
                    colFractions: 9,
                    content: {
                        "11": "Id",
                        "12": "WebRTC номер звонящего",
                        "13": "WebRTC номер вызываемого",
                        "14": "Имя звонящего",
                        "15": "Имя вызываемого",
                        "16": "Длительность записи,c",
                        "17": "Начало звонка",
                        "18": "Конец звонка",
                        "19": "Статус звонка",
                        "21": record.id,
                        "22": record.call.callerWebrtcNumber,
                        "23": record.call.calleeWebrtcNumber,
                        "24": record.call.caller.username,
                        "25": record.call.callee.username,
                        "26": record.duration,
                        "27": getStatusTime(record.call.statusSequence, record.call.statusTimestampsSequence, [
                            CallStatus.active
                        ]),
                        "28": getStatusTime(record.call.statusSequence, record.call.statusTimestampsSequence, [
                            CallStatus.ended,
                            CallStatus.failed
                        ]),
                        "29": <CallStatusLabel status={record.call.status}>{record.call.status}</CallStatusLabel>
                    }
                }}
            />
            <AudioPlayer
                className="AudioPlayer"
                showJumpControls={false}
                showFilledVolume
                layout="horizontal-reverse"
                customControlsSection={[RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS]}
                src={URISrc}
                autoPlayAfterSrcChange={false}
            />
            <Transcription />
        </MoreInfoContainer>
    )
}

export const RecordItem: React.FC<RecordItemProps> = ({ record }) => {
    const [moreShown, setMoreShown] = useState<boolean>(false)
    const { isOverflow: nameFirstOverflow, elRef: nameFirstRef } = useOverflow<HTMLInputElement>()
    const { isOverflow: nameSecondOverflow, elRef: nameSecondRef } = useOverflow<HTMLInputElement>()

    return (
        <>
            <RecordItemContainer>
                <LargeText>{record.id}</LargeText>
                <LargeText ref={nameFirstRef} data-tip={nameFirstOverflow ? record.call?.caller?.username : ""}>
                    {record.call?.caller?.username}
                </LargeText>
                <LargeText ref={nameSecondRef} data-tip={nameSecondOverflow ? record.call?.callee?.username : ""}>
                    {record.call?.callee?.username}
                </LargeText>
                <LargeText>
                    {getStatusTime(record.call.statusSequence, record.call.statusTimestampsSequence, [
                        CallStatus.active
                    ])}
                </LargeText>
                <LargeText>{record.duration}</LargeText>
                <MoreButton onClick={() => setMoreShown(!moreShown)} />
                <Tooltip />
            </RecordItemContainer>
            <MoreInfo record={record} shown={moreShown} />
        </>
    )
}
