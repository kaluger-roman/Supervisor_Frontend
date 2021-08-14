import { min, range } from "lodash"
import { always, cond, dec, equals, inc, T } from "ramda"
import { CellRect, Coords, Positions, SpanCell, TableConfig, TableContent, TableTemplate, Zones } from "./types"

const fillCols =
    (colsNumber: number) =>
    (rowInx: number): string[] =>
        range(colsNumber).map((colInx: number) => String(rowInx * colsNumber + colInx))

export const createSimpleConfig = (
    rowsNumber: number,
    colsNumber: number,
    width: number,
    height: number,
    content: TableContent
): TableConfig => ({
    template: range(rowsNumber).map(fillCols(colsNumber)),
    cellsHeight: Array(rowsNumber).fill(height / rowsNumber),
    cellsWidth: Array(colsNumber).fill(width / colsNumber),
    rowFractions: rowsNumber,
    colFractions: colsNumber,
    content
})

export const isRightCellTheSame = (x: number, y: number, config: TableConfig): boolean =>
    x !== dec(config.colFractions) && config.template[y][x] === config.template[y][inc(x)]

export const isBottomCellTheSame = (x: number, y: number, config: TableConfig): boolean =>
    y !== dec(config.rowFractions) && config.template[y][x] === config.template[inc(y)][x]

export const checkPosition = (x: number, y: number, config: TableConfig, position: Positions): boolean =>
    cond<any, boolean>([
        [equals(Positions.top), always(y === 0)],
        [equals(Positions.left), always(x === 0)],
        [equals(Positions.leftBottom), always(x === 0 && y === dec(config.rowFractions))],
        [equals(Positions.leftTop), always(x === 0 && y === 0)],
        [equals(Positions.rightBottom), always(x === dec(config.colFractions) && y === dec(config.rowFractions))],
        [equals(Positions.rightTop), always(x === dec(config.colFractions) && y === 0)],
        [T, always(false)]
    ])(position)

export const needSpan = (x: number, y: number, config: TableConfig, position: SpanCell): boolean =>
    cond<any, boolean>([
        [equals(SpanCell.right), always(x === config.colFractions || !isRightCellTheSame(x, y, config))],
        [equals(SpanCell.bottom), always(y === config.rowFractions || !isBottomCellTheSame(x, y, config))],
        [T, always(false)]
    ])(position)

export const findCellRect = (coords: Coords[]): CellRect => {
    const allX = coords.map((coord) => coord.x)
    const allY = coords.map((coord) => coord.y)
    return {
        minX: Math.min(...allX),
        maxX: Math.max(...allX),
        minY: Math.min(...allY),
        maxY: Math.max(...allY)
    }
}

export const defineIdZones = (template: TableTemplate): Zones => {
    const idZones: Zones = {}
    template.forEach((row, rowInx) =>
        row.forEach((id, colInx) => (idZones[id] || (idZones[id] = [])).push({ x: colInx, y: rowInx }))
    )
    return idZones
}

export const validateTemplate = (template: TableTemplate, idZones: Zones): boolean =>
    Object.entries(idZones).every(([id, coords]) => {
        const rect = findCellRect(coords)
        return range(rect.minX, inc(rect.maxX)).every((x) =>
            range(rect.minY, inc(rect.maxY)).every((y) => template[y][x] === id)
        )
    })
