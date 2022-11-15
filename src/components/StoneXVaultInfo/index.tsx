import React, { useEffect, useState } from 'react'
import { darken, styled } from '@mui/material/styles'
import { sixDigitsFormatter } from '@utils/'
import moment from 'moment'
import HomeBox from '@components/HomeBox'

const Price = styled('div')<{ size?: number }>(({ theme, size }) => ({
  fontSize: size || 20,
  fontWeight: 'bold',
}))

type Props = {
  price: number
  reserves: number
}

const StoneXVaultInfo: React.FC<Props> = ({ price, reserves }) => {
  return (
    <HomeBox title={'StoneX Vault'}>
      <Price>{sixDigitsFormatter(price)} USD</Price>
      <Price style={{ marginTop: 20 }}>
        {sixDigitsFormatter(reserves)} GOLD
      </Price>
    </HomeBox>
  )
}

export default StoneXVaultInfo
