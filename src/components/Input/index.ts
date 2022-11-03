import { styled } from '@mui/material/styles'

export default styled('input')(({ theme }) => ({
  backgroundColor: 'white',
  color: theme.palette.background.default,
  outline: 'none',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '5px',
  borderRadius: '5px',
}))
