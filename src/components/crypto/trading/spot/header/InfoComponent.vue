<script setup>
import TextComponent from '@/components/ui/TextComponent.vue'
import { toNice } from '@/services/utils';

defineProps({
  caption: {
    type: String
  },
  value: {
    type: Number,
    default: null,
  },
})
</script>

<template>
  <div class="flex flex-col space-y-1">
    <TextComponent :text="caption" class="text-slate-950/50 text-xs select-none" />
    <TextComponent v-if="value" :text="toNice(value)" class="text-sm" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'info-component',
}
</script>
