import React, { FC } from 'react'
import { ConnectionType, SupportedWallets } from '../../connection'
import { Ember, Erc20, Kolnet } from '@contracts/types'
import { useWeb3React } from '@web3-react/core'
import { AvailableContracts } from '../../hooks/useContract/types'
import { useContract } from '../../hooks/useContract'
import WalletButtons from '@components/WalletButtons'
import { styled } from '@mui/material/styles'
import GoldButton from '@components/Buttons/GoldButton'
import { useNavigate } from 'react-router-dom'

type Props = Record<string, unknown>

const Body = styled('div')(({ theme }) => ({
  padding: '20px',
}))

const Home: FC<Props> = () => {
  const { provider, account } = useWeb3React()
  const tusdtContract = useContract<Erc20>(AvailableContracts.TUSDT)
  const kolnetContract = useContract<Kolnet>(AvailableContracts.KOLNET)
  const emberContract = useContract<Ember>(AvailableContracts.EMBER)

  const navigate = useNavigate()

  console.log('account -', account, provider)

  const tryTransfer = async () => {
    if (tusdtContract) {
      tusdtContract.transfer(
        '0x09050568Ed00123dA7d9250c8A57AD393EeD8307',
        '1000000',
      )
    }
  }

  return (
    <div className="app_container">
      {/* <Navbar>
        <Title>BFx</Title>
        <WalletButtons
          wallets={[ConnectionType.INJECTED, ConnectionType.WALLET_CONNECT]}
        />
      </Navbar> */}
      <Body>
        <GoldButton onClick={() => navigate('/configure')}>
          Configure
        </GoldButton>
      </Body>
      {/* <button onClick={tryTransfer}>send</button> */}
    </div>
  )
}

export default Home
