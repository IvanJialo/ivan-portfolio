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
})
</script>

<template>
  <div class="mb-6 min-w-0">
    <div class="flex items-start gap-3">
      <span class="mt-1 h-5 w-5 shrink-0 border-4 border-[var(--border)] bg-[var(--accent)]"></span>

      <h2 class="min-w-0 break-words text-xl font-black uppercase sm:text-2xl md:text-3xl">
        {{ title }}
      </h2>
    </div>

    <p v-if="subtitle" class="mt-2 max-w-3xl text-sm font-bold text-[var(--muted)] md:text-base">
      {{ subtitle }}
    </p>
  </div>
</template>
