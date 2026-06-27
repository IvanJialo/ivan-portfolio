<script setup>
defineProps({
  section: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <footer
    class="mt-8 border-4 border-[var(--border)] bg-[var(--surface)] p-4 text-sm font-black uppercase text-[var(--text)] shadow-[5px_5px_0_var(--shadow),0_0_16px_var(--glow)] sm:p-5 sm:shadow-[8px_8px_0_var(--shadow),0_0_22px_var(--glow)]"
  >
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div class="min-w-0 break-words">
        <p>{{ section.builtWith }}</p>
        <p class="mt-1 text-[var(--muted)]">
          {{ section.mode }}
        </p>
      </div>

      <p class="break-words text-[var(--muted)]">
        {{ section.copyright }}
      </p>
    </div>
  </footer>
</template>
