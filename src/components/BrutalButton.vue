<script setup>
defineProps({
  href: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: 'primary',
  },
  isTerminal: {
    type: Boolean,
    default: false,
  },
})

const baseClasses =
  'border-4 px-6 py-3 font-black uppercase shadow-[4px_4px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none'

const variantClasses = {
  primary: {
    brutal: 'border-black bg-[#b6ff00] text-black',
    terminal: 'border-[#b6ff00] bg-[#b6ff00] text-black',
  },
  secondary: {
    brutal: 'border-black bg-white text-black',
    terminal: 'border-[#00d9ff] bg-[#10191d] text-[#00d9ff]',
  },
  dark: {
    brutal: 'border-black bg-black text-white',
    terminal: 'border-[#ff2e88] bg-[#ff2e88] text-white',
  },
}
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="href.startsWith('http') ? '_blank' : null"
    :rel="href.startsWith('http') ? 'noreferrer' : null"
    :class="[baseClasses, variantClasses[variant][isTerminal ? 'terminal' : 'brutal']]"
  >
    <slot />
  </a>

  <button
    v-else
    type="button"
    :class="[baseClasses, variantClasses[variant][isTerminal ? 'terminal' : 'brutal']]"
  >
    <slot />
  </button>
</template>
