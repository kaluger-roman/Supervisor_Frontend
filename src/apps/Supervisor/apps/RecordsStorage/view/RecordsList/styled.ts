import styled from "@emotion/styled"
import { SubHeader } from "components/Headers"
import { CenteredDiv } from "components/styled"
import { CSS_CONSTANTS } from "config/globalStyles/common"

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

export const HeaderCell = styled(SubHeader)`
    padding: 0;
    margin: 0;
`

export const InnerRecordsListContainer = styled.div`
    width: 100%;
    height: 0;
    flex-grow: 1;
    overflow: scroll;
`
