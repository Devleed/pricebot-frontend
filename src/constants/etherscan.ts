const ETHERSCAN_API_KEY = 'H9RXI75DMRJRYDAT4ZZZTF5GW75541D5PT'
const BOT_ADDRESS = '0x09050568ed00123da7d9250c8a57ad393eed8307'

export const MAINNET_ETHERSCAN_URL = `https://api.etherscan.io/api`

export const GOERLI_ETHERSCAN_URL = 'https://api-goerli.etherscan.io/api'

export const GOERLI_TXLIST_URL = `${GOERLI_ETHERSCAN_URL}?module=account&action=txlist&address=${BOT_ADDRESS}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`

export const MAINNET_TXLIST_URL = `${MAINNET_ETHERSCAN_URL}?module=account&action=txlist&address=${BOT_ADDRESS}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`

export const chainIdToTxlistUrl = {
  5: GOERLI_TXLIST_URL,
  1: MAINNET_TXLIST_URL,
}
