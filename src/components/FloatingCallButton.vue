<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const videoCallUrl = import.meta.env.VITE_VIDEO_CALL_URL || 'https://wa.me/77472818830'
const contactUrl = import.meta.env.VITE_CONTACT_URL || 'https://wa.me/77472818830'

function toggleMenu() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="floating-widget">
    <!-- Pop-up options -->
    <Transition name="fab-slide">
      <div
        v-if="isOpen"
        class="floating-menu"
        role="menu"
      >
        <a
          :href="videoCallUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="floating-item floating-item--video"
          role="menuitem"
        >
          <span class="icon-bubble">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
              aria-hidden="true"
            >
              <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </span>
          <span class="text">
            <strong>{{ $t('common.videoCall') }}</strong>
            <small>{{ $t('common.emergency247') }}</small>
          </span>
        </a>

        <a
          :href="contactUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="floating-item floating-item--chat"
          role="menuitem"
        >
          <span class="icon-bubble">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
              aria-hidden="true"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
            </svg>
          </span>
          <span class="text">
            <strong>{{ $t('common.contactUs') }}</strong>
            <small>{{ $t('common.phone') }}</small>
          </span>
        </a>
      </div>
    </Transition>

    <!-- Main floating action button -->
    <button
      type="button"
      class="fab-main"
      :class="{ 'fab-main--active': isOpen }"
      :aria-expanded="isOpen"
      :aria-label="$t('common.callToAction')"
      @click="toggleMenu"
    >
      <span class="fab-pulse" />
      <svg
        v-if="!isOpen"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="28"
        height="28"
        aria-hidden="true"
      >
        <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
      <span
        v-else
        class="fab-close"
        aria-hidden="true"
      >✕</span>
    </button>
  </div>
</template>

<style scoped>
.floating-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}

@media (max-width: 640px) {
  .floating-widget {
    bottom: 1.25rem;
    right: 1.25rem;
  }
}

.fab-main {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-accent, #FFF351);
  color: var(--color-primary-dark, #1D3159);
  border: 3px solid #FFFFFF;
  box-shadow: 0 8px 24px rgba(19, 33, 61, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fab-main:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 32px rgba(19, 33, 61, 0.45);
}

.fab-main--active {
  background: var(--color-primary-dark, #1D3159);
  color: #FFFFFF;
}

.fab-pulse {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 3px solid var(--color-accent, #FFF351);
  animation: pulse 2s infinite;
  pointer-events: none;
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 1; }
  50% { transform: scale(1.25); opacity: 0; }
  100% { transform: scale(0.95); opacity: 0; }
}

.fab-close {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
}

.floating-menu {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.floating-item {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 1.25rem 0.75rem 0.85rem;
  background: var(--color-surface, #FFFFFF);
  color: var(--color-text, #13213D) !important;
  border-radius: 16px;
  border: 1px solid var(--color-border, #E2E8F0);
  box-shadow: 0 10px 28px rgba(19, 33, 61, 0.2);
  text-decoration: none !important;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.floating-item:hover {
  transform: translateX(-6px);
  border-color: var(--color-secondary, #409CA8);
  box-shadow: 0 14px 34px rgba(19, 33, 61, 0.25);
}

.icon-bubble {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.floating-item--video .icon-bubble {
  background: var(--color-primary, #1B4F94);
  color: #FFFFFF;
}

.floating-item--chat .icon-bubble {
  background: #25D366;
  color: #FFFFFF;
}

.floating-item .text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.floating-item strong {
  font-size: 0.95rem;
  color: var(--color-heading, #1D3159);
}

.floating-item small {
  font-size: 0.75rem;
  color: var(--color-text-muted, #4A5877);
  font-weight: 500;
}

.fab-slide-enter-active,
.fab-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.fab-slide-enter-from,
.fab-slide-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.95);
}
</style>
