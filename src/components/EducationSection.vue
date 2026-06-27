<script setup>
import SectionTitle from './SectionTitle.vue'
import SkillBadge from './SkillBadge.vue'

defineProps({
  section: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section
    class="mt-8 border-4 border-[var(--border)] bg-[var(--surface-alt)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_16px_var(--glow)] sm:p-6 sm:shadow-[8px_8px_0_var(--shadow),0_0_22px_var(--glow)]"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" />

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="(item, index) in section.items"
        :key="item.title"
        class="min-w-0 flex flex-col border-4 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)] sm:p-5 sm:shadow-[6px_6px_0_var(--shadow),0_0_18px_var(--glow)]"
      >
        <div class="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <span
            class="flex h-12 w-12 shrink-0 items-center justify-center border-4 border-[var(--border)] bg-[var(--accent)] text-lg font-black text-[var(--accent-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
          >
            {{ index + 1 }}
          </span>
          <span
            class="max-w-full break-words border-4 border-[var(--border)] bg-[var(--accent-3)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-3-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
          >
            {{ item.category }}
          </span>
        </div>

        <h3 class="break-words text-lg font-black uppercase leading-tight sm:text-xl">
          {{ item.title }}
        </h3>
        <p class="text-accent-outlined mt-3 text-base font-black text-[var(--accent-readable)]">
          {{ item.school }}
        </p>
        <p
          class="mt-2 inline-block w-fit border-2 border-[var(--border)] px-3 py-1 text-xs font-black uppercase text-[var(--muted)]"
        >
          {{ item.period }}
        </p>
        <p class="mt-5 flex-1 break-words font-semibold leading-relaxed">{{ item.description }}</p>

        <div class="mt-5 flex flex-wrap gap-2">
          <SkillBadge v-for="tag in item.tags" :key="tag">
            {{ tag }}
          </SkillBadge>
        </div>
      </article>
    </div>
  </section>
</template>
