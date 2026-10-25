import { ref } from 'vue'

export type FontSizeLevel = 1 | 2 | 3

const fontSize = ref<FontSizeLevel>(1)
const highContrast = ref(false)
const reducedMotion = ref(false)
const isPanelOpen = ref(false)

export function useAccessibility() {
  function applySettings() {
    if (typeof document === 'undefined') return
    const el = document.documentElement

    el.setAttribute('data-font-size', String(fontSize.value))

    if (highContrast.value) {
      el.setAttribute('data-contrast', 'high')
    } else {
      el.removeAttribute('data-contrast')
    }

    if (reducedMotion.value) {
      el.setAttribute('data-reduced-motion', 'true')
    } else {
      el.removeAttribute('data-reduced-motion')
    }

    try {
      localStorage.setItem('zn_a11y', JSON.stringify({
        fontSize: fontSize.value,
        highContrast: highContrast.value,
        reducedMotion: reducedMotion.value
      }))
    } catch {
      // storage quota or unavailable
    }
  }

  function initAccessibility() {
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem('zn_a11y')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.fontSize >= 1 && parsed.fontSize <= 3) fontSize.value = parsed.fontSize
        if (typeof parsed.highContrast === 'boolean') highContrast.value = parsed.highContrast
        if (typeof parsed.reducedMotion === 'boolean') reducedMotion.value = parsed.reducedMotion
      } else {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          reducedMotion.value = true
        }
        if (window.matchMedia('(prefers-contrast: more)').matches) {
          highContrast.value = true
        }
      }
    } catch {
      // ignore JSON parse error
    }
    applySettings()
  }

  function setFontSize(level: FontSizeLevel) {
    fontSize.value = level
    applySettings()
  }

  function toggleHighContrast() {
    highContrast.value = !highContrast.value
    applySettings()
  }

  function toggleReducedMotion() {
    reducedMotion.value = !reducedMotion.value
    applySettings()
  }

  function resetAccessibility() {
    fontSize.value = 1
    highContrast.value = false
    reducedMotion.value = false
    applySettings()
  }

  function togglePanel() {
    isPanelOpen.value = !isPanelOpen.value
  }

  function closePanel() {
    isPanelOpen.value = false
  }

  return {
    fontSize,
    highContrast,
    reducedMotion,
    isPanelOpen,
    setFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    resetAccessibility,
    togglePanel,
    closePanel,
    initAccessibility
  }
}
