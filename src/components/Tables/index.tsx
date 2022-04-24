import React, { useMemo } from "react"
import { TableProps } from "./types"
import { TableCell, TableContainer } from "./styled"
import { uniq } from "lodash"
import { defineIdZones, findCellRect, validateTemplate } from "./helper"

export const Table: React.FC<TableProps> = ({ config }) => {
    const idZones = useMemo(() => defineIdZones(config.template), [config.template])
    const isTemplateValid = useMemo(() => validateTemplate(config.template, idZones), [config.template, idZones])
    const allIds = useMemo(() => uniq(config.template.flat(2)), [config.template])

    if (!isTemplateValid) return <>Invalid Table</>

    return (
        <TableContainer config={config}>
            {allIds.map((cellId) => (
                <TableCell key={cellId} cellId={cellId} config={config} cellRect={findCellRect(idZones[cellId])}>
                    {config.content[cellId]}
                </TableCell>
            ))}
        </TableContainer>
    )
}
