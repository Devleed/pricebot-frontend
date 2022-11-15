import React from 'react'
import { styled } from '@mui/material/styles'
import GoldenTitle from '@components/Titles/GoldenTitle'

const Container = styled('div')(({ theme }) => ({
  padding: 20,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 10,
  width: 300,
}))

type Props = {
  title: string
}

const HomeBox: React.FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <GoldenTitle size={30} style={{ marginBottom: 20 }}>
        {/* {shortenAddress(BOT_ADDRESS, 2, 4)} Assets */}
        {title}
      </GoldenTitle>
      {children}
    </Container>
  )
}

export default HomeBox
