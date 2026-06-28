<script setup>
import SkillBadge from './SkillBadge.vue'

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
    class="neon-project-card min-w-0 border-4 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)] transition-shadow duration-300 sm:p-5 sm:shadow-[7px_7px_0_var(--shadow),0_0_18px_var(--glow)]"
  >
    <div class="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row">
      <div class="min-w-0">
        <p
          class="mb-3 inline-block border-4 border-[var(--border)] bg-[var(--accent-2)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-2-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
        >
          Mission {{ String(index + 1).padStart(2, '0') }}
        </p>
        <h3 class="break-words text-xl font-black uppercase sm:text-2xl">{{ project.name }}</h3>
      </div>
      <span
        class="max-w-full break-words border-4 border-[var(--border)] bg-[var(--accent-3)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-3-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
      >
        {{ project.status }}
      </span>
    </div>

    <div class="mb-5 grid gap-3 text-sm font-black uppercase sm:grid-cols-2">
      <div class="border-2 border-[var(--border)] p-3">
        <span class="text-[var(--muted)]">Type</span>
        <p>{{ project.type }}</p>
      </div>

      <div class="border-2 border-[var(--border)] p-3">
        <span class="text-[var(--muted)]">Category</span>
        <p>{{ project.category }}</p>
      </div>
    </div>

    <p class="mb-5 break-words font-semibold leading-relaxed">{{ project.description }}</p>

    <div v-if="project.liveUrl" class="mb-5 flex flex-wrap gap-3">
      <a
        :href="project.liveUrl"
        target="_blank"
        rel="noreferrer"
        class="inline-flex max-w-full items-center justify-center border-4 border-[var(--border)] bg-[var(--accent)] px-4 py-2 text-center text-sm font-black uppercase text-[var(--accent-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        Live site
      </a>
    </div>

    <div class="flex flex-wrap gap-2">
      <SkillBadge v-for="technology in project.technologies" :key="technology">
        {{ technology }}
      </SkillBadge>
    </div>
  </article>
</template>
