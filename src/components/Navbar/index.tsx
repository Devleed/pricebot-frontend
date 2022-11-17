import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'

import WalletButtons from '@components/WalletButtons'
import { ConnectionType } from '../../connection'
import { useNavigate } from 'react-router-dom'
import OutlinedButton from '@components/Buttons/OutlinedButton'
import FundBotModal from '@components/Modals/FundBotModal'
import ConfigBotModal, { BotConfig } from '@components/Modals/ConfigModal'
import logos from '@assets/'
import { useWeb3React } from '@web3-react/core'
import AssetAddressModal from '@components/Modals/AssetAddressModal'
import GoldButton from '@components/Buttons/GoldButton'
import useAxios from '../../hooks/useAxios'

import './index.css'

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
  const axios = useAxios()

  const [fundModalOpen, setFundModalOpen] = useState(false)
  const [configureModalOpen, setConfigureModalOpen] = useState(false)
  const [assetAddressesModalOpen, setAssetAddressesModalOpen] = useState(false)
  const [botActive, setBotActive] = useState<boolean | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const { data }: { data: BotConfig } = await axios.get(`bot/config/1`)

      setBotActive(data.active)
    })()
  }, [])

  async function handleBotActivation(state: boolean) {
    setBotActive(state)

    const { data } = await axios.patch(`bot/config/update/1`, {
      active: state,
    })

    setBotActive(data.active)
  }

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
        {account && botActive !== null ? (
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
            <OutlinedButton
              style={{ marginLeft: 20 }}
              onClick={() => setAssetAddressesModalOpen(true)}
            >
              View Addresses
            </OutlinedButton>
            <GoldButton
              style={{
                marginLeft: 20,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onClick={() => handleBotActivation(!botActive)}
            >
              {!botActive ? (
                <>
                  Start{' '}
                  <PlayArrowIcon
                    sx={{
                      color: '#191915',
                    }}
                  />
                </>
              ) : (
                <>
                  Stop{' '}
                  <StopIcon
                    sx={{
                      color: '#191915',
                    }}
                  />
                </>
              )}
            </GoldButton>
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
      <AssetAddressModal
        open={assetAddressesModalOpen}
        setOpen={setAssetAddressesModalOpen}
      />
    </NavbarTheme>
  )
}

export default Navbar
