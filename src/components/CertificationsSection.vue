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
        v-for="cert in section.items"
        :key="cert.name"
        class="min-w-0 flex flex-col border-4 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)] sm:p-5 sm:shadow-[6px_6px_0_var(--shadow),0_0_18px_var(--glow)]"
      >
        <div class="mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div class="min-w-0">
            <h3 class="break-words text-lg font-black uppercase leading-tight sm:text-xl">
              {{ cert.name }}
            </h3>
            <p class="mt-2 text-sm font-black uppercase text-[var(--muted)]">
              {{ cert.issuer }}
            </p>
          </div>

          <span
            class="max-w-full break-words border-4 border-[var(--border)] bg-[var(--accent-3)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-3-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
          >
            {{ cert.status }}
          </span>
        </div>

        <p class="flex-1 break-words font-semibold leading-relaxed">{{ cert.description }}</p>

        <div class="mt-5 h-6 border-4 border-[var(--border)] bg-[var(--surface-strong)] p-1">
          <div
            class="h-full bg-[var(--accent)]"
            :style="{
              width:
                cert.status.toLowerCase().includes('progress') ||
                cert.status.toLowerCase().includes('progreso')
                  ? '45%'
                  : cert.status.toLowerCase().includes('planned') ||
                      cert.status.toLowerCase().includes('planificada')
                    ? '20%'
                    : '10%',
            }"
          />
        </div>

        <div class="mt-5 flex flex-wrap gap-2">
          <SkillBadge v-for="tag in cert.tags" :key="tag">{{ tag }}</SkillBadge>
        </div>
      </article>
    </div>
  </section>
</template>
