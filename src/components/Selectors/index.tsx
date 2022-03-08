import { Input } from "components/Inputs"
import { StandardText } from "components/Text"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { ListOption, OptionsContainer, SelectorArrow, SelectorContainer } from "./styled"
import { SelectorProps } from "./types"
import { EMPTY_OPTION, MAX_SYMBOLS_UNTIL_TOOLTIP, REQUIRED_ERROR } from "./constants"

export const Selector: React.FC<SelectorProps> = ({
    onChange,
    value,
    required,
    label,
    centered,
    placeholder,
    inputWidth,
    options,
    withEmpty
}) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [wasOpened, setWasOpened] = useState<boolean>(false)
    const outClickListener = useCallback(() => setIsOpened(false), [])
    const preparedOptions = useMemo(() => (withEmpty ? [EMPTY_OPTION] : []).concat(options), [withEmpty, options])
    const selectedOption = useMemo(() => preparedOptions.find((opt) => opt.value === value), [value, preparedOptions])
    const containerClickListener = () => {
        setIsOpened(!isOpened)
        setWasOpened(wasOpened || true)
    }
    const isError = !selectedOption?.value && wasOpened && !!required && !isOpened && REQUIRED_ERROR

    useEffect(() => {
        if (isOpened) {
            window.addEventListener("click", outClickListener)

            return () => window.removeEventListener("click", outClickListener)
        }
    }, [isOpened])

    return (
        <SelectorContainer
            isError={!!isError}
            inputWidth={inputWidth}
            isOpened={isOpened}
            onClick={() => containerClickListener()}
        >
            <SelectorArrow isOpened={isOpened} />
            <Input
                notEditable
                label={label}
                centered={centered}
                placeholder={placeholder}
                inputWidth={inputWidth}
                hasError={() => isError}
                value={selectedOption?.label || ""}
            />
            <OptionsContainer onClick={(e) => e.stopPropagation()} inputWidth={inputWidth} isOpened={isOpened}>
                {preparedOptions.map((opt) => (
                    <ListOption
                        key={opt.key}
                        onClick={() => {
                            onChange(opt.value)
                            outClickListener()
                        }}
                        isSelected={selectedOption?.value === opt.value}
                        data-tip={opt.label.length > MAX_SYMBOLS_UNTIL_TOOLTIP ? opt.label : ""}
                    >
                        <StandardText noIndent oneLine>
                            {opt.label}
                        </StandardText>
                    </ListOption>
                ))}
            </OptionsContainer>
        </SelectorContainer>
    )
}
