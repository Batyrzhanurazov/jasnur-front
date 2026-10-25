import { createI18n } from 'vue-i18n'
import ru from './ru'
import kk from './kk'
import en from './en'
import type { MessageSchema, AppLocale } from './types'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './types'

export type { MessageSchema, AppLocale }
export { SUPPORTED_LOCALES, DEFAULT_LOCALE }

/**
 * Определение языка:
 * 1. URL pathname префикс (/ru, /kk, /en)
 * 2. Параметр ?lang=...
 * 3. Сохраненный выбор в localStorage ('zn_locale')
 * 4. Язык браузера (navigator.languages)
 * 5. По умолчанию -> 'ru'
 */
export function detectInitialLocale(): AppLocale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  // 1. Проверка префикса в URL
  const pathMatch = window.location.pathname.match(/^\/(ru|kk|en)(\/|$)/)
  if (pathMatch && pathMatch[1] && (SUPPORTED_LOCALES as readonly string[]).includes(pathMatch[1])) {
    const loc = pathMatch[1] as AppLocale
    try {
      localStorage.setItem('zn_locale', loc)
    } catch {
      // ignore
    }
    return loc
  }

  // 2. Проверка GET-параметра ?lang=
  try {
    const searchParams = new URLSearchParams(window.location.search)
    const langParam = searchParams.get('lang')?.toLowerCase()
    if (langParam && (SUPPORTED_LOCALES as readonly string[]).includes(langParam)) {
      const loc = langParam as AppLocale
      localStorage.setItem('zn_locale', loc)
      return loc
    }
  } catch {
    // ignore
  }

  // 3. Сохраненное значение в localStorage
  try {
    const saved = localStorage.getItem('zn_locale')
    if (saved && (SUPPORTED_LOCALES as readonly string[]).includes(saved)) {
      return saved as AppLocale
    }
  } catch {
    // ignore
  }

  // 4. Язык браузера
  if (typeof navigator !== 'undefined') {
    const langs: string[] = []
    if (Array.isArray(navigator.languages)) {
      langs.push(...navigator.languages)
    }
    if (navigator.language) {
      langs.push(navigator.language)
    }
    for (const l of langs) {
      const lower = l.toLowerCase()
      if (lower.startsWith('kk') || lower.startsWith('kz')) return 'kk'
      if (lower.startsWith('en')) return 'en'
      if (lower.startsWith('ru')) return 'ru'
    }
  }

  return DEFAULT_LOCALE
}

export const initialLocale: AppLocale = detectInitialLocale()

export const i18n = createI18n<[MessageSchema], AppLocale>({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: DEFAULT_LOCALE,
  globalInjection: true,
  messages: {
    ru,
    kk,
    en
  }
})

export default i18n
