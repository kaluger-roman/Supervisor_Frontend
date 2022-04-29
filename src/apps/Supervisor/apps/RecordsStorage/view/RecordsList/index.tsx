import { StandardContainer } from "components/Containers"
import { Pagination } from "components/Pagination"
import { StandardText } from "components/Text"
import { COLORS } from "config/globalStyles/colors"
import React from "react"
import { Watch } from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { useSESelector } from "Supervisor/redux/hooks"
import { useRecordsMutation } from "Supervisor/redux/reducers/api/supervisor.api"
import { changeRecordsPage } from "Supervisor/redux/reducers/recordsStorage"
import { SHARE_RECORDS_KEY } from "../Filters/const"
import { RecordItem } from "../RecordItem"
import { RecordItemContainer } from "../RecordItem/styled"
import {
    HeaderCell,
    InfoContainer,
    InnerRecordsListContainer,
    NoDataContainer,
    WithPaginationContainer
} from "./styled"

export const RecordsList: React.FC = () => {
    const dispatch = useDispatch()
    const { page } = useSESelector((state) => state.recordsStorage)

    const [_, { data, isLoading }] = useRecordsMutation({
        fixedCacheKey: SHARE_RECORDS_KEY
    })

    return (
        <StandardContainer fullHeight width="90vw">
            <InfoContainer>
                <RecordItemContainer header>
                    <HeaderCell>Id</HeaderCell>
                    <HeaderCell>Участник 1</HeaderCell>
                    <HeaderCell>Участник 2</HeaderCell>
                    <HeaderCell>Начало</HeaderCell>
                    <HeaderCell>Время(с)</HeaderCell>
                    <HeaderCell>Еще</HeaderCell>
                </RecordItemContainer>
                {data?.records?.length && !isLoading ? (
                    <WithPaginationContainer>
                        <InnerRecordsListContainer>
                            {data.records.map((record) => (
                                <RecordItem key={record.id} record={record} />
                            ))}
                        </InnerRecordsListContainer>
                        <Pagination
                            page={page}
                            total={data.total}
                            onChange={({ selected }) => dispatch(changeRecordsPage(selected))}
                        />
                    </WithPaginationContainer>
                ) : isLoading ? (
                    <NoDataContainer>
                        <Watch height={100} width={100} color={COLORS.primaryDark} />
                    </NoDataContainer>
                ) : (
                    <NoDataContainer>
                        <StandardText>Записей не найдено</StandardText>
                    </NoDataContainer>
                )}
            </InfoContainer>
        </StandardContainer>
    )
}
