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
  USDT = '0xaDdF66e47873102Ec6e809aF57f407B3e865a790',
  WETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  GOLD = '0xa782EFE83e99271de6264764c9Cd05F58D68A4cD',
}

export const addressToFactoryMapping: { [key: string]: Factory } = {
  [AvailableContracts.USDT]: Erc20__factory,
  [AvailableContracts.WETH]: Erc20__factory,
  [AvailableContracts.GOLD]: Erc20__factory,
}
