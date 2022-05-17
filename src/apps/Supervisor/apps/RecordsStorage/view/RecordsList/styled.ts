import styled from "@emotion/styled"
import { SubHeader } from "components/Headers"
import { CenteredDiv } from "components/styled"
import { COLORS } from "config/globalStyles/colors"
import { CSS_CONSTANTS } from "config/globalStyles/common"
import { SortOrder } from "root/types"
import SortIcon from "../icons/arrow-up.png"

export const InfoContainer = styled(CenteredDiv)<{ centered?: boolean }>`
    height: 100%;
    min-height: 400px;
    justify-content: ${({ centered }) => (centered ? "center" : "flex-start")};
    flex-direction: column;
    width: 100%;
`

export const NoDataContainer = styled(CenteredDiv)`
    height: 100%;
    glex-grow: 1;
`

export const WithPaginationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-grow: 1;
    position: relative;

    .pagination {
        margin-top: ${CSS_CONSTANTS.margin};
    }
`

export const HeaderCell = styled(SubHeader)<{ sortOrder?: SortOrder }>`
    padding: 0;
    margin: 0;
    cursor: pointer;
    width: fit-content;
    padding: 0 20px;
    user-select: none;

    &: after {
        content: "";
        display: ${({ sortOrder }) => (!sortOrder || sortOrder === SortOrder.unset ? "none" : "block")};
        position: absolute;
        right: 0;
        top: 6px;
        height: 12px;
        width: 12px;
        mask-image: url(${SortIcon});
        mask-size: cover;
        mask-position: center;
        transform: rotate(${({ sortOrder }) => (sortOrder === SortOrder.asc ? "0" : "180deg")});
        background-color: ${COLORS.primaryMain};
    }
`

export const InnerRecordsListContainer = styled.div`
    width: 100%;
    height: 0;
    flex-grow: 1;
    overflow: scroll;
`
