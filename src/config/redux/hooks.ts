import { TypedUseSelectorHook, useDispatch, useSelector, shallowEqual } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export const  useSESelector = (selector: (state: RootState) => any): TypedUseSelectorHook<RootState> => {
  return useSelector(selector, shallowEqual)
}