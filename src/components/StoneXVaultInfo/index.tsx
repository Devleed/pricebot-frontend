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
}

const StoneXVaultInfo: React.FC<Props> = ({ price }) => {
  return (
    <HomeBox title={'StoneX Vault'}>
      <Price>
        {sixDigitsFormatter(price)} <span style={{ fontSize: 14 }}>USD/oz</span>
      </Price>
    </HomeBox>
  )
}

export default StoneXVaultInfo
