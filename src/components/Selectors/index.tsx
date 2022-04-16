import { Input } from "components/Inputs"
import { StandardText } from "components/Text"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Watch } from "react-loader-spinner"
import {
    ListOption,
    OptionsContainer,
    SelectorArrow,
    SelectorContainer,
    MultipleSearchInput,
    MultipleSearchContainer,
    NoValueLabel
} from "./styled"
import { InputWidth, SelectorProps } from "./types"
import { EMPTY_OPTION, MAX_SYMBOLS_UNTIL_TOOLTIP, REQUIRED_ERROR } from "./constants"
import Checkboxes from "components/Checkboxes"
import { COLORS } from "config/globalStyles/colors"

export const Selector: React.FC<SelectorProps> = ({
    onChange,
    value,
    required,
    label,
    centered,
    placeholder,
    inputWidth,
    options,
    withEmpty,
    searchable,
    searchValue,
    onSearchChange,
    multipleChoice,
    isOnlineSearching
}) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [wasOpened, setWasOpened] = useState<boolean>(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const outClickListener = useCallback(
        (e) => {
            if (
                isOpened &&
                containerRef.current &&
                containerRef.current !== e.target &&
                !containerRef.current.contains(e.target)
            ) {
                console.log("fdf")
                setIsOpened(false)
            }
        },
        [isOpened]
    )
    const preparedOptions = useMemo(() => (withEmpty ? [EMPTY_OPTION] : []).concat(options), [withEmpty, options])
    const selectedOption = useMemo(() => preparedOptions.find((opt) => opt.value === value), [value, preparedOptions])
    const containerClickListener = () => {
        setIsOpened(!isOpened)
        setWasOpened(wasOpened || true)
    }
    const isError = !selectedOption?.value && wasOpened && !!required && !isOpened && REQUIRED_ERROR

    useEffect(() => {
        window.addEventListener("click", outClickListener)

        return () => window.removeEventListener("click", outClickListener)
    }, [outClickListener])

    return (
        <SelectorContainer
            ref={containerRef}
            isError={!!isError}
            inputWidth={inputWidth}
            isOpened={isOpened}
            onClick={() => containerClickListener()}
        >
            <SelectorArrow isOpened={isOpened} />
            <Input
                notEditable
                onChange={(val) => searchable && onSearchChange && onSearchChange(val)}
                label={label}
                centered={centered}
                placeholder={placeholder}
                inputWidth={inputWidth || InputWidth.standard}
                hasError={() => isError}
                value={
                    (searchable && !multipleChoice
                        ? searchValue
                        : searchable && multipleChoice && value.length
                        ? `Выбрано ${value.length} опций`
                        : selectedOption?.label) || ""
                }
                onFocus={() => {
                    setIsOpened(true)
                }}
                onBlur={() => {
                    setIsOpened(false)
                }}
            />
            <OptionsContainer
                onClick={(e) => e.stopPropagation()}
                inputWidth={inputWidth || InputWidth.standard}
                isOpened={isOpened}
            >
                {multipleChoice ? (
                    <MultipleSearchContainer>
                        <MultipleSearchInput
                            value={searchValue}
                            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                            placeholder="Начните поиск"
                        />
                        {isOnlineSearching ? (
                            <NoValueLabel>
                                <Watch height={70} width={70} color={COLORS.primaryDark} />
                            </NoValueLabel>
                        ) : !preparedOptions ? (
                            <NoValueLabel>Опций не найдено</NoValueLabel>
                        ) : (
                            <>
                                <Checkboxes
                                    multipleChoice
                                    options={preparedOptions}
                                    selected={value as string[]}
                                    onChange={onChange}
                                />
                                <NoValueLabel>Чтобы найти другие варианты, уточните запрос</NoValueLabel>
                            </>
                        )}
                    </MultipleSearchContainer>
                ) : (
                    preparedOptions.map((opt) => (
                        <ListOption
                            key={opt.key}
                            onClick={() => {
                                onChange(opt.value)
                                setIsOpened(false)
                            }}
                            isSelected={selectedOption?.value === opt.value}
                            data-tip={opt.label.length > MAX_SYMBOLS_UNTIL_TOOLTIP ? opt.label : ""}
                        >
                            <StandardText noIndent oneLine>
                                {opt.label}
                            </StandardText>
                        </ListOption>
                    ))
                )}
            </OptionsContainer>
        </SelectorContainer>
    )
}
