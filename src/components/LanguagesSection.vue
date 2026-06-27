<script setup>
import SectionTitle from './SectionTitle.vue'

defineProps({
  section: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section
    class="mt-8 border-4 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_16px_var(--glow)] sm:p-6 sm:shadow-[8px_8px_0_var(--shadow),0_0_22px_var(--glow)]"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" />

    <div class="grid gap-5 md:grid-cols-3">
      <article
        v-for="language in section.items"
        :key="language.name"
        class="min-w-0 border-4 border-[var(--border)] bg-[var(--surface-alt)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)] sm:p-5 sm:shadow-[6px_6px_0_var(--shadow),0_0_18px_var(--glow)]"
      >
        <div
          class="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"
        >
          <h3 class="break-words text-xl font-black uppercase">{{ language.name }}</h3>

          <span
            class="max-w-full break-words border-4 border-[var(--border)] bg-[var(--accent-3)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-3-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
          >
            {{ language.level }}
          </span>
        </div>

        <div class="h-6 border-4 border-[var(--border)] bg-[var(--surface-strong)] p-1">
          <div
            class="h-full bg-[var(--accent)] transition-all duration-500"
            :style="{ width: `${language.progress}%` }"
          />
        </div>

        <p class="mt-3 font-mono text-xs font-black uppercase text-[var(--muted)]">
          Protocol level: {{ language.progress }}%
        </p>
      </article>
    </div>
  </section>
</template>
