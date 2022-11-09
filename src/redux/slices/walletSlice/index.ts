import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConnectionType } from '../../../connection'
export interface Tx {
  hash: string
  timeStamp: string
  to: string
  txreceipt_status: string
  value: string
  from: string
}
interface WalletState {
  selectedWallet: ConnectionType
  txHistory: Tx[]
}

const initialState: WalletState = {
  selectedWallet: ConnectionType.INJECTED,
  txHistory: [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSelectedWallet: (state, action: PayloadAction<ConnectionType>) => {
      state.selectedWallet = action.payload
    },
    setTxHistory: (state, action: PayloadAction<Tx[]>) => {
      state.txHistory = action.payload
    },
  },
})

export const { setSelectedWallet, setTxHistory } = counterSlice.actions

export default counterSlice.reducer

// export * as ActionCreators from './counter.actions'
