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
})
</script>

<template>
  <article
    class="neon-project-preview h-full min-h-[340px] overflow-hidden border-4 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)] transition-all duration-300"
  >
    <div class="mb-5 flex flex-col items-start justify-between gap-3">
      <p
        class="inline-block border-4 border-[var(--border)] bg-[var(--accent-2)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-2-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
      >
        Mission {{ String(index + 1).padStart(2, '0') }}
      </p>

      <span
        class="border-4 border-[var(--border)] bg-[var(--accent-3)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-3-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
      >
        {{ project.status }}
      </span>
    </div>

    <h3 class="break-words text-xl font-black uppercase leading-tight text-[var(--text)]">
      {{ project.name }}
    </h3>

    <div class="mt-5 grid gap-3 text-xs font-black uppercase">
      <div class="border-2 border-[var(--border)] p-3">
        <span class="block text-[var(--muted)]">Type</span>
        <p>{{ project.type }}</p>
      </div>

      <div class="border-2 border-[var(--border)] p-3">
        <span class="block text-[var(--muted)]">Category</span>
        <p>{{ project.category }}</p>
      </div>
    </div>

    <!-- <p
      class="mt-5 max-h-[5.2rem] overflow-hidden break-words text-sm font-semibold leading-relaxed text-[var(--muted)]"
    >
      {{ project.description }}
    </p> -->

    <div class="mt-5 flex flex-wrap gap-2">
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
    </div>
  </article>
</template>
