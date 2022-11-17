import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import WalletButtons from '@components/WalletButtons'
import { ConnectionType } from '../../connection'
import { useNavigate } from 'react-router-dom'
import OutlinedButton from '@components/Buttons/OutlinedButton'
import FundBotModal from '@components/Modals/FundBotModal'
import ConfigBotModal from '@components/Modals/ConfigModal'
import logos from '@assets/'
import { useWeb3React } from '@web3-react/core'

const NavbarTheme = styled('div')(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
}))

const Navbar = () => {
  const { account } = useWeb3React()

  const [fundModalOpen, setFundModalOpen] = useState(false)
  const [configureModalOpen, setConfigureModalOpen] = useState(false)

  const navigate = useNavigate()

  return (
    <NavbarTheme>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <img
          onClick={() => navigate('/')}
          src={logos.Logo}
          style={{ width: 180, cursor: 'pointer' }}
        />
        {account ? (
          <>
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
          </>
        ) : null}
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
