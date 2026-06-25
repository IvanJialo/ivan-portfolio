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
    :class="isTerminal ? 'border-[#b6ff00] bg-[#10191d]' : 'border-black bg-[#f5f1e8]'"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" :is-terminal="isTerminal" />

    <div class="grid gap-6 lg:grid-cols-3">
      <article
        v-for="cert in section.items"
        :key="cert.name"
        class="flex flex-col border-4 p-5 shadow-[6px_6px_0_#000]"
        :class="isTerminal ? 'border-[#00d9ff] bg-[#080f12]' : 'border-black bg-white'"
      >
        <div class="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 class="text-xl font-black uppercase leading-tight">{{ cert.name }}</h3>
            <p
              class="mt-2 text-sm font-black uppercase"
              :class="isTerminal ? 'text-[#00d9ff]' : 'text-black/60'"
            >
              {{ cert.issuer }}
            </p>
          </div>

          <span
            class="border-4 px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000]"
            :class="
              isTerminal
                ? 'border-[#ff2e88] bg-[#ff2e88] text-white'
                : 'border-black bg-[#ffa500] text-black'
            "
          >
            {{ cert.status }}
          </span>
        </div>

        <p class="flex-1 font-semibold leading-relaxed">{{ cert.description }}</p>

        <div
          class="mt-5 h-6 border-4 p-1"
          :class="isTerminal ? 'border-[#b6ff00] bg-black' : 'border-black bg-white'"
        >
          <div
            class="h-full"
            :class="isTerminal ? 'bg-[#b6ff00]' : 'bg-[#00ff00]'"
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
          <SkillBadge v-for="tag in cert.tags" :key="tag" :is-terminal="isTerminal">{{
            tag
          }}</SkillBadge>
        </div>
      </article>
    </div>
  </section>
</template>
