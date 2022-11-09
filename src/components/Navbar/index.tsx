import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import WalletButtons from '@components/WalletButtons'
import { ConnectionType } from '../../connection'
import { useNavigate } from 'react-router-dom'
import OutlinedButton from '@components/Buttons/OutlinedButton'
import FundBotModal from '@components/Modals/FundBotModal'
import ConfigBotModal from '@components/Modals/ConfigModal'

const NavbarTheme = styled('div')(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
}))

const Title = styled('span')(({ theme }) => ({
  fontSize: '22px',
  color: theme.palette.primary.main,
  cursor: 'pointer',
}))

const Navbar = () => {
  const [fundModalOpen, setFundModalOpen] = useState(false)
  const [configureModalOpen, setConfigureModalOpen] = useState(false)

  const [network, setNetwork] = useState('goerli')

  const navigate = useNavigate()

  return (
    <NavbarTheme>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Title onClick={() => navigate('/')}>BFx</Title>
        <OutlinedButton
          style={{ marginLeft: 20 }}
          onClick={() => setConfigureModalOpen(true)}
        >
          Configure
        </OutlinedButton>
        <OutlinedButton
          style={{ marginLeft: 20 }}
          onClick={() => setFundModalOpen(true)}
        >
          Fund
        </OutlinedButton>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {/* <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={network}
          label="Age"
          onChange={e => setNetwork(e.target.value)}
        >
          <MenuItem value="mainnet">Mainnet</MenuItem>
          <MenuItem value="goerli">Goerli</MenuItem>
        </Select> */}

        <WalletButtons
          wallets={[ConnectionType.INJECTED, ConnectionType.WALLET_CONNECT]}
        />
      </div>

      <FundBotModal open={fundModalOpen} setOpen={setFundModalOpen} />

      <ConfigBotModal
        open={configureModalOpen}
        setOpen={setConfigureModalOpen}
      />
    </NavbarTheme>
  )
}

export default Navbar
