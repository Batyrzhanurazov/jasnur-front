<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'

const { t } = useI18n()

useSeo(() => ({
  title: t('studio.title'),
  description: t('studio.subtitle')
}))

interface StudioVideo {
  id: string
  titleRu: string
  titleKk: string
  titleEn: string
  category: 'mchs' | 'laws' | 'services' | 'education' | 'books'
  duration: string
  image: string
  videoUrl?: string
}

const activeCategory = ref<string>('all')
const activeModalVideo = ref<StudioVideo | null>(null)

const videos: StudioVideo[] = [
  {
    id: 'vid-1',
    titleRu: 'Предупреждение МЧС: Правила поведения при паводках и штормовом ветре',
    titleKk: 'ТЖМ ескертуі: Су тасқыны мен дауылды жел кезіндегі қауіпсіздік ережелері',
    titleEn: 'Emergency Alert: Flood and Severe Storm Safety Guidelines',
    category: 'mchs',
    duration: '04:15',
    image: '/assets/photos/studio-set-480.webp'
  },
  {
    id: 'vid-2',
    titleRu: 'Портал aleumet.egov.kz: Как заказать сурдоперевод и технические средства',
    titleKk: 'aleumet.egov.kz порталы: Сурдоаударма мен оңалту құралдарына қалай тапсырыс беруге болады',
    titleEn: 'Aleumet.egov.kz: Ordering Sign Language Interpretation and Assistive Devices',
    category: 'services',
    duration: '06:30',
    image: '/assets/photos/operator-signing-480.webp'
  },
  {
    id: 'vid-3',
    titleRu: 'Разбор закона о социальной защите лиц с инвалидностью в Казахстане',
    titleKk: 'Қазақстандағы мүгедектігі бар жандарды әлеуметтік қорғау заңын талдау',
    titleEn: 'Disability Rights & Social Welfare Legislation in Kazakhstan Explained',
    category: 'laws',
    duration: '08:45',
    image: '/assets/photos/studio-camera-480.webp'
  },
  {
    id: 'vid-4',
    titleRu: 'Финансовая грамотность: Как распознать телефонных и интернет-мошенников',
    titleKk: 'Қаржылық сауаттылық: Телефон және интернет алаяқтарын қалай тануға болады',
    titleEn: 'Financial Literacy: Recognizing Phone and Cyber Scams',
    category: 'education',
    duration: '05:20',
    image: '/assets/photos/seminar-480.webp'
  },
  {
    id: 'vid-5',
    titleRu: 'Казахские народные сказки с переводом на жестовый язык для детей',
    titleKk: 'Балаларға арналған ым тіліндегі қазақ халық ертегілері',
    titleEn: 'Kazakh Folktales in Sign Language for Children',
    category: 'books',
    duration: '09:10',
    image: '/assets/photos/sign-dialogue-480.webp'
  },
  {
    id: 'vid-6',
    titleRu: 'Оформление ЭЦП и подача заявок в ЦОН: видеоинструкция',
    titleKk: 'ЭЦП кілтін рәсімдеу және ХҚКО-ға өтініш беру: бейненұсқаулық',
    titleEn: 'Step-by-step: Obtaining Digital Signature and PSC Applications',
    category: 'services',
    duration: '04:50',
    image: '/assets/photos/hands-480.webp'
  }
]

const filteredVideos = computed(() => {
  if (activeCategory.value === 'all') return videos
  return videos.filter(v => v.category === activeCategory.value)
})

function openVideoModal(video: StudioVideo) {
  activeModalVideo.value = video
}

function closeVideoModal() {
  activeModalVideo.value = null
}
</script>

