import React, { useState } from "react"
import { InputContainer, InputLabel, InputBody, InputError } from "./styled"
import { InputProps } from "./types"

export const Input: React.FC<InputProps> = ({ onChange, value, hasError, label }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const error = hasError && hasError(value)

    return (
        <InputContainer>
            <InputLabel hasValue={!!value} isFocused={isFocused} isError={!!error}>
                {label}
            </InputLabel>
            <InputBody
                isFocused={isFocused}
                isError={!!error}
                value={value}
                placeholder={label}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => onChange(e.target.value)}
            ></InputBody>
            <InputError isError={!!error}>{error}</InputError>
        </InputContainer>
    )
}
