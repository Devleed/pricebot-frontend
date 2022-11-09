import { darken, styled } from '@mui/material/styles'

export default styled('input')(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  outline: 'none',
  border: 'none',
  borderBottom: `1px solid ${theme.palette.primary.main}`,
  padding: '5px',
  transition: 'all 0.25s ease',

  '&:focus': {
    borderBottom: `1px solid ${darken(theme.palette.primary.main, 0.5)}`,
  },
}))
