<script setup>
import SectionTitle from './SectionTitle.vue'
import SkillBadge from './SkillBadge.vue'

defineProps({
  section: {
    type: Object,
    required: true,
  },
  isTerminal: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section
    class="mt-8 border-4 p-6 shadow-[8px_8px_0_#000]"
    :class="isTerminal ? 'border-[#00d9ff] bg-[#10191d]' : 'border-black bg-[#f5f1e8]'"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" :is-terminal="isTerminal" />

    <div class="flex flex-wrap gap-3">
      <SkillBadge v-for="item in section.items" :key="item" :is-terminal="isTerminal">
        {{ item }}
      </SkillBadge>
    </div>
  </section>
</template>
