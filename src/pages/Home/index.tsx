import React, { FC, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import TransactionHistory from '@components/TransactionHistory'
import BotAssets from '@components/BotAssets'
import { useWeb3React } from '@web3-react/core'
import keccak256 from 'keccak256'
import { useDispatch } from 'react-redux'
import { setSignature } from '@redux/slices/walletSlice'
import { useAppSelector } from '@hooks/'
import GoldPrice from '@components/GoldPrice'

type Props = Record<string, unknown>

const Body = styled('div')(({ theme }) => ({
  padding: '20px',
}))

const Home: FC<Props> = () => {
  const { provider } = useWeb3React()

  const dispatch = useDispatch()

  const signature = useAppSelector(state => state.wallet.signature)

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

  return (
    <div className="app_container">
      <Body>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ marginRight: 10 }}>
              <BotAssets />
            </div>
            <GoldPrice />
          </div>
          <div></div>
        </div>
        <TransactionHistory />
      </Body>
    </div>
  )
}

export default Home
