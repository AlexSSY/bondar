<script setup lang="ts">
import TextComponent from '@/components/ui/TextComponent.vue'
import PriceComponent from './header/PriceComponent.vue'
import InfoComponent from './header/InfoComponent.vue'
import PercentComponent from './header/PercentComponent.vue'
import StarButton from './header/StarButton.vue'

defineProps({
  price: Number,
  percent: Number,
  high: Number,
  low: Number,
  volume1: Number,
  volume2: Number,
})
</script>

<template>
  <div class="flex items-center space-x-10 px-3 rounded bg-white" style="grid-area: header">
    <!-- Here is symbol -->
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-1">
        <StarButton :symbol="'BTCUSDT'" />
        <TextComponent text="BTC/USDT" class="text-xl font-bold" />
      </div>
      <PriceComponent :price="price" />
    </div>

    <!-- Here is price information -->
    <div class="flex items-center space-x-4">
      <InfoComponent caption="24H Change">
        <PercentComponent :value="percent" />
      </InfoComponent>
      <InfoComponent caption="24H Highest" :value="high" />
      <InfoComponent caption="24H Lowest" :value="low" />
      <InfoComponent caption="24H Volume(BTC)" :value="volume1" />
      <InfoComponent caption="24H Value(USDT)" :value="volume2" />
    </div>
  </div>
</template>
