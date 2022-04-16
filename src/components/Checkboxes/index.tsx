import React from "react"
import _ from "lodash"
import {
    CheckboxBox,
    CheckboxCircleInner,
    CheckboxCircleOuter,
    CheckboxContainer,
    OptionContainer,
    OptionLabel
} from "./styled"
import { CheckboxesProps, OptionProps } from "./types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const Option: React.FC<OptionProps> = ({ option, onClick, isSelected, multipleChoice }) => (
    <OptionContainer key={option.key} onClick={() => onClick(option.key)}>
        {multipleChoice ? (
            <CheckboxBox>{isSelected && <FontAwesomeIcon icon={faCheck} />}</CheckboxBox>
        ) : (
            <CheckboxCircleOuter>{isSelected && <CheckboxCircleInner />}</CheckboxCircleOuter>
        )}
        <OptionLabel>{option.label}</OptionLabel>
    </OptionContainer>
)

const Checkboxes: React.FC<CheckboxesProps> = ({ options, onChange, selected, multipleChoice }) => {
    const onOptionChange = (key: string) => () => {
        multipleChoice ? onChange(_.xor(selected, [key])) : onChange(key)
    }

    return (
        <CheckboxContainer>
            {options.map((option) => (
                <Option
                    key={option.key}
                    isSelected={!!_.intersection(selected, [option.key]).length}
                    onClick={onOptionChange(option.key)}
                    multipleChoice={!!multipleChoice}
                    option={option}
                />
            ))}
        </CheckboxContainer>
    )
}

export default Checkboxes
