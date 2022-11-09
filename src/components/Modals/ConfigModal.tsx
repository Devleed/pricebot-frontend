import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Modal } from '@mui/material'
import { useWeb3React } from '@web3-react/core'

import GoldButton from '@components/Buttons/GoldButton'
import Form from '@components/Form'
import Input from '@components/Input'
import ModalBody from '@components/ModalBody'
import GoldenTitle from '@components/Titles/GoldenTitle'
import { shortenAddress } from '@utils/'
import { BOT_ADDRESS } from '../../constants/etherscan'
import InputContainer from '@components/InputContainer'
import Label from '@components/Label'
import axios from '../../utils/axios'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface BotConfig {
  triggerDeviation: number
  slippageTolerance: number
}

const ConfigBotModal: React.FC<Props> = ({ open, setOpen }) => {
  const { chainId } = useWeb3React()

  const [triggerDeviation, setTriggerDeviation] = useState(0)
  const [slippageTolerance, setSlippageTolerance] = useState(0)

  async function updateBotConfig() {
    const { data } = await axios.patch(`bot/config/update/${chainId}`, {
      triggerDeviation,
      slippageTolerance,
    })

    setTriggerDeviation(data.triggerDeviation)
    setSlippageTolerance(data.slippageTolerance)
  }

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

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBody>
        <GoldenTitle>
          Configure {shortenAddress(BOT_ADDRESS || '', 2, 4)}
        </GoldenTitle>
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
      </ModalBody>
    </Modal>
  )
}

export default ConfigBotModal
