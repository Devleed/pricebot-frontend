import { styled } from '@mui/material/styles'

export default styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  border: 'none',
  padding: '10px',
  cursor: 'pointer',
  borderRadius: '5px',
}))
