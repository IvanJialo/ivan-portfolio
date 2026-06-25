<script setup>
import BrutalButton from './BrutalButton.vue'
import StatusPanel from './StatusPanel.vue'

defineProps({
  portfolio: {
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
  <div class="grid gap-10 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
    <div>
      <p
        class="mb-6 inline-block border-4 px-3 py-1 text-sm font-black uppercase shadow-[3px_3px_0_#000]"
        :class="
          isTerminal
            ? 'border-[#00d9ff] bg-[#080f12] text-[#b6ff00]'
            : 'border-black bg-[#00d9ff] text-black'
        "
      >
        {{ portfolio.profile.status }}
      </p>

      <h1
        class="max-w-4xl text-5xl font-black uppercase leading-none md:text-7xl"
        :class="isTerminal ? 'text-[#f5f1e8]' : 'text-[#111111]'"
      >
        {{ portfolio.profile.name }}
      </h1>

      <p class="mt-6 text-xl font-black md:text-2xl">
        {{ portfolio.profile.role }} |
        {{ portfolio.profile.background }}
      </p>

      <p
        class="mt-3 text-lg font-black md:text-xl"
        :class="isTerminal ? 'text-[#00d9ff]' : 'text-black'"
      >
        {{ portfolio.profile.tagline }}
      </p>

      <p class="mt-8 max-w-3xl text-base font-semibold leading-relaxed md:text-lg">
        {{ portfolio.profile.summary }}
      </p>

      <div class="mt-10 flex flex-wrap gap-4">
        <BrutalButton href="#projects" variant="primary" :is-terminal="isTerminal">
          {{ portfolio.navigation.startMission }}
        </BrutalButton>

        <BrutalButton
          :href="portfolio.profile.linkedin"
          variant="secondary"
          :is-terminal="isTerminal"
        >
          LinkedIn
        </BrutalButton>

        <BrutalButton
          href="mailto:ivanjimenezalonso09@gmail.com"
          variant="dark"
          :is-terminal="isTerminal"
        >
          Email
        </BrutalButton>
      </div>
    </div>

    <StatusPanel
      :panel="portfolio.statusPanel"
      :profile="portfolio.profile"
      :is-terminal="isTerminal"
    />
  </div>
</template>
