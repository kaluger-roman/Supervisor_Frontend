import { InputWidth } from "components/Inputs/types"
import ReactSlider, { ReactSliderProps } from "react-slider"
import { SliderContainer, SliderLabelsContainer, SliderThrasholdLabel, Thumb, Track, SliderValuesLabel } from "./styled"

export const Slider: React.FC<ReactSliderProps<number[]> & { inputWidth?: InputWidth }> = (props) => (
    <SliderContainer inputWidth={props.inputWidth}>
        <SliderValuesLabel>{props.ariaValuetext}</SliderValuesLabel>
        <ReactSlider
            {...props}
            renderThumb={(props) => <div {...props} className={Thumb} />}
            renderTrack={(props) => <div {...props} className={Track} />}
        />
        <SliderLabelsContainer>
            <SliderThrasholdLabel>{props.value?.length && props.value[0]}</SliderThrasholdLabel>
            <SliderThrasholdLabel>{props.value?.length && props.value[1]}</SliderThrasholdLabel>
        </SliderLabelsContainer>
    </SliderContainer>
)
