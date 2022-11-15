import React, { FC, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import TransactionHistory from '@components/TransactionHistory'
import BotAssets from '@components/BotAssets'
import { useWeb3React } from '@web3-react/core'
import keccak256 from 'keccak256'
import { useDispatch } from 'react-redux'
import { setSignature } from '@redux/slices/walletSlice'
import { useAppSelector } from '@hooks/'
import StoneXVaultInfo from '@components/StoneXVaultInfo'
import DEXInfo from '@components/DEXInfo'
import LiabilityInfo from '@components/LiabilityInfo'
import axios from '../../utils/axios'

type Props = Record<string, unknown>

const Body = styled('div')(({ theme }) => ({
  padding: '20px',
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
  liability: number
  goldMinted: number
}

const Home: FC<Props> = () => {
  const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null)

  const { provider } = useWeb3React()

  const dispatch = useDispatch()

  const signature = useAppSelector(state => state.wallet.signature)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const { data }: { data: PriceInfo } = await axios.get('/price')

      setPriceInfo(data)
    })()
  }, [])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (!signature && provider) {
        const signer = provider?.getSigner()

        const timeConstant = 86400

        const time = Math.floor(Math.floor(Date.now() / 1000) / timeConstant)
        const hash = keccak256(time.toString()).toString('hex')

        const messageSignature = await signer?.signMessage(hash)

        dispatch(setSignature(messageSignature))
      }
    })()
  }, [provider, signature])

  if (!priceInfo) return null

  return (
    <div className="app_container">
      <Body>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <BoxContainer>
            <BotAssets />
            <LiabilityInfo
              liability={priceInfo.liability}
              setLiability={newLiability =>
                setPriceInfo({ ...priceInfo, liability: newLiability })
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
          <div></div>
        </div>
        <TransactionHistory />
      </Body>
    </div>
  )
}

export default Home
