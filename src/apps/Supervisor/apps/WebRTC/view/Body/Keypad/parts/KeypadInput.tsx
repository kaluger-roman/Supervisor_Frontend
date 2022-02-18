import React from "react"
import { InputWrapper } from "../styled"
import ClearOne from "Supervisor/icons/clear-one.svg"
import ClearAll from "Supervisor/icons/clear-all.svg"
import { MaskIcon } from "components/Buttons"
import { Input } from "components/Inputs"
import { useTypedDispatch, useSESelector } from "Supervisor/redux/hooks"
import { clickClearDialNumber, changeDialNumber, clickRemoveOneDialNumber } from "Supervisor/redux/reducers/webRTC"

export const KeypadInput: React.FC = () => {
    const dispatch = useTypedDispatch()
    const { dialInput } = useSESelector((state) => state.webRTC)

    return (
        <InputWrapper>
            <MaskIcon icon={ClearAll} onClick={() => dispatch(clickClearDialNumber())} />
            <Input
                centered
                placeholder="Введите номер"
                onChange={(val) => dispatch(changeDialNumber(val))}
                value={dialInput}
            />
            <MaskIcon icon={ClearOne} onClick={() => dispatch(clickRemoveOneDialNumber())} />
        </InputWrapper>
    )
}
