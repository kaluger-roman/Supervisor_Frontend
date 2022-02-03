import styled from "@emotion/styled"
import { cond, equals, always, T } from "ramda"
import { COLORS } from "../../config/globalStyles/colors"
import { CSS_CONSTANTS } from "../../config/globalStyles/common"
import { BackThemeImage, FullSize } from "../styled"
import { ThemeVariant } from "../types"
import { StandardContainerProps } from "./types"

const colorThemeSegregator = cond([
    [equals(ThemeVariant.dark), always(COLORS.lightDark)],
    [equals(ThemeVariant.light), always(COLORS.deepLightDark)],
    [T, always(COLORS.lightDark)]
]) as (variant?: ThemeVariant) => COLORS

export const ContainerBase = styled.div`
    padding: ${CSS_CONSTANTS.padding};
    border: ${CSS_CONSTANTS.borderWidth} solid ${COLORS.primaryMain};
    border-radius: ${CSS_CONSTANTS.borderRadius};
    z-index: 2;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BackThemeColor = styled(FullSize)<{ variant?: ThemeVariant }>`
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${({ variant }) => colorThemeSegregator(variant)};
    opacity: 0.95;
    z-index: 1;
    border-radius: ${CSS_CONSTANTS.borderRadius};
`

export const StandardContainer: React.FC<StandardContainerProps> = (props) => (
    <BackThemeImage borderRadius={CSS_CONSTANTS.borderRadius}>
        <BackThemeColor variant={props.variant} />
        <ContainerBase>{props.children}</ContainerBase>
    </BackThemeImage>
)
