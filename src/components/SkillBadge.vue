<script setup>
defineProps({
  isTerminal: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <span
    class="inline-block border-4 px-3 py-2 text-sm font-black uppercase shadow-[3px_3px_0_#000]"
    :class="
      isTerminal
        ? 'border-[#00d9ff] bg-[#10191d] text-[#b6ff00]'
        : 'border-black bg-white text-black'
    "
  >
    <slot />
  </span>
</template>
