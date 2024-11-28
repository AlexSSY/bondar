<script setup>
defineProps({
  text: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <span :class="rootClasses">
    <span v-if="text != null">{{ text }}</span>
    <slot v-if="text == null"></slot>
  </span>
</template>

<script>
export default {
  name: 'text-component',
  computed: {
    rootClasses() {
      var baseRootClasses = 'text-slate-950 dark:text-slate-50 text-base'
      return baseRootClasses
    },
  },
}
</script>
