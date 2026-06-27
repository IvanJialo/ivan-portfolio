<script setup>
import ProjectCard from './ProjectCard.vue'
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
    id="projects"
    class="mt-8 border-4 border-[var(--border)] bg-[var(--surface-alt)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_16px_var(--glow)] sm:p-6 sm:shadow-[8px_8px_0_var(--shadow),0_0_22px_var(--glow)]"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" />

    <div class="grid gap-6 xl:grid-cols-2">
      <ProjectCard
        v-for="(project, index) in section.items"
        :key="project.name"
        :project="project"
        :index="index"
      />
    </div>
  </section>
</template>
