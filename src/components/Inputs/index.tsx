import { Tooltip } from "components/Text/styled"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { TOOLTIP_LEN_TRASHOLD } from "./constants"
import { InputContainer, InputLabel, InputBody, InputError } from "./styled"
import { InputProps, InputTypes } from "./types"
import { useOverflow } from "components/helpers"

export const Input: React.FC<InputProps> = ({
    onChange,
    value,
    hasError,
    label,
    centered,
    placeholder,
    isPassword,
    inputWidth,
    notEditable
}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const error = hasError && !isFocused && hasError(value)
    const inputRef = useRef<HTMLInputElement>(null)
    const onKeyPressHandler = useCallback(
        (e) => {
            if (inputRef.current && e.key === "Enter") inputRef.current.blur()
        },
        [inputRef.current]
    )
    const { isOverflow: isErrorOverflow, elRef: errorRef } = useOverflow<HTMLInputElement>()

    return (
        <>
            <InputContainer
                inputWidth={inputWidth}
                data-tip={notEditable && value.length! > TOOLTIP_LEN_TRASHOLD ? value : ""}
            >
                <InputLabel hasValue={!!value} isFocused={isFocused} isError={!!error}>
                    {label}
                </InputLabel>
                <InputBody
                    ref={inputRef}
                    onKeyPress={onKeyPressHandler}
                    notEditable={notEditable}
                    type={isPassword ? InputTypes.password : InputTypes.text}
                    isFocused={isFocused}
                    isError={!!error}
                    value={value}
                    placeholder={placeholder || label}
                    centered={centered}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    onChange={(e) => onChange && onChange(e.target.value)}
                />

                <InputError ref={errorRef} data-tip={isErrorOverflow ? error : ""} isError={!!error}>
                    {error}
                </InputError>
            </InputContainer>
            <Tooltip />
        </>
    )
}
