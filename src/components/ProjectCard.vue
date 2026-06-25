<script setup>
import SkillBadge from './SkillBadge.vue'

defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  isTerminal: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <article
    class="border-4 p-5 shadow-[7px_7px_0_#000] transition-transform hover:-translate-y-1"
    :class="isTerminal ? 'border-[#00d9ff] bg-[#080f12]' : 'border-black bg-white'"
  >
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <p
          class="mb-3 inline-block border-4 px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000]"
          :class="
            isTerminal
              ? 'border-[#b6ff00] bg-[#10191d] text-[#b6ff00]'
              : 'border-black bg-[#ff00ff] text-white'
          "
        >
          Mission {{ String(index + 1).padStart(2, '0') }}
        </p>
        <h3 class="text-2xl font-black uppercase">{{ project.name }}</h3>
      </div>
      <span
        class="border-4 px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000]"
        :class="
          isTerminal
            ? 'border-[#ff2e88] bg-[#ff2e88] text-white'
            : 'border-black bg-[#ffa500] text-black'
        "
      >
        {{ project.status }}
      </span>
    </div>

    <div class="mb-5 grid gap-3 text-sm font-black uppercase sm:grid-cols-2">
      <div class="border-2 p-3" :class="isTerminal ? 'border-[#00d9ff]/70' : 'border-black'">
        <span :class="isTerminal ? 'text-[#b6ff00]' : 'text-black/60'">Type</span>
        <p>{{ project.type }}</p>
      </div>

      <div class="border-2 p-3" :class="isTerminal ? 'border-[#00d9ff]/70' : 'border-black'">
        <span :class="isTerminal ? 'text-[#b6ff00]' : 'text-black/60'">Category</span>
        <p>{{ project.category }}</p>
      </div>
    </div>

    <p class="mb-5 font-semibold leading-relaxed">{{ project.description }}</p>

    <div v-if="project.liveUrl" class="mb-5 flex flex-wrap gap-3">
      <a
        :href="project.liveUrl"
        target="_blank"
        rel="noreferrer"
        class="border-4 px-4 py-2 text-sm font-black uppercase shadow-[3px_3px_0_#000] transition active:translate-x-1 active:translate-y-1 active:shadow-none"
        :class="
          isTerminal
            ? 'border-[#b6ff00] bg-[#b6ff00] text-black'
            : 'border-black bg-[#00ff00] text-black'
        "
      >
        Live site
      </a>
    </div>

    <div class="flex flex-wrap gap-2">
      <SkillBadge
        v-for="technology in project.technologies"
        :key="technology"
        :is-terminal="isTerminal"
      >
        {{ technology }}
      </SkillBadge>
    </div>
  </article>
</template>
