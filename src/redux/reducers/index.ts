import { combineReducers } from 'redux'
import counterReducer from '../slices/counterSlice'
import walletReducer from '../slices/walletSlice'
import themeReducer from '../slices/themeSlice'

const reducers = combineReducers({
  counter: counterReducer,
  wallet: walletReducer,
  theme: themeReducer,
})

export default reducers
