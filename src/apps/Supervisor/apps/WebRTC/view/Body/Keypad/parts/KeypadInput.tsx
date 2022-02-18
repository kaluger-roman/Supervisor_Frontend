import React from "react"
import { InputWrapper } from "../styled"
import ClearOne from "../../../../../../icons/clear-one.svg"
import ClearAll from "../../../../../../icons/clear-all.svg"
import { MaskIcon } from "../../../../../../../../components/Buttons"
import { Input } from "../../../../../../../../components/Inputs"
import { useTypedDispatch, useSESelector } from "../../../../../../redux/hooks"
import {
    clickClearDialNumber,
    changeDialNumber,
    clickRemoveOneDialNumber
} from "../../../../../../redux/reducers/webRTC"

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
