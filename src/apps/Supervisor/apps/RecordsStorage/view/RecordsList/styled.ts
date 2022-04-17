import styled from "@emotion/styled"
import { CenteredDiv } from "components/styled"

export const InfoContainer = styled(CenteredDiv)<{ centered?: boolean }>`
    height: 100%;
    min-height: 400px;
    justify-content: ${({ centered }) => (centered ? "center" : "flex-start")};
    flex-direction: column;
`

export const WithPaginationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
`
