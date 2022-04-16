import { StandardContainer } from "components/Containers"
import { Header } from "components/Headers"
import { Selector } from "components/Selectors"
import React, { useMemo } from "react"

import { Option } from "components/Checkboxes/types"
import { User } from "Supervisor/redux/reducers/api/types"
import { FiltersContainer } from "./styled"
import { InputWidth } from "components/Inputs/types"
import { Slider } from "components/Slider"
import { useSESelector } from "Supervisor/redux/hooks"
import { useDispatch } from "react-redux"
import {
    changeMaxDuration,
    changeMinDuration,
    changeSearchCalleeValue,
    changeSearchCallerValue,
    changeCalleesList,
    changeCallersList
} from "Supervisor/redux/reducers/recordsStorage"
import { useUsersQuery } from "Supervisor/redux/reducers/api/supervisor.api"
import { STANDARD_USERS_LIMIT } from "./const"
import { isEqual, uniqWith } from "lodash"

const buildUserOptions = (users: User[]): Option<string>[] =>
    users.map((user) => ({ label: user.username, value: String(user.id), key: String(user.id) }))

const usersOptionsToVals = (opt: Option<string>[]): string[] => opt.map((opt) => String(opt.value))

const userOptionsByValues = (opts: Option<string>[], values: string[]): Option<string>[] =>
    opts.filter((opts) => values.includes(String(opts.value)))

export const Filters: React.FC = () => {
    const { durationFilter, calleesList, callersList, searchCalleeValue, searchCallerValue } = useSESelector(
        (state) => state.recordsStorage
    )
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

    return (
        <StandardContainer width="90vw">
            <Header>Фильтры</Header>
            <FiltersContainer>
                <Selector
                    label="Вызываемый абонент"
                    onChange={(vals) => {
                        dispatch(changeCalleesList(userOptionsByValues(calleeOptions, vals as string[])))
                    }}
                    value={usersOptionsToVals(calleesList)}
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
                    value={usersOptionsToVals(callersList)}
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
            </FiltersContainer>
        </StandardContainer>
    )
}
