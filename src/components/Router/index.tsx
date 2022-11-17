import React, { useEffect } from 'react'
import Navbar from '@components/Navbar'
import Configuration from '@pages/Configuration'
import Home from '@pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAppSelector } from '@hooks/'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import keccak256 from 'keccak256'
import { setSignature } from '@redux/slices/walletSlice'

const Router = () => {
  const signature = useAppSelector(state => state.wallet.signature)
  const { provider, account } = useWeb3React()

  const dispatch = useDispatch()

  useEffect(() => {
    if (account && provider) {
      const previousConnectedAccount = sessionStorage.getItem('account')

      if (previousConnectedAccount === account) {
        dispatch(setSignature(sessionStorage.getItem('signature')))
      } else {
        dispatch(setSignature(null))
        signAndSetSignature()
      }
    } else {
      dispatch(setSignature(null))
    }
  }, [provider, account])

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
