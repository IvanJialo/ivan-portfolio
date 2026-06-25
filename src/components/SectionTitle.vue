<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  isTerminal: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="mb-6">
    <div class="flex items-center gap-3">
      <span
        class="h-5 w-5 border-4"
        :class="isTerminal ? 'border-[#b6ff00] bg-[#ff2e88]' : 'border-black bg-[#b6ff00]'"
      ></span>

      <h2 class="text-2xl font-black uppercase md:text-3xl">
        {{ title }}
      </h2>
    </div>

    <p
      v-if="subtitle"
      class="mt-2 max-w-3xl text-sm font-bold md:text-base"
      :class="isTerminal ? 'text-[#f5f1e8]/80' : 'text-black/70'"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
