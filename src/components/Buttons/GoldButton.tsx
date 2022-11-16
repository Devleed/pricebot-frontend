import { darken, styled } from '@mui/material/styles'

export default styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.default,
  border: `1px solid ${theme.palette.primary.main}`,
  // padding: '10px',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'all 0.25s ease',
  height: 35,

  '&:hover': {
    backgroundColor: `${darken(theme.palette.primary.main, 0.25)}`,
    border: `1px solid ${darken(theme.palette.primary.main, 0.25)}`,
  },
}))
