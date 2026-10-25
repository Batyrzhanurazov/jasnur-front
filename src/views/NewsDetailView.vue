<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { newsArticles } from '@/data/news'
import type { AppLocale } from '@/locales/types'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

const currentLocale = computed<AppLocale>(() => {
  return (route.params.locale as AppLocale) || (locale.value as AppLocale) || 'ru'
})

const newsId = computed(() => route.params.id as string)

const article = computed(() => {
  const n = newsArticles.find(item => item.id === newsId.value)
  if (!n) return null
  const cur = currentLocale.value
  return {
    id: n.id,
    title: cur === 'kk' ? n.titleKk : cur === 'en' ? n.titleEn : n.titleRu,
    summary: cur === 'kk' ? n.summaryKk : cur === 'en' ? n.summaryEn : n.summaryRu,
    content: cur === 'kk' ? n.contentKk : cur === 'en' ? n.contentEn : n.contentRu,
    date: n.date,
    category: n.category,
    image: n.image
  }
})

useSeo(() => ({
  title: article.value?.title || t('news.title'),
  description: article.value?.summary || t('news.subtitle')
}))

function goBack() {
  router.push(`/${currentLocale.value}/news`)
}
</script>

<template>
  <div class="news-detail-page">
    <div
      v-if="article"
      class="container section"
    >
      <button
        type="button"
        class="btn-back"
        @click="goBack"
      >
        ← {{ $t('common.back') }}
      </button>

      <article class="card news-detail-card">
        <header class="news-detail-header">
          <span class="news-detail-date">{{ $t('news.publishedOn') }} {{ article.date }}</span>
          <h1>{{ article.title }}</h1>
        </header>

        <div class="news-detail-media">
          <img
            :src="article.image"
            :alt="article.title"
            width="800"
            height="440"
            class="news-detail-img"
          >
        </div>

        <div class="news-detail-body">
          <p
            v-for="(para, idx) in article.content.split('\n\n')"
            :key="idx"
            class="article-para"
          >
            {{ para }}
          </p>
        </div>

        <footer class="news-detail-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="goBack"
          >
            ← {{ $t('common.back') }}
          </button>
        </footer>
      </article>
    </div>

    <!-- 404 Fallback -->
    <div
      v-else
      class="container section text-center"
    >
      <h2>Новость не найдена</h2>
      <button
        type="button"
        class="btn btn-primary"
        @click="goBack"
      >
        {{ $t('common.back') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.btn-back {
  background: transparent;
  border: none;
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-primary, #1B4F94);
  cursor: pointer;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn-back:hover {
  text-decoration: underline;
}

.news-detail-card {
  padding: clamp(1.5rem, 4vw, 3.5rem);
  max-width: 860px;
  margin: 0 auto;
}

.news-detail-header {
  margin-bottom: 2rem;
}

.news-detail-date {
  font-size: 0.85rem;
  color: var(--color-secondary, #409CA8);
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.news-detail-header h1 {
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  line-height: 1.3;
}

.news-detail-media {
  margin-bottom: 2rem;
  border-radius: 16px;
  overflow: hidden;
  max-height: 440px;
  background: var(--color-surface-alt, #EDF3FA);
}

.news-detail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-detail-body {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--color-text, #13213D);
}

.article-para {
  margin-bottom: 1.5rem;
}

.news-detail-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border, #E2E8F0);
}
</style>
