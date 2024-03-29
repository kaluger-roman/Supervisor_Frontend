import styled from "@emotion/styled"
import { sum } from "lodash"
import { add, inc } from "ramda"
import { COLORS } from "../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { CenteredDivStyle, FullSize } from "../styled"
import { checkPosition, needSpan } from "./helper"
import { CellRect, Positions, SpanCell, TableConfig } from "./types"

export const TableContainer = styled.div<{ config: TableConfig }>`
    ${({ config }) => `
    ${config.flex ? "flex-basis" : "width"}: ${sum(config.cellsWidth)}px;
    height: ${sum(config.cellsHeight)}px;
    grid-template-rows: ${config.cellsHeight.map((cell) => `${cell}px`).join(" ")};
    grid-template-columns: ${config.cellsWidth.map((cell) => `${cell}${config.flex ? "fr" : "px"}`).join(" ")};
    width:${config.flex ? "100%" : "unset"};
`}
    display: grid;
    color: ${COLORS.primaryDark};
`

export const TableCell = styled(FullSize)<{ cellId: string; cellRect: CellRect; config: TableConfig }>`
    ${({ cellRect, config, cellId }) => `
    border-radius: 
    ${Number(checkPosition(cellRect.minX, cellRect.minY, config, Positions.leftTop)) && CSS_CONSTANTS.borderRadius} 
    ${Number(checkPosition(cellRect.maxX, cellRect.minY, config, Positions.rightTop)) && CSS_CONSTANTS.borderRadius} 
    ${Number(checkPosition(cellRect.maxX, cellRect.maxY, config, Positions.rightBottom)) && CSS_CONSTANTS.borderRadius} 
    ${Number(checkPosition(cellRect.minX, cellRect.maxY, config, Positions.leftBottom)) && CSS_CONSTANTS.borderRadius};
    border-width:
    ${Number(checkPosition(cellRect.minX, cellRect.minY, config, Positions.top)) && CSS_CONSTANTS.borderWidth}
    ${Number(needSpan(cellRect.maxX, cellRect.minY, config, SpanCell.right)) && CSS_CONSTANTS.borderWidth}
    ${Number(needSpan(cellRect.minX, cellRect.maxY, config, SpanCell.bottom)) && CSS_CONSTANTS.borderWidth}
    ${Number(checkPosition(cellRect.minX, cellRect.minY, config, Positions.left)) && CSS_CONSTANTS.borderWidth};
    grid-area: ${inc(cellRect.minY)} / ${inc(cellRect.minX)} / ${add(cellRect.maxY, 2)} / ${add(cellRect.maxX, 2)};
    background: ${(config.colors && config.colors[cellId]) || COLORS.deepLightSecondary};
`}
    border-color: ${COLORS.primaryDark};
    border-style: solid;
    text-align: center;
    ${CenteredDivStyle}
`
