import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Transaction from '@components/Transaction'
import { useWeb3React } from '@web3-react/core'
import { useAppSelector } from '@hooks/'
import { useDispatch } from 'react-redux'
import { chainIdToTxlistUrl } from '../../constants/etherscan'
import axios from '../../utils/axios'
import { setTxHistory, Tx } from '@redux/slices/botSlice'

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
const TxList = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

const TransactionHistory = () => {
  const { provider, account, chainId } = useWeb3React()
  // const tusdtContract = useContract<Erc20>(AvailableContracts.TUSDT)

  const txList = useAppSelector(state => state.bot.txHistory)

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
        <TxList>
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
        </TxList>
      </div>
    </div>
  )
}

export default TransactionHistory