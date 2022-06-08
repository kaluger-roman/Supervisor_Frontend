import styled from "@emotion/styled"
import { LENHTCH_COEFS } from "components/Inputs/constants"
import { InputWidth } from "components/Inputs/types"
import { CenteredDiv } from "components/styled"
import { CSS_CONSTANTS } from "config/globalStyles/common"

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

export const StatusFiltersContainer = styled(CenteredDiv)`
    display: flex;
    justify-content: flex-start;
    width: ${parseInt(CSS_CONSTANTS.controlWidth) * LENHTCH_COEFS[InputWidth.long]}px;
`
