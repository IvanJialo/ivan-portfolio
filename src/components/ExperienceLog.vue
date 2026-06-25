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
    :class="isTerminal ? 'border-[#00d9ff] bg-[#080f12]' : 'border-black bg-white'"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" :is-terminal="isTerminal" />

    <div class="relative mt-8 space-y-6">
      <div
        class="absolute left-4 top-0 hidden h-full w-1 border-l-4 md:block"
        :class="isTerminal ? 'border-[#b6ff00]' : 'border-black'"
      />

      <article
        v-for="(item, index) in section.items"
        :key="item.company"
        class="relative border-4 p-5 shadow-[6px_6px_0_#000] md:ml-12"
        :class="isTerminal ? 'border-[#b6ff00] bg-[#10191d]' : 'border-black bg-[#f5f1e8]'"
      >
        <div
          class="absolute -left-[3.35rem] top-5 hidden h-10 w-10 items-center justify-center rounded-full border-4 text-sm font-black md:flex"
          :class="
            isTerminal
              ? 'border-[#b6ff00] bg-[#ff2e88] text-white'
              : 'border-black bg-[#00ff00] text-black'
          "
        >
          {{ index + 1 }}
        </div>

        <div class="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <p
              class="mb-3 inline-block border-4 px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#000]"
              :class="
                isTerminal
                  ? 'border-[#00d9ff] bg-black text-[#00d9ff]'
                  : 'border-black bg-[#ffa500] text-black'
              "
            >
              {{ item.type }}
            </p>

            <h3 class="text-2xl font-black uppercase">
              {{ item.role }}
            </h3>

            <p
              class="mt-1 text-lg font-black"
              :class="isTerminal ? 'text-[#b6ff00]' : 'text-black'"
            >
              {{ item.company }}
            </p>
          </div>

          <div
            class="border-4 px-4 py-3 text-sm font-black uppercase shadow-[4px_4px_0_#000]"
            :class="
              isTerminal
                ? 'border-[#ff2e88] bg-[#080f12] text-[#ff2e88]'
                : 'border-black bg-white text-black'
            "
          >
            <p>{{ item.period }}</p>
            <p class="mt-1 opacity-70">{{ item.location }}</p>
          </div>
        </div>

        <ul class="space-y-3">
          <li
            v-for="point in item.description"
            :key="point"
            class="flex gap-3 font-semibold leading-relaxed"
          >
            <span
              class="mt-2 h-3 w-3 shrink-0 border-2"
              :class="isTerminal ? 'border-[#b6ff00] bg-[#b6ff00]' : 'border-black bg-[#ff00ff]'"
            />
            <span>{{ point }}</span>
          </li>
        </ul>

        <div class="mt-5 flex flex-wrap gap-2">
          <SkillBadge v-for="tag in item.tags" :key="tag" :is-terminal="isTerminal">
            {{ tag }}
          </SkillBadge>
        </div>
      </article>
    </div>
  </section>
</template>
