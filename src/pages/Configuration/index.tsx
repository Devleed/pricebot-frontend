import React, { FC } from 'react'
import { Ember, Erc20, Kolnet } from '@contracts/types'
import { useWeb3React } from '@web3-react/core'
import { AvailableContracts } from '../../hooks/useContract/types'
import { useContract } from '../../hooks/useContract'

type Props = Record<string, unknown>

const Configuration: FC<Props> = () => {
  const { provider, account } = useWeb3React()
  const tusdtContract = useContract<Erc20>(AvailableContracts.TUSDT)
  const kolnetContract = useContract<Kolnet>(AvailableContracts.KOLNET)
  const emberContract = useContract<Ember>(AvailableContracts.EMBER)

  console.log('account -', account, provider)

  const tryTransfer = async () => {
    if (tusdtContract) {
      tusdtContract.transfer(
        '0x09050568Ed00123dA7d9250c8A57AD393EeD8307',
        '1000000',
      )
    }
  }

  return <div className="app_container">Configure</div>
}

export default Configuration
