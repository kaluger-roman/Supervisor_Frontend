import { StandardContainer } from "components/Containers"
import { Pagination } from "components/Pagination"
import { StandardText } from "components/Text"
import { COLORS } from "config/globalStyles/colors"
import React, { useCallback, useEffect, useMemo, useRef } from "react"
import { Watch } from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { NEXT_SORT_ORDER } from "Supervisor/constants"
import { useSESelector } from "Supervisor/redux/hooks"
import { useRecordsMutation } from "Supervisor/redux/reducers/api/supervisor.api"
import { changeRecordsPage, changeSortOrder } from "Supervisor/redux/reducers/recordsStorage"
import { SortedFieldsRecordFilters } from "Supervisor/redux/reducers/types"
import { SortOrder } from "root/types"
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
import { CenteredDiv } from "components/styled"
import { PER_PAGE_STANDARD_LIMIT } from "components/Pagination/const"
import { SortItem } from "Supervisor/redux/reducers/api/types"
import { equals } from "ramda"

const SortedHeader: React.FC<{ sortKey?: SortedFieldsRecordFilters }> = ({ children, sortKey }) => {
    const dispatch = useDispatch()
    const { order } = useSESelector((state) => state.recordsStorage)

    const sortOrder = useMemo(() => order.find((item) => item.key === sortKey)?.order, [order, sortKey])

    const sortHandler = useCallback(() => {
        if (!sortKey) return

        dispatch(
            changeSortOrder({
                key: sortKey,
                order: NEXT_SORT_ORDER[sortOrder || SortOrder.unset]
            })
        )
    }, [sortKey, sortOrder, dispatch])

    return (
        <CenteredDiv onClick={sortHandler}>
            <HeaderCell sortOrder={sortOrder}>{children}</HeaderCell>
        </CenteredDiv>
    )
}

export const RecordsList: React.FC = () => {
    const dispatch = useDispatch()
    const { durationFilter, calleesList, callersList, page, order, searchStatuses, crimeRateFilter } = useSESelector(
        (state) => state.recordsStorage
    )
    const oldOrder = useRef<SortItem[]>([])

    const [fetchRecords, { data, isLoading }] = useRecordsMutation({
        fixedCacheKey: SHARE_RECORDS_KEY
    })

    useEffect(() => {
        if (equals(order, oldOrder.current)) return

        oldOrder.current = order

        fetchRecords({
            status: searchStatuses,
            calleesList: calleesList.map((item) => item.value),
            callersList: callersList.map((item) => item.value),
            duration: durationFilter,
            limit: PER_PAGE_STANDARD_LIMIT,
            page: page,
            orderBy: order,
            crimeRateFilter
        })
    }, [order, calleesList, callersList, durationFilter, page, fetchRecords, searchStatuses, crimeRateFilter])

    return (
        <StandardContainer fullHeight width="90vw">
            <InfoContainer>
                <RecordItemContainer header>
                    <SortedHeader sortKey={SortedFieldsRecordFilters.id}>Id</SortedHeader>
                    <SortedHeader sortKey={SortedFieldsRecordFilters.callerName}>Участник 1</SortedHeader>
                    <SortedHeader sortKey={SortedFieldsRecordFilters.calleeName}>Участник 2</SortedHeader>
                    <SortedHeader sortKey={SortedFieldsRecordFilters.start}>Начало</SortedHeader>
                    <SortedHeader sortKey={SortedFieldsRecordFilters.duration}>Время(с)</SortedHeader>
                    <SortedHeader sortKey={SortedFieldsRecordFilters.status}>Статус</SortedHeader>
                    <SortedHeader sortKey={SortedFieldsRecordFilters.calleeName}>Подозрение</SortedHeader>
                    <SortedHeader>Еще</SortedHeader>
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
