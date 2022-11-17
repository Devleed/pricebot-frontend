import React, { useEffect } from 'react'

import { styled } from '@mui/material/styles'

const ToastBody = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.paper,
  position: 'fixed',
  bottom: 20,
  right: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  boxShadow: `17px 19px 37px -10px black`,
  padding: 20,
  zIndex: 99999999,
  transition: 'all 0.5s ease',
}))

type Props = {
  open: boolean
  message: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Toast: React.FC<Props> = ({ open, setOpen, message }) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false)
      }, 5000)
    }
  }, [open])

  if (!open) return null

  return <ToastBody onClick={() => setOpen(false)}>{message}</ToastBody>
}

export default Toast
