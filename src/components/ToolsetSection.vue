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
    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="group in section.groups"
        :key="group.name"
        class="min-w-0 border-4 border-[var(--border)] bg-[var(--surface-alt)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_12px_var(--glow)]"
      >
        <h3
          class="mb-4 break-words border-4 border-[var(--border)] bg-[var(--accent-4)] px-3 py-2 text-sm font-black uppercase text-[var(--accent-4-text)]"
        >
          {{ group.name }}
        </h3>

        <div class="flex flex-wrap gap-3">
          <SkillBadge v-for="item in group.items" :key="item">
            {{ item }}
          </SkillBadge>
        </div>
      </article>
    </div>
  </section>
</template>
