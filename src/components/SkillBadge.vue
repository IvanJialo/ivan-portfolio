<script setup>
import { computed, ref, useId, useSlots } from 'vue'

const slots = useSlots()
const tooltipId = useId()
const open = ref(false)
const pinned = ref(false)

function close() {
  open.value = false
  pinned.value = false
}

function toggle() {
  pinned.value = !pinned.value
  open.value = pinned.value
}

const definitions = {
  SOC: 'Security Operations Center',
  SIEM: 'Security Information and Event Management',
  EDR: 'Endpoint Detection and Response',
  IDS: 'Intrusion Detection System',
  IPS: 'Intrusion Prevention System',
  'TCP/IP': 'Transmission Control Protocol / Internet Protocol',
  DNS: 'Domain Name System',
  HTTP: 'Hypertext Transfer Protocol',
  HTTPS: 'Hypertext Transfer Protocol Secure',
  API: 'Application Programming Interface',
  SQL: 'Structured Query Language',
  AWS: 'Amazon Web Services',
  ERP: 'Enterprise Resource Planning',
  CVE: 'Common Vulnerabilities and Exposures',
  XSS: 'Cross-Site Scripting',
  CSRF: 'Cross-Site Request Forgery',
  LFI: 'Local File Inclusion',
  RFI: 'Remote File Inclusion',
  OSINT: 'Open Source Intelligence',
}

const badgeText = computed(() => {
  const children = slots.default?.()[0]?.children
  return typeof children === 'string' ? children.trim() : ''
})

const badgeTitle = computed(() => {
  return definitions[badgeText.value] || null
})
</script>

<template>
  <span
    class="relative inline-flex max-w-full flex-col items-start"
    :class="{ 'z-50': open }"
    @mouseenter="open = Boolean(badgeTitle)"
    @mouseleave="!pinned && (open = false)"
    @keydown.esc.stop="close"
  >
    <component
      :is="badgeTitle ? 'button' : 'span'"
      :class="badgeTitle ? 'cursor-pointer' : 'cursor-default'"
      :type="badgeTitle ? 'button' : undefined"
      :aria-expanded="badgeTitle ? open : undefined"
      :aria-controls="badgeTitle ? tooltipId : undefined"
      :aria-describedby="badgeTitle ? tooltipId : undefined"
      class="inline-flex max-w-full items-center gap-2 border-4 border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-xs font-black uppercase text-[var(--text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)] transition-[translate] duration-150 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5 sm:text-sm"
      @click="badgeTitle && toggle()"
      @focus="open = Boolean(badgeTitle)"
      @blur="close"
    >
      <span
        class="h-3 w-3 shrink-0 border-2 border-[var(--border)] bg-[var(--accent)] shadow-[1px_1px_0_var(--shadow)]"
        aria-hidden="true"
      />

      <span class="min-w-0 break-words">
        <slot />
      </span>
    </component>

    <Transition name="badge-tooltip">
      <span
        v-if="badgeTitle"
        v-show="open"
        :id="tooltipId"
        role="tooltip"
        class="z-50 mt-3 w-max max-w-[min(18rem,calc(100vw-5rem))] max-sm:max-w-full sm:absolute sm:bottom-full sm:left-0 sm:mt-0 sm:pb-4"
      >
        <span
          class="tooltip-sticker relative block rotate-[-2deg] whitespace-normal border-4 border-[var(--border)] bg-[var(--surface-alt)] px-4 py-3 text-left text-xs font-black uppercase leading-relaxed tracking-wide text-[var(--text)] shadow-[5px_5px_0_var(--shadow),0_0_14px_var(--glow)]"
        >
          <span
            aria-hidden="true"
            class="pointer-events-none absolute -top-2.5 left-4 h-3 w-9 rotate-[-7deg] border-2 border-[var(--border)] bg-[var(--accent-3)]"
          />
          {{ badgeTitle }}
        </span>
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.badge-tooltip-enter-active,
.badge-tooltip-leave-active {
  transition:
    opacity 140ms ease-out,
    transform 140ms ease-out;
}

.badge-tooltip-enter-from,
.badge-tooltip-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

@media (prefers-reduced-motion: reduce) {
  .badge-tooltip-enter-from,
  .badge-tooltip-leave-to {
    transform: none;
  }
}
</style>
