<script setup>
import ButtonComponent from './ButtonComponent.vue'

defineProps({
  isDisabled: { type: Boolean, default: false },
  defaultToggled: { type: Boolean, default: false },
})
</script>

<template>
  <ButtonComponent
    :variant="isToggled ? 'primary' : null"
    :isDisabled="isDisabled"
    @click="toggle"
  >
    <slot>{{ isToggled ? 'On' : 'Off' }}</slot>
  </ButtonComponent>
</template>

<script>
export default {
  name: 'toggle-button',
  components: { ButtonComponent },
  data() {
    return {
      isToggled: false,
    }
  },
  methods: {
    toggle() {
      if (!this.isDisabled) {
        this.isToggled = !this.isToggled
        this.$emit('update:toggled', this.isToggled)
      }
    },
  },
}
</script>
