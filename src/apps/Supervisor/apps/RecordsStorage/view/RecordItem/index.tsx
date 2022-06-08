import { useOverflow } from "components/helpers"
import { Table } from "components/Tables"
import { LargeText } from "components/Text"
import { StandardText, Tooltip } from "components/Text/styled"
import { first, range } from "lodash"
import moment from "moment"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import { CallStatus, ConvertedTrscrtUnitGroup } from "Supervisor/redux/reducers/api/types"
import { useRecordSrcMutation, useRecordTranscriptionQuery } from "Supervisor/redux/reducers/api/supervisor.api"
import {
    MoreButton,
    RecordItemContainer,
    MoreInfoContainer,
    CallStatusLabel,
    LoadingContainer,
    TranscriptionContainer,
    TranscriptionHeader,
    TranscriptionSide,
    NumberTag,
    IconCall,
    AuthenticityRate,
    IconAnswer,
    AuthenticityValue,
    TranscriptionBody,
    MessageBlock,
    MainText,
    Word,
    Stats,
    ConfStat,
    NoTranscriptsContainer,
    StatusLabel
} from "./styled"
import { RecordItemProps } from "./types"
import "./player.scss"
import { Watch } from "react-loader-spinner"
import { COLORS } from "config/globalStyles/colors"
import { countAuthenticityRate, countRecordAuthenticityRate, makeCommonTranscriptList } from "../../helpers"
import H5AudioPlayer from "react-h5-audio-player"

const getStatusTime = (
    statusSequence: string[],
    statusTimestampsSequence: number[],
    statuses: CallStatus[]
): string => {
    const activeIndex = statusSequence.findIndex((val) => statuses.includes(val as CallStatus))

    return moment.unix(statusTimestampsSequence[activeIndex]).format("HH:mm DD.MM")
}

const Message: React.FC<ConvertedTrscrtUnitGroup & { jumpTo: (time: number) => void }> = ({ data, side, jumpTo }) => {
    return (
        <MessageBlock side={side}>
            <MainText>
                {data.map((unit, inx) => (
                    <Word key={inx} conf={unit.conf}>
                        {unit.word}
                    </Word>
                ))}
            </MainText>
            <Stats>
                <ConfStat>Conf={countAuthenticityRate(data)}</ConfStat>
                <ConfStat onClick={() => jumpTo(first(data)?.start || 0)} isAction>
                    Jump To
                </ConfStat>
            </Stats>
        </MessageBlock>
    )
}

const Transcription: React.FC<RecordItemProps & { jumpTo: (time: number) => void }> = ({ record, jumpTo }) => {
    const { data, isLoading } = useRecordTranscriptionQuery({ id: record.id })
    const authenticityRate = useMemo(() => countRecordAuthenticityRate(data) || 0, [data])
    const convertedData = useMemo(() => data && makeCommonTranscriptList(data), [data])

    return (
        <TranscriptionContainer>
            {isLoading ? (
                <NoTranscriptsContainer>
                    <Watch width={100} height={100} color={COLORS.primaryDark} />
                </NoTranscriptsContainer>
            ) : (
                <>
                    <TranscriptionHeader>
                        <TranscriptionSide first>
                            {record.call.caller.username}
                            <NumberTag>{record.call.callerWebrtcNumber}</NumberTag>
                        </TranscriptionSide>
                        <IconCall />
                        <AuthenticityRate>
                            Достоверность:{" "}
                            <AuthenticityValue value={authenticityRate}>{authenticityRate}%</AuthenticityValue>
                        </AuthenticityRate>
                        <IconAnswer />
                        <TranscriptionSide>
                            <NumberTag>{record.call.calleeWebrtcNumber}</NumberTag>
                            {record.call.callee.username}
                        </TranscriptionSide>
                    </TranscriptionHeader>
                    {convertedData?.length ? (
                        <TranscriptionBody>
                            {convertedData.map((unit) => (
                                <Message jumpTo={jumpTo} key={first(unit.data)!.id} {...unit} />
                            ))}
                        </TranscriptionBody>
                    ) : (
                        <NoTranscriptsContainer>
                            <StandardText>Транскрипций не найдено</StandardText>
                        </NoTranscriptsContainer>
                    )}
                </>
            )}
        </TranscriptionContainer>
    )
}

const MoreInfo: React.FC<RecordItemProps & { shown: boolean }> = ({ record, shown }) => {
    const [animationOn, setAnimationOn] = useState<boolean>(false)
    const [URISrc, setURISrc] = useState<string>()
    const audioRef = useRef<H5AudioPlayer | null>(null)
    const [trigger, { data, isLoading }] = useRecordSrcMutation()

    const jumpTo = useCallback((time: number) => {
        if (audioRef.current?.audio.current) {
            audioRef.current?.audio.current?.play()
            audioRef.current.audio.current.currentTime = time
        }
    }, [])

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
            {isLoading ? (
                <LoadingContainer>
                    <Watch width={50} height={50} color={COLORS.primaryDark} />
                </LoadingContainer>
            ) : (
                <AudioPlayer
                    ref={audioRef}
                    className="AudioPlayer"
                    showJumpControls={false}
                    showFilledVolume
                    layout="horizontal-reverse"
                    customControlsSection={[RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS]}
                    src={URISrc}
                    autoPlayAfterSrcChange={false}
                />
            )}

            {shown && <Transcription record={record} jumpTo={jumpTo} />}
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
                <LargeText>
                    <StatusLabel status={record.call.status}>{record.call.status}</StatusLabel>
                </LargeText>
                <MoreButton onClick={() => setMoreShown(!moreShown)} />
                <Tooltip />
            </RecordItemContainer>
            <MoreInfo record={record} shown={moreShown} />
        </>
    )
}
