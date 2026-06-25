<script setup>
defineProps({
  section: {
    type: Object,
    required: true,
  },
  isTerminal: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <footer
    class="mt-8 border-4 p-5 text-sm font-black uppercase shadow-[8px_8px_0_#000]"
    :class="
      isTerminal
        ? 'border-[#00d9ff] bg-[#080f12] text-[#f5f1e8]'
        : 'border-black bg-white text-black'
    "
  >
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <p>{{ section.builtWith }}</p>
        <p class="mt-1" :class="isTerminal ? 'text-[#b6ff00]' : 'text-black/60'">
          {{ section.mode }}
        </p>
      </div>

      <p :class="isTerminal ? 'text-[#00d9ff]' : 'text-black/60'">
        {{ section.copyright }}
      </p>
    </div>
  </footer>
</template>
