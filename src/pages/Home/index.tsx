import React, { FC, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import TransactionHistory from '@components/TransactionHistory'
import BotAssets from '@components/BotAssets'
import { useAppSelector } from '@hooks/'
import StoneXVaultInfo from '@components/StoneXVaultInfo'
import DEXInfo from '@components/DEXInfo'
import LiabilityInfo from '@components/LiabilityInfo'
import useAxios from '../../hooks/useAxios'
import Graph from '@components/Graph'

type Props = Record<string, unknown>

const Body = styled('div')(({ theme }) => ({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

const BoxContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: 620,

  '& > *': {
    marginRight: 10,
  },
}))

type PriceInfo = {
  stoneXPrice: number
  stoneXReserves: number
  dexGoldPrice: number
  liability: {
    current: number
    previous: number
  }
  goldMinted: number
}

const Home: FC<Props> = () => {
  const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null)

  const axios = useAxios()
  const signature = useAppSelector(state => state.wallet.signature)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const { data }: { data: PriceInfo } = await axios.get('/price')

      setPriceInfo(data)
    })()
  }, [signature])

  if (!priceInfo) return null

  return (
    <div className="app_container">
      <Body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <BoxContainer>
            <BotAssets />
            <LiabilityInfo
              liability={priceInfo.liability.current}
              setLiability={newLiability =>
                setPriceInfo({
                  ...priceInfo,
                  liability: { ...priceInfo.liability, current: newLiability },
                })
              }
            />
            <div style={{ marginTop: 10 }}>
              <StoneXVaultInfo
                price={priceInfo.stoneXPrice}
                reserves={priceInfo.stoneXReserves}
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <DEXInfo
                price={priceInfo.dexGoldPrice}
                reserves={priceInfo.goldMinted}
              />
            </div>
          </BoxContainer>
          <div>
            <Graph />
          </div>
        </div>
        <TransactionHistory />
      </Body>
    </div>
  )
}

export default Home
