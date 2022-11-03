import React, { FC, useState } from 'react'
import GoldButton from '@components/Buttons/GoldButton'
import Input from '@components/Input'
import { styled } from '@mui/material/styles'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'

const Body = styled('div')(({ theme }) => ({
  padding: '20px',
}))

type Props = Record<string, unknown>

const Configuration: FC<Props> = () => {
  const { provider, account } = useWeb3React()
  const [ethVal, setEthVal] = useState(0)

  const transferETH = async () => {
    if (provider && account) {
      const gasPrice = await provider.getGasPrice()

      const tx = {
        from: account,
        to: '0x716a02EFA4C6e9850D744472e6f2BB4ff24e8B9b',
        value: ethers.utils.parseEther(String(ethVal)),
        nonce: provider.getTransactionCount(account, 'latest'),
        gasLimit: 100000, // 100000
        gasPrice: ethers.utils.hexlify(gasPrice.toNumber()),
      }

      const signer = provider.getSigner()

      const transferResult = await signer.sendTransaction(tx)

      console.log(transferResult)
    }
  }

  return (
    <Body>
      <div>
        <Input
          type="number"
          onChange={e => setEthVal(Number(e.target.value))}
          value={ethVal}
        />
        <span style={{ marginLeft: 10 }}>ETH</span>
      </div>
      <GoldButton onClick={transferETH} style={{ marginTop: 10 }}>
        Fund Bot
      </GoldButton>
    </Body>
  )
}

export default Configuration
