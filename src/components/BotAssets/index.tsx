import React, { useEffect } from 'react'
import { darken, styled } from '@mui/material/styles'
import GoldenTitle from '@components/Titles/GoldenTitle'
import { ASSET_ADDRESSES_URLS, BOT_ADDRESS } from '../../constants/etherscan'
import { numberFormatter, shortenAddress, sixDigitsFormatter } from '@utils/'
import { useAppDispatch, useAppSelector } from '@hooks/'
import { useContract } from '../../hooks/useContract'
import { AvailableContracts } from '../../hooks/useContract/types'
import { Erc20 } from '@contracts/types'
import { ethers, providers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { setAssets } from '@redux/slices/botSlice'

const AssetsContainer = styled('div')(({ theme }) => ({
  padding: 20,
  backgroundColor: theme.palette.background.paper,
  borderRadius: 10,
}))

const AssetsList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 20,
  width: 240,

  '& > *': {
    marginBottom: 10,
  },
}))

const AssetItem = styled('a')(({ theme }) => ({
  fontSize: 14,
  cursor: 'pointer',
  padding: 15,
  backgroundColor: darken(theme.palette.background.paper, 0.25),
  width: '100%',
  borderRadius: 10,
  fontWeight: 'bold',
  transition: 'all 0.25s ease',
  color: 'white',
  textDecoration: 'none',

  '&:hover': {
    color: theme.palette.primary.main,
  },
}))

const BotAssets = () => {
  const { provider, chainId } = useWeb3React()

  const botAssets = useAppSelector(state => state.bot.assets)
  const dispatch = useAppDispatch()

  const goldContract = useContract<Erc20>(AvailableContracts.GOLD)
  const usdtContract = useContract<Erc20>(AvailableContracts.USDT)

  useEffect(() => {
    console.log('use effe involed')

    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (goldContract && usdtContract) {
        console.log('in if')

        const [goldBalance, usdtBalance, goldDecimals, usdtDecimals] =
          await Promise.all([
            goldContract.balanceOf(BOT_ADDRESS),
            usdtContract.balanceOf(BOT_ADDRESS),
            goldContract.decimals(),
            usdtContract.decimals(),
          ])

        const ethBalance =
          parseFloat(
            (await provider?.getBalance(BOT_ADDRESS))?.toString() || '0',
          ) /
          10 ** 18

        dispatch(
          setAssets({
            GOLD: goldBalance
              .div(ethers.BigNumber.from(String(Math.pow(10, goldDecimals))))
              .toString(),
            USDT: usdtBalance
              .div(ethers.BigNumber.from(String(Math.pow(10, usdtDecimals))))
              .toString(),
            ETH: String(ethBalance) || '0',
          }),
        )
      }
    })()
  }, [goldContract, usdtContract, provider])

  return (
    <AssetsContainer>
      <GoldenTitle size={30}>
        {shortenAddress(BOT_ADDRESS, 2, 4)} Assets
      </GoldenTitle>
      <AssetsList>
        <AssetItem
          href={
            ASSET_ADDRESSES_URLS[
              (chainId || 5) as keyof typeof ASSET_ADDRESSES_URLS
            ].GOLD
          }
          target="_blank"
          referrerPolicy="no-referrer"
          style={{ display: 'block', fontSize: 17 }}
        >
          {sixDigitsFormatter(parseFloat(botAssets.GOLD))} GOLD
        </AssetItem>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <AssetItem
            href={
              ASSET_ADDRESSES_URLS[
                (chainId || 5) as keyof typeof ASSET_ADDRESSES_URLS
              ].USDT
            }
            target="_blank"
            referrerPolicy="no-referrer"
            style={{ marginRight: 5 }}
          >
            {sixDigitsFormatter(parseFloat(botAssets.USDT))} USDT
          </AssetItem>
          <AssetItem
            href={
              ASSET_ADDRESSES_URLS[
                (chainId || 5) as keyof typeof ASSET_ADDRESSES_URLS
              ].ETH
            }
            target="_blank"
            referrerPolicy="no-referrer"
          >
            {sixDigitsFormatter(parseFloat(botAssets.ETH))} ETH
          </AssetItem>
        </div>
      </AssetsList>
    </AssetsContainer>
  )
}

export default BotAssets
