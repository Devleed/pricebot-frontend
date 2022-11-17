/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-extra-semi */
export const shortenAddress = (address: string, subStart = 8, subEnd = 8) => {
  return (
    address.substring(0, subStart) +
    '...' +
    address.substring(address.length - subEnd, address.length)
  )
}

export const numberFormatter = (num: string) => {
  if (num.includes('.')) {
    // decimal
    num = parseFloat(num).toFixed(2)
  }

  return num
}

export const sixDigitsFormatter = (num: number): string => {
  if (num < 1) {
    return String(parseFloat(num.toPrecision(2)))
  }
  if (num <= 9999.99) {
    const amount = truncateExact(num, 2)
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else if (num <= 999999.99) {
    const amount = Math.trunc(num)
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    const si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ]
    let i
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break
      }
    }
    const amount = truncate(num / si[i].value) + si[i].symbol
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export const truncateExact = (num: number, fixed: number): number => {
  if (num) {
    const sNumber = num.toString()
    const index = sNumber.indexOf('.')
    const newNumber = index !== 0 ? sNumber : '0' + sNumber
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
    const number = newNumber.toString().match(re)
    if (number) {
      return parseFloat(number[0])
    }
    return num
  } else {
    return num
  }
}
export const truncate = (num: number) => {
  if (num) {
    const floatedTo = num >= 1 ? 2 : 3
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (floatedTo || -1) + '})?')
    const number = num?.toString()?.match(re)
    if (number) {
      return number[0]
    }
  } else {
    return num
  }
}
type ChainChangeRequestType = (chainId: string, cb: () => void) => Promise<void>
type AddChainToMetamaskType = (
  chainData: ChainData,
  cb: () => void,
) => Promise<void>

interface ChainData {
  chainId: string
  chainName: string
  rpcUrls: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrls: string[]
}

export const chainChangeRequest: ChainChangeRequestType = async (
  chainId,
  cb,
) => {
  ;(window as any).ethereum
    .request({
      method: 'eth_requestAccounts',
    })
    .then(function () {
      ;(window as any).ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId,
            },
          ],
        })
        .then(() => {
          cb()
        })
        .catch((error: any) => {
          console.error(error)
        })
    })
    .catch((error: any) => {
      console.log(error)
    })
}
export const addChainToMetamask: AddChainToMetamaskType = async (
  chainData,
  cb,
) => {
  try {
    ;(window as any).ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then(function () {
        ;(window as any).ethereum
          .request({
            method: 'wallet_addEthereumChain',
            params: [chainData],
          })
          .then(() => {
            cb()
          })
      })
  } catch (error) {
    console.log(error)
  }
}
