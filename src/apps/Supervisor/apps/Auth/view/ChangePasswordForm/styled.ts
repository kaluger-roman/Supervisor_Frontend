import styled from "@emotion/styled"
import { LENHTCH_COEFS } from "components/Inputs/constants"
import { InputWidth } from "components/Inputs/types"
import { CSS_CONSTANTS } from "config/globalStyles/common"

export const SecretInput = styled.div`
    width: ${parseInt(CSS_CONSTANTS.controlWidth) * LENHTCH_COEFS[InputWidth.long]}px;

    & > div:nth-child(1) {
        margin: 20px 0 10px 0;
    }
`
