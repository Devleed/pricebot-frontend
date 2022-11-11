import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConnectionType } from '../../../connection'
interface WalletState {
  selectedWallet: ConnectionType
}

const initialState: WalletState = {
  selectedWallet: ConnectionType.INJECTED,
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setSelectedWallet: (state, action: PayloadAction<ConnectionType>) => {
      state.selectedWallet = action.payload
    },
  },
})

export const { setSelectedWallet } = walletSlice.actions

export default walletSlice.reducer

// export * as ActionCreators from './counter.actions'
