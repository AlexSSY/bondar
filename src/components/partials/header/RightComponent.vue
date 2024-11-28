<script setup lang="ts">
import ButtonComponent from '@/components/ui/ButtonComponent.vue';
</script>

<template>
  <div class="flex items-center space-x-5">
    <ButtonComponent variant="icon" fa="fa-solid fa-magnifying-glass" />

    <!-- Login / Register button group -->
    <div class="flex items-center space-x-2">
      <ButtonComponent text="Log In" />
      <ButtonComponent text="Register" variant="primary" @click="console.log('Register button clicked.')" />
    </div>
    <ButtonComponent fa="fa-solid fa-download" variant="icon" />
    <ButtonComponent fa="fa-solid fa-globe" variant="icon" />
    <ButtonComponent fa="fa-solid fa-book" variant="icon" />
    <ButtonComponent fa="fa-solid fa-gear" variant="icon" />
    <ButtonComponent fa="fa-solid fa-sun" variant="icon" />
  </div>
</template>
