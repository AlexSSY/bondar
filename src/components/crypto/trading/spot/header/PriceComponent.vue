<script setup>
import TextComponent from '@/components/ui/TextComponent.vue'
import { toNice } from '@/services/utils'
defineProps({
  price: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <TextComponent :text="toNice(price)" class="text-xl" :class="classes" />
</template>

<script>
export default {
  name: 'price-component',
  computed: {
    classes() {
      var classList = this.price < this.prevPrice ? '!text-rose-500' : '!text-emerald-500'
      this.prevPrice = this.price
      return classList
    },
  },
  data() {
    return {
      prevPrice: 0,
    }
  },
}
</script>
