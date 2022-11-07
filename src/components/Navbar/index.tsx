import React from 'react'
import { styled } from '@mui/material/styles'
import WalletButtons from '@components/WalletButtons'
import { ConnectionType } from '../../connection'
import { useNavigate } from 'react-router-dom'

const NavbarTheme = styled('div')(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'black',
  margin: '20px',
  borderRadius: '10px',
}))

const Title = styled('span')(({ theme }) => ({
  fontSize: '22px',
  color: theme.palette.primary.main,
  cursor: 'pointer',
}))

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <NavbarTheme>
      <Title onClick={() => navigate('/')}>BFx</Title>
      <WalletButtons
        wallets={[ConnectionType.INJECTED, ConnectionType.WALLET_CONNECT]}
      />
    </NavbarTheme>
  )
}

export default Navbar
