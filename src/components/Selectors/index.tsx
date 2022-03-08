import { Input } from "components/Inputs"
import { StandardText } from "components/Text"
import React, { useMemo, useState } from "react"
import { ListOption, OptionsContainer, SelectorArrow, SelectorContainer } from "./styled"
import { SelectorProps } from "./types"
import { Tooltip } from "components/Text/styled"
import { MAX_SYMBOLS_UNTIL_TOOLTIP } from "./constants"

export const Selector: React.FC<SelectorProps> = ({
    onChange,
    value,
    hasError,
    label,
    centered,
    placeholder,
    inputWidth,
    options
}) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const selectedOption = useMemo(() => options.find((opt) => opt.value === value), [value, options])

    return (
        <SelectorContainer inputWidth={inputWidth} isOpened={isOpened} onClick={() => setIsOpened(!isOpened)}>
            <SelectorArrow isOpened={isOpened} />
            <Input
                notEditable
                label={label}
                centered={centered}
                placeholder={placeholder}
                inputWidth={inputWidth}
                hasError={hasError}
                value={selectedOption?.label || ""}
            />
            <OptionsContainer inputWidth={inputWidth} isOpened={isOpened}>
                {options.map((opt) => (
                    <ListOption
                        key={opt.key}
                        onClick={() => onChange(opt.value)}
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
