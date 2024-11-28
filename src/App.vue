<script setup>
import { /*RouterLink,*/ RouterView } from 'vue-router'
import HeaderComponent from './components/partials/HeaderComponent.vue'
</script>

<template>
  <HeaderComponent />
  <!-- <RouterLink to="/">Home</RouterLink> -->
  <!-- <RouterLink to="/about">About</RouterLink> -->
  <RouterView />
</template>
