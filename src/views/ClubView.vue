<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { clubEvents } from '@/data/events'
import type { AppLocale } from '@/locales/types'

const route = useRoute()
const { locale, t } = useI18n()

const currentLocale = computed<AppLocale>(() => {
  return (route.params.locale as AppLocale) || (locale.value as AppLocale) || 'ru'
})

useSeo(() => ({
  title: t('club.title'),
  description: t('club.subtitle')
}))

// Event registration form state
const formName = ref('')
const formPhone = ref('')
const formEvent = ref('')
const formComments = ref('')
const honeypot = ref('') // Anti-spam trap
const isSubmitted = ref(false)

const localizedEvents = computed(() => {
  const cur = currentLocale.value
  return clubEvents.map(e => ({
    id: e.id,
    title: cur === 'kk' ? e.titleKk : cur === 'en' ? e.titleEn : e.titleRu,
    desc: cur === 'kk' ? e.descKk : cur === 'en' ? e.descEn : e.descRu,
    date: e.date,
    time: e.time,
    location: cur === 'kk' ? e.locationKk : cur === 'en' ? e.locationEn : e.locationRu,
    typeLabel: cur === 'kk' ? e.typeLabelKk : cur === 'en' ? e.typeLabelEn : e.typeLabelRu
  }))
})

function submitForm() {
  if (honeypot.value) return // Bot trapped
  if (!formName.value || !formPhone.value) return

  // Demo submission (TODO: backend API endpoint)
  isSubmitted.value = true
  setTimeout(() => {
    formName.value = ''
    formPhone.value = ''
    formEvent.value = ''
    formComments.value = ''
  }, 300)
}

