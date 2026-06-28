<script setup>
import { computed, ref } from 'vue'

import ProjectCard from './ProjectCard.vue'
import ProjectPreviewCard from './ProjectPreviewCard.vue'
import SectionTitle from './SectionTitle.vue'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const activeIndex = ref(0)

const totalProjects = computed(() => props.section.items.length)

const canGoPrevious = computed(() => activeIndex.value > 0)
const canGoNext = computed(() => activeIndex.value < totalProjects.value - 1)

const previousProject = () => {
  if (canGoPrevious.value) {
    activeIndex.value -= 1
  }
}

const nextProject = () => {
  if (canGoNext.value) {
    activeIndex.value += 1
  }
}

const visibleProjects = computed(() => {
  const items = []

  if (activeIndex.value > 0) {
    items.push({
      project: props.section.items[activeIndex.value - 1],
      index: activeIndex.value - 1,
      position: 'left',
    })
  }

  items.push({
    project: props.section.items[activeIndex.value],
    index: activeIndex.value,
    position: 'center',
  })

  if (activeIndex.value < totalProjects.value - 1) {
    items.push({
      project: props.section.items[activeIndex.value + 1],
      index: activeIndex.value + 1,
      position: 'right',
    })
  }

  return items
})
</script>

<template>
  <section
    id="projects"
    class="mt-8 overflow-hidden border-4 border-[var(--border)] bg-[var(--surface-alt)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_16px_var(--glow)] sm:p-6 sm:shadow-[8px_8px_0_var(--shadow),0_0_22px_var(--glow)]"
  >
    <div class="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <SectionTitle :title="section.title" :subtitle="section.subtitle" />

      <div
        class="border-4 border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-mono text-xs font-black uppercase text-[var(--muted)] shadow-[4px_4px_0_var(--shadow),0_0_10px_var(--glow)]"
      >
        Mission
        <span class="text-[var(--accent-2)]">
          {{ String(activeIndex + 1).padStart(2, '0') }}
        </span>
        /
        {{ String(totalProjects).padStart(2, '0') }}
      </div>
    </div>

    <div class="relative mt-8 hidden min-h-[620px] items-center xl:flex">
      <TransitionGroup
        name="mission-slide"
        tag="div"
        class="grid w-full grid-cols-[0.55fr_1.2fr_0.55fr] items-center gap-6"
      >
        <div
          v-for="item in visibleProjects"
          :key="item.project.name"
          class="transition-all duration-300"
          :class="{
            'col-start-1 scale-[0.82] cursor-pointer opacity-55 hover:scale-[0.86] hover:opacity-85':
              item.position === 'left',
            'col-start-2 scale-100 opacity-100': item.position === 'center',
            'col-start-3 scale-[0.82] cursor-pointer opacity-55 hover:scale-[0.86] hover:opacity-85':
              item.position === 'right',
          }"
          @click="item.position !== 'center' && (activeIndex = item.index)"
        >
          <ProjectCard
            v-if="item.position === 'center'"
            :project="item.project"
            :index="item.index"
          />

          <ProjectPreviewCard v-else :project="item.project" :index="item.index" />
        </div>
      </TransitionGroup>
    </div>

    <div class="mt-8 xl:hidden">
      <ProjectCard :project="section.items[activeIndex]" :index="activeIndex" />
    </div>

    <div class="mt-8 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
      <button
        type="button"
        class="border-4 border-[var(--border)] bg-[var(--surface)] px-6 py-3 font-black uppercase text-[var(--text)] shadow-[4px_4px_0_var(--shadow),0_0_10px_var(--glow)] transition-all duration-150 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
        :disabled="!canGoPrevious"
        @click="previousProject"
      >
        ← Previous
      </button>

      <div class="flex justify-center gap-3">
        <button
          v-for="(_, index) in section.items"
          :key="index"
          type="button"
          class="h-5 w-5 border-4 border-[var(--border)] shadow-[3px_3px_0_var(--shadow)] transition-all duration-150 hover:-translate-y-0.5"
          :class="activeIndex === index ? 'bg-[var(--accent)]' : 'bg-[var(--surface)]'"
          :aria-label="`Go to mission ${index + 1}`"
          @click="activeIndex = index"
        />
      </div>

      <button
        type="button"
        class="border-4 border-[var(--border)] bg-[var(--accent)] px-6 py-3 font-black uppercase text-[var(--accent-text)] shadow-[4px_4px_0_var(--shadow),0_0_10px_var(--glow)] transition-all duration-150 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
        :disabled="!canGoNext"
        @click="nextProject"
      >
        Next →
      </button>
    </div>
  </section>
</template>

<style scoped>
.mission-slide-move,
.mission-slide-enter-active,
.mission-slide-leave-active {
  transition:
    opacity 260ms ease,
    transform 260ms ease,
    filter 260ms ease;
}

.mission-slide-enter-from {
  opacity: 0;
  transform: translateX(36px) scale(0.86);
}

.mission-slide-leave-to {
  opacity: 0;
  transform: translateX(-36px) scale(0.86);
}

.mission-slide-leave-active {
  position: absolute;
}
</style>
