import { ref, onMounted, getCurrentInstance } from 'vue'

export type ThemeMode = 'light' | 'dark'

const currentTheme = ref<ThemeMode>('light')

export function useTheme() {
  function setTheme(theme: ThemeMode) {
    currentTheme.value = theme
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
      try {
        localStorage.setItem('zn_theme', theme)
      } catch {
        // ignore localStorage errors
      }
    }
  }

  function toggleTheme() {
    setTheme(currentTheme.value === 'dark' ? 'light' : 'dark')
  }

  function initTheme() {
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem('zn_theme') as ThemeMode | null
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved)
        return
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark')
        return
      }
    } catch {
      // fallback
    }
    setTheme('light')
  }

  if (getCurrentInstance()) {
    onMounted(() => {
      initTheme()
    })
  }

  return {
    theme: currentTheme,
    setTheme,
    toggleTheme,
    initTheme
  }
}
