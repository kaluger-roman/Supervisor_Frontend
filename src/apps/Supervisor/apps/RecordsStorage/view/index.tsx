import React from "react"
import { Filters } from "./Filters"
import { RecordsList } from "./RecordsList"
import { RecordsContainer } from "./styled"

export const RecordsStorage: React.FC = () => {
    return (
        <RecordsContainer>
            <Filters />
            <RecordsList />
        </RecordsContainer>
    )
}
