import React from "react"
import { Input } from "../../../../../../../components/Inputs"
import { InputWrapper } from "../styled"
import ClearOne from "../../../../../icons/clear-one.svg"
import ClearAll from "../../../../../icons/clear-all.svg"
import { MaskIcon } from "../../../../../../../components/Buttons"
import { useTypedDispatch, useSESelector } from "../../../../../../../config/redux/hooks"
import {
    changeDialNumber,
    clickClearDialNumber,
    clickRemoveOneDialNumber
} from "../../../../../../../config/redux/reducers/webRTC"

export const KeypadInput: React.FC = () => {
    const dispatch = useTypedDispatch()
    const { dialInput } = useSESelector((state) => state.webRTC)

    return (
        <InputWrapper>
            <MaskIcon icon={ClearAll} onClick={() => dispatch(clickClearDialNumber())} />
            <Input centered onChange={(val) => dispatch(changeDialNumber(val))} value={dialInput} />
            <MaskIcon icon={ClearOne} onClick={() => dispatch(clickRemoveOneDialNumber())} />
        </InputWrapper>
    )
}
