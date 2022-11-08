import React, { FC, useEffect, useState } from 'react'
import { ConnectionType, SupportedWallets } from '../../connection'
import { Ember, Erc20, Kolnet } from '@contracts/types'
import { useWeb3React } from '@web3-react/core'
import { AvailableContracts } from '../../hooks/useContract/types'
import { useContract } from '../../hooks/useContract'
import WalletButtons from '@components/WalletButtons'
import { styled } from '@mui/material/styles'
import GoldButton from '@components/Buttons/GoldButton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { chainIdToTxlistUrl } from '../../constants/etherscan'
import Transaction from '@components/Transaction'

type Props = Record<string, unknown>

const Body = styled('div')(({ theme }) => ({
  padding: '20px',
}))
const TableHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,

  '& h4': {
    width: '17%',
  },
}))

export interface Tx {
  hash: string
  timeStamp: string
  to: string
  txreceipt_status: string
  value: string
  from: string
}

const Home: FC<Props> = () => {
  const { provider, account, chainId } = useWeb3React()
  const tusdtContract = useContract<Erc20>(AvailableContracts.TUSDT)
  const kolnetContract = useContract<Kolnet>(AvailableContracts.KOLNET)
  const emberContract = useContract<Ember>(AvailableContracts.EMBER)

  const [txList, setTxList] = useState<Tx[]>([])

  console.log('account -', account, provider)

  useEffect(() => {
    if (chainId) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        const { data }: { data: { result: Tx[] } } = await axios.get(
          chainIdToTxlistUrl[chainId as keyof typeof chainIdToTxlistUrl],
        )

        console.log(data.result)

        setTxList(
          data.result.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp)),
        )
      })()
    }
  }, [chainId])

  return (
    <div className="app_container">
      {/* <Navbar>
        <Title>BFx</Title>
        <WalletButtons
          wallets={[ConnectionType.INJECTED, ConnectionType.WALLET_CONNECT]}
        />
      </Navbar> */}
      <Body>
        {/* <GoldButton onClick={() => navigate('/configure')}>
          Configure
        </GoldButton> */}
        <div>
          <h2>Transaction History</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TableHeader>
              <h4>Txn Hash</h4>
              <h4>Age</h4>
              <h4>From</h4>
              <h4>To</h4>
              <h4>Value</h4>
              <h4>Status</h4>
            </TableHeader>
            {txList.map(tx => {
              return (
                <a
                  style={{ outline: 'none', textDecoration: 'none' }}
                  href={`https://goerli.etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noreferrer"
                  key={tx.hash}
                >
                  <Transaction tx={tx} />
                </a>
              )
            })}
          </div>
        </div>
      </Body>
      {/* <button onClick={tryTransfer}>send</button> */}
    </div>
  )
}

export default Home
