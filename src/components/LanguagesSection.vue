<script setup>
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
    class="mt-8 border-4 p-6 shadow-[8px_8px_0_#000]"
    :class="isTerminal ? 'border-[#ff2e88] bg-[#080f12]' : 'border-black bg-white'"
  >
    <SectionTitle :title="section.title" :subtitle="section - subtitle" :is-terminal="isTerminal" />

    <div class="grid gap-5 md-grid-cols-3">
      <article
        v-for="language in section.items"
        :key="language.name"
        class="border-4 p-5 shadow-[6px_6px_0_#000]"
        :class="isTerminal ? 'border-[#00d9ff] bg-[#10191d]' : 'border-black bg-[#f5f1e8]'"
      >
        <div class="mb-4 flex items-center justify-between gap-4">
          <h3 class="text-xl font-black uppercase">{{ language.name }}</h3>

          <span
            class="border-4 px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000]"
            :class="
              isTerminal
                ? 'border-[#b6ff00] bg-[#b6ff00] text-black'
                : 'border-black bg-[#ffa500] text-black'
            "
          >
            {{ language.level }}
          </span>
        </div>

        <div
          class="h-6 border-4 p-1"
          :class="isTerminal ? 'border-[#b6ff00] bg-black' : 'border-black bg-white'"
        >
          <div
            class="h-full transition-all duration-500"
            :class="isTerminal ? 'bg-[#b6ff00]' : 'bg-[#00ff00]'"
            :style="{ width: `${language.progress}%` }"
          />
        </div>

        <p
          class="mt-3 font-mono text-xs font-black uppercase"
          :class="isTerminal ? 'text-[#00d9ff]' : 'text-black/60'"
        >
          Protocol level: {{ language.progress }}%
        </p>
      </article>
    </div>
  </section>
</template>
