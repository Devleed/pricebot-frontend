import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Transaction from '@components/Transaction'
import { useWeb3React } from '@web3-react/core'
import { useAppSelector } from '@hooks/'
import { useDispatch } from 'react-redux'
import { setTxHistory, Tx } from '@redux/slices/botSlice'
import useAxios from '../../hooks/useAxios'

const TableHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  paddingLeft: 30,

  '& h4': {
    width: '17%',
  },
}))
const TxList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  paddingBottom: 10,
}))

const TransactionHistory = () => {
  const axios = useAxios()

  const { chainId } = useWeb3React()
  // const tusdcContract = useContract<Erc20>(AvailableContracts.TUSDC)

  const txList = useAppSelector(state => state.bot.txHistory)

  const dispatch = useDispatch()

  useEffect(() => {
    if (chainId && txList.length === 0) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        const { data }: { data: Tx[] } = await axios.get('bot/config/txs')

        dispatch(setTxHistory(data))
      })()
    }
  }, [chainId, txList])

  return (
    <div style={{ width: 1320 }}>
      <h2>Recent Transactions</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TableHeader>
          <h4>Txn Hash</h4>
          <h4>Age</h4>
          <h4>From</h4>
          <h4>To</h4>
          <h4>Value</h4>
          <h4>Status</h4>
        </TableHeader>
        <TxList>
          {txList.map(tx => {
            return (
              <a
                style={{ outline: 'none', textDecoration: 'none' }}
                href={`https://etherscan.io/tx/${tx.hash}`}
                target="_blank"
                rel="noreferrer"
                key={tx.hash}
              >
                <Transaction tx={tx} />
              </a>
            )
          })}
        </TxList>
      </div>
    </div>
  )
}

export default TransactionHistory
