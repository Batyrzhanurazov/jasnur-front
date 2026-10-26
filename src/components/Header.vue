<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAccessibility } from '@/composables/useAccessibility'
import type { AppLocale } from '@/locales/types'

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()
const { togglePanel } = useAccessibility()

const isMenuOpen = ref(false)

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

  // Preserve sub-path
  const pathWithoutLocale = route.path.replace(/^\/(ru|kk|en)/, '')
  const targetPath = `/${newLocale}${pathWithoutLocale || ''}`
  router.push({ path: targetPath, query: route.query, hash: route.hash })
  isMenuOpen.value = false
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

</script>

<template>
  <header
    class="header"
    :class="{ 'header--menu-open': isMenuOpen }"
  >
    <div class="container header__container">
      <!-- Logo & Organization Name -->
      <router-link
        :to="`/${currentLocale}`"
        class="header__brand"
        :aria-label="$t('common.orgName')"
        @click="closeMenu"
      >
        <img
          src="/assets/emblem.webp"
          alt=""
          width="48"
          height="48"
          class="header__logo-img"
        >
        <div class="header__brand-text">
          <span class="header__brand-title">{{ $t('common.orgShortName') }}</span>
          <span class="header__brand-sub">{{ $t('common.projectTitle') }}</span>
        </div>
      </router-link>

      <!-- Desktop Navigation Menu -->
      <nav
        class="header__nav"
        :aria-label="$t('nav.home')"
      >
        <ul class="nav-list">
          <li>
            <router-link
              :to="`/${currentLocale}`"
              exact-active-class="active"
            >
              {{ $t('nav.home') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="`/${currentLocale}/about`"
              active-class="active"
            >
              {{ $t('nav.about') }}
            </router-link>
          </li>
          <li>
            <router-link
              :to="`/${currentLocale}/dispatcher`"
              active-class="active"
            >
              {{ $t('nav.dispatcher') }}
            </router-link>
          </li>

          <li>
            <router-link
              :to="`/${currentLocale}/projects`"
              active-class="active"
            >
              {{ $t('nav.projects') }}
            </router-link>
          </li>

          <li>
            <router-link
              :to="`/${currentLocale}/contacts`"
              active-class="active"
            >
              {{ $t('nav.contacts') }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Right side controls: A11y, Lang, Call CTA, Hamburger -->
      <div class="header__actions">
        <!-- Accessibility button -->
        <button
          type="button"
          class="btn-a11y"
          :title="$t('a11y.buttonTitle')"
          :aria-label="$t('a11y.buttonTitle')"
          @click="togglePanel"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="icon"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
            />
            <path d="M12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
          </svg>
          <span class="btn-a11y__text">{{ $t('a11y.shortTitle') }}</span>
        </button>

        <!-- Language switcher -->
        <div
          class="lang-switch"
          role="group"
          aria-label="Language selection"
        >
          <button
            type="button"
            class="lang-btn"
            :class="{ active: currentLocale === 'ru' }"
            :aria-pressed="currentLocale === 'ru'"
            @click="switchLocale('ru')"
          >
            RU
          </button>
          <button
            type="button"
            class="lang-btn"
            :class="{ active: currentLocale === 'kk' }"
            :aria-pressed="currentLocale === 'kk'"
            @click="switchLocale('kk')"
          >
            ҚАЗ
          </button>
          <button
            type="button"
            class="lang-btn"
            :class="{ active: currentLocale === 'en' }"
            :aria-pressed="currentLocale === 'en'"
            @click="switchLocale('en')"
          >
            EN
          </button>
        </div>


        <!-- Mobile hamburger -->
        <button
          type="button"
          class="burger-btn"
          :class="{ active: isMenuOpen }"
          aria-label="Toggle navigation menu"
          :aria-expanded="isMenuOpen"
          @click="toggleMenu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <Transition name="drawer">
      <div
        v-if="isMenuOpen"
        class="mobile-drawer"
      >
        <nav
          class="mobile-drawer__nav"
          :aria-label="$t('nav.home')"
        >
          <ul class="mobile-nav-list">
            <li>
              <router-link
                :to="`/${currentLocale}`"
                exact-active-class="active"
                @click="closeMenu"
              >
                {{ $t('nav.home') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="`/${currentLocale}/about`"
                active-class="active"
                @click="closeMenu"
              >
                {{ $t('nav.about') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="`/${currentLocale}/dispatcher`"
                active-class="active"
                @click="closeMenu"
              >
                {{ $t('nav.dispatcher') }}
              </router-link>
            </li>

            <li>
              <router-link
                :to="`/${currentLocale}/projects`"
                active-class="active"
                @click="closeMenu"
              >
                {{ $t('nav.projects') }}
              </router-link>
            </li>

            <li>
              <router-link
                :to="`/${currentLocale}/contacts`"
                active-class="active"
                @click="closeMenu"
              >
                {{ $t('nav.contacts') }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="mobile-drawer__actions">
          <!-- Mobile Lang Buttons -->
          <div
            class="lang-switch"
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
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--color-surface, #FFFFFF);
  border-bottom: 1px solid var(--color-border, #E2E8F0);
  box-shadow: 0 4px 20px rgba(19, 33, 61, 0.05);
  transition: all 0.25s ease;
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  gap: clamp(0.5rem, 1.5vw, 1.5rem);
  max-width: 1440px;
  width: 100%;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none !important;
  color: var(--color-heading, #1D3159);
  flex-shrink: 0;
}

.header__logo-img {
  width: 44px;
  height: 44px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 8px;
}

.header__brand-text {
  display: flex;
  flex-direction: column;
}

.header__brand-title {
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
  color: var(--color-primary, #1B4F94);
  line-height: 1.2;
}

.header__brand-sub {
  font-size: 0.725rem;
  color: var(--color-secondary, #409CA8);
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
}

.header__nav {
  display: none;
  margin-left: auto;
  margin-right: 1.25rem;
}

@media (min-width: 1240px) {
  .header__nav {
    display: flex;
    align-items: center;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  list-style: none;
  gap: clamp(0.2rem, 0.5vw, 0.65rem);
  margin: 0;
  padding: 0;
  flex-wrap: nowrap;
}

.nav-list li {
  flex-shrink: 0;
}

.nav-list a {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  font-size: 0.885rem;
  font-weight: 600;
  color: var(--color-text, #13213D);
  text-decoration: none !important;
  padding: 0.45rem 0.6rem;
  border-radius: 8px;
  border-bottom: 2px solid transparent;
  transition: all 0.15s ease;
}

.nav-list a:hover {
  color: var(--color-primary, #1B4F94);
  background: rgba(27, 79, 148, 0.05);
}

.nav-list a.active {
  color: var(--color-primary, #1B4F94);
  font-weight: 700;
  background: rgba(27, 79, 148, 0.08);
  border-bottom: 2px solid var(--color-accent, #FFF351);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  margin-left: auto;
}

@media (min-width: 1240px) {
  .header__actions {
    margin-left: 0;
  }
}

.btn-a11y {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.65rem;
  background: var(--color-surface-alt, #EDF3FA);
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 10px;
  color: var(--color-heading, #1D3159);
  font-size: 0.825rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.btn-a11y .icon {
  width: 18px;
  height: 18px;
  color: var(--color-secondary, #409CA8);
  flex-shrink: 0;
}

.btn-a11y:hover {
  background: var(--color-primary-50, #EDF3FA);
  border-color: var(--color-secondary, #409CA8);
}

.btn-a11y__text {
  display: none;
}
@media (min-width: 1360px) {
  .btn-a11y__text {
    display: inline;
  }
}

.lang-switch {
  display: inline-flex;
  flex-shrink: 0;
  background: var(--color-surface-alt, #EDF3FA);
  padding: 2px;
  border-radius: 9px;
  border: 1px solid var(--color-border, #E2E8F0);
}

.lang-btn {
  padding: 0.35rem 0.55rem;
  border: none;
  background: transparent;
  font-weight: 700;
  font-size: 0.785rem;
  color: var(--color-text-muted, #4A5877);
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.lang-btn.active {
  background: var(--color-primary, #1B4F94);
  color: #FFFFFF;
}


.burger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 38px;
  height: 38px;
  padding: 8px 6px;
  background: var(--color-surface-alt, #EDF3FA);
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 10px;
  cursor: pointer;
  flex-shrink: 0;
}
@media (min-width: 1240px) {
  .burger-btn {
    display: none;
  }
}

.burger-btn span {
  width: 100%;
  height: 2px;
  background: var(--color-heading, #1D3159);
  border-radius: 2px;
  transition: all 0.25s ease;
}

.burger-btn.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.burger-btn.active span:nth-child(2) {
  opacity: 0;
}
.burger-btn.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile drawer */
.mobile-drawer {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  background: var(--color-surface, #FFFFFF);
  border-bottom: 2px solid var(--color-secondary, #409CA8);
  box-shadow: 0 16px 32px rgba(19, 33, 61, 0.15);
  padding: 1.5rem 1rem 2rem 1rem;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
}

.mobile-nav-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-list a {
  display: block;
  font-size: 1.15rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  color: var(--color-text, #13213D);
  text-decoration: none !important;
}

.mobile-nav-list a.active {
  background: var(--color-surface-alt, #EDF3FA);
  color: var(--color-primary, #1B4F94);
  font-weight: 700;
}

.mobile-drawer__actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
