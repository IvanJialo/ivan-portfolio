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
    class="mt-8 border-4 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_16px_var(--glow)] sm:p-6 sm:shadow-[8px_8px_0_var(--shadow),0_0_22px_var(--glow)]"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" />

    <div class="relative mt-8 space-y-6">
      <div
        class="absolute left-4 top-0 hidden h-full w-1 border-l-4 border-[var(--border)] md:block"
      />

      <article
        v-for="(item, index) in section.items"
        :key="item.company"
        class="relative min-w-0 border-4 border-[var(--border)] bg-[var(--surface-alt)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)] sm:p-5 sm:shadow-[6px_6px_0_var(--shadow),0_0_18px_var(--glow)] md:ml-12"
      >
        <div
          class="absolute -left-[3.35rem] top-5 hidden h-10 w-10 items-center justify-center rounded-full border-4 border-[var(--border)] bg-[var(--accent)] text-sm font-black text-[var(--accent-text)] md:flex"
        >
          {{ index + 1 }}
        </div>

        <div class="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <p
              class="mb-3 inline-block border-4 border-[var(--border)] bg-[var(--accent-3)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-3-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
            >
              {{ item.type }}
            </p>

            <h3 class="break-words text-xl font-black uppercase sm:text-2xl">
              {{ item.role }}
            </h3>

            <p class="text-accent-outlined mt-1 text-lg font-black text-[var(--accent-readable)]">
              {{ item.company }}
            </p>
          </div>

          <div
            class="max-w-full break-words border-4 border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-black uppercase text-[var(--text)] shadow-[4px_4px_0_var(--shadow),0_0_12px_var(--glow)]"
          >
            <p
              :class="{
                'animate-blink-soft':
                  item.period.toLowerCase().includes('present') ||
                  item.period.toLowerCase().includes('presente'),
              }"
            >
              {{ item.period }}
            </p>
            <p class="mt-1 opacity-70">{{ item.location }}</p>
          </div>
        </div>

        <ul class="space-y-3">
          <li
            v-for="point in item.description"
            :key="point"
            class="flex gap-3 font-semibold leading-relaxed"
          >
            <span
              class="mt-2 h-3 w-3 shrink-0 border-2 border-[var(--border)] bg-[var(--accent-2)]"
            />
            <span>{{ point }}</span>
          </li>
        </ul>

        <div class="mt-5 flex flex-wrap gap-2">
          <SkillBadge v-for="tag in item.tags" :key="tag">
            {{ tag }}
          </SkillBadge>
        </div>
      </article>
    </div>
  </section>
</template>
