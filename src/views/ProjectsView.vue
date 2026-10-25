<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { projectsData } from '@/data/projects'
import type { AppLocale } from '@/locales/types'

const route = useRoute()
const { locale, t } = useI18n()

const currentLocale = computed<AppLocale>(() => {
  return (route.params.locale as AppLocale) || (locale.value as AppLocale) || 'ru'
})

useSeo(() => ({
  title: t('projects.title'),
  description: t('projects.subtitle')
}))

const activeTab = ref<'implemented' | 'proposed'>('implemented')

const localizedProjects = computed(() => {
  const cur = currentLocale.value
  return projectsData.map(p => ({
    id: p.id,
    title: cur === 'kk' ? p.titleKk : cur === 'en' ? p.titleEn : p.titleRu,
    shortDesc: cur === 'kk' ? p.shortDescKk : cur === 'en' ? p.shortDescEn : p.shortDescRu,
    category: p.category,
    image: p.image,
    partner: p.partner,
    impact: cur === 'kk' ? p.impactKk : cur === 'en' ? p.impactEn : p.impactRu
  }))
})

const implementedList = computed(() => {
  return localizedProjects.value.filter(p => p.category === 'implemented')
})

const proposedProject = computed(() => {
  return localizedProjects.value.find(p => p.category === 'proposed')
})
</script>

<template>
  <div class="projects-page">
    <!-- Header Hero -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('projects.title') }}</span>
          <h1>{{ $t('projects.title') }}</h1>
          <p class="section-subtitle">
            {{ $t('projects.subtitle') }}
          </p>
        </div>

        <!-- Navigation Tabs -->
        <div
          class="projects-tabs"
          role="tablist"
        >
          <button
            type="button"
            :class="{ active: activeTab === 'implemented' }"
            role="tab"
            :aria-selected="activeTab === 'implemented'"
            @click="activeTab = 'implemented'"
          >
            {{ $t('projects.tabImplemented') }}
          </button>
          <button
            type="button"
            :class="{ active: activeTab === 'proposed' }"
            role="tab"
            :aria-selected="activeTab === 'proposed'"
            @click="activeTab = 'proposed'"
          >
            {{ $t('projects.tabProposed') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Tab 1: Implemented Projects -->
    <section
      v-if="activeTab === 'implemented'"
      class="section"
    >
      <div class="container">
        <div class="grid-2">
          <article
            v-for="p in implementedList"
            :key="p.id"
            class="card project-card"
          >
            <div class="project-img-box">
              <img
                :src="p.image"
                :alt="p.title"
                loading="lazy"
                width="400"
                height="220"
              >
              <span
                v-if="p.partner"
                class="partner-badge"
              >{{ p.partner }}</span>
            </div>
            <div class="project-body">
              <h3>{{ p.title }}</h3>
              <p>{{ p.shortDesc }}</p>
              <div
                v-if="p.impact"
                class="project-impact-box"
              >
                <small><strong>Итог / Нәтижесі:</strong> {{ p.impact }}</small>
              </div>
              <router-link
                :to="`/${currentLocale}/projects/${p.id}`"
                class="card-link"
              >
                {{ $t('common.readMore') }} →
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Tab 2: Proposed Project (Ecosystem) -->
    <section
      v-else
      class="section proposed-section"
    >
      <div class="container">
        <div class="card proposed-card">
          <div class="proposed-header">
            <span class="section-tag">{{ $t('projects.tabProposed') }}</span>
            <h2>{{ proposedProject?.title }}</h2>
          </div>

          <!-- Goal Box -->
          <div class="goal-box">
            <h3>{{ $t('projects.goalTitle') }}</h3>
            <p>{{ $t('projects.goalText') }}</p>
          </div>

          <!-- Social Impact Grid -->
          <div class="impact-section">
            <h3>{{ $t('projects.impactTitle') }}</h3>
            <div class="grid-2">
              <div class="impact-item">
                <span class="impact-num">✓</span>
                <p>{{ $t('projects.impactItem1') }}</p>
              </div>
              <div class="impact-item">
                <span class="impact-num">✓</span>
                <p>{{ $t('projects.impactItem2') }}</p>
              </div>
              <div class="impact-item">
                <span class="impact-num">✓</span>
                <p>{{ $t('projects.impactItem3') }}</p>
              </div>
              <div class="impact-item">
                <span class="impact-num">✓</span>
                <p>{{ $t('projects.impactItem4') }}</p>
              </div>
            </div>
          </div>

          <div class="proposed-cta">
            <router-link
              :to="`/${currentLocale}/dispatcher`"
              class="btn btn-primary"
            >
              {{ $t('home.dirDispatcher') }} →
            </router-link>
            <router-link
              :to="`/${currentLocale}/club`"
              class="btn btn-secondary"
            >
              {{ $t('home.dirClub') }} →
            </router-link>
            <router-link
              :to="`/${currentLocale}/studio`"
              class="btn btn-outline"
              style="color: var(--color-primary, #1B4F94);"
            >
              {{ $t('home.dirStudio') }} →
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.projects-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.projects-tabs button {
  padding: 0.75rem 1.75rem;
  background: var(--color-surface, #FFFFFF);
  border: 2px solid var(--color-border, #E2E8F0);
  border-radius: 999px;
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-heading, #1D3159);
  cursor: pointer;
  transition: all 0.2s ease;
}

.projects-tabs button.active {
  background: var(--color-primary, #1B4F94);
  color: #FFFFFF;
  border-color: var(--color-primary, #1B4F94);
  box-shadow: 0 4px 12px rgba(27, 79, 148, 0.25);
}

.project-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.project-img-box {
  position: relative;
  height: 220px;
  background: var(--color-surface-alt, #EDF3FA);
}

.project-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.partner-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(29, 49, 89, 0.85);
  color: #FFFFFF;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
}

.project-body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.project-body h3 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.project-impact-box {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background: var(--color-surface-alt, #EDF3FA);
  border-left: 3px solid var(--color-secondary, #409CA8);
  border-radius: 0 8px 8px 0;
  color: var(--color-text, #13213D);
  font-size: 0.85rem;
}

.card-link {
  margin-top: auto;
  font-weight: 700;
  color: var(--color-primary, #1B4F94);
}

/* Proposed Card */
.proposed-card {
  padding: clamp(2rem, 4vw, 3.5rem);
  border: 2px solid var(--color-secondary, #409CA8);
}

.proposed-header {
  margin-bottom: 2rem;
}

.goal-box {
  background: var(--color-surface-alt, #EDF3FA);
  border-left: 4px solid var(--color-primary, #1B4F94);
  padding: 1.5rem;
  border-radius: 0 12px 12px 0;
  margin-bottom: 2.5rem;
}

.goal-box h3 {
  color: var(--color-primary, #1B4F94);
  margin-bottom: 0.75rem;
}

.impact-section h3 {
  margin-bottom: 1.5rem;
}

.impact-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: var(--color-surface-alt, #EDF3FA);
  padding: 1.25rem;
  border-radius: 12px;
}

.impact-num {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-secondary, #409CA8);
  line-height: 1;
}

.impact-item p {
  margin: 0;
  font-size: 0.95rem;
}

.proposed-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border, #E2E8F0);
}
</style>
