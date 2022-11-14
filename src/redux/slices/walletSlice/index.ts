import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConnectionType } from '../../../connection'
interface WalletState {
  selectedWallet: ConnectionType
  signature: string | null
}

const initialState: WalletState = {
  selectedWallet: ConnectionType.INJECTED,
  signature: null,
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setSelectedWallet: (state, action: PayloadAction<ConnectionType>) => {
      state.selectedWallet = action.payload
    },
    setSignature: (state, action: PayloadAction<string>) => {
      state.signature = action.payload
    },
  },
})

export const { setSelectedWallet, setSignature } = walletSlice.actions

export default walletSlice.reducer
