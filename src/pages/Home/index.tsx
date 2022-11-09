import React, { FC, useEffect, useState } from 'react'
import { Ember, Erc20, Kolnet } from '@contracts/types'
import { useWeb3React } from '@web3-react/core'
import { AvailableContracts } from '../../hooks/useContract/types'
import { useContract } from '../../hooks/useContract'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import { chainIdToTxlistUrl } from '../../constants/etherscan'
import Transaction from '@components/Transaction'
import { useAppSelector } from '@hooks/'
import { useDispatch } from 'react-redux'
import { setTxHistory, Tx } from '@redux/slices/walletSlice'

type Props = Record<string, unknown>

const Body = styled('div')(({ theme }) => ({
  padding: '20px',
}))
const TableHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  '& h4': {
    width: '17%',
  },
}))
const TransactionHistory = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

const Home: FC<Props> = () => {
  const { provider, account, chainId } = useWeb3React()
  // const tusdtContract = useContract<Erc20>(AvailableContracts.TUSDT)
  // const kolnetContract = useContract<Kolnet>(AvailableContracts.KOLNET)
  // const emberContract = useContract<Ember>(AvailableContracts.EMBER)

  const txList = useAppSelector(state => state.wallet.txHistory)

  const dispatch = useDispatch()

  console.log('account -', account, provider)

  useEffect(() => {
    if (chainId && txList.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        const { data }: { data: { result: Tx[] } } = await axios.get(
          chainIdToTxlistUrl[chainId as keyof typeof chainIdToTxlistUrl],
        )

        dispatch(
          setTxHistory(
            data.result.sort(
              (a, b) => Number(b.timeStamp) - Number(a.timeStamp),
            ),
          ),
        )
      })()
    }
  }, [chainId, txList])

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
            <TransactionHistory>
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
            </TransactionHistory>
          </div>
        </div>
      </Body>
      {/* <button onClick={tryTransfer}>send</button> */}
    </div>
  )
}

export default Home
