import React, { FC } from 'react'
import { styled } from '@mui/material/styles'
import TransactionHistory from '@components/TransactionHistory'
import BotAssets from '@components/BotAssets'

type Props = Record<string, unknown>

const Body = styled('div')(({ theme }) => ({
  padding: '20px',
}))

const Home: FC<Props> = () => {
  return (
    <div className="app_container">
      <Body>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <BotAssets />
          <div></div>
        </div>
        <TransactionHistory />
      </Body>
    </div>
  )
}

export default Home
