import React from "react"
import _ from "lodash"
import { CheckboxCircleInner, CheckboxCircleOuter, CheckboxContainer, OptionContainer, OptionLabel } from "./styled"
import { CheckboxesProps } from "./types"

const Checkboxes: React.FC<CheckboxesProps> = ({ options, onChange, selected, multipleChoice }) => {
  const onOptionChange = (key: string) => () => {
    multipleChoice ? onChange(_.xor(selected, [key])) : onChange(key)
  }

  return (
    <CheckboxContainer>
      {options.map((option) => (
        <OptionContainer key={option.key} onClick={onOptionChange(option.key)}>
          <CheckboxCircleOuter>
            {!!_.intersection(selected, [option.key]).length && <CheckboxCircleInner />}
          </CheckboxCircleOuter>
          <OptionLabel>{option.label}</OptionLabel>
        </OptionContainer>
      ))}
    </CheckboxContainer>
  )
}

export default Checkboxes
