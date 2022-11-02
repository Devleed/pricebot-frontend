import { PaletteMode } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '..'
import { setTheme } from '@redux/slices/themeSlice'

export const useThemeSwitch = (): [PaletteMode, () => void] => {
  const mode: PaletteMode = useAppSelector(state => {
    return state.theme.theme
  })

  const dispatch = useDispatch()

  const switchTheme = () => {
    dispatch(setTheme(mode === 'light' ? 'dark' : 'light'))
  }

  return [mode, switchTheme]
}
