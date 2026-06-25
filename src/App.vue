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
const theme = ref(localStorage.getItem('theme') || 'brutal')

const portfolio = computed(() => {
  return language.value === 'en' ? portfolioEn : portfolioEs
})

const isTerminal = computed(() => theme.value === 'terminal')

const toggleLanguage = () => {
  language.value = language.value === 'en' ? 'es' : 'en'
  localStorage.setItem('language', language.value)
}

const toggleTheme = () => {
  theme.value = theme.value === 'brutal' ? 'terminal' : 'brutal'
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <main
    class="min-h-screen p-4 font-sans transition-colors duration-300 md:p-8"
    :class="isTerminal ? 'bg-[#080f12] text-[#f5f1e8]' : 'bg-[#f5f1e8] text-[#111111]'"
  >
    <section
      class="border-4 p-6 shadow-[8px_8px_0_#000] transition-colors duration-300 md:p-8"
      :class="
        isTerminal
          ? 'border-[#00d9ff] bg-[#10191d] shadow-[8px_8px_0_#ff2e88]'
          : 'border-black bg-white'
      "
    >
      <header class="mb-12 flex items-start justify-between gap-6">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.18em]">IVAN_JIMENEZ_PROFILE.EXE</p>

          <p
            class="mt-2 text-xs font-black uppercase tracking-[0.14em]"
            :class="isTerminal ? 'text-[#b6ff00]' : 'text-black/60'"
          >
            {{ isTerminal ? 'TERMINAL MODE ONLINE' : 'NEO-BRUTALIST SYSTEM' }}
          </p>
        </div>

        <div class="flex flex-wrap justify-end gap-3">
          <button
            class="border-4 px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
            :class="
              isTerminal
                ? 'border-[#00d9ff] bg-[#ff2e88] text-white'
                : 'border-black bg-[#ff2e88] text-white'
            "
            type="button"
            @click="toggleLanguage"
          >
            Lang: {{ portfolio.navigation.language }}
          </button>

          <button
            class="border-4 px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
            :class="
              isTerminal
                ? 'border-[#b6ff00] bg-[#080f12] text-[#b6ff00]'
                : 'border-black bg-[#00d9ff] text-black'
            "
            type="button"
            @click="toggleTheme"
          >
            Mode: {{ isTerminal ? 'Brutal' : 'Terminal' }}
          </button>
        </div>
      </header>

      <HeroSection :portfolio="portfolio" :is-terminal="isTerminal" />

      <SecurityFocus :section="portfolio.securityFocus" :is-terminal="isTerminal" />

      <ToolsetSection :section="portfolio.toolset" :is-terminal="isTerminal" />

      <ProjectsSection :section="portfolio.projects" :is-terminal="isTerminal" />

      <ExperienceLog :section="portfolio.experience" :is-terminal="isTerminal" />

      <EducationSection :section="portfolio.education" :is-terminal="isTerminal" />

      <LanguagesSection :section="portfolio.languages" :is-terminal="isTerminal" />

      <CertificationsSection :section="portfolio.certifications" :is-terminal="isTerminal" />

      <ContactSection :section="portfolio.contact" :is-terminal="isTerminal" />

      <FooterSection :section="portfolio.footer" :is-terminal="isTerminal" />
    </section>
  </main>
</template>
