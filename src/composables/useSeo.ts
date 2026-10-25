import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { AppLocale } from '@/locales/types'

export interface SeoOptions {
  title?: string
  description?: string
  image?: string
}

export function useSeo(options?: () => SeoOptions) {
  const route = useRoute()
  const { locale, t } = useI18n()

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://zhasnur.kz'

  watchEffect(() => {
    if (typeof document === 'undefined') return

    const opt = options ? options() : {}
    const curLocale = (route.params.locale as AppLocale) || (locale.value as AppLocale) || 'ru'

    // Update <html lang="...">
    document.documentElement.setAttribute('lang', curLocale)

    // Build title
    const orgName = t('common.orgName')
    const pageTitle = opt.title ? `${opt.title} | ${orgName}` : `${orgName} | ${t('hero.title')}`
    document.title = pageTitle

    // Meta description
    const desc = opt.description || t('seo.defaultDesc')
    let descMeta = document.querySelector('meta[name="description"]')
    if (!descMeta) {
      descMeta = document.createElement('meta')
      descMeta.setAttribute('name', 'description')
      document.head.appendChild(descMeta)
    }
    descMeta.setAttribute('content', desc)

    // Path without locale
    const rawPath = route.path.replace(/^\/(ru|kk|en)/, '') || ''
    const currentUrl = `${siteUrl}/${curLocale}${rawPath}`

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', currentUrl)

    // Hreflang links
    const locales: AppLocale[] = ['ru', 'kk', 'en']
    locales.forEach((l) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${l}"]`)
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'alternate')
        link.setAttribute('hreflang', l)
        document.head.appendChild(link)
      }
      link.setAttribute('href', `${siteUrl}/${l}${rawPath}`)
    })

    // x-default hreflang
    let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]')
    if (!xDefault) {
      xDefault = document.createElement('link')
      xDefault.setAttribute('rel', 'alternate')
      xDefault.setAttribute('hreflang', 'x-default')
      document.head.appendChild(xDefault)
    }
    xDefault.setAttribute('href', `${siteUrl}/ru${rawPath}`)

    // Open Graph tags
    const ogTags: Record<string, string> = {
      'og:title': pageTitle,
      'og:description': desc,
      'og:url': currentUrl,
      'og:image': opt.image || `${siteUrl}/assets/og-image.jpg`,
      'og:site_name': orgName,
      'og:locale': curLocale === 'ru' ? 'ru_RU' : curLocale === 'kk' ? 'kk_KZ' : 'en_US'
    }

    for (const [property, content] of Object.entries(ogTags)) {
      let meta = document.querySelector(`meta[property="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // JSON-LD Organization schema
    let jsonLd = document.getElementById('zn-jsonld') as HTMLScriptElement | null
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = 'zn-jsonld'
      jsonLd.type = 'application/ld+json'
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'NGO',
      'name': orgName,
      'alternateName': 'ZhasNur Association of the Deaf',
      'url': siteUrl,
      'logo': `${siteUrl}/assets/logo.png`,
      'foundingDate': '2008-08-08',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Astana',
        'addressCountry': 'KZ'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+7-747-281-88-30',
        'contactType': 'Emergency video interpretation & dispatch',
        'email': 'dispetcherskaya.astana@gmail.com',
        'availableLanguage': ['Russian', 'Kazakh', 'Sign Language']
      }
    })
  })
}
