import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales/i18n'
import themePlugin from './theme'
import { useAccessibility } from './composables/useAccessibility'
import { useTheme } from './composables/useTheme'

import './assets/global.css'

const app = createApp(App)

app.use(themePlugin)
app.use(router)
app.use(i18n)

// Initialize accessibility and theme on client
if (typeof window !== 'undefined') {
  const { initAccessibility } = useAccessibility()
  const { initTheme } = useTheme()
  initAccessibility()
  initTheme()
  console.info('[ZhasNur] App running (deploy test OK)')
}

app.mount('#app')
