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
        v-for="(item, index) in section.items"
        :key="item.title"
        class="flex flex-col border-4 p-5 shadow[6px_6px_0_#000]"
        :class="isTerminal ? 'border-[#00d9ff] bg-[#080f12]' : 'border-black bg-white'"
      >
        <div class="mb-5 flex items-start justify-between gap-4">
          <span
            class="flex h-12 w-12 shrink-0 items-center justify-center border-4 text-lg font-black shadow-[3px_3px_0_#000]"
            :class="
              isTerminal
                ? 'border-[#b6ff00] bg-[#ff2e88] text-white'
                : 'border-black bg-[#00ff00] text-black'
            "
          >
            {{ index + 1 }}
          </span>
          <span
            class="border-4 px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000]"
            :class="
              isTerminal
                ? 'border-[#ff2e88] bg-black text-[#ff2e88]'
                : 'border-black bg-[#ffa500] text-black'
            "
          >
            {{ item.category }}
          </span>
        </div>

        <h3 class="text-xl font-black uppercase leading-tight">{{ item.title }}</h3>
        <p class="mt-3 text-base font-black" :class="isTerminal ? 'text-[#b6ff00]' : 'text-black'">
          {{ item.school }}
        </p>
        <p
          class="mt-2 inline-block w-fit border-2 px-3 py-1 text-xs font-black uppercase"
          :class="isTerminal ? 'border-[#00d9ff] text-[#00d9ff]' : 'border-black text-black/70'"
        >
          {{ item.period }}
        </p>
        <p class="mt-5 flex-1 font-semibold leading-relaxed">{{ item.description }}</p>

        <div class="mt-5 flex flex-wrap gap-2">
          <SkillBadge v-for="tag in item.tags" :key="tag" :is-terminal="isTerminal">
            {{ tag }}
          </SkillBadge>
        </div>
      </article>
    </div>
  </section>
</template>
