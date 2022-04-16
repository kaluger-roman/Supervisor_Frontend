import { StandardContainer } from "components/Containers/styled"
import { Header, LargeHeader, PageHeader, SectionHeader } from "components/Headers"
import React from "react"
import { useSESelector } from "Supervisor/redux/hooks"
import { Filters } from "./Filters"

export const RecordsStorage: React.FC = () => {
    return (
        <div>
            <Filters />
        </div>
    )
}
