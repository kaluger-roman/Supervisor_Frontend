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
import { InfoContainer, WithPaginationContainer } from "./styled"

export const RecordsList: React.FC = () => {
    const dispatch = useDispatch()
    const { page } = useSESelector((state) => state.recordsStorage)

    const [_, { data, isLoading }] = useRecordsMutation({
        fixedCacheKey: SHARE_RECORDS_KEY
    })

    return (
        <StandardContainer width="90vw">
            <InfoContainer centered={!data?.records?.length}>
                {data?.records?.length && !isLoading ? (
                    <WithPaginationContainer>
                        {data.records?.length}
                        <Pagination
                            page={page}
                            total={data.total}
                            onChange={({ selected }) => dispatch(changeRecordsPage(selected))}
                        />
                    </WithPaginationContainer>
                ) : isLoading ? (
                    <Watch height={100} width={100} color={COLORS.primaryDark} />
                ) : (
                    <StandardText>Записей не найдено</StandardText>
                )}
            </InfoContainer>
        </StandardContainer>
    )
}
