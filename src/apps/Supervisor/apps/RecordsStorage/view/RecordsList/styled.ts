import styled from "@emotion/styled"
import { SubHeader } from "components/Headers"
import { CenteredDiv } from "components/styled"

export const InfoContainer = styled(CenteredDiv)<{ centered?: boolean }>`
    height: 100%;
    min-height: 400px;
    justify-content: ${({ centered }) => (centered ? "center" : "flex-start")};
    flex-direction: column;
    width: 100%;
`

export const WithPaginationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-grow: 1;
`

export const HeaderCell = styled(SubHeader)`
    padding: 0;
    margin: 0;
`

export const InnerRecordsListContainer = styled.div`
    width: 100%;
`
