import React from 'react'
import { styled } from '@mui/material/styles'
import { sixDigitsFormatter } from '@utils/'
import HomeBox from '@components/HomeBox'

const Price = styled('div')<{ size?: number }>(({ theme, size }) => ({
  fontSize: size || 20,
  fontWeight: 'bold',
}))

type Props = {
  price: number
  reserves: number
}

const DEXInfo: React.FC<Props> = ({ price, reserves }) => {
  return (
    <HomeBox title={'DEX'}>
      <Price>
        {sixDigitsFormatter(price)}{' '}
        <span style={{ fontSize: 14 }}>GOLD/USDC</span>
      </Price>
      <Price style={{ marginTop: 20 }}>
        {sixDigitsFormatter(reserves)}{' '}
        <span style={{ fontSize: 14 }}>GOLD supply</span>
      </Price>
    </HomeBox>
  )
}

export default DEXInfo
