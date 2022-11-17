import React, { useMemo } from 'react'
import { useAppSelector } from '@hooks/'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { sixDigitsFormatter } from '@utils/'
import moment from 'moment'
import { Tx } from '@redux/slices/botSlice'

const Graph = () => {
  const txList = useAppSelector(state => state.bot.txHistory)

  const separatedTxList = useMemo(() => {
    const today: Tx[] = [],
      yesterday: Tx[] = []

    txList.forEach(tx => {
      if (Number(tx.timeStamp) * 1000 > Date.now() - 8.64e7) {
        // tx occured in 24 hrs
        today.push(tx)
      } else if (Number(tx.timeStamp) * 1000 > Date.now() - 8.64e7 * 2) {
        // tx occured before 24 hrs
        yesterday.push(tx)
      }
    })

    return { today, yesterday }
  }, [txList.length])

  console.log(separatedTxList)

  const xAxis = useMemo(() => {
    return separatedTxList.today.map(tx => Number(tx.timeStamp) * 1000)
  }, [separatedTxList.today.length])

  const totalGoldValueTradedToday = useMemo(() => {
    return separatedTxList.today.reduce((acc, cur) => {
      return acc + Math.abs(cur.goldUSD)
    }, 0)
  }, [separatedTxList.today.length])

  const difference = useMemo(() => {
    // (today - yesterday) / today * 100
    const totalGoldValueTradedYesterday = separatedTxList.yesterday.reduce(
      (acc, cur) => {
        return acc + Math.abs(cur.goldUSD)
      },
      0,
    )

    const percentageDifference =
      ((totalGoldValueTradedToday - totalGoldValueTradedYesterday) /
        totalGoldValueTradedToday) *
      100

    return [Infinity, -Infinity].includes(percentageDifference)
      ? parseInt(String(percentageDifference).replace('Infinity', '100'))
      : percentageDifference
  }, [totalGoldValueTradedToday, separatedTxList.yesterday.length])

  const series = [
    {
      name: 'Trading Volume',
      data: separatedTxList.today.map(tx => tx.goldUSD),
    },
  ]

  const options: ApexOptions = {
    chart: {
      background: '#191915',
      height: 200,
      width: '60%',
      type: 'area',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: false,
          delay: 400,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 800,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      show: true,
      curve: 'smooth',
      colors: ['#A18841'],
      width: 3,
      dashArray: 0,
    },
    fill: {
      type: 'gradient',
      colors: ['#A18841'],
      gradient: {
        shade: 'dark',
        gradientToColors: ['#191915'],
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    noData: {
      text: 'No transactions made today',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (value, timestamp, opts) {
          return moment(xAxis[Number(value)]).format('h:mm a')
        },
      },
      axisBorder: {
        show: true,
        color: 'transparent',
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: function (val, index) {
          return `$${sixDigitsFormatter(val)}`
        },
      },
    },
    tooltip: {
      enabled: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      marker: {
        show: false,
      },
      items: {
        display: 'flex',
      },
      fixed: {
        enabled: false,
        position: 'topLeft',
        offsetX: 0,
        offsetY: 0,
      },
    },
  }

  return (
    <div
      style={{
        paddingTop: 20,
        height: '100%',
        backgroundColor: '#191915',
        borderRadius: 10,
        width: 700,
      }}
    >
      <div
        style={{
          fontSize: 35,
          fontWeight: 'bold',
          marginLeft: 20,
        }}
      >
        ${sixDigitsFormatter(totalGoldValueTradedToday)}
        <span
          style={{
            fontSize: 14,
            color: difference < 0 ? '#e32636' : '#4BB543',
            marginLeft: 10,
          }}
        >
          {sixDigitsFormatter(difference)}%
        </span>
      </div>
      <div
        style={{
          fontSize: 12,
          marginLeft: 20,
          color: '#A18841',
        }}
      >
        {moment(Date.now()).format('MMM Do YY, h:mm a')}
      </div>

      <Chart
        options={options}
        series={series}
        type="area"
        // height={'100%'}
        width={'100%'}
      />
    </div>
  )
}

export default Graph
