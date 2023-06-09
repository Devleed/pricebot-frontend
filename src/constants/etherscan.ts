import { AvailableContracts } from '../hooks/useContract/types'

const ETHERSCAN_API_KEY = 'H9RXI75DMRJRYDAT4ZZZTF5GW75541D5PT'
export const BOT_ADDRESS = '0xc424C43E934E80332dB5EF6d32a1fa2c03C1da6b'

export const MAINNET_ETHERSCAN_URL = `https://api.etherscan.io`

export const GOERLI_ETHERSCAN_URL = 'https://api-goerli.etherscan.io'

export const GOERLI_TXLIST_URL = `${GOERLI_ETHERSCAN_URL}/api?module=account&action=txlist&address=${BOT_ADDRESS}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`

export const MAINNET_TXLIST_URL = `${MAINNET_ETHERSCAN_URL}/api?module=account&action=txlist&address=${BOT_ADDRESS}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`

export const ASSET_ADDRESSES_URLS = {
  5: {
    ETH: `${GOERLI_ETHERSCAN_URL.replace('api-', '')}/token/${
      AvailableContracts.WETH
    }`,
    GOLD: `${GOERLI_ETHERSCAN_URL.replace('api-', '')}/token/${
      AvailableContracts.GOLD
    }`,
    USDC: `${GOERLI_ETHERSCAN_URL.replace('api-', '')}/token/${
      AvailableContracts.USDC
    }`,
  },
  1: {
    ETH: `${MAINNET_ETHERSCAN_URL.replace('api-', '')}/token/${
      AvailableContracts.WETH
    }`,
    GOLD: `${MAINNET_ETHERSCAN_URL.replace('api-', '')}/token/${
      AvailableContracts.GOLD
    }`,
    USDC: `${MAINNET_ETHERSCAN_URL.replace('api-', '')}/token/${
      AvailableContracts.USDC
    }`,
  },
}

export const chainIdToTxlistUrl = {
  5: GOERLI_TXLIST_URL,
  1: MAINNET_TXLIST_URL,
}
