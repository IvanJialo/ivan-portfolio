<script setup>
import BrutalButton from './BrutalButton.vue'
import StatusPanel from './StatusPanel.vue'

defineProps({
  portfolio: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)] lg:items-start">
    <div class="min-w-0">
      <p
        class="mb-5 inline-block max-w-full break-words border-4 border-[var(--border)] bg-[var(--accent-4)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-4-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)] sm:mb-6 sm:text-sm"
      >
        {{ portfolio.profile.status }}
      </p>

      <h1
        class="max-w-4xl break-words text-[clamp(2.6rem,14vw,4.5rem)] font-black uppercase leading-none text-[var(--text)] md:text-7xl"
      >
        {{ portfolio.profile.name }}
      </h1>

      <p class="mt-6 break-words text-lg font-black sm:text-xl md:text-2xl">
        {{ portfolio.profile.role }} |
        {{ portfolio.profile.background }}
      </p>

      <p
        class="text-accent-outlined mt-3 break-words text-base font-black text-[var(--accent-4-readable)] sm:text-lg md:text-xl"
      >
        {{ portfolio.profile.tagline }}
      </p>

      <p class="mt-6 max-w-3xl text-base font-semibold leading-relaxed md:mt-8 md:text-lg">
        {{ portfolio.profile.summary }}
      </p>

      <div class="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap">
        <BrutalButton href="#projects" variant="primary">
          {{ portfolio.navigation.startMission }}
        </BrutalButton>

        <BrutalButton :href="portfolio.profile.linkedin" variant="secondary">
          LinkedIn
        </BrutalButton>

        <BrutalButton href="mailto:ivanjimenezalonso09@gmail.com" variant="dark">
          Email
        </BrutalButton>
      </div>
    </div>

    <StatusPanel :panel="portfolio.statusPanel" :profile="portfolio.profile" />
  </div>
</template>
