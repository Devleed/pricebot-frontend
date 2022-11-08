import { styled } from '@mui/material/styles'

export default styled('button')(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '10px',
  cursor: 'pointer',
  borderRadius: '5px',
}))
