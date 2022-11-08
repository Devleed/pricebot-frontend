import React, { FC, useEffect, useState } from 'react'
import GoldButton from '@components/Buttons/GoldButton'
import Input from '@components/Input'
import { styled } from '@mui/material/styles'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import axios from '../../utils/axios'

const Body = styled('div')(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}))

type Props = Record<string, unknown>

interface BotConfig {
  triggerDeviation: number
  slippageTolerance: number
}

const Configuration: FC<Props> = () => {
  const { provider, account, chainId } = useWeb3React()
  const [ethVal, setEthVal] = useState(0)
  const [triggerDeviation, setTriggerDeviation] = useState(0)
  const [slippageTolerance, setSlippageTolerance] = useState(0)

  useEffect(() => {
    if (chainId) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        const { data }: { data: BotConfig } = await axios.get(
          `bot/config/${chainId}`,
        )

        setTriggerDeviation(data.triggerDeviation)
        setSlippageTolerance(data.slippageTolerance)
      })()
    }
  }, [chainId])

  async function transferETH() {
    if (provider && account) {
      const gasPrice = await provider.getGasPrice()

      const tx = {
        from: account,
        to: '0x09050568Ed00123dA7d9250c8A57AD393EeD8307',
        value: ethers.utils.parseEther(String(ethVal)),
        nonce: provider.getTransactionCount(account, 'latest'),
        gasLimit: 21000,
        gasPrice: ethers.utils.hexlify(gasPrice.toNumber()),
      }

      const signer = provider.getSigner()

      const transferResult = await signer.sendTransaction(tx)

      console.log(transferResult)
    }
  }

  async function updateBotConfig() {
    const { data } = await axios.patch(`bot/config/update/${chainId}`, {
      triggerDeviation,
      slippageTolerance,
    })

    setTriggerDeviation(data.triggerDeviation)
    setSlippageTolerance(data.slippageTolerance)
  }

  return (
    <>
      <Body>
        <div>
          <h2>Fund Bot</h2>
          <div>
            <Input
              type="number"
              onChange={e => setEthVal(Number(e.target.value))}
              value={ethVal}
            />
            <span style={{ marginLeft: 10 }}>ETH</span>
          </div>
          <GoldButton onClick={transferETH} style={{ marginTop: 10 }}>
            Fund
          </GoldButton>
        </div>
        <div>
          <h2>Trigger Deviation</h2>
          <div>
            <Input
              type="number"
              onChange={e => setTriggerDeviation(Number(e.target.value))}
              value={triggerDeviation}
            />
            <span style={{ marginLeft: 10 }}>%</span>
          </div>
          <GoldButton onClick={updateBotConfig} style={{ marginTop: 10 }}>
            Set
          </GoldButton>
        </div>
        <div>
          <h2>Slippage Tolerance</h2>
          <div>
            <Input
              type="number"
              onChange={e => setSlippageTolerance(Number(e.target.value))}
              value={slippageTolerance}
            />
            <span style={{ marginLeft: 10 }}>%</span>
          </div>
          <GoldButton onClick={updateBotConfig} style={{ marginTop: 10 }}>
            Set
          </GoldButton>
        </div>
      </Body>
      <div style={{ padding: 30 }}>
        <h2>Asset Addresses</h2>
        <div>
          <p>ETH: 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6</p>
          <p>USDT: 0x89b913d392e7E336E5de3D5424Cf6Dc2B30F1b72</p>
          <p>GOLD: 0xB619e873167f00abea1D07988D387b513501D1Ef</p>
        </div>
      </div>
    </>
  )
}

export default Configuration
