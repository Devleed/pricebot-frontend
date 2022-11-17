import React, { FC, useCallback, useEffect } from 'react'
import { Connector } from '@web3-react/types'
import {
  ConnectionType,
  getConnection,
  getConnectionName,
} from '../../connection'
import { useAppDispatch } from '@hooks/'
import { setSelectedWallet } from '@redux/slices/walletSlice'
import { useWeb3React } from '@web3-react/core'
import GoldButton from '@components/Buttons/GoldButton'
import styled from '@emotion/styled'
import OutlinedButton from '@components/Buttons/OutlinedButton'
import { shortenAddress } from '@utils/'

const ButtonsContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // width: '310px',
  justifyContent: 'space-between',
}))

type Props = {
  wallets: ConnectionType[]
}

const WalletButtons: FC<Props> = props => {
  const { account, connector } = useWeb3React()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const connectionType = sessionStorage.getItem('connection-type')

    if (connectionType) {
      const connector = getConnection(
        connectionType as ConnectionType,
      ).connector

      tryActivation(connector)
    }
  }, [])

  const tryActivation = useCallback(
    async (connector: Connector) => {
      const connectionType = getConnection(connector).type

      sessionStorage.setItem('connection-type', connectionType)

      try {
        //  setPendingConnector(connector)
        //  setWalletView(WALLET_VIEWS.PENDING)
        //  dispatch(updateConnectionError({ connectionType, error: undefined }))

        await connector.activate()
        dispatch(setSelectedWallet(connectionType))
      } catch (error) {
        console.error(`web3-react connection error: ${error}`)
        // dispatch(
        //   updateConnectionError({ connectionType, error: error.message }),
        // )
        // sendAnalyticsEvent(EventName.WALLET_CONNECT_TXN_COMPLETED, {
        //   result: WALLET_CONNECTION_RESULT.FAILED,
        //   wallet_type: getConnectionName(connectionType, getIsMetaMask()),
        // })
      }
    },
    [dispatch],
  )

  function onDisconnectClick() {
    sessionStorage.removeItem('connection-type')
    sessionStorage.removeItem('account')
    sessionStorage.removeItem('signature')

    connector.deactivate && connector.deactivate()
    connector.resetState && connector.resetState()
  }

  return (
    <ButtonsContainer>
      {!account ? (
        props.wallets.map((walletType, i) => {
          return (
            <GoldButton
              onClick={() => tryActivation(getConnection(walletType).connector)}
              key={walletType}
              style={{ marginRight: props.wallets.length - 1 === i ? 0 : 10 }}
            >
              Connect {getConnectionName(walletType)}
            </GoldButton>
          )
        })
      ) : (
        <>
          <OutlinedButton
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            onClick={() => {
              navigator.clipboard.writeText(account)
              alert('Address copied to clipboard')
            }}
          >
            {shortenAddress(account, 3, 6)}
          </OutlinedButton>
          <GoldButton
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            onClick={onDisconnectClick}
          >
            Disconnect
          </GoldButton>
        </>
      )}
    </ButtonsContainer>
  )
}

export default WalletButtons
