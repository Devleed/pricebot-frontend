import OutlinedButton from '@components/Buttons/OutlinedButton'
import { styled } from '@mui/material/styles'
import { Tx } from '@pages/Home'
import moment from 'moment'
import React from 'react'

const shortenAddress = (address: string) => {
  return (
    address.substring(0, 10) +
    '...' +
    address.substring(address.length - 10, address.length)
  )
}

const SingleTxStyle = styled('div')(({ theme }) => ({
  marginBottom: 10,
  //   padding: 10,
  display: 'flex',
  flexDirection: 'row',
  cursor: 'pointer',
  color: 'white',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid gray',
  transition: 'all 0.5s ease',
  borderRadius: '5px',
  padding: 10,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '& *': {
    width: '17%',
    fontSize: 12,
  },
}))

const txStatus = ['failed', 'success']

type Props = {
  tx: Tx
}

const Transaction: React.FC<Props> = ({ tx }) => {
  return (
    <SingleTxStyle>
      <div>{shortenAddress(tx.hash)}</div>
      <div>{moment(Number(tx.timeStamp) * 1000).fromNow()}</div>
      <div>{shortenAddress(tx.from)}</div>
      <div>{shortenAddress(tx.to)}</div>
      <div>
        {Number(tx.value) > 0
          ? (Number(tx.value) / 10 ** 18).toFixed(4)
          : tx.value}
      </div>
      <div>
        <OutlinedButton
          style={{
            //   width: '10%',
            height: 20,
            width: 60,
            padding: 0,
            fontSize: 11,
            borderRadius: 50,
          }}
        >
          {txStatus[Number(tx.txreceipt_status)]}
        </OutlinedButton>
      </div>
    </SingleTxStyle>
  )
}

export default Transaction
