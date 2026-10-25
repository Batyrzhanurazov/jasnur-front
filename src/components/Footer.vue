<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { AppLocale } from '@/locales/types'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const currentLocale = computed<AppLocale>(() => {
  return (route.params.locale as AppLocale) || (locale.value as AppLocale) || 'ru'
})

function switchLocale(newLocale: AppLocale) {
  if (newLocale === currentLocale.value) return
  locale.value = newLocale
  try {
    localStorage.setItem('zn_locale', newLocale)
  } catch {
    // ignore
  }
  const pathWithoutLocale = route.path.replace(/^\/(ru|kk|en)/, '')
  router.push({ path: `/${newLocale}${pathWithoutLocale || ''}`, query: route.query, hash: route.hash })
}
</script>

<template>
  <footer class="footer section--dark">
    <!-- SVG Pattern from intersecting arcs -->
    <div
      class="bg-arcs-pattern"
      aria-hidden="true"
    />

    <div class="container footer__container">
      <div class="footer__grid">
        <!-- Col 1: Brand & Description -->
        <div class="footer__col footer__col--brand">
          <router-link
            :to="`/${currentLocale}`"
            class="footer__brand"
          >
            <img
              src="/assets/emblem.webp"
              alt=""
              width="56"
              height="56"
              class="footer__logo-img"
            >
            <div>
              <div class="footer__brand-title">
                {{ $t('common.orgName') }}
              </div>
              <div class="footer__brand-sub">
                {{ $t('common.projectTitle') }}
              </div>
            </div>
          </router-link>
          <p class="footer__desc">
            {{ $t('footer.orgDesc') }}
          </p>
          <div class="footer__a11y-badge">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>

        <!-- Col 2: Navigation Links -->
        <div class="footer__col">
          <h3 class="footer__col-title">
            {{ $t('footer.menuTitle') }}
          </h3>
          <ul class="footer__links">
            <li>
              <router-link :to="`/${currentLocale}`">
                {{ $t('nav.home') }}
              </router-link>
            </li>
            <li>
              <router-link :to="`/${currentLocale}/about`">
                {{ $t('nav.about') }}
              </router-link>
            </li>
            <li>
              <router-link :to="`/${currentLocale}/dispatcher`">
                {{ $t('nav.dispatcher') }}
              </router-link>
            </li>
            <li>
              <router-link :to="`/${currentLocale}/club`">
                {{ $t('nav.club') }}
              </router-link>
            </li>
            <li>
              <router-link :to="`/${currentLocale}/studio`">
                {{ $t('nav.studio') }}
              </router-link>
            </li>
            <li>
              <router-link :to="`/${currentLocale}/projects`">
                {{ $t('nav.projects') }}
              </router-link>
            </li>
            <li>
              <router-link :to="`/${currentLocale}/news`">
                {{ $t('nav.news') }}
              </router-link>
            </li>
            <li>
              <router-link :to="`/${currentLocale}/contacts`">
                {{ $t('nav.contacts') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Col 3: Direct Contacts & Emergency -->
        <div class="footer__col">
          <h3 class="footer__col-title">
            {{ $t('footer.contactsTitle') }}
          </h3>
          <ul class="footer__contact-list">
            <li>
              <span class="label">{{ $t('contacts.phoneLabel') }}:</span>
              <a
                href="https://wa.me/77472818830"
                target="_blank"
                rel="noopener"
              >{{ $t('common.phone') }}</a>
            </li>
            <li>
              <span class="label">{{ $t('contacts.emailLabel') }}:</span>
              <a href="mailto:dispetcherskaya.astana@gmail.com">{{ $t('common.email') }}</a>
            </li>
            <li>
              <span class="label">{{ $t('contacts.instagramLabel') }}:</span>
              <a
                href="https://instagram.com/dispetcherskaya_sluzhba"
                target="_blank"
                rel="noopener"
              >{{ $t('common.instagram') }}</a>
            </li>
            <li>
              <span class="label">{{ $t('contacts.cityLabel') }}:</span>
              <span>{{ $t('contacts.cityValue') }}</span>
            </li>
          </ul>

          <div class="footer__emergency-card">
            <span class="emergency-badge">{{ $t('common.emergency247') }}</span>
            <p>{{ $t('contacts.workHoursValue') }}</p>
          </div>
        </div>

        <!-- Col 4: Language Switcher & Mission -->
        <div class="footer__col">
          <h3 class="footer__col-title">
            {{ $t('a11y.theme') }} & {{ $t('nav.home') }}
          </h3>
          <div
            class="lang-switch lang-switch--footer"
            role="group"
            aria-label="Language selection"
          >
            <button
              type="button"
              class="lang-btn"
              :class="{ active: currentLocale === 'ru' }"
              @click="switchLocale('ru')"
            >
              Русский
            </button>
            <button
              type="button"
              class="lang-btn"
              :class="{ active: currentLocale === 'kk' }"
              @click="switchLocale('kk')"
            >
              Қазақша
            </button>
            <button
              type="button"
              class="lang-btn"
              :class="{ active: currentLocale === 'en' }"
              @click="switchLocale('en')"
            >
              English
            </button>
          </div>
          <p class="footer__footnote">
            {{ $t('footer.madeWithCare') }}
          </p>
        </div>
      </div>

      <div class="footer__bottom">
        <p>{{ $t('footer.copyright') }}</p>
        <p class="footer__address-todo">
          {{ $t('common.addressPlaceholder') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  background-color: var(--color-section-dark-bg, #1D3159);
  color: var(--color-section-dark-text, #FFFFFF);
  padding-top: 4.5rem;
  padding-bottom: 2rem;
  margin-top: auto;
  border-top: 4px solid var(--color-accent, #FFF351);
  overflow: hidden;
}

.footer__container {
  position: relative;
  z-index: 1;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 3rem 2rem;
  margin-bottom: 3.5rem;
}

.footer__col--brand {
  grid-column: span 1;
}
@media (min-width: 900px) {
  .footer__grid {
    grid-template-columns: 1.4fr 1fr 1.2fr 1fr;
  }
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #FFFFFF !important;
  text-decoration: none !important;
  margin-bottom: 1.25rem;
}

.footer__logo-img {
  width: 52px;
  height: 52px;
  object-fit: contain;
  border-radius: 10px;
}

.footer__brand-title {
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  color: #FFFFFF;
  line-height: 1.2;
}

.footer__brand-sub {
  font-size: 0.8rem;
  color: var(--color-accent, #FFF351);
  font-weight: 600;
}

.footer__desc {
  font-size: 0.9rem;
  color: var(--color-section-dark-muted, #B8CAE6);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.footer__a11y-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(64, 156, 168, 0.2);
  border: 1px solid var(--color-secondary, #409CA8);
  color: #FFFFFF;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.footer__col-title {
  font-size: 1.1rem;
  color: #FFFFFF;
  margin-bottom: 1.25rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer__col-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 36px;
  height: 3px;
  background: var(--color-accent, #FFF351);
  border-radius: 2px;
}

.footer__links,
.footer__contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer__links a {
  color: var(--color-section-dark-muted, #B8CAE6) !important;
  font-size: 0.925rem;
  text-decoration: none !important;
  transition: all 0.15s ease;
  display: inline-block;
}

.footer__links a:hover {
  color: var(--color-accent, #FFF351) !important;
  transform: translateX(4px);
}

.footer__contact-list li {
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.footer__contact-list .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--color-accent, #FFF351);
  font-weight: 700;
  letter-spacing: 0.05em;
}

.footer__contact-list a {
  color: #FFFFFF !important;
  text-decoration: none !important;
}
.footer__contact-list a:hover {
  text-decoration: underline !important;
}

.footer__emergency-card {
  margin-top: 1.25rem;
  background: rgba(255, 255, 255, 0.06);
  border-left: 3px solid var(--color-accent, #FFF351);
  padding: 0.75rem 1rem;
  border-radius: 0 8px 8px 0;
}

.emergency-badge {
  display: inline-block;
  background: var(--color-danger, #C62828);
  color: #FFFFFF;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.35rem;
  text-transform: uppercase;
}

.footer__emergency-card p {
  font-size: 0.85rem;
  margin: 0;
  color: var(--color-section-dark-muted, #B8CAE6);
}

.lang-switch--footer {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.08);
  padding: 6px;
  border-radius: 12px;
  border-color: rgba(255, 255, 255, 0.15);
}

.lang-switch--footer .lang-btn {
  color: #FFFFFF;
  text-align: left;
  padding: 0.5rem 0.85rem;
  font-size: 0.9rem;
}

.lang-switch--footer .lang-btn.active {
  background: var(--color-secondary, #409CA8);
  color: #FFFFFF;
}

.footer__footnote {
  margin-top: 1.25rem;
  font-size: 0.8rem;
  color: var(--color-section-dark-muted, #B8CAE6);
  line-height: 1.5;
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--color-section-dark-muted, #B8CAE6);
}

.footer__address-todo {
  font-style: italic;
  font-size: 0.8rem;
}
</style>
