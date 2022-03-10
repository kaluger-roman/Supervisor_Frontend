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

export const isErrorWithMessage = (error: unknown): error is { data: { message: string; statusCode: number } } =>
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    "message" in (error as any).data &&
    "statusCode" in (error as any).data &&
    typeof (error as any).data.message === "string" &&
    typeof (error as any).data.statusCode === "number"

export const useQueryError = (error: unknown): { status: number; message: string } | null => {
    if (isErrorWithMessage(error)) {
        return {
            status: error.data.statusCode,
            message: error.data.message
        }
    }

    return null
}
