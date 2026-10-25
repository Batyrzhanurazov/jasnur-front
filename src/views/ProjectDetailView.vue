<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { projectsData } from '@/data/projects'
import type { AppLocale } from '@/locales/types'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

const currentLocale = computed<AppLocale>(() => {
  return (route.params.locale as AppLocale) || (locale.value as AppLocale) || 'ru'
})

const projectId = computed(() => route.params.id as string)

const project = computed(() => {
  const p = projectsData.find(item => item.id === projectId.value)
  if (!p) return null
  const cur = currentLocale.value
  return {
    id: p.id,
    title: cur === 'kk' ? p.titleKk : cur === 'en' ? p.titleEn : p.titleRu,
    fullDesc: cur === 'kk' ? p.fullDescKk : cur === 'en' ? p.fullDescEn : p.fullDescRu,
    category: p.category,
    image: p.image,
    partner: p.partner,
    impact: cur === 'kk' ? p.impactKk : cur === 'en' ? p.impactEn : p.impactRu
  }
})

useSeo(() => ({
  title: project.value?.title || t('projects.title'),
  description: project.value?.fullDesc || t('projects.subtitle')
}))

function goBack() {
  router.push(`/${currentLocale.value}/projects`)
}
</script>

<template>
  <div class="project-detail-page">
    <div
      v-if="project"
      class="container section"
    >
      <button
        type="button"
        class="btn-back"
        @click="goBack"
      >
        ← {{ $t('common.back') }}
      </button>

      <article class="card detail-card">
        <div class="detail-header">
          <span
            v-if="project.partner"
            class="section-tag"
          >{{ project.partner }}</span>
          <h1>{{ project.title }}</h1>
        </div>

        <div class="detail-media">
          <img
            :src="project.image"
            :alt="project.title"
            width="800"
            height="450"
            class="detail-img"
          >
        </div>

        <div class="detail-content">
          <p class="lead-text">
            {{ project.fullDesc }}
          </p>

          <div
            v-if="project.impact"
            class="impact-callout"
          >
            <h3>{{ $t('projects.impactTitle') }}</h3>
            <p>{{ project.impact }}</p>
          </div>
        </div>

        <div class="detail-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="goBack"
          >
            ← {{ $t('common.back') }}
          </button>
        </div>
      </article>
    </div>

    <!-- 404 fallback if not found -->
    <div
      v-else
      class="container section text-center"
    >
      <h2>Проект не найден</h2>
      <button
        type="button"
        class="btn btn-primary"
        @click="goBack"
      >
        {{ $t('common.back') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn-back {
  background: transparent;
  border: none;
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-primary, #1B4F94);
  cursor: pointer;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-back:hover {
  text-decoration: underline;
}

.detail-card {
  padding: clamp(1.5rem, 4vw, 3.5rem);
  max-width: 900px;
  margin: 0 auto;
}

.detail-header {
  margin-bottom: 2rem;
}

.detail-header h1 {
  margin-top: 0.5rem;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
}

.detail-media {
  margin-bottom: 2.5rem;
  border-radius: 16px;
  overflow: hidden;
  max-height: 440px;
  background: var(--color-surface-alt, #EDF3FA);
}

.detail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-content {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--color-text, #13213D);
}

.lead-text {
  margin-bottom: 2rem;
}

.impact-callout {
  background: var(--color-surface-alt, #EDF3FA);
  border-left: 4px solid var(--color-secondary, #409CA8);
  padding: 1.5rem;
  border-radius: 0 12px 12px 0;
  margin-bottom: 2.5rem;
}

.impact-callout h3 {
  font-size: 1.15rem;
  color: var(--color-primary, #1B4F94);
  margin-bottom: 0.5rem;
}

.detail-footer {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border, #E2E8F0);
}
</style>
