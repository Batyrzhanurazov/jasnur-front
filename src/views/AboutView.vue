<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import RegionChart from '@/components/ui/RegionChart.vue'

const { t } = useI18n()

useSeo(() => ({
  title: t('about.title'),
  description: t('about.subtitle')
}))
</script>

<template>
  <div class="about-page">
    <!-- Header Hero -->
    <section class="section section--alt about-hero">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('about.title') }}</span>
          <h1>{{ $t('about.title') }}</h1>
          <p class="section-subtitle">
            {{ $t('about.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- History & Mission Block -->
    <section class="section">
      <div class="container">
        <div class="history-grid">
          <div class="history-card card">
            <span class="badge-year">08.08.2008</span>
            <h2>{{ $t('about.historyTitle') }}</h2>
            <p>{{ $t('about.historyText1') }}</p>
            <p>{{ $t('about.historyText2') }}</p>
          </div>

          <div class="mission-card card">
            <div class="mission-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="36"
                height="36"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <h2>{{ $t('about.missionTitle') }}</h2>
            <p class="mission-highlight">
              {{ $t('about.missionText') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Practical Activities & Social Enterprises -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('about.activitiesTitle') }}</span>
          <h2>{{ $t('about.activitiesTitle') }}</h2>
          <p class="section-subtitle">
            {{ $t('about.activitiesSubtitle') }}
          </p>
        </div>

        <div class="grid-3">
          <!-- 30 Workplaces -->
          <div class="card activity-card">
            <div class="activity-photo-wrap">
              <img
                src="/assets/photos/sign-conversation-480.webp"
                alt="Производственные цеха"
                loading="lazy"
                width="360"
                height="200"
              >
            </div>
            <div class="activity-body">
              <span class="activity-metric">{{ $t('about.actJobsCount') }}</span>
              <p>{{ $t('about.actJobsText') }}</p>
            </div>
          </div>

          <!-- Dispatcher Service -->
          <div class="card activity-card">
            <div class="activity-photo-wrap">
              <img
                src="/assets/photos/dispatcher-headset-480.webp"
                alt="Диспетчерская служба сурдоперевода"
                loading="lazy"
                width="360"
                height="200"
              >
            </div>
            <div class="activity-body">
              <span class="activity-metric">{{ $t('about.actDispatcherCount') }}</span>
              <p>{{ $t('about.actDispatcherText') }}</p>
            </div>
          </div>

          <!-- Free Sign Courses -->
          <div class="card activity-card">
            <div class="activity-photo-wrap">
              <img
                src="/assets/photos/sign-dialogue-480.webp"
                alt="Курсы жестовых языков"
                loading="lazy"
                width="360"
                height="200"
              >
            </div>
            <div class="activity-body">
              <span class="activity-metric">{{ $t('about.actCourses') }}</span>
              <p>{{ $t('about.actCoursesText') }}</p>
            </div>
          </div>

          <!-- Financial Literacy -->
          <div class="card activity-card">
            <div class="activity-photo-wrap">
              <img
                src="/assets/photos/seminar-480.webp"
                alt="Семинары по финансовой грамотности"
                loading="lazy"
                width="360"
                height="200"
              >
            </div>
            <div class="activity-body">
              <span class="activity-metric">{{ $t('about.actFin') }}</span>
              <p>{{ $t('about.actFinText') }}</p>
            </div>
          </div>

          <!-- International Exchange -->
          <div class="card activity-card">
            <div class="activity-photo-wrap">
              <img
                src="/assets/photos/club-group-480.webp"
                alt="Обмен опытом с партнерами из Туркменистана"
                loading="lazy"
                width="360"
                height="200"
              >
            </div>
            <div class="activity-body">
              <span class="activity-metric">{{ $t('about.actInt') }}</span>
              <p>{{ $t('about.actIntText') }}</p>
            </div>
          </div>

          <!-- Creative Festival Singing Hands -->
          <div class="card activity-card">
            <div class="activity-photo-wrap">
              <img
                src="/assets/photos/hands-480.webp"
                alt="Фестиваль Поющие руки"
                loading="lazy"
                width="360"
                height="200"
              >
            </div>
            <div class="activity-body">
              <span class="activity-metric">«Поющие руки»</span>
              <p>Городской и республиканский фестиваль жестовой песни при поддержке Компании Аджип Карачаганак.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Scope of Dispatch Service -->
    <section class="section section--dark">
      <div
        class="bg-arcs-pattern"
        aria-hidden="true"
      />
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('nav.dispatcher') }}</span>
          <h2>{{ $t('about.directionsTitle') }}</h2>
        </div>

        <div class="directions-list">
          <div class="dir-item">
            <span class="dir-bullet">01</span>
            <p>{{ $t('about.dirItem1') }}</p>
          </div>
          <div class="dir-item">
            <span class="dir-bullet">02</span>
            <p>{{ $t('about.dirItem2') }}</p>
          </div>
          <div class="dir-item">
            <span class="dir-bullet">03</span>
            <p>{{ $t('about.dirItem3') }}</p>
          </div>
          <div class="dir-item">
            <span class="dir-bullet">04</span>
            <p>{{ $t('about.dirItem4') }}</p>
          </div>
          <div class="dir-item">
            <span class="dir-bullet">05</span>
            <p>{{ $t('about.dirItem5') }}</p>
          </div>
          <div class="dir-item">
            <span class="dir-bullet">06</span>
            <p>{{ $t('about.dirItem6') }}</p>
          </div>
          <div class="dir-item">
            <span class="dir-bullet">07</span>
            <p>{{ $t('about.dirItem7') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section with Interactive Chart & Table -->
    <section
      id="statistics"
      class="section"
    >
      <div class="container">
        <div class="section-header">
          <span class="section-tag">inva.gov.kz (20.05.2025)</span>
          <h2>{{ $t('about.statsTitle') }}</h2>
          <p class="section-subtitle">
            {{ $t('about.statsSubtitle') }}
          </p>
        </div>

        <RegionChart />
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-hero {
  padding-top: 4rem;
  padding-bottom: 3.5rem;
  text-align: center;
}

.history-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  align-items: stretch;
}

@media (max-width: 860px) {
  .history-grid {
    grid-template-columns: 1fr;
  }
}

.badge-year {
  display: inline-block;
  background: var(--color-primary, #1B4F94);
  color: #FFFFFF;
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  padding: 0.35rem 0.85rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
}

.history-card h2 {
  margin-bottom: 1rem;
}

.mission-card {
  background: linear-gradient(135deg, var(--color-primary-dark, #1D3159), #102140);
  color: #FFFFFF;
  border: 2px solid var(--color-accent, #FFF351);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mission-card h2 {
  color: var(--color-accent, #FFF351);
  margin-bottom: 1rem;
}

.mission-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 243, 81, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent, #FFF351);
  margin-bottom: 1.5rem;
}

.mission-highlight {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #FFFFFF;
}

/* Activities */
.activity-card {
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.activity-photo-wrap {
  height: 190px;
  background: var(--color-surface-alt, #EDF3FA);
  overflow: hidden;
}

.activity-photo-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.activity-card:hover .activity-photo-wrap img {
  transform: scale(1.05);
}

.activity-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.activity-metric {
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 1.25rem;
  color: var(--color-primary, #1B4F94);
  margin-bottom: 0.5rem;
}

/* Directions */
.directions-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.dir-item {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 1.5rem;
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.dir-bullet {
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 1.35rem;
  color: var(--color-accent, #FFF351);
  line-height: 1;
  flex-shrink: 0;
}

.dir-item p {
  color: var(--color-section-dark-muted, #B8CAE6);
  margin: 0;
  line-height: 1.5;
  font-size: 0.95rem;
}
</style>
