import { StandardContainer } from "components/Containers"
import { Header } from "components/Headers"
import { Selector } from "components/Selectors"
import React, { useCallback, useMemo } from "react"
import { Option } from "components/Checkboxes/types"
import { CallStatus, User } from "Supervisor/redux/reducers/api/types"
import { FiltersContainer, FindBtnContainer, StatusFiltersContainer } from "./styled"
import { InputWidth } from "components/Inputs/types"
import { SingleSlider, Slider } from "components/Slider"
import { useSESelector } from "Supervisor/redux/hooks"
import { useDispatch } from "react-redux"
import {
    changeMaxDuration,
    changeMinDuration,
    changeSearchCalleeValue,
    changeSearchCallerValue,
    changeCalleesList,
    changeCallersList,
    changeSearchStatuses,
    changeCrimeRateFilter
} from "Supervisor/redux/reducers/recordsStorage"
import { useRecordsMutation, useUsersQuery } from "Supervisor/redux/reducers/api/supervisor.api"
import { SHARE_RECORDS_KEY, STANDARD_USERS_LIMIT } from "./const"
import { isEqual, uniqWith } from "lodash"
import { StandardButton } from "components/Buttons"
import { PER_PAGE_STANDARD_LIMIT } from "components/Pagination/const"
import Checkboxes from "components/Checkboxes"

const buildUserOptions = (users: User[]): Option<string>[] =>
    users.map((user) => ({ label: user.username, value: String(user.id), key: String(user.id) }))

const usersOptionsToVals = (opt: Option<string>[]): string[] => opt.map((opt) => String(opt.value))

const userOptionsByValues = (opts: Option<string>[], values: string[]): Option<string>[] =>
    opts.filter((opts) => values.includes(String(opts.value)))

export const Filters: React.FC = () => {
    const {
        crimeRateFilter,
        durationFilter,
        calleesList,
        callersList,
        searchCalleeValue,
        searchCallerValue,
        page,
        order,
        searchStatuses
    } = useSESelector((state) => state.recordsStorage)
    const dispatch = useDispatch()
    const { data: calleeFound, isLoading: isCalleeOptionsLoading } = useUsersQuery({
        username: searchCalleeValue,
        limit: STANDARD_USERS_LIMIT
    })
    const { data: callerFound, isLoading: isCallerOptionsLoading } = useUsersQuery({
        username: searchCallerValue,
        limit: STANDARD_USERS_LIMIT
    })

    const calleeOptions = useMemo(
        () => uniqWith([...calleesList, ...buildUserOptions(calleeFound || [])], isEqual),
        [calleesList, calleeFound]
    )
    const callerOptions = useMemo(
        () => uniqWith([...callersList, ...buildUserOptions(callerFound || [])], isEqual),
        [callersList, callerFound]
    )

    const calleeVals = usersOptionsToVals(calleesList)
    const callerVals = usersOptionsToVals(callersList)

    const [fetchRecords] = useRecordsMutation({
        fixedCacheKey: SHARE_RECORDS_KEY
    })

    const fetchRecordsCb = useCallback(
        () =>
            fetchRecords({
                status: searchStatuses,
                calleesList: calleeVals,
                callersList: callerVals,
                duration: durationFilter,
                limit: PER_PAGE_STANDARD_LIMIT,
                page: page,
                orderBy: order,
                crimeRateFilter
            }),
        [calleeVals, callerVals, durationFilter, page, order, fetchRecords, searchStatuses, crimeRateFilter]
    )

    return (
        <StandardContainer width="90vw">
            <Header>Фильтры</Header>
            <FiltersContainer>
                <Selector
                    label="Вызываемый абонент"
                    onChange={(vals) => {
                        dispatch(changeCalleesList(userOptionsByValues(calleeOptions, vals as string[])))
                    }}
                    value={calleeVals}
                    options={calleeOptions}
                    inputWidth={InputWidth.long}
                    multipleChoice
                    searchable
                    onSearchChange={(val) => dispatch(changeSearchCalleeValue(val))}
                    searchValue={searchCalleeValue}
                    isOnlineSearching={isCalleeOptionsLoading}
                />
                <Selector
                    label="Инициирующий абонент"
                    onChange={(vals) => {
                        dispatch(changeCallersList(userOptionsByValues(callerOptions, vals as string[])))
                    }}
                    value={callerVals}
                    options={callerOptions}
                    inputWidth={InputWidth.long}
                    multipleChoice
                    searchable
                    onSearchChange={(val) => dispatch(changeSearchCallerValue(val))}
                    searchValue={searchCallerValue}
                    isOnlineSearching={isCallerOptionsLoading}
                />
                <Slider
                    onChange={(value) => {
                        dispatch(changeMinDuration(value[0]))
                        dispatch(changeMaxDuration(value[1]))
                    }}
                    value={[durationFilter.from, durationFilter.to]}
                    ariaLabel={["Min", "Max"]}
                    ariaValuetext="Длительность звонка"
                    pearling
                    min={0}
                    max={60}
                    minDistance={5}
                    inputWidth={InputWidth.long}
                />
                <SingleSlider
                    onChange={(value) => dispatch(changeCrimeRateFilter(value))}
                    value={crimeRateFilter}
                    ariaLabel={"Минимальный уровень"}
                    ariaValuetext="Минимальная опасность"
                    pearling
                    min={0}
                    max={100}
                    inputWidth={InputWidth.long}
                />
                <StatusFiltersContainer>
                    <Checkboxes
                        options={[
                            { key: CallStatus.active, value: CallStatus.active, label: "Активны сейчас" },
                            { key: CallStatus.ended, value: CallStatus.ended, label: "Завершенные" }
                        ]}
                        multipleChoice
                        onChange={(newVals) => dispatch(changeSearchStatuses(newVals as CallStatus[]))}
                        selected={searchStatuses}
                    />
                </StatusFiltersContainer>
                <FindBtnContainer>
                    <StandardButton onClick={fetchRecordsCb}>Найти</StandardButton>
                </FindBtnContainer>
            </FiltersContainer>
        </StandardContainer>
    )
}
