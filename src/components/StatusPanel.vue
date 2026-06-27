<script setup>
defineProps({
  panel: {
    type: Object,
    required: true,
  },
  profile: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <aside
    class="min-w-0 border-4 border-[var(--border)] bg-[var(--surface-alt)] p-4 text-[var(--text)] shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)] sm:p-5 sm:shadow-[6px_6px_0_var(--shadow),0_0_18px_var(--glow)]"
  >
    <div
      class="text-accent-outlined mb-5 break-words border-4 border-[var(--border)] bg-[var(--surface)] px-3 py-2 font-black uppercase text-[var(--accent-4-readable)]"
    >
      {{ panel.title }}
    </div>

    <div class="space-y-3">
      <div
        v-for="item in panel.items"
        :key="item.label"
        class="grid gap-2 border-2 border-[var(--border)] bg-[var(--surface)] p-3 text-sm font-black uppercase sm:grid-cols-[0.8fr_1fr] sm:gap-3"
      >
        <span class="text-[var(--muted)]">
          {{ item.label }}
        </span>

        <span class="break-words">
          {{ item.value }}
        </span>
      </div>
    </div>

    <div
      class="mt-5 break-words border-4 border-[var(--border)] bg-[var(--surface-strong)] p-4 font-mono text-xs font-bold uppercase leading-relaxed text-[var(--accent)]"
    >
      <p>&gt; whoami</p>
      <p>{{ profile.name }}</p>
      <p class="mt-3">&gt; cat focus.txt</p>
      <p>{{ profile.tagline }}</p>
    </div>
  </aside>
</template>
