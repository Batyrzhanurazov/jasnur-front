<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'

const { t } = useI18n()

useSeo(() => ({
  title: t('contacts.title'),
  description: t('contacts.subtitle')
}))

const formName = ref('')
const formEmail = ref('')
const formPhone = ref('')
const formPref = ref('whatsapp')
const formMessage = ref('')
const honeypot = ref('')
const isSubmitted = ref(false)
const isLoading = ref(false)

function submitFeedback() {
  if (honeypot.value) return // Anti-bot trap
  if (!formName.value || !formPhone.value || !formMessage.value) return

  isLoading.value = true

  // Simulated backend API dispatch
  setTimeout(() => {
    isLoading.value = false
    isSubmitted.value = true
    setTimeout(() => {
      formName.value = ''
      formEmail.value = ''
      formPhone.value = ''
      formMessage.value = ''
    }, 400)
  }, 600)
}
</script>

<template>
  <div class="contacts-page">
    <!-- Header Hero -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('contacts.title') }}</span>
          <h1>{{ $t('contacts.title') }}</h1>
          <p class="section-subtitle">
            {{ $t('contacts.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content: Direct Contacts & Feedback Form -->
    <section class="section">
      <div class="container">
        <div class="contacts-grid">
          <!-- Col 1: Direct Channels & Hours -->
          <div class="direct-channels">
            <div class="card channel-card">
              <h2>{{ $t('contacts.directTitle') }}</h2>

              <ul class="contact-methods">
                <!-- WhatsApp / Phone -->
                <li class="contact-method-item">
                  <div class="method-icon method-icon--green">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="24"
                      height="24"
                    >
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                    </svg>
                  </div>
                  <div>
                    <span class="method-label">{{ $t('contacts.phoneLabel') }}</span>
                    <a
                      href="https://wa.me/77759711546"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="method-value"
                    >
                      +7 775 971 15 46
                    </a>
                  </div>
                </li>

                <!-- Email -->
                <li class="contact-method-item">
                  <div class="method-icon method-icon--blue">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      width="24"
                      height="24"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <span class="method-label">{{ $t('contacts.emailLabel') }}</span>
                    <a
                      href="mailto:dispetcherskaya.astana@gmail.com"
                      class="method-value"
                    >
                      dispetcherskaya.astana@gmail.com
                    </a>
                  </div>
                </li>

                <!-- Instagram -->
                <li class="contact-method-item">
                  <div class="method-icon method-icon--accent">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      width="24"
                      height="24"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line
                        x1="17.5"
                        y1="6.5"
                        x2="17.51"
                        y2="6.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <span class="method-label">{{ $t('contacts.instagramLabel') }}</span>
                    <a
                      href="https://instagram.com/dispetcherskaya_sluzhba"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="method-value"
                    >
                      @dispetcherskaya_sluzhba
                    </a>
                  </div>
                </li>

                <!-- City & Address -->
                <li class="contact-method-item">
                  <div class="method-icon method-icon--teal">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      width="24"
                      height="24"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                      />
                    </svg>
                  </div>
                  <div>
                    <span class="method-label">{{ $t('contacts.cityLabel') }}</span>
                    <span class="method-value">{{ $t('contacts.cityValue') }}</span>
                    <small class="todo-hint">{{ $t('contacts.addressValue') }}</small>
                  </div>
                </li>
              </ul>

              <!-- Work hours card -->
              <div class="work-hours-badge">
                <span class="badge-title">{{ $t('contacts.workHoursLabel') }}</span>
                <p>{{ $t('contacts.workHoursValue') }}</p>
              </div>
            </div>
          </div>

          <!-- Col 2: Feedback Form -->
          <div class="card feedback-card">
            <h2>{{ $t('contacts.formTitle') }}</h2>
            <p class="form-desc">
              {{ $t('contacts.formSubtitle') }}
            </p>

            <div
              v-if="isSubmitted"
              class="alert-success"
              role="alert"
            >
              <h3>✓ {{ $t('contacts.successMessage') }}</h3>
            </div>

            <form
              v-else
              @submit.prevent="submitFeedback"
            >
              <!-- Honeypot field -->
              <input
                v-model="honeypot"
                type="text"
                name="user_trap"
                style="display:none;"
                tabindex="-1"
                autocomplete="off"
              >

              <div class="form-group">
                <label for="f-name">{{ $t('contacts.nameField') }} *</label>
                <input
                  id="f-name"
                  v-model="formName"
                  type="text"
                  required
                  :placeholder="$t('contacts.namePlaceholder')"
                >
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="f-phone">{{ $t('contacts.phoneField') }} *</label>
                  <input
                    id="f-phone"
                    v-model="formPhone"
                    type="tel"
                    required
                    :placeholder="$t('contacts.phonePlaceholder')"
                  >
                </div>
                <div class="form-group">
                  <label for="f-email">{{ $t('contacts.emailField') }}</label>
                  <input
                    id="f-email"
                    v-model="formEmail"
                    type="email"
                    :placeholder="$t('contacts.emailPlaceholder')"
                  >
                </div>
              </div>

              <div class="form-group">
                <label>{{ $t('contacts.preferredField') }}</label>
                <div class="radio-group">
                  <label class="radio-label">
                    <input
                      v-model="formPref"
                      type="radio"
                      value="whatsapp"
                    >
                    <span>{{ $t('contacts.prefWhatsApp') }}</span>
                  </label>
                  <label class="radio-label">
                    <input
                      v-model="formPref"
                      type="radio"
                      value="video"
                    >
                    <span>{{ $t('contacts.prefVideo') }}</span>
                  </label>
                  <label class="radio-label">
                    <input
                      v-model="formPref"
                      type="radio"
                      value="email"
                    >
                    <span>{{ $t('contacts.prefEmail') }}</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label for="f-msg">{{ $t('contacts.messageField') }} *</label>
                <textarea
                  id="f-msg"
                  v-model="formMessage"
                  rows="4"
                  required
                  :placeholder="$t('contacts.messagePlaceholder')"
                />
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-lg"
                style="width: 100%;"
                :disabled="isLoading"
              >
                {{ isLoading ? $t('common.loading') : $t('contacts.submitBtn') }}
              </button>

              <p class="form-privacy-note">
                <small>{{ $t('contacts.submitNotice') }}</small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- OpenStreetMap (Astana, Kazakhstan - no API keys required) -->
    <section class="section section--alt map-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">OpenStreetMap</span>
          <h2>{{ $t('contacts.mapTitle') }}</h2>
          <p class="section-subtitle">
            г. Астана, Республика Казахстан
          </p>
        </div>

        <div class="map-wrapper">
          <iframe
            title="Карта г. Астана на OpenStreetMap"
            width="100%"
            height="450"
            style="border:0; border-radius: 18px;"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=71.3600%2C51.1000%2C71.5200%2C51.2000&amp;layer=mapnik&amp;marker=51.1440%2C71.4230"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 2.5rem;
  align-items: start;
}

@media (max-width: 900px) {
  .contacts-grid {
    grid-template-columns: 1fr;
  }
}

.channel-card {
  padding: 2rem;
}

.channel-card h2 {
  margin-bottom: 1.75rem;
  font-size: 1.4rem;
}

.contact-methods {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-method-item {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.method-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.method-icon--green {
  background: rgba(37, 211, 102, 0.15);
  color: #25D366;
}
.method-icon--blue {
  background: rgba(27, 79, 148, 0.12);
  color: var(--color-primary, #1B4F94);
}
.method-icon--accent {
  background: rgba(255, 243, 81, 0.35);
  color: var(--color-primary-dark, #1D3159);
}
.method-icon--teal {
  background: rgba(64, 156, 168, 0.15);
  color: var(--color-secondary, #409CA8);
}

.method-label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--color-text-muted, #4A5877);
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.method-value {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-heading, #1D3159);
}

.todo-hint {
  display: block;
  color: var(--color-secondary, #409CA8);
  font-style: italic;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.work-hours-badge {
  margin-top: 2rem;
  padding: 1.25rem;
  background: var(--color-surface-alt, #EDF3FA);
  border-left: 4px solid var(--color-danger, #C62828);
  border-radius: 0 10px 10px 0;
}

.badge-title {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-danger, #C62828);
  margin-bottom: 0.25rem;
}

.work-hours-badge p {
  margin: 0;
  font-weight: 600;
  color: var(--color-heading, #1D3159);
}

/* Feedback card */
.feedback-card {
  padding: clamp(2rem, 4vw, 3rem);
}

.feedback-card h2 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.form-desc {
  color: var(--color-text-muted, #4A5877);
  margin-bottom: 1.75rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
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
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 10px;
  background: var(--color-surface, #FFFFFF);
  color: var(--color-text, #13213D);
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--color-primary, #1B4F94);
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  cursor: pointer;
}

.form-privacy-note {
  text-align: center;
  color: var(--color-text-muted, #4A5877);
  margin-top: 1rem;
  margin-bottom: 0;
}

.alert-success {
  background: rgba(46, 125, 50, 0.12);
  border: 1px solid var(--color-success, #2E7D32);
  color: var(--color-success, #2E7D32);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.map-wrapper {
  box-shadow: 0 12px 36px rgba(19, 33, 61, 0.08);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--color-border, #E2E8F0);
}
</style>
