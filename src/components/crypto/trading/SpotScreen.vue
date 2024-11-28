<script setup>
import { initTrade, subscribeKLines, subscribeLast24hChanges } from '@/services/trade'
import BookComponent from './spot/BookComponent.vue'
import FormComponent from './spot/FormComponent.vue'
import PairsComponent from './spot/PairsComponent.vue'
import ChartComponent from './spot/ChartComponent.vue'
import TableComponent from './spot/TableComponent.vue'
import FooterComponent from './spot/FooterComponent.vue'
import HeaderComponent from './spot/HeaderComponent.vue'
import MoversComponent from './spot/MoversComponent.vue'
import TradesComponent from './spot/TradesComponent.vue'
</script>

<template>
  <!-- book chart footer form header movers pairs table trades -->
  <div class="spot-trade">
    <HeaderComponent
      :low="low"
      :high="high"
      :price="price"
      :percent="percent"
      :volume1="volume1"
      :volume2="volume2"
    />
    <BookComponent />
    <ChartComponent />
    <FormComponent />
    <FooterComponent />
    <MoversComponent />
    <PairsComponent />
    <TableComponent />
    <TradesComponent />
  </div>
</template>

<script>
export default {
  name: 'spot-screen',
  data() {
    return {
      symbol: 'btcusdt',
      price: 0,
      low: 0,
      high: 0,
      volume1: 0,
      volume2: 0,
      percent: 0,
    }
  },
  watch: {
    symbol() {
      initTrade(this.symbol)
    },
  },
  methods: {
    handleKLines(kLines) {
      var lastKLine = kLines[kLines.length - 1]
      this.price = lastKLine.close
      this.low = lastKLine.low
      this.high = lastKLine.high
    },
    handle24hChanges(last24hChange) {
      this.volume1 = last24hChange.volume1
      this.volume2 = last24hChange.volume2
      this.percent = last24hChange.percent
    },
  },
  mounted() {
    initTrade(this.symbol)
    subscribeKLines(this.handleKLines)
    subscribeLast24hChanges(this.handle24hChanges)
  },
}
</script>
