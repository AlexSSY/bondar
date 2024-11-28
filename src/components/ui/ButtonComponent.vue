<script setup>
import TextComponent from './TextComponent.vue'

defineProps({
  variant: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: false,
  },
  fa: {
    type: String,
    required: false,
  },
  faFront: {
    type: Boolean,
    required: false,
    default: true,
  },
  toggle: {
    type: Boolean,
    default: false,
  },
})
defineEmits(['click', 'toggle'])
</script>

<template>
  <div :class="rootClasses" @click.stop="handleClick">
    <font-awesome-icon v-if="fa && faFront" :icon="fa" />
    <TextComponent v-if="text" :class="''" :text="text" />
    <font-awesome-icon v-if="fa && !faFront" :icon="fa" />
  </div>
</template>

<script>
export default {
  name: 'button-component',
  computed: {
    rootClasses() {
      var baseClasses =
        'rounded flex space-x-2 items-center justify-center cursor-pointer'
      if (this.toggle) {
        return baseClasses + (this.toggled ? ' text-orange-300' : '')
      } else {
        baseClasses += ' px-3 py-1'
      }
      switch (this.variant) {
        case 'primary':
          return baseClasses + ' bg-orange-300 hover:bg-orange-300/90'
        case 'icon':
          return 'cursor-pointer text-slate-950 hover:text-orange-300'
        default:
          return baseClasses + ' bg-slate-200 hover:bg-slate-200/90'
      }
    },

    textClasses() {
      var baseClasses = this.toggled ? 'text-orange-300' : ''
      switch (this.variant) {
        case 'primary':
          return baseClasses + ''
        default:
          return baseClasses + ''
      }
    },
  },
  methods: {
    handleClick() {
      if (this.toggle) {
        this.toggled = !this.toggled
        this.$emit('toggle', this.toggled)
        return
      }
      this.$emit('click')
    },
  },
  data() {
    return {
      toggled: false
    }
  }
}
</script>
