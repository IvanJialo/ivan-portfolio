<script setup>
import BrutalButton from './BrutalButton.vue'
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

const getPublicPath = (path) => {
  return `${import.meta.env.BASE_URL}${path}`
}
</script>

<template>
  <section
    class="mt-8 border-4 p-6 shadow-[8px_8px_0_#000]"
    :class="isTerminal ? 'border-[#ff2e88] bg-[#10191d]' : 'border-black bg-[#f5f1e8]'"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" :is-terminal="isTerminal" />

    <div class="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
      <div
        class="border-4 p-6 shadow-[6px_6px_0_#000]"
        :class="isTerminal ? 'border-[#00d9ff] bg-[#080f12]' : 'border-black bg-white'"
      >
        <p
          class="mb-4 inline-block border-4 px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000]"
          :class="
            isTerminal
              ? 'border-[#b6ff00] bg-[#b6ff00] text-black'
              : 'border-black bg-[#00ff00] text-black'
          "
        >
          Open to work
        </p>

        <h3 class="text-3xl font-black uppercase md:text-4xl">Iván Jiménez</h3>

        <p
          class="mt-3 max-w-2xl text-lg font-bold leading-relaxed"
          :class="isTerminal ? 'text-[#f5f1e8]/85' : 'text-black/75'"
        >
          {{ section.subtitle }}
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <BrutalButton
            :href="`mailto:${section.email}`"
            variant="primary"
            :is-terminal="isTerminal"
          >
            {{ section.actions.email }}
          </BrutalButton>

          <BrutalButton :href="section.linkedin" variant="secondary" :is-terminal="isTerminal">
            {{ section.actions.linkedin }}
          </BrutalButton>
        </div>
      </div>

      <aside
        class="border-4 p-6 shadow-[6px_6px_0_#000]"
        :class="isTerminal ? 'border-[#b6ff00] bg-[#080f12]' : 'border-black bg-white'"
      >
        <p
          class="mb-5 border-4 px-3 py-2 font-black uppercase"
          :class="
            isTerminal
              ? 'border-[#00d9ff] bg-[#10191d] text-[#00d9ff]'
              : 'border-black bg-[#ffa500] text-black'
          "
        >
          CV Downloads
        </p>

        <div class="flex flex-col gap-4">
          <BrutalButton
            :href="getPublicPath(section.cv.english)"
            variant="dark"
            :is-terminal="isTerminal"
          >
            {{ section.actions.cvEnglish }}
          </BrutalButton>

          <BrutalButton
            :href="getPublicPath(section.cv.spanish)"
            variant="dark"
            :is-terminal="isTerminal"
          >
            {{ section.actions.cvSpanish }}
          </BrutalButton>
        </div>

        <div
          class="mt-6 border-4 p-4 font-mono text-xs font-bold uppercase leading-relaxed"
          :class="
            isTerminal
              ? 'border-[#ff2e88] bg-black text-[#b6ff00]'
              : 'border-black bg-[#f5f1e8] text-black'
          "
        >
          <p>&gt; contact --status</p>
          <p>Available</p>
          <p class="mt-3">&gt; response_time</p>
          <p>Usually fast</p>
        </div>
      </aside>
    </div>
  </section>
</template>
