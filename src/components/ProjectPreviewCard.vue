<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  labels: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <button
    type="button"
    class="neon-project-preview block h-full min-h-[340px] w-full overflow-hidden border-4 border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)] transition-[translate,box-shadow] duration-200 ease-out motion-safe:hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--shadow),0_0_22px_var(--glow)]"
  >
    <span class="mb-5 flex flex-col items-start justify-between gap-3">
      <span
        class="inline-block border-4 border-[var(--border)] bg-[var(--accent-2)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-2-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
      >
        {{ labels.mission }} {{ String(index + 1).padStart(2, '0') }}
      </span>

      <span
        class="border-4 border-[var(--border)] bg-[var(--accent-3)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-3-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
      >
        {{ project.status }}
      </span>
    </span>

    <span class="block break-words text-xl font-black uppercase leading-tight text-[var(--text)]">
      {{ project.name }}
    </span>

    <span class="mt-5 grid gap-3 text-xs font-black uppercase">
      <span class="block border-2 border-[var(--border)] p-3">
        <span class="block text-[var(--muted)]">{{ labels.type }}</span>
        <span class="block">{{ project.type }}</span>
      </span>

      <span class="block border-2 border-[var(--border)] p-3">
        <span class="block text-[var(--muted)]">{{ labels.category }}</span>
        <span class="block">{{ project.category }}</span>
      </span>
    </span>

    <span class="mt-5 flex flex-wrap gap-2">
      <span
        v-for="technology in project.technologies.slice(0, 3)"
        :key="technology"
        class="border-2 border-[var(--border)] bg-[var(--surface-alt)] px-2 py-1 text-xs font-black uppercase text-[var(--text)]"
      >
        {{ technology }}
      </span>

      <span
        v-if="project.technologies.length > 3"
        class="border-2 border-[var(--border)] bg-[var(--accent)] px-2 py-1 text-xs font-black uppercase text-[var(--accent-text)]"
      >
        +{{ project.technologies.length - 3 }}
      </span>
    </span>
  </button>
</template>
