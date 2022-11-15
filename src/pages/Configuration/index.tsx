import React, { FC, useEffect, useState } from 'react'
import GoldButton from '@components/Buttons/GoldButton'
import Input from '@components/Input'
import { styled } from '@mui/material/styles'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import Form from '@components/Form'
import Label from '@components/Label'
import InputContainer from '@components/InputContainer'
import useAxios from '../../hooks/useAxios'

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
  const { chainId } = useWeb3React()

  const axios = useAxios()

  const [triggerDeviation, setTriggerDeviation] = useState(0)
  const [slippageTolerance, setSlippageTolerance] = useState(0)

  useEffect(() => {
    if (chainId) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        const { data }: { data: BotConfig } = await axios.get(
          `bot/config/${chainId}`,
        )

        console.log('data -', data)

        setTriggerDeviation(data.triggerDeviation)
        setSlippageTolerance(data.slippageTolerance)
      })()
    }
  }, [chainId])

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
        <Form>
          <InputContainer>
            <Label htmlFor="TD">Trigger Deviation</Label>
            <Input
              type="number"
              onChange={e => setTriggerDeviation(Number(e.target.value))}
              value={triggerDeviation}
              name="TD"
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="ST">Slippage Tolerance</Label>
            <Input
              type="number"
              onChange={e => setSlippageTolerance(Number(e.target.value))}
              value={slippageTolerance}
              name="ST"
            />
          </InputContainer>
          <GoldButton style={{ marginTop: 50 }} onClick={updateBotConfig}>
            Update
          </GoldButton>
        </Form>
        <div style={{ padding: 30 }}>
          <h2>Asset Addresses</h2>
          <div>
            <p>ETH: 0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6</p>
            <p>USDT: 0x89b913d392e7E336E5de3D5424Cf6Dc2B30F1b72</p>
            <p>GOLD: 0xB619e873167f00abea1D07988D387b513501D1Ef</p>
          </div>
        </div>
      </Body>
    </>
  )
}

export default Configuration
