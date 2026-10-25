<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'
import { newsArticles } from '@/data/news'
import type { AppLocale } from '@/locales/types'

const route = useRoute()
const { locale, t } = useI18n()

const currentLocale = computed<AppLocale>(() => {
  return (route.params.locale as AppLocale) || (locale.value as AppLocale) || 'ru'
})

useSeo(() => ({
  title: t('news.title'),
  description: t('news.subtitle')
}))

const activeCategory = ref<string>('all')

const localizedNews = computed(() => {
  const cur = currentLocale.value
  return newsArticles.map(n => ({
    id: n.id,
    title: cur === 'kk' ? n.titleKk : cur === 'en' ? n.titleEn : n.titleRu,
    summary: cur === 'kk' ? n.summaryKk : cur === 'en' ? n.summaryEn : n.summaryRu,
    date: n.date,
    category: n.category,
    image: n.image
  }))
})

const filteredNews = computed(() => {
  if (activeCategory.value === 'all') return localizedNews.value
  return localizedNews.value.filter(n => n.category === activeCategory.value)
})

function categoryName(cat: string) {
  if (cat === 'education') return t('news.categoryEducation')
  if (cat === 'finance') return t('news.categoryFinance')
  if (cat === 'partnership') return t('news.categoryPartnership')
  if (cat === 'digital') return t('news.categoryDigital')
  return cat
}
</script>

<template>
  <div class="news-page">
    <!-- Header Hero -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('news.title') }}</span>
          <h1>{{ $t('news.title') }}</h1>
          <p class="section-subtitle">
            {{ $t('news.subtitle') }}
          </p>
        </div>

        <!-- Filters -->
        <div
          class="news-filters"
          role="tablist"
        >
          <button
            type="button"
            :class="{ active: activeCategory === 'all' }"
            @click="activeCategory = 'all'"
          >
            {{ $t('news.categoryAll') }}
          </button>
          <button
            type="button"
            :class="{ active: activeCategory === 'finance' }"
            @click="activeCategory = 'finance'"
          >
            {{ $t('news.categoryFinance') }}
          </button>
          <button
            type="button"
            :class="{ active: activeCategory === 'education' }"
            @click="activeCategory = 'education'"
          >
            {{ $t('news.categoryEducation') }}
          </button>
          <button
            type="button"
            :class="{ active: activeCategory === 'partnership' }"
            @click="activeCategory = 'partnership'"
          >
            {{ $t('news.categoryPartnership') }}
          </button>
          <button
            type="button"
            :class="{ active: activeCategory === 'digital' }"
            @click="activeCategory = 'digital'"
          >
            {{ $t('news.categoryDigital') }}
          </button>
        </div>
      </div>
    </section>

    <!-- News Grid -->
    <section class="section">
      <div class="container">
        <div class="grid-2">
          <article
            v-for="item in filteredNews"
            :key="item.id"
            class="card news-card"
          >
            <div class="news-img-wrap">
              <img
                :src="item.image"
                :alt="item.title"
                loading="lazy"
                width="400"
                height="220"
              >
              <span class="news-cat-badge">{{ categoryName(item.category) }}</span>
            </div>
            <div class="news-card__body">
              <span class="news-date">{{ $t('news.publishedOn') }} {{ item.date }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.summary }}</p>
              <router-link
                :to="`/${currentLocale}/news/${item.id}`"
                class="card-link"
              >
                {{ $t('news.readFull') }} →
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.news-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2rem;
}

.news-filters button {
  padding: 0.5rem 1.25rem;
  background: var(--color-surface, #FFFFFF);
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-heading, #1D3159);
  cursor: pointer;
  transition: all 0.15s ease;
}

.news-filters button.active {
  background: var(--color-primary, #1B4F94);
  color: #FFFFFF;
  border-color: var(--color-primary, #1B4F94);
}

.news-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.news-img-wrap {
  position: relative;
  height: 220px;
  background: var(--color-surface-alt, #EDF3FA);
}

.news-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-cat-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--color-primary-dark, #1D3159);
  color: #FFFFFF;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}

.news-card__body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.news-date {
  font-size: 0.8rem;
  color: var(--color-text-muted, #4A5877);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.news-card__body h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.35;
}

.card-link {
  margin-top: auto;
  padding-top: 1rem;
  font-weight: 700;
  color: var(--color-primary, #1B4F94);
}
</style>
