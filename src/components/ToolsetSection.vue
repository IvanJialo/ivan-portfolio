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
    required: false,
  },
})
</script>

<template>
  <section
    class="mt-8 border-4 p-6 shadow-[8px_8px_0_#000]"
    :class="isTerminal ? 'border-[#b6ff00] bg-[#080f12]' : 'border-black bg-white'"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" :is-terminal="isTerminal" />
    <div class="grip gap-5 lg:grid-cols-3">
      <article
        v-for="group in section.groups"
        :key="group.name"
        class="border-4 p-4 mb-4 shadow-[5px_5px_0_#000]"
        :class="isTerminal ? 'border-[#00d9ff] bg-[#10191d]' : 'border-black bg-[#f5f1e8]'"
      >
        <h3
          class="mb-4 border-4 px-3 py-2 text-sm font-black uppercase"
          :class="
            isTerminal
              ? 'border-[#ff2e88] bg-black text-[#ff2e88]'
              : 'border-black bg-[#00d9ff] text-black'
          "
        >
          {{ group.name }}
        </h3>

        <div class="flex flex-wrap gap-3">
          <SkillBadge v-for="item in group.items" :key="item" :is-terminal="isTerminal">
            {{ item }}
          </SkillBadge>
        </div>
      </article>
    </div>
  </section>
</template>
