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

export const ContainerBase = styled.div<{ minHeight?: string }>`
    padding: ${CSS_CONSTANTS.padding};
    border: ${CSS_CONSTANTS.borderWidth} solid ${COLORS.primaryMain};
    border-radius: ${CSS_CONSTANTS.borderRadius};
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: ${({ minHeight }) => minHeight};
`

const BackThemeColor = styled(FullSize)<{ variant?: ThemeVariant }>`
    position: absolute;
    left: 0;
    top: 0;
    background-color: ${({ variant }) => colorThemeSegregator(variant)};
    opacity: 0.95;
    border-radius: ${CSS_CONSTANTS.borderRadius};
`

export const StandardContainer: React.FC<StandardContainerProps> = (props) => (
    <BackThemeImage withMargin width={props.width} borderRadius={CSS_CONSTANTS.borderRadius}>
        <BackThemeColor variant={props.variant} />
        <ContainerBase minHeight={props.minHeight}>{props.children}</ContainerBase>
    </BackThemeImage>
)
