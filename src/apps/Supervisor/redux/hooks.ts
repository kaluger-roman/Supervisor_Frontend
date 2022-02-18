import { AnyAction } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector, shallowEqual } from "react-redux"
import type { RootState, AppDispatch } from "./store"

export const useTypedDispatch = () => useDispatch<AppDispatch>()

export const useHandlerTypedDispatch = () => {
    const dispatch = useDispatch<AppDispatch>()

    return <T extends AnyAction>(action: T) =>
        () =>
            dispatch(action)
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSESelector = <T extends unknown>(selector: (state: RootState) => T): T => {
    return useSelector(selector, shallowEqual)
}
