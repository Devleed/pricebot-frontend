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
import HomeBox from '@components/HomeBox'

const AssetsList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

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
  const usdcContract = useContract<Erc20>(AvailableContracts.USDC)

  useEffect(() => {
    console.log('use effe involed')

    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (goldContract && usdcContract) {
        console.log('in if')

        const [goldBalance, usdcBalance, goldDecimals, usdcDecimals] =
          await Promise.all([
            goldContract.balanceOf(BOT_ADDRESS),
            usdcContract.balanceOf(BOT_ADDRESS),
            goldContract.decimals(),
            usdcContract.decimals(),
          ])

        const ethBalance =
          parseFloat(
            (await provider?.getBalance(BOT_ADDRESS))?.toString() || '0',
          ) /
          10 ** 18

        dispatch(
          setAssets({
            GOLD: String(
              parseFloat(goldBalance.toString()) / Math.pow(10, goldDecimals),
            ),
            USDC: usdcBalance
              .div(ethers.BigNumber.from(String(Math.pow(10, usdcDecimals))))
              .toString(),
            ETH: String(ethBalance) || '0',
          }),
        )
      }
    })()
  }, [goldContract, usdcContract, provider])

  return (
    <HomeBox title={`Bot Assets`}>
      <AssetsList>
        <AssetItem
          href={
            ASSET_ADDRESSES_URLS[1 as keyof typeof ASSET_ADDRESSES_URLS].GOLD
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
              ].USDC
            }
            target="_blank"
            referrerPolicy="no-referrer"
            style={{ marginRight: 5 }}
          >
            {sixDigitsFormatter(parseFloat(botAssets.USDC))} USDC
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
    </HomeBox>
  )
}

export default BotAssets
