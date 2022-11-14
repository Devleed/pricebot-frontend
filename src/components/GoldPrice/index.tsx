import React, { useEffect, useState } from 'react'
import { darken, styled } from '@mui/material/styles'
import GoldenTitle from '@components/Titles/GoldenTitle'
import axios from '../../utils/axios'
import { sixDigitsFormatter } from '@utils/'
import moment from 'moment'
import OutlinedButton from '@components/Buttons/OutlinedButton'

const PriceContainer = styled('div')(({ theme }) => ({
  padding: 20,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 10,
  height: 232,
  width: 300,
}))

const Price = styled('div')<{ size?: number }>(({ theme, size }) => ({
  fontSize: size || 20,
  fontWeight: 'bold',
}))

type PriceInfo = {
  price: number
  lastUpdated: number
  liability: number
}

const GoldPrice = () => {
  const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const { data }: { data: PriceInfo } = await axios.get('/price')

      setPriceInfo(data)
    })()
  }, [])

  if (!priceInfo) return null

  async function resetLiability() {
    const { data }: { data: PriceInfo } = await axios.get('/reset-liability')

    setPriceInfo(data)
  }

  return (
    <PriceContainer>
      <GoldenTitle size={30}>GOLD</GoldenTitle>
      <Price style={{ marginTop: 20 }}>
        {sixDigitsFormatter(priceInfo.price)} USD
      </Price>
      <Price size={11}>
        {moment(priceInfo.lastUpdated).format('MMM Do, h:mm a')}
      </Price>

      <GoldenTitle size={18} style={{ display: 'block', marginTop: 10 }}>
        {priceInfo.liability} Liability
      </GoldenTitle>
      <OutlinedButton style={{ padding: 5 }} onClick={resetLiability}>
        reset
      </OutlinedButton>
    </PriceContainer>
  )
}

export default GoldPrice
