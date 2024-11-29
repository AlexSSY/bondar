<script setup lang="ts">
import StarButton from './header/StarButton.vue'
</script>

<template>
  <div class="px-4 pt-4 bg-white" style="grid-area: pairs">
    <!-- Search -->
    <div class="relative">
      <input
        class="bg-slate-50 rounded-lg py-1 pl-8 pr-3 w-full text-sm border-2 border-transparent focus:outline-none focus:border-cyan-300"
        placeholder="Search"
        type="text"
      />
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
      />
    </div>

    <!-- First symbol filters -->
    <div class="mt-2 flex space-x-2">
      <div
        v-for="(item, idx) in ['All', 'Pre-Token', 'Margin', 'AAM']"
        :key="idx"
        class="px-3 py-1 cursor-pointer rounded text-xs hover:bg-green-100 hover:text-green-500"
      >
        <span>{{ item }}</span>
      </div>
    </div>

    <!-- Second symbol filters -->
    <div class="mt-2 flex space-x-3 items-center">
      <StarButton />
      <div
        v-for="(item, idx) in ['USDT', 'USDC', 'BTC']"
        :key="idx"
        class="cursor-pointer text-xs border-b-2 border-transparent hover:border-green-500 hover:text-green-500"
      >
        <span>{{ item }}</span>
      </div>
    </div>

    <!-- Symbols list -->
     <div>
      <div class="flex">
        
      </div>
     </div>
  </div>
</template>
