import { PaletteMode } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ThemeState } from './theme.types'

const initialState: ThemeState = {
  theme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<PaletteMode>) => {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
