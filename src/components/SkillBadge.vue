<script setup>
import { computed, useSlots } from 'vue'

const slots = useSlots()

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
    :aria-label="badgeTitle ? `${badgeText}: ${badgeTitle}` : null"
    :tabindex="badgeTitle ? 0 : null"
    class="group relative inline-flex max-w-full items-center gap-2 border-4 border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-black uppercase text-[var(--text)] shadow-[3px_3px_0_var(--shadow),0_0_10px_var(--glow)] transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:text-sm"
  >
    <span
      class="h-3 w-3 shrink-0 border-2 border-[var(--border)] bg-[var(--accent)] shadow-[1px_1px_0_var(--shadow)]"
      aria-hidden="true"
    />

    <span class="min-w-0 break-words">
      <slot />
    </span>

    <span
      v-if="badgeTitle"
      class="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden w-max max-w-[18rem] -translate-x-1/2 translate-y-1 rotate-[-2deg] whitespace-normal border-4 border-[var(--border)] bg-[var(--surface-alt)] px-3 py-2 text-center text-[0.68rem] leading-tight text-[var(--text)] opacity-0 shadow-[4px_4px_0_var(--shadow),0_0_12px_var(--glow)] transition sm:block sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100"
    >
      {{ badgeTitle }}
    </span>
  </span>
</template>
