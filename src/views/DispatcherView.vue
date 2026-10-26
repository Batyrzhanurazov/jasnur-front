<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import Accordion, { type AccordionItem } from '@/components/ui/Accordion.vue'

const { t } = useI18n()

useSeo(() => ({
  title: t('dispatcher.title'),
  description: t('dispatcher.subtitle')
}))

const contactUrl = import.meta.env.VITE_CONTACT_URL || 'https://wa.me/77759711546'
const videoCallUrl = import.meta.env.VITE_VIDEO_CALL_URL || 'https://wa.me/77759711546'

const faqItems = computed<AccordionItem[]>(() => [
  { id: 'faq-1', title: t('dispatcher.q1'), content: t('dispatcher.a1') },
  { id: 'faq-2', title: t('dispatcher.q2'), content: t('dispatcher.a2') },
  { id: 'faq-3', title: t('dispatcher.q3'), content: t('dispatcher.a3') },
  { id: 'faq-4', title: t('dispatcher.q4'), content: t('dispatcher.a4') }
])
</script>

<template>
  <div class="dispatcher-page">
    <!-- Hero Banner -->
    <section class="section section--alt">
      <div class="container">
        <div class="dispatcher-hero">
          <div class="dispatcher-hero__text">
            <span class="section-tag">{{ $t('dispatcher.badge') }}</span>
            <h1>{{ $t('dispatcher.title') }}</h1>
            <p class="section-subtitle">
              {{ $t('dispatcher.subtitle') }}
            </p>
            <div class="dispatcher-hero__cta">
              <a
                :href="videoCallUrl"
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
                {{ $t('common.videoCall') }}
              </a>
              <a
                :href="contactUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary btn-lg"
              >
                {{ $t('common.contactUs') }}
              </a>
            </div>
          </div>

          <div class="dispatcher-hero__media">
            <div class="rhomb-frame dispatcher-rhomb">
              <img
                src="/assets/photos/dispatcher-headset-960.webp"
                alt="Диспетчер службы сурдоперевода"
                width="380"
                height="380"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4 Key Service Pillars -->
    <section class="section">
      <div class="container">
        <div class="grid-4">
          <!-- 1: 24/7 -->
          <div class="card service-feature">
            <div class="service-feature__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="32"
                height="32"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>{{ $t('dispatcher.feature1Title') }}</h3>
            <p>{{ $t('dispatcher.feature1Desc') }}</p>
          </div>

          <!-- 2: WhatsApp Video Calls -->
          <div class="card service-feature">
            <div class="service-feature__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="32"
                height="32"
              >
                <rect
                  x="5"
                  y="2"
                  width="14"
                  height="20"
                  rx="2"
                  ry="2"
                />
                <line
                  x1="12"
                  y1="18"
                  x2="12.01"
                  y2="18"
                />
              </svg>
            </div>
            <h3>{{ $t('dispatcher.feature2Title') }}</h3>
            <p>{{ $t('dispatcher.feature2Desc') }}</p>
          </div>

          <!-- 3: Emergency & Gov -->
          <div class="card service-feature">
            <div class="service-feature__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="32"
                height="32"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>{{ $t('dispatcher.feature3Title') }}</h3>
            <p>{{ $t('dispatcher.feature3Desc') }}</p>
          </div>

          <!-- 4: Hospital & Legal -->
          <div class="card service-feature">
            <div class="service-feature__icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="32"
                height="32"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3>{{ $t('dispatcher.feature4Title') }}</h3>
            <p>{{ $t('dispatcher.feature4Desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How to Call (Steps Guide) -->
    <section class="section section--dark">
      <div
        class="bg-arcs-pattern"
        aria-hidden="true"
      />
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('dispatcher.howTitle') }}</span>
          <h2>{{ $t('dispatcher.howTitle') }}</h2>
        </div>

        <div class="steps-grid">
          <div class="step-card">
            <span class="step-card__num">01</span>
            <h4>Шаг 1</h4>
            <p>{{ $t('dispatcher.howStep1') }}</p>
          </div>
          <div class="step-card">
            <span class="step-card__num">02</span>
            <h4>Шаг 2</h4>
            <p>{{ $t('dispatcher.howStep2') }}</p>
          </div>
          <div class="step-card">
            <span class="step-card__num">03</span>
            <h4>Шаг 3</h4>
            <p>{{ $t('dispatcher.howStep3') }}</p>
          </div>
          <div class="step-card">
            <span class="step-card__num">04</span>
            <h4>Шаг 4</h4>
            <p>{{ $t('dispatcher.howStep4') }}</p>
          </div>
        </div>
      </div>
    </section>


    <!-- FAQ Accordion -->
    <section class="section">
      <div class="container container-narrow">
        <div class="section-header">
          <span class="section-tag">FAQ</span>
          <h2>{{ $t('dispatcher.faqTitle') }}</h2>
        </div>

        <Accordion :items="faqItems" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.dispatcher-hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 3rem;
  padding: 2rem 0;
}

@media (max-width: 860px) {
  .dispatcher-hero {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.dispatcher-hero__cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}
@media (max-width: 860px) {
  .dispatcher-hero__cta {
    justify-content: center;
  }
}

.dispatcher-hero__media {
  display: flex;
  justify-content: center;
}

.dispatcher-rhomb {
  width: 260px;
  height: 260px;
}

.service-feature {
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.25rem;
}

.service-feature__icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: rgba(27, 79, 148, 0.1);
  color: var(--color-primary, #1B4F94);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.service-feature h3 {
  font-size: clamp(1.15rem, 1.25vw, 1.3rem);
  line-height: 1.3;
  margin-bottom: 0.75rem;
  overflow-wrap: break-word;
  word-break: normal;
  hyphens: auto;
}

.service-feature p {
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--color-text-muted, #4A5877);
  margin: 0;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.step-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1.75rem 1.25rem;
}

.step-card__num {
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 2rem;
  color: var(--color-accent, #FFF351);
  display: block;
  margin-bottom: 0.5rem;
}

.step-card h4 {
  color: #FFFFFF;
  margin-bottom: 0.5rem;
}

.step-card p {
  color: var(--color-section-dark-muted, #B8CAE6);
  margin: 0;
  font-size: 0.95rem;
}

</style>
