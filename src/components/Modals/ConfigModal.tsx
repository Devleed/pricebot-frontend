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

export interface BotConfig {
  triggerDeviation: number
  slippageTolerance: number
  gasPrice: string
  active: boolean
}

const ConfigBotModal: React.FC<Props> = ({ open, setOpen }) => {
  const axios = useAxios()

  const [triggerDeviation, setTriggerDeviation] = useState(0)
  const [slippageTolerance, setSlippageTolerance] = useState(0)
  const [gasTierSelected, setGasTierSelected] = useState('average')
  const [loading, setLoading] = useState(false)
  const [tderrorMessage, setTdErrorMessage] = useState<string | null>(null)
  const [sterrorMessage, setStErrorMessage] = useState<string | null>(null)

  const signature = useAppSelector(state => state.wallet.signature)

  async function updateBotConfig() {
    if (triggerDeviation > 100 || triggerDeviation < 0)
      setTdErrorMessage('Invalid value.')
    else if (slippageTolerance > 100 || slippageTolerance < 0)
      setStErrorMessage('Invalid value.')
    else {
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
  }

  useEffect(() => {
    setTdErrorMessage(null)
  }, [triggerDeviation])

  useEffect(() => {
    setStErrorMessage(null)
  }, [slippageTolerance])

  useEffect(() => {
    if (signature) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        const { data }: { data: BotConfig } = await axios.get(`bot/config/1`)

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
            {tderrorMessage ? (
              <div style={{ fontSize: 12, color: '#A18841' }}>
                {tderrorMessage}
              </div>
            ) : null}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="ST">Slippage Tolerance</Label>
            <Input
              type="number"
              onChange={e => setSlippageTolerance(Number(e.target.value))}
              value={slippageTolerance}
              name="ST"
            />
            {sterrorMessage ? (
              <div style={{ fontSize: 12, color: '#A18841' }}>
                {sterrorMessage}
              </div>
            ) : null}
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
