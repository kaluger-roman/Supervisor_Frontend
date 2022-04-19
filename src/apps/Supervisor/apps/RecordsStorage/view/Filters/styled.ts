import styled from "@emotion/styled"
import { CenteredDiv } from "components/styled"

export const FiltersContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 260px);
    justify-items: center;
    width: fit-content;
`

export const FindBtnContainer = styled(CenteredDiv)`
    grid-column-start: 2;
    justify-content: flex-start;
    margin-top: 20px;
`