function prefillEvent(title: string) {
  formEvent.value = title
  const formEl = document.getElementById('club-form')
  formEl?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="club-page">
    <!-- Header Hero -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('club.badge') }}</span>
          <h1>{{ $t('club.title') }}</h1>
          <p class="section-subtitle">
            {{ $t('club.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- 4 Club Pillars -->
    <section class="section">
      <div class="container">
        <div class="grid-4">
          <!-- Zone 1: Communication -->
          <div class="card zone-card">
            <div class="zone-icon zone-icon--teal">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="32"
                height="32"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3>{{ $t('club.zone1Title') }}</h3>
            <p>{{ $t('club.zone1Desc') }}</p>
          </div>

          <!-- Zone 2: Education -->
          <div class="card zone-card">
            <div class="zone-icon zone-icon--blue">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="32"
                height="32"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h3>{{ $t('club.zone2Title') }}</h3>
            <p>{{ $t('club.zone2Desc') }}</p>
          </div>

          <!-- Zone 3: Creative -->
          <div class="card zone-card">
            <div class="zone-icon zone-icon--yellow">
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
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line
                  x1="9"
                  y1="9"
                  x2="9.01"
                  y2="9"
                />
                <line
                  x1="15"
                  y1="9"
                  x2="15.01"
                  y2="9"
                />
              </svg>
            </div>
            <h3>{{ $t('club.zone3Title') }}</h3>
            <p>{{ $t('club.zone3Desc') }}</p>
          </div>

          <!-- Zone 4: Career -->
          <div class="card zone-card">
            <div class="zone-icon zone-icon--teal">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="32"
                height="32"
              >
                <rect
                  x="2"
                  y="7"
                  width="20"
                  height="14"
                  rx="2"
                  ry="2"
                />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h3>{{ $t('club.zone4Title') }}</h3>
            <p>{{ $t('club.zone4Desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Schedule / Events Poster -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('club.scheduleTitle') }}</span>
          <h2>{{ $t('club.scheduleTitle') }}</h2>
          <p class="section-subtitle">
            {{ $t('club.scheduleSubtitle') }}
          </p>
        </div>

        <div class="grid-2">
          <div
            v-for="ev in localizedEvents"
            :key="ev.id"
            class="card event-card"
          >
            <div class="event-card__meta">
              <span class="event-tag">{{ ev.typeLabel }}</span>
              <span class="event-datetime">{{ ev.date }} | {{ ev.time }}</span>
            </div>
            <h3>{{ ev.title }}</h3>
            <p>{{ ev.desc }}</p>
            <div class="event-card__loc">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="16"
                height="16"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle
                  cx="12"
                  cy="10"
                  r="3"
                />
              </svg>
              <span>{{ ev.location }}</span>
            </div>
            <button
              type="button"
              class="btn btn-primary btn-sm"
              @click="prefillEvent(ev.title)"
            >
              {{ $t('common.apply') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Booking Form Section -->
    <section
      id="club-form"
      class="section"
    >
      <div
        class="container"
        style="max-width: 680px;"
      >
        <div class="card form-card">
          <div class="form-header">
            <h2>{{ $t('club.formTitle') }}</h2>
            <p>{{ $t('club.formSubtitle') }}</p>
          </div>

          <!-- Success Alert -->
          <div
            v-if="isSubmitted"
            class="alert alert-success"
            role="alert"
          >
            <strong>✓ {{ $t('club.submitSuccess') }}</strong>
          </div>

          <form
            v-else
            @submit.prevent="submitForm"
          >
            <!-- Honeypot -->
            <input
              v-model="honeypot"
              type="text"
              name="company_trap"
              style="display:none;"
              tabindex="-1"
              autocomplete="off"
            >

            <div class="form-group">
              <label for="c-name">{{ $t('club.fieldName') }} *</label>
              <input
                id="c-name"
                v-model="formName"
                type="text"
                required
                placeholder="Иван Иванов"
              >
            </div>

            <div class="form-group">
              <label for="c-phone">{{ $t('club.fieldPhone') }} *</label>
              <input
                id="c-phone"
                v-model="formPhone"
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
              >
            </div>

            <div class="form-group">
              <label for="c-event">{{ $t('club.fieldEvent') }}</label>
              <select
                id="c-event"
                v-model="formEvent"
              >
                <option value="">
                  {{ $t('club.fieldEventPlaceholder') }}
                </option>
                <option
                  v-for="ev in localizedEvents"
                  :key="ev.id"
                  :value="ev.title"
                >
                  {{ ev.title }} ({{ ev.date }})
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="c-comments">{{ $t('club.fieldComments') }}</label>
              <textarea
                id="c-comments"
                v-model="formComments"
                rows="3"
                placeholder="Ваши вопросы..."
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary btn-lg"
              style="width: 100%;"
            >
              {{ $t('club.submitBtn') }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.zone-card {
  display: flex;
  flex-direction: column;
}

.zone-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.zone-icon--teal {
  background: rgba(64, 156, 168, 0.15);
  color: var(--color-secondary, #409CA8);
}
.zone-icon--blue {
  background: rgba(27, 79, 148, 0.12);
  color: var(--color-primary, #1B4F94);
}
.zone-icon--yellow {
  background: rgba(255, 243, 81, 0.35);
  color: var(--color-primary-dark, #1D3159);
}

.event-card {
  display: flex;
  flex-direction: column;
}

.event-card__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.85rem;
  font-size: 0.85rem;
}

.event-tag {
  background: rgba(64, 156, 168, 0.15);
  color: var(--color-secondary, #409CA8);
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
}

.event-datetime {
  color: var(--color-text-muted, #4A5877);
  font-weight: 600;
}

.event-card__loc {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--color-text-muted, #4A5877);
  font-size: 0.85rem;
  margin-bottom: 1.25rem;
}

.event-card button {
  margin-top: auto;
  align-self: flex-start;
}

/* Form */
.form-card {
  padding: clamp(2rem, 4vw, 3rem);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-heading, #1D3159);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 10px;
  background: var(--color-surface, #FFFFFF);
  color: var(--color-text, #13213D);
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--color-primary, #1B4F94);
}

.alert-success {
  background: rgba(46, 125, 50, 0.12);
  border: 1px solid var(--color-success, #2E7D32);
  color: var(--color-success, #2E7D32);
  padding: 1.25rem;
  border-radius: 12px;
  text-align: center;
  font-size: 1.05rem;
}
</style>
