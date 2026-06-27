<script setup>
import { computed, ref } from 'vue'

import HeroSection from './components/HeroSection.vue'
import SecurityFocus from './components/SecurityFocus.vue'
import ToolsetSection from './components/ToolsetSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ExperienceLog from './components/ExperienceLog.vue'
import EducationSection from './components/EducationSection.vue'
import LanguagesSection from './components/LanguagesSection.vue'
import CertificationsSection from './components/CertificationsSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'
import portfolioEn from './data/portfolio.en.json'
import portfolioEs from './data/portfolio.es.json'

const language = ref(localStorage.getItem('language') || 'en')
const themes = ['brutal', 'neon', 'dark']
const savedTheme = localStorage.getItem('theme')
const theme = ref(
  themes.includes(savedTheme) ? savedTheme : savedTheme === 'terminal' ? 'neon' : 'brutal',
)

const portfolio = computed(() => {
  return language.value === 'en' ? portfolioEn : portfolioEs
})

const modeLabel = computed(() => {
  return theme.value.charAt(0).toUpperCase() + theme.value.slice(1)
})

const systemLabel = computed(() => {
  const labels = {
    brutal: 'NEO-BRUTALIST SYSTEM',
    neon: 'NEON SECURITY DASHBOARD',
    dark: 'DARK PROFESSIONAL MODE',
  }

  return labels[theme.value]
})

const toggleLanguage = () => {
  language.value = language.value === 'en' ? 'es' : 'en'
  localStorage.setItem('language', language.value)
}

const toggleTheme = () => {
  const currentIndex = themes.indexOf(theme.value)
  theme.value = themes[(currentIndex + 1) % themes.length]
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <main
    :data-theme="theme"
    class="min-h-screen overflow-x-hidden bg-[var(--bg)] p-3 font-sans text-[var(--text)] transition-colors duration-300 sm:p-4 md:p-8"
  >
    <section
      class="mx-auto max-w-7xl border-4 border-[var(--border)] bg-[var(--surface)] p-4 shadow-[5px_5px_0_var(--shadow),0_0_16px_var(--glow)] transition-colors duration-300 sm:p-6 sm:shadow-[8px_8px_0_var(--shadow),0_0_22px_var(--glow)] md:p-8"
    >
      <header
        class="mb-10 flex flex-col items-stretch justify-between gap-5 sm:flex-row sm:items-start md:mb-12"
      >
        <div class="min-w-0">
          <p
            class="break-words text-xs font-black uppercase tracking-[0.12em] sm:text-sm sm:tracking-[0.18em]"
          >
            IVAN_JIMENEZ_PROFILE.EXE
          </p>

          <p
            class="mt-2 break-words text-xs font-black uppercase tracking-[0.1em] text-[var(--muted)] sm:tracking-[0.14em]"
          >
            {{ systemLabel }}
          </p>
        </div>

        <div class="flex flex-wrap gap-3 sm:justify-end">
          <button
            class="min-w-0 flex-1 border-4 border-[var(--border)] bg-[var(--accent-2)] px-3 py-2 text-xs font-black uppercase text-[var(--accent-2-text)] shadow-[4px_4px_0_var(--shadow),0_0_12px_var(--glow)] active:translate-x-1 active:translate-y-1 active:shadow-none sm:flex-none sm:px-4 sm:text-sm"
            type="button"
            @click="toggleLanguage"
          >
            Lang: {{ portfolio.navigation.language }}
          </button>

          <button
            class="min-w-0 flex-1 border-4 border-[var(--border)] bg-[var(--accent-4)] px-3 py-2 text-xs font-black uppercase text-[var(--accent-4-text)] shadow-[4px_4px_0_var(--shadow),0_0_12px_var(--glow)] active:translate-x-1 active:translate-y-1 active:shadow-none sm:flex-none sm:px-4 sm:text-sm"
            type="button"
            @click="toggleTheme"
          >
            Mode: {{ modeLabel }}
          </button>
        </div>
      </header>

      <HeroSection :portfolio="portfolio" />

      <SecurityFocus :section="portfolio.securityFocus" />

      <ToolsetSection :section="portfolio.toolset" />

      <ProjectsSection :section="portfolio.projects" />

      <ExperienceLog :section="portfolio.experience" />

      <EducationSection :section="portfolio.education" />

      <LanguagesSection :section="portfolio.languages" />

      <CertificationsSection :section="portfolio.certifications" />

      <ContactSection :section="portfolio.contact" />

      <FooterSection :section="portfolio.footer" />
    </section>
  </main>
</template>
