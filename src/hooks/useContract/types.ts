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
  USDT = '0x89b913d392e7E336E5de3D5424Cf6Dc2B30F1b72',
  WETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  GOLD = '0xB619e873167f00abea1D07988D387b513501D1Ef',
}

export const addressToFactoryMapping: { [key: string]: Factory } = {
  [AvailableContracts.USDT]: Erc20__factory,
  [AvailableContracts.WETH]: Erc20__factory,
  [AvailableContracts.GOLD]: Erc20__factory,
}
