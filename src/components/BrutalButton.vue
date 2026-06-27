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
})

const baseClasses =
  'inline-flex min-w-0 items-center justify-center border-4 px-4 py-3 text-center text-sm font-black uppercase shadow-[4px_4px_0_var(--shadow),0_0_12px_var(--glow)] transition active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer sm:px-6 sm:text-base'

const variantClasses = {
  primary: 'border-[var(--border)] bg-[var(--accent)] text-[var(--accent-text)]',
  secondary: 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)]',
  dark: 'border-[var(--border)] bg-[var(--surface-strong)] text-[var(--inverse-text)]',
}
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :target="href.startsWith('http') ? '_blank' : null"
    :rel="href.startsWith('http') ? 'noreferrer' : null"
    :class="[baseClasses, variantClasses[variant]]"
  >
    <slot />
  </a>

  <button v-else type="button" :class="[baseClasses, variantClasses[variant]]">
    <slot />
  </button>
</template>
