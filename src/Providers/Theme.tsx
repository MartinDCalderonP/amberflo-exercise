'use client'
import { ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
})

interface ThemeProps {
  children: ReactNode
}

const Theme = ({ children }: ThemeProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
