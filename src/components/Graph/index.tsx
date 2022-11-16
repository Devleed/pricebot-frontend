import React, { useMemo } from 'react'
import { useAppSelector } from '@hooks/'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { sixDigitsFormatter } from '@utils/'
import moment from 'moment'

const Graph = () => {
  const txList = useAppSelector(state => state.bot.txHistory)

  const series = [
    {
      name: 'Volume',
      data: txList.map(tx => tx.goldUSD),
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
      text: 'No Data Available',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
        fontFamily: 'Poppins',
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
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
        show: false,
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

  const totalGoldValueTraded = useMemo(() => {
    return sixDigitsFormatter(
      txList.reduce((acc, cur) => {
        console.log('cc', cur.goldUSD)

        return acc + Math.abs(cur.goldUSD)
      }, 0),
    )
  }, [txList])

  return (
    <div
      style={{
        paddingTop: 20,
        height: '100%',
        backgroundColor: '#191915',
        borderRadius: 10,
        width: 600,
      }}
    >
      <div
        style={{
          fontSize: 35,
          fontWeight: 'bold',
          marginLeft: 20,
        }}
      >
        ${totalGoldValueTraded}
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
