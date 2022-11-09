import { styled } from '@mui/material/styles'

export default styled('div')(({ theme }) => ({
  minHeight: 200,
  minWidth: 200,
  backgroundColor: theme.palette.background.paper,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
}))
