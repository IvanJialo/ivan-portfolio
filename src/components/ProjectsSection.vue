<script setup>
import ProjectCard from './ProjectCard.vue'
import SectionTitle from './SectionTitle.vue'

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
    id="projects"
    class="mt-8 border-4 p-6 shadow-[8px_8px_0_#000]"
    :class="isTerminal ? 'border-[#ff2e88] bg-[#10191d]' : 'border-black bg-[#f5f1e8]'"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" :is-terminal="isTerminal" />

    <div class="grid gap-6 xl:grid-cols-2">
      <ProjectCard
        v-for="(project, index) in section.items"
        :key="project.name"
        :project="project"
        :index="index"
        :is-terminal="isTerminal"
      />
    </div>
  </section>
</template>
