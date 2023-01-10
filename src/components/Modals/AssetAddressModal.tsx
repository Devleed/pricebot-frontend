import React from 'react'
import { Modal } from '@mui/material'
import { styled } from '@mui/material/styles'

import Form from '@components/Form'
import Input from '@components/Input'
import ModalBody from '@components/ModalBody'
import GoldenTitle from '@components/Titles/GoldenTitle'
import { shortenAddress } from '@utils/'
import { BOT_ADDRESS } from '../../constants/etherscan'
import ButtonWithLoader, {
  ButtonTypes,
} from '@components/Buttons/ButtonWithLoader'
import { AvailableContracts } from '../../hooks/useContract/types'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AssetAddressList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 30,
}))

const AssetAddressItem = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const AssetAddressModal: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBody>
        <GoldenTitle>Asset Addresses</GoldenTitle>
        <AssetAddressList>
          <div>
            <AssetAddressItem>BOT:</AssetAddressItem> {BOT_ADDRESS}
          </div>
          <div>
            <AssetAddressItem>ETH:</AssetAddressItem> {AvailableContracts.WETH}
          </div>
          <div>
            <AssetAddressItem>USDC:</AssetAddressItem> {AvailableContracts.USDC}
          </div>
          <div>
            <AssetAddressItem>GOLD:</AssetAddressItem> {AvailableContracts.GOLD}
          </div>
        </AssetAddressList>
      </ModalBody>
    </Modal>
  )
}

export default AssetAddressModal
