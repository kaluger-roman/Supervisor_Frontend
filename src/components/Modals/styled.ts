import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { COLORS, withOpacity } from "../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { CenteredDiv, CenteredDivStyle, FullScreenStyle } from "../styled"
import { ModalSize } from "./types"

const BackdropIn = keyframes`
    from{
        background: transparent;
    }

    to{
        background: ${withOpacity(COLORS.fullDark, Number(CSS_CONSTANTS.opacityOne))};
    }
`

const BackdropOut = keyframes`
    from{
        background: ${withOpacity(COLORS.fullDark, Number(CSS_CONSTANTS.opacityOne))};
    }

    to{
        background: transparent;
    }
`

const ModalIn = keyframes`
    from{
        transform: translateY(-100vh);
    }

    to{
        transform: translateY(0);
    }
`

const ModalOut = keyframes`
from{
    transform: translateY(0);
}

to{
   
    transform: translateY(-100vh);
}
`

export const Backdrop = styled(CenteredDiv)<{ beforeUnmount?: boolean }>`
    ${FullScreenStyle}
    animation-name: ${({ beforeUnmount }) => (beforeUnmount ? BackdropOut : BackdropIn)};
    animation-duration: ${CSS_CONSTANTS.shortAnimationDuraion};
    animation-fill-mode: forwards;
    z-index: ${CSS_CONSTANTS.zIndexImportant};

    & > div {
        animation-name: ${({ beforeUnmount }) => (beforeUnmount ? ModalOut : ModalIn)};
        animation-duration: ${CSS_CONSTANTS.shortAnimationDuraion};
        animation-fill-mode: forwards;
    }
`

const TypeToSize = {
    [ModalSize.large]: "width: 60vw; height: 60vh;",
    [ModalSize.standard]: "width: 40vw; height: 40vh;",
    [ModalSize.small]: "width: 20vw; height: 20vh;"
}

export const InnerContainer = styled.div<{ sizeType: ModalSize }>`
    ${({ sizeType }) => TypeToSize[sizeType]}
    position: relative;
    overflow: scroll;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    min-width: ${parseInt(CSS_CONSTANTS.buttonWidth) * 2}px;
`

export const Cancel = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`

export const ButtonsContainer = styled.div`
    padding-top: ${CSS_CONSTANTS.padding};
    display: flex;
    justify-content: space-between;
    border-top: ${CSS_CONSTANTS.thinBorderWidth} solid ${COLORS.deepLightDark};
    width: 100%;
`
export const TextContainer = styled.div`
    flex-grow: 1;
    ${CenteredDivStyle};
`
