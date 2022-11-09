import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import WalletButtons from '@components/WalletButtons'
import { ConnectionType } from '../../connection'
import { useNavigate } from 'react-router-dom'
import OutlinedButton from '@components/Buttons/OutlinedButton'
import Input from '@components/Input'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import GoldButton from '@components/Buttons/GoldButton'
import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import Form from '@components/Form'
import ModalBody from '@components/ModalBody'
import Label from '@components/Label'

const NavbarTheme = styled('div')(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper,
}))

const Title = styled('span')(({ theme }) => ({
  fontSize: '22px',
  color: theme.palette.primary.main,
  cursor: 'pointer',
}))

const Navbar = () => {
  const { provider, account } = useWeb3React()

  const [fundModalOpen, setFundModalOpen] = useState(true)
  const [ethVal, setEthVal] = useState(0)

  const navigate = useNavigate()

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

  return (
    <NavbarTheme>
      <div
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Title onClick={() => navigate('/')}>BFx</Title>
        <OutlinedButton
          style={{ marginLeft: 20 }}
          onClick={() => navigate('/configure')}
        >
          Configure
        </OutlinedButton>
        <OutlinedButton
          style={{ marginLeft: 20 }}
          onClick={() => setFundModalOpen(true)}
        >
          Fund
        </OutlinedButton>
      </div>

      <WalletButtons
        wallets={[ConnectionType.INJECTED, ConnectionType.WALLET_CONNECT]}
      />
      <Modal
        open={fundModalOpen}
        onClose={() => setFundModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBody>
          <Form>
            <Label>Fund Eth</Label>
            <Input
              type="number"
              value={ethVal}
              onChange={e => setEthVal(Number(e.target.value))}
              placeholder="Fund Bot"
            />
            <GoldButton
              style={{
                padding: 5,
                fontSize: 10,
                marginTop: 20,
              }}
              onClick={transferETH}
            >
              Fund
            </GoldButton>
          </Form>
        </ModalBody>
      </Modal>
    </NavbarTheme>
  )
}

export default Navbar
