import React, { FC, useMemo } from 'react'
import { CssBaseline, PaletteMode, ThemeOptions } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useThemeSwitch } from '../hooks/switchTheme'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    smd: true
    md: true
    lg: true
    xl: true
    mobile: false
    tablet: false
    laptop: false
    desktop: false
  }

  interface Palette {
    regular: Palette['primary']
  }
}

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      smd: 992,
      md: 1152,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#A18841',
          },
          background: {
            default: '#0A0D10',
            paper: '#191915',
          },
          text: {
            primary: '#f5f5f5',
            secondary: '#fff',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#A18841',
          },
          background: {
            default: '#0A0D10',
            paper: '#191915',
          },
          text: {
            primary: '#7d8592',
            secondary: '#fff',
          },
        }),
  },
})

const Theme: FC = ({ children }) => {
  const [mode] = useThemeSwitch()

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode as PaletteMode)),
    [mode],
  )

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default Theme
