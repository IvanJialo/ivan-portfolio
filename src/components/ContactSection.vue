<script setup>
import BrutalButton from './BrutalButton.vue'
import SectionTitle from './SectionTitle.vue'

defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const getPublicPath = (path) => {
  return `${import.meta.env.BASE_URL}${path}`
}
</script>

<template>
  <section
    class="mt-8 border-4 border-[var(--border)] bg-[var(--surface-alt)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_16px_var(--glow)] sm:p-6 sm:shadow-[8px_8px_0_var(--shadow),0_0_22px_var(--glow)]"
  >
    <SectionTitle :title="section.title" :subtitle="section.subtitle" />

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.75fr)]">
      <div
        class="min-w-0 border-4 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)] sm:p-6 sm:shadow-[6px_6px_0_var(--shadow),0_0_18px_var(--glow)]"
      >
        <p
          class="mb-4 inline-block border-4 border-[var(--border)] bg-[var(--accent)] px-3 py-1 text-xs font-black uppercase text-[var(--accent-text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)]"
        >
          Open to work
        </p>

        <h3 class="break-words text-2xl font-black uppercase sm:text-3xl md:text-4xl">
          Iván Jiménez
        </h3>

        <p
          class="mt-3 max-w-2xl break-words text-base font-bold leading-relaxed text-[var(--muted)] sm:text-lg"
        >
          {{ section.subtitle }}
        </p>

        <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <BrutalButton :href="`mailto:${section.email}`" variant="primary">
            {{ section.actions.email }}
          </BrutalButton>

          <BrutalButton :href="section.linkedin" variant="secondary">
            {{ section.actions.linkedin }}
          </BrutalButton>
        </div>
      </div>

      <aside
        class="min-w-0 border-4 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)] sm:p-6 sm:shadow-[6px_6px_0_var(--shadow),0_0_18px_var(--glow)]"
      >
        <p
          class="mb-5 break-words border-4 border-[var(--border)] bg-[var(--accent-3)] px-3 py-2 font-black uppercase text-[var(--accent-3-text)]"
        >
          CV Downloads
        </p>

        <div class="flex flex-col gap-4">
          <BrutalButton :href="getPublicPath(section.cv.english)" variant="dark">
            {{ section.actions.cvEnglish }}
          </BrutalButton>

          <BrutalButton :href="getPublicPath(section.cv.spanish)" variant="dark">
            {{ section.actions.cvSpanish }}
          </BrutalButton>
        </div>

        <div
          class="mt-6 break-words border-4 border-[var(--border)] bg-[var(--surface-strong)] p-4 font-mono text-xs font-bold uppercase leading-relaxed text-[var(--accent)]"
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
