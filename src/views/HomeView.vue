<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import StatCounter from '@/components/ui/StatCounter.vue'
import { projectsData } from '@/data/projects'
import type { AppLocale } from '@/locales/types'

const route = useRoute()
const { locale, t } = useI18n()

const currentLocale = computed<AppLocale>(() => {
  return (route.params.locale as AppLocale) || (locale.value as AppLocale) || 'ru'
})

useSeo(() => ({
  title: t('hero.title'),
  description: t('hero.subtitle')
}))

const contactUrl = import.meta.env.VITE_CONTACT_URL || 'https://wa.me/77759711546'

const implementedProjects = computed(() => {
  const cur = currentLocale.value
  return projectsData
    .filter(p => p.category === 'implemented')
    .map(p => ({
      id: p.id,
      title: cur === 'kk' ? p.titleKk : cur === 'en' ? p.titleEn : p.titleRu,
      desc: cur === 'kk' ? p.shortDescKk : cur === 'en' ? p.shortDescEn : p.shortDescRu,
      image: p.image,
      partner: p.partner
    }))
})
</script>

<template>
  <div class="home-page">
    <!-- 1. Hero Section -->
    <section class="section hero-section">
      <div
        class="bg-arcs-pattern"
        aria-hidden="true"
      />
      <div class="container hero-container">
        <div class="hero-content">
          <span class="section-tag">{{ $t('hero.badge') }}</span>
          <h1 class="hero-title">
            {{ $t('hero.title') }}
          </h1>
          <p class="hero-subtitle">
            {{ $t('hero.subtitle') }}
          </p>

          <div class="hero-actions">
            <a
              :href="contactUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-primary btn-lg"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
                aria-hidden="true"
              >
                <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              {{ $t('hero.ctaCall') }}
            </a>
            <router-link
              :to="`/${currentLocale}/about`"
              class="btn btn-outline btn-lg hero-btn-secondary"
            >
              {{ $t('hero.ctaAbout') }} →
            </router-link>
          </div>
        </div>

        <!-- Right Side: Rhomb Frame with PDF photo -->
        <div
          class="hero-media"
          aria-hidden="true"
        >
          <div class="hero-decor-disc" />
          <div class="rhomb-frame hero-rhomb">
            <img
              src="/assets/photos/sign-dialogue-960.webp"
              alt="Сурдопереводчик и общение на жестовом языке"
              width="400"
              height="400"
              loading="eager"
            >
          </div>
          <!-- Second smaller accent rhomb -->
          <div class="rhomb-frame hero-rhomb-small">
            <img
              src="/assets/photos/dispatcher-headset-480.webp"
              alt="Диспетчер службы сурдоперевода"
              width="180"
              height="180"
              loading="eager"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Numbers & Stats Counters Block -->
    <section class="section section--alt stats-bar-section">
      <div class="container">
        <div class="grid-4">
          <StatCounter
            :value="300"
            suffix="+"
            :label="$t('hero.statPeopleLabel')"
          />
          <StatCounter
            :value="30"
            :label="$t('hero.statJobsLabel')"
          />
          <StatCounter
            :value="16"
            :label="$t('hero.statRegionsLabel')"
          />
          <StatCounter
            value="08.08.2008"
            :label="$t('hero.statYearsLabel')"
          />
        </div>
      </div>
    </section>

    <!-- 3. Three Key Directions (Cards) -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('common.projectTitle') }}</span>
          <h2>{{ $t('home.directionsTitle') }}</h2>
          <p class="section-subtitle">
            {{ $t('home.directionsSubtitle') }}
          </p>
        </div>

        <div class="grid-3">
          <!-- Card 1: Dispatcher -->
          <div class="card direction-card">
            <div class="direction-card__icon direction-card__icon--primary">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="32"
                height="32"
                aria-hidden="true"
              >
                <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
            </div>
            <h3>{{ $t('home.dirDispatcher') }}</h3>
            <p>{{ $t('home.dirDispatcherDesc') }}</p>
            <router-link
              :to="`/${currentLocale}/dispatcher`"
              class="card-link"
            >
              {{ $t('common.readMore') }} →
            </router-link>
          </div>

          <!-- Card 2: Leisure Club -->
          <div class="card direction-card">
            <div class="direction-card__icon direction-card__icon--secondary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="32"
                height="32"
                aria-hidden="true"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle
                  cx="9"
                  cy="7"
                  r="4"
                />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>{{ $t('home.dirClub') }}</h3>
            <p>{{ $t('home.dirClubDesc') }}</p>
            <router-link
              :to="`/${currentLocale}/club`"
              class="card-link"
            >
              {{ $t('common.readMore') }} →
            </router-link>
          </div>

          <!-- Card 3: Video Studio -->
          <div class="card direction-card">
            <div class="direction-card__icon direction-card__icon--accent">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="32"
                height="32"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="2.18"
                  ry="2.18"
                />
                <line
                  x1="7"
                  y1="2"
                  x2="7"
                  y2="22"
                />
                <line
                  x1="17"
                  y1="2"
                  x2="17"
                  y2="22"
                />
                <line
                  x1="2"
                  y1="12"
                  x2="22"
                  y2="12"
                />
                <line
                  x1="2"
                  y1="7"
                  x2="7"
                  y2="7"
                />
                <line
                  x1="2"
                  y1="17"
                  x2="7"
                  y2="17"
                />
                <line
                  x1="17"
                  y1="17"
                  x2="22"
                  y2="17"
                />
                <line
                  x1="17"
                  y1="7"
                  x2="22"
                  y2="7"
                />
              </svg>
            </div>
            <h3>{{ $t('home.dirStudio') }}</h3>
            <p>{{ $t('home.dirStudioDesc') }}</p>
            <router-link
              :to="`/${currentLocale}/studio`"
              class="card-link"
            >
              {{ $t('common.readMore') }} →
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. How It Works (4 Steps) -->
    <section class="section section--dark">
      <div
        class="bg-arcs-pattern"
        aria-hidden="true"
      />
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('common.videoCall') }}</span>
          <h2>{{ $t('home.howItWorksTitle') }}</h2>
          <p class="section-subtitle">
            {{ $t('home.howItWorksSubtitle') }}
          </p>
        </div>

        <div class="steps-grid">
          <!-- Step 1 -->
          <div class="step-card">
            <span class="step-card__num">{{ $t('home.step1Num') }}</span>
            <h4>{{ $t('home.step1Title') }}</h4>
            <p>{{ $t('home.step1Desc') }}</p>
          </div>
          <!-- Step 2 -->
          <div class="step-card">
            <span class="step-card__num">{{ $t('home.step2Num') }}</span>
            <h4>{{ $t('home.step2Title') }}</h4>
            <p>{{ $t('home.step2Desc') }}</p>
          </div>
          <!-- Step 3 -->
          <div class="step-card">
            <span class="step-card__num">{{ $t('home.step3Num') }}</span>
            <h4>{{ $t('home.step3Title') }}</h4>
            <p>{{ $t('home.step3Desc') }}</p>
          </div>
          <!-- Step 4 -->
          <div class="step-card">
            <span class="step-card__num">{{ $t('home.step4Num') }}</span>
            <h4>{{ $t('home.step4Title') }}</h4>
            <p>{{ $t('home.step4Desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Emergency 24/7 Block -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('common.emergency247') }}</span>
          <h2>{{ $t('home.emergencyTitle') }}</h2>
          <p class="section-subtitle">
            {{ $t('home.emergencySubtitle') }}
          </p>
        </div>

        <div class="grid-4">
          <!-- MCHS -->
          <div class="card emergency-item">
            <div class="emergency-badge-danger">
              112
            </div>
            <h4>{{ $t('home.mchsTitle') }}</h4>
            <p>{{ $t('home.mchsDesc') }}</p>
          </div>

          <!-- Police -->
          <div class="card emergency-item">
            <div class="emergency-badge-danger">
              102
            </div>
            <h4>{{ $t('home.policeTitle') }}</h4>
            <p>{{ $t('home.policeDesc') }}</p>
          </div>

          <!-- Ambulance -->
          <div class="card emergency-item">
            <div class="emergency-badge-danger">
              103
            </div>
            <h4>{{ $t('home.ambulanceTitle') }}</h4>
            <p>{{ $t('home.ambulanceDesc') }}</p>
          </div>

          <!-- PSC / Akimat -->
          <div class="card emergency-item">
            <div class="emergency-badge-blue">
              ЦОН
            </div>
            <h4>{{ $t('home.conTitle') }}</h4>
            <p>{{ $t('home.conDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Implemented Projects Slider / Grid -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('nav.projects') }}</span>
          <h2>{{ $t('home.projectsTitle') }}</h2>
          <p class="section-subtitle">
            {{ $t('home.projectsSubtitle') }}
          </p>
        </div>

        <div class="grid-2">
          <article
            v-for="p in implementedProjects"
            :key="p.id"
            class="card project-home-card"
          >
            <div class="project-home-card__img-wrap">
              <img
                :src="p.image"
                :alt="p.title"
                loading="lazy"
                width="400"
                height="240"
              >
              <span
                v-if="p.partner"
                class="project-partner-tag"
              >{{ p.partner }}</span>
            </div>
            <div class="project-home-card__body">
              <h3>{{ p.title }}</h3>
              <p>{{ p.desc }}</p>
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

    <!-- 7. Partners Block -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('home.partnersTitle') }}</span>
          <h2>{{ $t('home.partnersTitle') }}</h2>
          <p class="section-subtitle">
            {{ $t('home.partnersSubtitle') }}
          </p>
        </div>

        <div class="grid-3 partners-grid">
          <!-- Kaspi -->
          <div class="card partner-card">
            <div class="partner-card__logo-placeholder">
              <span>Kaspi.kz</span>
            </div>
            <h4>{{ $t('home.partnerKaspi') }}</h4>
            <p>{{ $t('home.partnerKaspiDesc') }}</p>
          </div>

          <!-- Agip -->
          <div class="card partner-card">
            <div class="partner-card__logo-placeholder">
              <span>Agip Karachaganak</span>
            </div>
            <h4>{{ $t('home.partnerAgip') }}</h4>
            <p>{{ $t('home.partnerAgipDesc') }}</p>
          </div>

          <!-- Turkmenistan -->
          <div class="card partner-card">
            <div class="partner-card__logo-placeholder">
              <span>Түркіменстан (2023–2024)</span>
            </div>
            <h4>{{ $t('home.partnerTurkmenistan') }}</h4>
            <p>{{ $t('home.partnerTurkmenistanDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. Regional Statistics Preview Banner -->
    <section class="section section--alt stats-banner-section">
      <div class="container">
        <div class="stats-banner">
          <div class="stats-banner__text">
            <h2>{{ $t('home.statsPreviewTitle') }}</h2>
            <p>{{ $t('home.statsPreviewText') }}</p>
          </div>
          <router-link
            :to="`/${currentLocale}/about#statistics`"
            class="btn btn-primary btn-lg"
          >
            {{ $t('home.statsPreviewCta') }} →
          </router-link>
        </div>
      </div>
    </section>

    <!-- 9. CTA Callout -->
    <section class="section section--dark cta-section">
      <div
        class="bg-arcs-pattern"
        aria-hidden="true"
      />
      <div class="container cta-container">
        <div class="cta-box">
          <h2>{{ $t('home.ctaTitle') }}</h2>
          <p>{{ $t('home.ctaText') }}</p>
          <div class="cta-actions">
            <a
              :href="contactUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-accent btn-lg"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="22"
                height="22"
                aria-hidden="true"
              >
                <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
              {{ $t('common.videoCall') }}
            </a>
            <router-link
              :to="`/${currentLocale}/contacts`"
              class="btn btn-outline btn-lg"
            >
              {{ $t('nav.contacts') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  padding-top: clamp(3rem, 6vw, 6.5rem);
  padding-bottom: clamp(4rem, 8vw, 8rem);
  overflow: hidden;
  position: relative;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 3rem;
  position: relative;
  z-index: 1;
}

@media (max-width: 960px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.hero-title {
  margin-bottom: 1.25rem;
  color: var(--color-primary-dark, #1D3159);
}

.hero-subtitle {
  font-size: clamp(1.05rem, 1.5vw, 1.25rem);
  color: var(--color-text-muted, #4A5877);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 600px;
}
@media (max-width: 960px) {
  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}
@media (max-width: 960px) {
  .hero-actions {
    justify-content: center;
  }
}

.hero-btn-secondary {
  border-color: var(--color-primary, #1B4F94);
  color: var(--color-primary, #1B4F94);
}
.hero-btn-secondary:hover {
  background: var(--color-primary-50, #EDF3FA);
}

.hero-media {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 380px;
}

.hero-decor-disc {
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(64, 156, 168, 0.2) 0%, rgba(255, 243, 81, 0.15) 100%);
  pointer-events: none;
}

.hero-rhomb {
  width: 280px;
  height: 280px;
  z-index: 2;
}

.hero-rhomb-small {
  width: 140px;
  height: 140px;
  position: absolute;
  bottom: -20px;
  right: 10px;
  z-index: 3;
  border-color: var(--color-secondary, #409CA8);
}

@media (max-width: 640px) {
  .hero-rhomb {
    width: 220px;
    height: 220px;
  }
  .hero-rhomb-small {
    width: 100px;
    height: 100px;
  }
}

/* Direction cards */
.direction-card {
  display: flex;
  flex-direction: column;
}

.direction-card__icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.direction-card__icon--primary {
  background: rgba(27, 79, 148, 0.12);
  color: var(--color-primary, #1B4F94);
}

.direction-card__icon--secondary {
  background: rgba(64, 156, 168, 0.15);
  color: var(--color-secondary, #409CA8);
}

.direction-card__icon--accent {
  background: rgba(255, 243, 81, 0.3);
  color: var(--color-primary-dark, #1D3159);
}

.card-link {
  margin-top: auto;
  padding-top: 1rem;
  font-weight: 700;
  color: var(--color-primary, #1B4F94);
}

/* Steps Grid */
.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}

.step-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  padding: 2rem 1.5rem;
  position: relative;
  transition: transform 0.25s ease;
}

.step-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-accent, #FFF351);
}

.step-card__num {
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 2.25rem;
  color: var(--color-accent, #FFF351);
  display: block;
  margin-bottom: 0.5rem;
}

.step-card h4 {
  font-size: 1.2rem;
  color: #FFFFFF;
  margin-bottom: 0.75rem;
}

.step-card p {
  color: var(--color-section-dark-muted, #B8CAE6);
  font-size: 0.95rem;
  margin: 0;
}

/* Emergency Grid */
.emergency-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.emergency-badge-danger {
  background: var(--color-danger, #C62828);
  color: #FFFFFF;
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  padding: 0.35rem 0.85rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.emergency-badge-blue {
  background: var(--color-primary, #1B4F94);
  color: #FFFFFF;
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  padding: 0.35rem 0.85rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

/* Implemented projects */
.project-home-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.project-home-card__img-wrap {
  position: relative;
  height: 220px;
  background: var(--color-surface-alt, #EDF3FA);
}

.project-home-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-partner-tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(29, 49, 89, 0.85);
  color: #FFFFFF;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  backdrop-filter: blur(4px);
}

.project-home-card__body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

/* Partners */
.partner-card {
  text-align: center;
  align-items: center;
}

.partner-card__logo-placeholder {
  width: 100%;
  height: 90px;
  background: var(--color-surface-alt, #EDF3FA);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
  color: var(--color-primary, #1B4F94);
  margin-bottom: 1.25rem;
  border: 2px dashed var(--color-border, #E2E8F0);
}

/* Stats banner */
.stats-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background: var(--color-surface, #FFFFFF);
  border: 2px solid var(--color-secondary, #409CA8);
  border-radius: 20px;
  padding: clamp(1.5rem, 4vw, 3rem);
}

@media (max-width: 860px) {
  .stats-banner {
    flex-direction: column;
    text-align: center;
  }
}

.stats-banner__text h2 {
  margin-bottom: 0.5rem;
}

.stats-banner__text p {
  color: var(--color-text-muted, #4A5877);
  font-size: 1.05rem;
  margin: 0;
}

/* CTA */
.cta-box {
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
}

.cta-box h2 {
  color: #FFFFFF;
  margin-bottom: 1rem;
}

.cta-box p {
  color: var(--color-section-dark-muted, #B8CAE6);
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
}
</style>
