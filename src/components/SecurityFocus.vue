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

    <div class="flex flex-wrap gap-3">
      <SkillBadge v-for="item in section.items" :key="item">
        {{ item }}
      </SkillBadge>
    </div>
  </section>
</template>