<template>
  <div class="studio-page">
    <!-- Header Hero -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('studio.badge') }}</span>
          <h1>{{ $t('studio.title') }}</h1>
          <p class="section-subtitle">
            {{ $t('studio.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <!-- 5 Core Topic Areas -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('studio.topicsTitle') }}</span>
          <h2>{{ $t('studio.topicsTitle') }}</h2>
        </div>

        <div class="grid-3">
          <!-- 1: News & Laws -->
          <div class="card topic-card">
            <span class="topic-num">01</span>
            <h3>{{ $t('studio.topic1Title') }}</h3>
            <p>{{ $t('studio.topic1Desc') }}</p>
          </div>

          <!-- 2: MCHS -->
          <div class="card topic-card topic-card--danger">
            <span class="topic-num">02</span>
            <h3>{{ $t('studio.topic2Title') }}</h3>
            <p>{{ $t('studio.topic2Desc') }}</p>
          </div>

          <!-- 3: Services & Housing -->
          <div class="card topic-card">
            <span class="topic-num">03</span>
            <h3>{{ $t('studio.topic3Title') }}</h3>
            <p>{{ $t('studio.topic3Desc') }}</p>
          </div>

          <!-- 4: Education & Law -->
          <div class="card topic-card">
            <span class="topic-num">04</span>
            <h3>{{ $t('studio.topic4Title') }}</h3>
            <p>{{ $t('studio.topic4Desc') }}</p>
          </div>

          <!-- 5: Literature & Textbooks -->
          <div class="card topic-card topic-card--accent">
            <span class="topic-num">05</span>
            <h3>{{ $t('studio.topic5Title') }}</h3>
            <p>{{ $t('studio.topic5Desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Distribution Channels -->
    <section class="section section--dark">
      <div
        class="bg-arcs-pattern"
        aria-hidden="true"
      />
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('studio.channelsTitle') }}</span>
          <h2>{{ $t('studio.channelsTitle') }}</h2>
        </div>

        <div class="grid-4">
          <div class="channel-card">
            <div class="channel-icon">
              Instagram
            </div>
            <h4>{{ $t('studio.channelSocial') }}</h4>
          </div>
          <div class="channel-card">
            <div class="channel-icon">
              YouTube
            </div>
            <h4>{{ $t('studio.channelYoutube') }}</h4>
          </div>
          <div class="channel-card">
            <div class="channel-icon">
              WhatsApp
            </div>
            <h4>{{ $t('studio.channelMessengers') }}</h4>
          </div>
          <div class="channel-card">
            <div class="channel-icon">
              Web
            </div>
            <h4>{{ $t('studio.channelWebsite') }}</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Gallery with Filter -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{ $t('studio.galleryTitle') }}</span>
          <h2>{{ $t('studio.galleryTitle') }}</h2>
          <p class="section-subtitle">
            {{ $t('studio.gallerySubtitle') }}
          </p>
        </div>

        <!-- Filter tabs -->
        <div
          class="gallery-filters"
          role="tablist"
        >
          <button
            type="button"
            :class="{ active: activeCategory === 'all' }"
            @click="activeCategory = 'all'"
          >
            {{ $t('common.all') }}
          </button>
          <button
            type="button"
            :class="{ active: activeCategory === 'mchs' }"
            @click="activeCategory = 'mchs'"
          >
            МЧС / ТЖМ
          </button>
          <button
            type="button"
            :class="{ active: activeCategory === 'services' }"
            @click="activeCategory = 'services'"
          >
            Госуслуги
          </button>
          <button
            type="button"
            :class="{ active: activeCategory === 'laws' }"
            @click="activeCategory = 'laws'"
          >
            Законы
          </button>
          <button
            type="button"
            :class="{ active: activeCategory === 'education' }"
            @click="activeCategory = 'education'"
          >
            Обучение
          </button>
          <button
            type="button"
            :class="{ active: activeCategory === 'books' }"
            @click="activeCategory = 'books'"
          >
            Литература
          </button>
        </div>

        <!-- Video Cards Grid -->
        <div class="grid-3">
          <article
            v-for="v in filteredVideos"
            :key="v.id"
            class="card video-card"
          >
            <div
              class="video-thumb"
              @click="openVideoModal(v)"
            >
              <img
                :src="v.image"
                :alt="v.titleRu"
                loading="lazy"
                width="360"
                height="210"
              >
              <span class="video-duration">{{ v.duration }}</span>
              <button
                type="button"
                class="play-btn"
                aria-label="Play video"
              >
                ▶
              </button>
            </div>
            <div class="video-body">
              <span class="video-tag">Жестовый перевод + Субтитры</span>
              <h3>{{ v.titleRu }}</h3>
              <button
                type="button"
                class="btn btn-outline btn-sm"
                @click="openVideoModal(v)"
              >
                {{ $t('common.watchVideo') }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Video Modal Player (Keyboard accessible, privacy-enhanced placeholder) -->
    <Transition name="modal-fade">
      <div
        v-if="activeModalVideo"
        class="video-modal-overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="activeModalVideo.titleRu"
        @click.self="closeVideoModal"
        @keydown.esc="closeVideoModal"
      >
        <div class="video-modal-box">
          <div class="video-modal-header">
            <h3>{{ activeModalVideo.titleRu }}</h3>
            <button
              type="button"
              class="btn-close"
              :aria-label="$t('common.close')"
              @click="closeVideoModal"
            >
              ✕
            </button>
          </div>
          <div class="video-modal-player">
            <!-- Accessible video placeholder with sign language notice -->
            <div class="player-placeholder">
              <img
                :src="activeModalVideo.image"
                alt=""
                class="player-bg"
              >
              <div class="player-overlay">
                <div class="sign-avatar-badge">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                  >
                    <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
                  </svg>
                  <span>Сурдопереводчик в кадре</span>
                </div>
                <p class="player-notice">
                  {{ $t('studio.signLangNote') }}
                </p>
                <div class="player-controls-demo">
                  <span class="ctrl-btn">◀ 10s</span>
                  <span class="ctrl-btn play">▶ Воспроизведение</span>
                  <span class="ctrl-btn">10s ▶</span>
                  <span class="ctrl-btn cc">CC [RU/KK]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.topic-card {
  display: flex;
  flex-direction: column;
}

.topic-num {
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 1.75rem;
  color: var(--color-primary, #1B4F94);
  margin-bottom: 0.5rem;
}

.topic-card--danger {
  border-left: 4px solid var(--color-danger, #C62828);
}
.topic-card--danger .topic-num {
  color: var(--color-danger, #C62828);
}

.topic-card--accent {
  border-left: 4px solid var(--color-accent, #FFF351);
}

.channel-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 1.5rem;
  text-align: center;
}

.channel-icon {
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  color: var(--color-accent, #FFF351);
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
}

.channel-card h4 {
  color: #FFFFFF;
  font-size: 1rem;
  margin: 0;
}

/* Gallery filters */
.gallery-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.gallery-filters button {
  padding: 0.5rem 1.25rem;
  background: var(--color-surface-alt, #EDF3FA);
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-text, #13213D);
  cursor: pointer;
  transition: all 0.15s ease;
}

.gallery-filters button.active {
  background: var(--color-primary, #1B4F94);
  color: #FFFFFF;
  border-color: var(--color-primary, #1B4F94);
}

/* Video card */
.video-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.video-thumb {
  position: relative;
  height: 200px;
  cursor: pointer;
  background: var(--color-surface-alt, #EDF3FA);
  overflow: hidden;
}

.video-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.video-card:hover .video-thumb img {
  transform: scale(1.05);
}

.video-duration {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  background: rgba(0, 0, 0, 0.8);
  color: #FFFFFF;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--color-accent, #FFF351);
  color: var(--color-primary-dark, #1D3159);
  border: none;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
}

.video-card:hover .play-btn {
  transform: translate(-50%, -50%) scale(1.15);
}

.video-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.video-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-secondary, #409CA8);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.video-body h3 {
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
  line-height: 1.35;
}

.video-body button {
  margin-top: auto;
  align-self: flex-start;
}

/* Modal */
.video-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(19, 33, 61, 0.8);
  backdrop-filter: blur(6px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.video-modal-box {
  background: var(--color-surface, #FFFFFF);
  border-radius: 20px;
  max-width: 760px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
}

.video-modal-header {
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-primary-dark, #1D3159);
  color: #FFFFFF;
}

.video-modal-header h3 {
  color: #FFFFFF;
  font-size: 1.1rem;
  margin: 0;
}

.btn-close {
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-size: 1.5rem;
  cursor: pointer;
}

.player-placeholder {
  position: relative;
  aspect-ratio: 16/9;
  background: #000000;
  overflow: hidden;
}

.player-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.player-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  text-align: center;
  color: #FFFFFF;
}

.sign-avatar-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(64, 156, 168, 0.9);
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
}

.player-notice {
  font-size: 1rem;
  max-width: 500px;
}

.player-controls-demo {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.ctrl-btn {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.ctrl-btn.play {
  background: var(--color-accent, #FFF351);
  color: #000000;
}

.ctrl-btn.cc {
  background: var(--color-secondary, #409CA8);
}
</style>
