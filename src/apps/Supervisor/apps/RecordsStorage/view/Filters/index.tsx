import { StandardContainer } from "components/Containers"
import { Header } from "components/Headers"
import { Selector } from "components/Selectors"
import React from "react"

import { Option } from "components/Checkboxes/types"
import { User } from "Supervisor/redux/reducers/api/types"
import { FiltersContainer } from "./styled"
import { InputWidth } from "components/Inputs/types"
import { Slider } from "components/Slider"
import { useSESelector } from "Supervisor/redux/hooks"
import { useDispatch } from "react-redux"
import { changeMaxDuration, changeMinDuration, changeSelectUsersInput } from "Supervisor/redux/reducers/recordsStorage"

const buildUserOptions = (users: User[]): Option<string>[] =>
    users.map((user) => ({ label: user.username, value: String(user.id), key: String(user.id) }))

export const Filters: React.FC = () => {
    const { durationFilter, calleesList, callersList, selectUsersInput } = useSESelector(
        (state) => state.recordsStorage
    )
    const dispatch = useDispatch()

    return (
        <StandardContainer width="90vw">
            <Header>Фильтры</Header>
            <FiltersContainer>
                <Selector
                    withEmpty
                    label="Вызываемый абонент"
                    onChange={() => {}}
                    value={""}
                    options={buildUserOptions([])}
                    inputWidth={InputWidth.long}
                    multipleChoice
                    searchable
                    onSearchChange={(val) => dispatch(changeSelectUsersInput(val))}
                />
                <Selector
                    withEmpty
                    label="Инициирующий абонент"
                    onChange={() => {}}
                    value={""}
                    options={buildUserOptions([])}
                    inputWidth={InputWidth.long}
                    multipleChoice
                    searchable
                    onSearchChange={(val) => dispatch(changeSelectUsersInput(val))}
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
