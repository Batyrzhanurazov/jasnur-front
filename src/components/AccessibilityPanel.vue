<script setup lang="ts">
import { useAccessibility } from '@/composables/useAccessibility'
import { useTheme } from '@/composables/useTheme'

const {
  fontSize,
  highContrast,
  reducedMotion,
  isPanelOpen,
  setFontSize,
  toggleHighContrast,
  toggleReducedMotion,
  resetAccessibility,
  closePanel
} = useAccessibility()

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <Transition name="panel-fade">
    <div
      v-if="isPanelOpen"
      class="a11y-overlay"
      role="dialog"
      aria-modal="true"
      :aria-label="$t('a11y.title')"
      @click.self="closePanel"
      @keydown.esc="closePanel"
    >
      <div class="a11y-panel">
        <div class="a11y-panel__header">
          <div class="a11y-panel__title-box">
            <svg
              class="a11y-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
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
            <h2>{{ $t('a11y.title') }}</h2>
          </div>
          <button
            type="button"
            class="btn-close"
            :aria-label="$t('common.close')"
            @click="closePanel"
          >
            ✕
          </button>
        </div>

        <div class="a11y-panel__body">
          <!-- Font size -->
          <div class="a11y-group">
            <span class="a11y-group__label">{{ $t('a11y.fontSize') }}</span>
            <div
              class="btn-segmented"
              role="group"
              :aria-label="$t('a11y.fontSize')"
            >
              <button
                type="button"
                :class="{ active: fontSize === 1 }"
                :aria-pressed="fontSize === 1"
                @click="setFontSize(1)"
              >
                A (100%)
              </button>
              <button
                type="button"
                :class="{ active: fontSize === 2 }"
                :aria-pressed="fontSize === 2"
                @click="setFontSize(2)"
              >
                A+ (115%)
              </button>
              <button
                type="button"
                :class="{ active: fontSize === 3 }"
                :aria-pressed="fontSize === 3"
                @click="setFontSize(3)"
              >
                A++ (125%)
              </button>
            </div>
          </div>

          <!-- High contrast -->
          <div class="a11y-group">
            <span class="a11y-group__label">{{ $t('a11y.highContrast') }}</span>
            <button
              type="button"
              class="btn-toggle"
              :class="{ active: highContrast }"
              :aria-pressed="highContrast"
              @click="toggleHighContrast"
            >
              <span class="indicator" />
              {{ highContrast ? $t('a11y.highContrastOn') : $t('a11y.highContrastOff') }}
            </button>
          </div>

          <!-- Color theme -->
          <div class="a11y-group">
            <span class="a11y-group__label">{{ $t('a11y.theme') }}</span>
            <button
              type="button"
              class="btn-toggle"
              :class="{ active: theme === 'dark' }"
              :aria-pressed="theme === 'dark'"
              @click="toggleTheme"
            >
              <span class="indicator" />
              {{ theme === 'dark' ? $t('a11y.themeDark') : $t('a11y.themeLight') }}
            </button>
          </div>

          <!-- Reduced motion -->
          <div class="a11y-group">
            <span class="a11y-group__label">{{ $t('a11y.reducedMotion') }}</span>
            <button
              type="button"
              class="btn-toggle"
              :class="{ active: reducedMotion }"
              :aria-pressed="reducedMotion"
              @click="toggleReducedMotion"
            >
              <span class="indicator" />
              {{ reducedMotion ? $t('a11y.reducedMotionOn') : $t('a11y.reducedMotionOff') }}
            </button>
          </div>
        </div>

        <div class="a11y-panel__footer">
          <button
            type="button"
            class="btn-reset"
            @click="resetAccessibility"
          >
            {{ $t('a11y.reset') }}
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm"
            @click="closePanel"
          >
            {{ $t('common.close') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.a11y-overlay {
  position: fixed;
  inset: 0;
  background: rgba(19, 33, 61, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.a11y-panel {
  background: var(--color-surface, #FFFFFF);
  color: var(--color-text, #13213D);
  border: 2px solid var(--color-secondary, #409CA8);
  border-radius: 20px;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  animation: panelIn 0.25s ease-out;
}

@keyframes panelIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.a11y-panel__header {
  padding: 1.25rem 1.5rem;
  background: var(--color-primary-dark, #1D3159);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.a11y-panel__title-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.a11y-panel__title-box h2 {
  font-size: 1.25rem;
  color: #FFFFFF;
  margin: 0;
}

.a11y-icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent, #FFF351);
}

.btn-close {
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  line-height: 1;
}
.btn-close:hover {
  background: rgba(255, 255, 255, 0.15);
}

.a11y-panel__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.a11y-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.a11y-group__label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-heading, #1D3159);
}

.btn-segmented {
  display: inline-flex;
  background: var(--color-surface-alt, #EDF3FA);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid var(--color-border, #E2E8F0);
}

.btn-segmented button {
  padding: 0.4rem 0.85rem;
  border: none;
  background: transparent;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  color: var(--color-text, #13213D);
  transition: all 0.15s ease;
}

.btn-segmented button.active {
  background: var(--color-primary, #1B4F94);
  color: #FFFFFF;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--color-border, #E2E8F0);
  background: var(--color-surface-alt, #EDF3FA);
  color: var(--color-text, #13213D);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-toggle .indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #A0AEC0;
  transition: background 0.2s ease;
}

.btn-toggle.active {
  background: var(--color-primary, #1B4F94);
  color: #FFFFFF;
  border-color: var(--color-primary, #1B4F94);
}
.btn-toggle.active .indicator {
  background: var(--color-accent, #FFF351);
}

.a11y-panel__footer {
  padding: 1rem 1.5rem;
  background: var(--color-surface-alt, #EDF3FA);
  border-top: 1px solid var(--color-border, #E2E8F0);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-reset {
  background: transparent;
  border: none;
  color: var(--color-text-muted, #4A5877);
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
}
.btn-reset:hover {
  color: var(--color-primary, #1B4F94);
}

.panel-fade-enter-active,
.panel-fade-leave-active {
  transition: opacity 0.2s ease;
}
.panel-fade-enter-from,
.panel-fade-leave-to {
  opacity: 0;
}
</style>
