import OutlinedButton from '@components/Buttons/OutlinedButton'
import { styled, darken } from '@mui/material/styles'
import { Tx } from '@redux/slices/botSlice'
import { shortenAddress, sixDigitsFormatter } from '@utils/'
import moment from 'moment'
import React from 'react'

const SingleTxStyle = styled('div')(({ theme }) => ({
  //   marginBottom: 5,
  // paddingVertical: 5,
  display: 'flex',
  flexDirection: 'row',
  cursor: 'pointer',
  color: 'white',
  alignItems: 'center',
  justifyContent: 'space-between',
  //   border: '1px solid gray',
  transition: 'all 0.5s ease',
  padding: 10,
  paddingLeft: 30,
  '&:hover': {
    // borderColor: theme.palette.primary.main,
    backgroundColor: darken(theme.palette.background.paper, 0.5),
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
        $
        {Number(tx.txreceipt_status) === 0
          ? '0'
          : sixDigitsFormatter(tx.USDC || 0)}
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
