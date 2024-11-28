<script setup>
import { subscribe, unsubscribe } from '@/services/price'
import TextComponent from '../ui/TextComponent.vue'

defineProps({
  symbol1: { type: String, required: true },
  symbol2: { type: String, required: true },
})
</script>

<template>
  <div
    class="rounded-xl p-[2px] min-h-64 bg-gradient-to-b from-slate-400 via-slate-600 to-slate-900"
  >
    <div class="rounded-xl h-full p-3 bg-slate-950">
      <TextComponent>{{ $props.symbol1 }} / {{ $props.symbol2 }}</TextComponent>
      <br />
      <TextComponent :class="classList">{{ nicePrice }}</TextComponent>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: 0,
      classList: '',
      prevPrice: 0,
    }
  },
  computed: {
    symbol() {
      return this.symbol1 + this.symbol2
    },

    nicePrice() {
      return this.price.toNice()
    },
  },
  methods: {
    priceHandler(data) {
      this.price = parseFloat(data.c)
      this.classList =
        this.price < this.prevPrice
          ? 'text-red-500 dark:text-red-500'
          : 'text-green-500 dark:text-green-500'
      setTimeout(() => (this.classList = ''), 1500)
      this.prevPrice = this.price
    },
  },
  beforeMount() {
    subscribe(this.symbol, this.priceHandler)
  },

  beforeUnmount() {
    unsubscribe(this.symbol, this.priceHandler)
  },
}
</script>
