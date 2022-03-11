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

export const isErrorWithMessage = (error: unknown): error is { data: { [key: string]: string } } =>
    typeof error === "object" && error != null && "data" in error && typeof (error as any).data === "object"

export const useQueryError = (error: unknown): { [key: string]: string } | null => {
    if (isErrorWithMessage(error)) {
        return error.data
    }

    return null
}
