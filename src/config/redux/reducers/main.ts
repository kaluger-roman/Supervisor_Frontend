import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MainSlice } from './types'

const initialState: MainSlice = {
    value: 0,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += 1
    }
  },
})

export const { increment} = mainSlice.actions

export default mainSlice.reducer