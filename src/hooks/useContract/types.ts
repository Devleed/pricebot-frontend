import { Interface } from '@ethersproject/abi'
import { Provider } from '@ethersproject/providers'
import { Signer } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { Erc20__factory } from '@contracts/types'

interface Factory {
  readonly abi: unknown
  createInterface: () => Interface
  connect: (address: string, signerOrProvider: Signer | Provider) => Contract
}

export enum AvailableContracts {
  USDT = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  GOLD = '0x57c88ed53d53fDc6B41D57463E6C405dE162843e',
}

export const addressToFactoryMapping: { [key: string]: Factory } = {
  [AvailableContracts.USDT]: Erc20__factory,
  [AvailableContracts.WETH]: Erc20__factory,
  [AvailableContracts.GOLD]: Erc20__factory,
}
