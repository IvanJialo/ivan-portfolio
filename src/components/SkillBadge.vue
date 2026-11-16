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
    @mouseenter="open = Boolean(badgeTitle)"
    @mouseleave="!pinned && (open = false)"
    @keydown.esc.stop="close"
  >
    <component
      :is="badgeTitle ? 'button' : 'span'"
      :type="badgeTitle ? 'button' : undefined"
      :aria-expanded="badgeTitle ? open : undefined"
      :aria-controls="badgeTitle ? tooltipId : undefined"
      :aria-describedby="badgeTitle ? tooltipId : undefined"
      class="inline-flex max-w-full items-center gap-2 border-4 border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-xs font-black uppercase text-[var(--text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)] transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:text-sm"
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

    <span
      v-if="badgeTitle"
      v-show="open"
      :id="tooltipId"
      role="tooltip"
      class="z-50 mt-2 w-max max-w-[min(18rem,calc(100vw-5rem))] sm:absolute sm:bottom-full sm:left-0 sm:mt-0 sm:pb-3"
    >
      <span
        class="block whitespace-normal border-4 border-[var(--border)] bg-[var(--surface-alt)] px-3 py-2 text-center text-xs font-bold leading-tight text-[var(--text)] shadow-[4px_4px_0_var(--shadow),0_0_12px_var(--glow)]"
      >
        {{ badgeTitle }}
      </span>
    </span>
  </span>
</template>
