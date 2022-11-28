import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from '@redux/configureStore'
import Web3Provider from '@components/Web3Provider'
import MuiTheme from './theme'

import './index.css'

// WalletConnect does not work with webpack 5 i.e. react@18+
// This is required to make it work
import { Buffer } from 'buffer'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as unknown as any).Buffer = (window as unknown as any).Buffer || Buffer

const pass = prompt('Enter password to enter')

ReactDOM.render(
  <React.StrictMode>
    {pass === 'Bull_1234' ? (
      <Provider store={store}>
        <MuiTheme>
          <Web3Provider />
        </MuiTheme>
      </Provider>
    ) : (
      <div></div>
    )}
  </React.StrictMode>,
  document.getElementById('root'),
)
