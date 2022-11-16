import React, { useEffect, useState } from 'react'
import { CircularProgress, Modal } from '@mui/material'
import { useWeb3React } from '@web3-react/core'

import GoldButton from '@components/Buttons/GoldButton'
import Form from '@components/Form'
import Input from '@components/Input'
import ModalBody from '@components/ModalBody'
import GoldenTitle from '@components/Titles/GoldenTitle'
import { shortenAddress } from '@utils/'
import InputContainer from '@components/InputContainer'
import Label from '@components/Label'
import RadioGroup from '@components/RadioGroup'

import { BOT_ADDRESS } from '../../constants/etherscan'
import { useAppSelector } from '@hooks/'
import useAxios from '../../hooks/useAxios'
import Loader from '@components/Loader'
import ButtonWithLoader, {
  ButtonTypes,
} from '@components/Buttons/ButtonWithLoader'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface BotConfig {
  triggerDeviation: number
  slippageTolerance: number
  gasPrice: string
}

const ConfigBotModal: React.FC<Props> = ({ open, setOpen }) => {
  const axios = useAxios()

  const [triggerDeviation, setTriggerDeviation] = useState(0)
  const [slippageTolerance, setSlippageTolerance] = useState(0)
  const [gasTierSelected, setGasTierSelected] = useState('average')
  const [loading, setLoading] = useState(false)

  const signature = useAppSelector(state => state.wallet.signature)

  async function updateBotConfig() {
    setLoading(true)

    const { data } = await axios.patch(`bot/config/update/1`, {
      triggerDeviation,
      slippageTolerance,
      gasPrice: gasTierSelected,
    })

    setTriggerDeviation(data.triggerDeviation)
    setSlippageTolerance(data.slippageTolerance)
    setGasTierSelected(data.gasPrice)
    setLoading(false)
  }

  useEffect(() => {
    if (signature) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        const { data }: { data: BotConfig } = await axios.get(`bot/config/1`)

        console.log('data -', data)

        setTriggerDeviation(data.triggerDeviation)
        setSlippageTolerance(data.slippageTolerance)
        setGasTierSelected(data.gasPrice)
      })()
    }
  }, [signature])

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBody>
        <GoldenTitle style={{ marginTop: 20 }}>
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

          <div>
            <Label htmlFor="ST">Gas fees</Label>
            <RadioGroup
              selected={gasTierSelected}
              setSelected={setGasTierSelected}
            />
          </div>

          <ButtonWithLoader
            style={{ marginTop: 20 }}
            text="Update"
            type={ButtonTypes.FILLED}
            onClick={updateBotConfig}
            loading={loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ConfigBotModal
