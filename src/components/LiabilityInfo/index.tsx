import React, { useEffect, useState } from 'react'
import { darken, styled } from '@mui/material/styles'
import { sixDigitsFormatter } from '@utils/'
import moment from 'moment'
import HomeBox from '@components/HomeBox'
import OutlinedButton from '@components/Buttons/OutlinedButton'
import useAxios from '../../hooks/useAxios'

const AssetItem = styled('div')(({ theme }) => ({
  fontSize: 17,
  padding: 15,
  backgroundColor: darken(theme.palette.background.paper, 0.25),
  width: '100%',
  borderRadius: 10,
  fontWeight: 'bold',
  color: 'white',
  textDecoration: 'none',
}))

type Props = {
  liability: number
  setLiability: (arg: number) => void
}

const LiabilityInfo: React.FC<Props> = ({ liability, setLiability }) => {
  const axios = useAxios()

  async function resetLiability() {
    const { data } = await axios.get('/reset-liability')

    setLiability(data)
  }

  return (
    <HomeBox title={'Liability Assets'}>
      <AssetItem>{sixDigitsFormatter(liability)} GOLD</AssetItem>
      <OutlinedButton
        style={{ marginTop: 20, width: '100%' }}
        onClick={resetLiability}
      >
        Reset
      </OutlinedButton>
    </HomeBox>
  )
}

export default LiabilityInfo
