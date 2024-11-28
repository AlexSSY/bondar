<script setup>
import TextComponent from '@/components/ui/TextComponent.vue';

defineProps({
  value: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <TextComponent :text="formattedValue" class="text-sm" :class="classes" />
</template>

<script>
export default {
  name: 'percent-component',
  computed: {
    classes() {
      return this.isValuePositive ? '!text-emerald-500' : '!text-rose-500'
    },
    formattedValue() {
      return (this.isValuePositive ? '+' : '') + this.value.toFixed(2) + ' %'
    },
    isValuePositive() {
      return this.value >= 0
    }
  }
}
</script>
