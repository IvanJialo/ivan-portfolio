<script setup>
defineProps({
  panel: {
    type: Object,
    required: true,
  },
  profile: {
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
  <aside
    class="border-4 p-5 shadow-[6px_6px_0_#000]"
    :class="
      isTerminal
        ? 'border-[#b6ff00] bg-[#080f12] text-[#f5f1e8]'
        : 'border-black bg-[#f5f1e8] text-black'
    "
  >
    <div
      class="mb-5 border-4 px-3 py-2 font-black uppercase"
      :class="isTerminal ? 'border-[#00d9ff] bg-[#10191d] text-[#00d9ff]' : 'border-black bg-white'"
    >
      {{ panel.title }}
    </div>

    <div class="space-y-3">
      <div
        v-for="item in panel.items"
        :key="item.label"
        class="grid grid-cols-[0.8fr_1fr] gap-3 border-2 p-3 text-sm font-black uppercase"
        :class="isTerminal ? 'border-[#00d9ff]/70 bg-[#10191d]' : 'border-black bg-white'"
      >
        <span :class="isTerminal ? 'text-[#b6ff00]' : 'text-black/60'">
          {{ item.label }}
        </span>

        <span>
          {{ item.value }}
        </span>
      </div>
    </div>

    <div
      class="mt-5 border-4 p-4 font-mono text-xs font-bold uppercase leading-relaxed"
      :class="
        isTerminal ? 'border-[#ff2e88] bg-black text-[#b6ff00]' : 'border-black bg-white text-black'
      "
    >
      <p>&gt; whoami</p>
      <p>{{ profile.name }}</p>
      <p class="mt-3">&gt; cat focus.txt</p>
      <p>{{ profile.tagline }}</p>
    </div>
  </aside>
</template>
