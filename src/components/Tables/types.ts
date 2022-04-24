import React from "react"
import { Coords } from "../../types"

export type TableConfig = {
    template: TableTemplate
    cellsHeight: number[]
    cellsWidth: number[]
    rowFractions: number
    colFractions: number
    content: TableContent
    colors?: TableColors
    flex?: boolean
}

export type TableTemplate = Array<string[]>

export type TableColors = {
    [key: string]: string
}

export type TableContent = {
    [key: string]: React.ReactChild
}

export type TableProps = {
    config: TableConfig
}

export enum Positions {
    left = "left",
    right = "right",
    top = "top",
    bottom = "bottom",
    leftTop = "leftTop",
    leftBottom = "leftBottom",
    rightTop = "rightTop",
    rightBottom = "rightBottom"
}

export enum SpanCell {
    right = "right",
    bottom = "bottom"
}

export type Zones = { [key: string]: Coords[] }

export type CellRect = {
    minX: number
    maxX: number
    minY: number
    maxY: number
}
