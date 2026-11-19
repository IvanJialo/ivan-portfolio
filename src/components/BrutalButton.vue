<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: {
    type: String,
    default: null,
  },
  variant: {
    type: String,
    default: 'primary',
  },
  newTabLabel: {
    type: String,
    default: '',
  },
})

const isExternal = computed(() => /^https?:\/\//i.test(props.href || ''))

const baseClasses =
  'inline-flex min-w-0 items-center justify-center border-4 px-4 py-3 text-center text-sm font-black uppercase shadow-[4px_4px_0_var(--shadow),0_0_12px_var(--glow)] transition-[translate,box-shadow] duration-150 ease-out motion-safe:hover:-translate-y-0.5 hover:shadow-[5px_6px_0_var(--shadow),0_0_14px_var(--glow)] motion-safe:active:translate-x-1 motion-safe:active:translate-y-1 active:shadow-none cursor-pointer sm:px-6 sm:text-base'

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
    :target="isExternal ? '_blank' : null"
    :rel="isExternal ? 'noopener noreferrer' : null"
    :class="[baseClasses, variantClasses[variant]]"
  >
    <slot />
    <span v-if="isExternal && newTabLabel" class="sr-only"> ({{ newTabLabel }})</span>
  </a>

  <button v-else type="button" :class="[baseClasses, variantClasses[variant]]">
    <slot />
  </button>
</template>
