import React from "react"
import { Filters } from "./Filters"
import { RecordsList } from "./RecordsList"

export const RecordsStorage: React.FC = () => {
    return (
        <div>
            <Filters />
            <RecordsList />
        </div>
    )
}
