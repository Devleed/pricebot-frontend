import { combineReducers } from 'redux'
import counterReducer from '../slices/counterSlice'
import walletReducer from '../slices/walletSlice'
import themeReducer from '../slices/themeSlice'
import botReducer from '../slices/botSlice'

const reducers = combineReducers({
  counter: counterReducer,
  wallet: walletReducer,
  theme: themeReducer,
  bot: botReducer,
})

export default reducers
