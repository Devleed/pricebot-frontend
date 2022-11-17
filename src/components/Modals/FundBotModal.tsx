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
import ButtonWithLoader, {
  ButtonTypes,
} from '@components/Buttons/ButtonWithLoader'
import { useContract } from '../../hooks/useContract'
import { Erc20 } from '@contracts/types'
import { AvailableContracts } from '../../hooks/useContract/types'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const FundBotModal: React.FC<Props> = ({ open, setOpen }) => {
  const { provider, account } = useWeb3React()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [ethVal, setEthVal] = useState('')

  useEffect(() => {
    return () => {
      setErrorMessage(null)
      setEthVal('')
    }
  }, [])

  useEffect(() => {
    if (ethVal === '' || parseFloat(ethVal) <= 0) setErrorMessage(null)
  }, [ethVal])

  async function checkFunds() {
    const userBalance = await provider!.getBalance(account!)

    if (parseFloat(userBalance.toString()) / 10 ** 18 < parseFloat(ethVal)) {
      setErrorMessage('Insufficient Balance')
      return false
    }

    return true
  }

  async function transferETH() {
    try {
      setLoading(true)
      if (provider && account && ethVal && (await checkFunds())) {
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

        await signer.sendTransaction(tx)

        setOpen(false)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBody>
        <GoldenTitle>
          Fund {shortenAddress(BOT_ADDRESS || '', 2, 4)}
        </GoldenTitle>
        <Form>
          <Input
            type="text"
            value={ethVal}
            autoFocus
            onChange={e =>
              !isNaN(Number(e.target.value)) && setEthVal(e.target.value)
            }
            placeholder="ETH"
          />
          {errorMessage ? (
            <div style={{ fontSize: 12, color: '#A18841' }}>{errorMessage}</div>
          ) : null}

          <ButtonWithLoader
            style={{ marginTop: 20 }}
            text="Fund"
            type={ButtonTypes.FILLED}
            onClick={transferETH}
            loading={loading}
            disabled={ethVal === '' || parseFloat(ethVal) <= 0}
          />
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default FundBotModal
