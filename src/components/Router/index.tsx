import React, { useEffect, useState } from 'react'
import Navbar from '@components/Navbar'
import Configuration from '@pages/Configuration'
import Home from '@pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '@hooks/'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import keccak256 from 'keccak256'
import { setSignature } from '@redux/slices/walletSlice'
import GoldButton from '@components/Buttons/GoldButton'
import { chainChangeRequest } from '@utils/'
import { styled } from '@mui/material/styles'

const WrongNetworkErrorContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  fontSize: 16,
}))

const Router = () => {
  const [showNetworkError, setShowNetworkError] = useState<boolean | null>(null)

  const signature = useAppSelector(state => state.wallet.signature)
  const { provider, account, chainId } = useWeb3React()

  const dispatch = useDispatch()

  useEffect(() => {
    if (account && provider) {
      const previousConnectedAccount = sessionStorage.getItem('account')

      if (previousConnectedAccount === account) {
        dispatch(setSignature(sessionStorage.getItem('signature')))
      } else {
        dispatch(setSignature(null))
        console.log('getting sig')

        signAndSetSignature()
      }
    } else {
      dispatch(setSignature(null))
    }
  }, [provider, account])

  useEffect(() => {
    console.log('chain -', chainId)
    if (chainId) {
      if (chainId !== 1 && chainId !== 5) setShowNetworkError(true)
      else setShowNetworkError(false)
    }
  }, [chainId])

  const signAndSetSignature = async () => {
    const signer = provider!.getSigner()

    const timeConstant = 86400

    const time = Math.floor(Math.floor(Date.now() / 1000) / timeConstant)
    const hash = keccak256(time.toString()).toString('hex')

    const messageSignature = await signer.signMessage(hash)

    sessionStorage.setItem('signature', messageSignature)
    sessionStorage.setItem('account', account!)

    dispatch(setSignature(messageSignature))
  }

  if (showNetworkError) {
    return (
      <WrongNetworkErrorContainer>
        <div>Unsupported Network, please switch to Goerli Testnet</div>{' '}
        <GoldButton
          style={{ marginTop: 10 }}
          onClick={() =>
            chainChangeRequest(`0x${Number(5).toString(16)}`, () =>
              console.log('changed'),
            )
          }
        >
          Switch Network
        </GoldButton>
      </WrongNetworkErrorContainer>
    )
  }

  return (
    <BrowserRouter>
      <Navbar />
      {signature ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/configure" element={<Configuration />} />
        </Routes>
      ) : (
        <div
          style={{
            position: 'relative',
            height: '100vh',
            width: '100vw',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-100%)',
              fontSize: 30,
              color: '#A18841',
            }}
          >
            Connect Wallet To View Data
          </div>
        </div>
      )}
    </BrowserRouter>
  )
}

export default Router
