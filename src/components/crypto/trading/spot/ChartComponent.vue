<script setup>
import { subscribeKLines } from '@/services/trade'
import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts'
</script>

<template>
  <div class="px-3 bg-white cursor-crosshair" id="chart" style="grid-area: chart"></div>
</template>
<script>
export default {
  name: 'chart-component',
  data() {
    return {
      chart: null,
      candlestickSeries: null,
      priceLine: null,
    }
  },
  methods: {
    handleKLines(kLines, rewrite) {
      if (rewrite) {
        this.candlestickSeries.setData(kLines)
      } else {
        this.candlestickSeries.update(kLines[0])
      }

      var price = kLines[kLines.length - 1].close
      this.priceLine.applyOptions({
        price: price,
        title: `Price: ${price.toFixed(2)}`,
      })
      this.candlestickSeries.applyOptions({
        priceLineVisible: true,
      })
    },
  },
  mounted() {
    var chartOptions = {
      layout: {
        background: { color: '#222' },
        textColor: '#C3BCDB',
      },
      grid: {
        vertLines: { color: '#444' },
        horzLines: { color: '#444' },
      },
    }
    this.chart = createChart(document.getElementById('chart'), chartOptions)
    // this.chart.timeScale().applyOptions({
    //   borderColor: '#eee',
    // })

    // this.chart.priceScale().applyOptions({
    //   borderColor: '#eee',
    // })
    // Customizing the Crosshair
    this.chart.applyOptions({
      crosshair: {
        // Change mode from default 'magnet' to 'normal'.
        // Allows the crosshair to move freely without snapping to datapoints
        mode: CrosshairMode.Normal,

        // Vertical crosshair line (showing Date in Label)
        vertLine: {
          width: 2,
          color: '#C3BCDB44',
          style: LineStyle.Solid,
          labelBackgroundColor: '#9B7DFF',
        },

        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
          color: '#9B7DFF',
          labelBackgroundColor: '#9B7DFF',
        },
      },
    })
    this.candlestickSeries = this.chart.addCandlestickSeries()
    // Changing the Candlestick colors
    this.candlestickSeries.applyOptions({
      wickUpColor: 'rgb(54, 116, 217)',
      upColor: 'rgb(54, 116, 217)',
      wickDownColor: 'rgb(225, 50, 85)',
      downColor: 'rgb(225, 50, 85)',
      borderVisible: false,
    })
    this.priceLine = this.candlestickSeries.createPriceLine({
      price: 0,
      color: '#FF0000', // Red color for the price line
      lineWidth: 2,
      lineStyle: LineStyle.Dotted, // Dotted line style
      axisLabelVisible: true,
      title: 'Current Price',
    })
    subscribeKLines(this.handleKLines)
  },
}
</script>
