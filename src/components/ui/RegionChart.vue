<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { regionalStatistics, nationalOverview } from '@/data/statistics'

const { locale } = useI18n()

const viewMode = ref<'chart' | 'table'>('chart')
const sortBy = ref<'count' | 'name'>('count')
const sortOrder = ref<'desc' | 'asc'>('desc')

const maxCount = computed(() => {
  return Math.max(...regionalStatistics.map(r => r.hearingImpaired))
})

const localizedRegions = computed(() => {
  const cur = locale.value
  return regionalStatistics.map(r => ({
    id: r.id,
    name: cur === 'kk' ? r.nameKk : cur === 'en' ? r.nameEn : r.nameRu,
    count: r.hearingImpaired
  }))
})

const sortedRegions = computed(() => {
  const list = [...localizedRegions.value]
  list.sort((a, b) => {
    if (sortBy.value === 'count') {
      return sortOrder.value === 'desc' ? b.count - a.count : a.count - b.count
    } else {
      return sortOrder.value === 'desc'
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name)
    }
  })
  return list
})

function toggleSort(type: 'count' | 'name') {
  if (sortBy.value === type) {
    sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
  } else {
    sortBy.value = type
    sortOrder.value = 'desc'
  }
}
</script>

<template>
  <div class="stat-widget">
    <!-- National Overview Cards -->
    <div class="stat-widget__overview">
      <div class="overview-card overview-card--primary">
        <span class="overview-num">{{ nationalOverview.totalHearingImpaired.toLocaleString() }}</span>
        <span class="overview-label">{{ $t('about.totalKazakhstan') }}</span>
      </div>
      <div class="overview-card">
        <span class="overview-num">{{ nationalOverview.totalAdultsDisabled.toLocaleString() }}</span>
        <span class="overview-label">{{ $t('about.totalDisabilityAdults') }}</span>
      </div>
      <div class="overview-card">
        <span class="overview-num">{{ nationalOverview.totalChildrenDisabled.toLocaleString() }}</span>
        <span class="overview-label">{{ $t('about.totalDisabilityChildren') }}</span>
      </div>
    </div>

    <!-- Controls -->
    <div class="stat-widget__controls">
      <div
        class="btn-group"
        role="group"
        aria-label="View toggle"
      >
        <button
          type="button"
          :class="{ active: viewMode === 'chart' }"
          @click="viewMode = 'chart'"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <path d="M18 20V10M12 20V4M6 20v-6" />
          </svg>
          Диаграмма
        </button>
        <button
          type="button"
          :class="{ active: viewMode === 'table' }"
          @click="viewMode = 'table'"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18" />
          </svg>
          Таблица
        </button>
      </div>

      <div class="sort-actions">
        <button
          type="button"
          class="btn-sort"
          @click="toggleSort('count')"
        >
          По количеству {{ sortBy === 'count' ? (sortOrder === 'desc' ? '↓' : '↑') : '' }}
        </button>
        <button
          type="button"
          class="btn-sort"
          @click="toggleSort('name')"
        >
          По названию {{ sortBy === 'name' ? (sortOrder === 'desc' ? '↓' : '↑') : '' }}
        </button>
      </div>
    </div>

    <!-- Chart View -->
    <div
      v-if="viewMode === 'chart'"
      class="stat-chart"
      role="region"
      aria-label="Bar chart of regional hearing disability"
    >
      <div
        v-for="reg in sortedRegions"
        :key="reg.id"
        class="chart-row"
      >
        <div class="chart-row__label">
          {{ reg.name }}
        </div>
        <div class="chart-row__bar-track">
          <div
            class="chart-row__bar"
            :style="{ width: `${(reg.count / maxCount) * 100}%` }"
          >
            <span class="bar-value">{{ reg.count.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Table View -->
    <div
      v-else
      class="stat-table-wrap"
    >
      <table class="stat-table">
        <thead>
          <tr>
            <th
              scope="col"
              @click="toggleSort('name')"
            >
              {{ $t('about.regionCol') }}
            </th>
            <th
              scope="col"
              class="text-right"
              @click="toggleSort('count')"
            >
              {{ $t('about.countCol') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(reg, index) in sortedRegions"
            :key="reg.id"
          >
            <td>
              <span class="row-num">{{ index + 1 }}.</span>
              {{ reg.name }}
            </td>
            <td class="text-right count-cell">
              <strong>{{ reg.count.toLocaleString() }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer with source note -->
    <div class="stat-widget__footer">
      <p class="source-note">
        <strong>{{ $t('about.statsSourceNote') }}</strong>
      </p>
      <a
        href="https://inva.gov.kz/ru/highcharts"
        target="_blank"
        rel="noopener noreferrer"
        class="source-link"
      >
        Перейти к первоисточнику (inva.gov.kz) ↗
      </a>
    </div>
  </div>
</template>

<style scoped>
.stat-widget {
  background: var(--color-surface, #FFFFFF);
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 20px;
  padding: clamp(1.25rem, 3vw, 2.5rem);
  box-shadow: 0 10px 30px rgba(19, 33, 61, 0.05);
}

.stat-widget__overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.overview-card {
  padding: 1.25rem;
  border-radius: 14px;
  background: var(--color-surface-alt, #EDF3FA);
  border: 1px solid var(--color-border, #E2E8F0);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.overview-card--primary {
  background: var(--color-primary-dark, #1D3159);
  color: #FFFFFF;
}

.overview-num {
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: 1.85rem;
  color: var(--color-primary, #1B4F94);
  line-height: 1.1;
}

.overview-card--primary .overview-num {
  color: var(--color-accent, #FFF351);
}

.overview-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted, #4A5877);
}

.overview-card--primary .overview-label {
  color: #FFFFFF;
}

.stat-widget__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border, #E2E8F0);
}

.btn-group {
  display: inline-flex;
  background: var(--color-surface-alt, #EDF3FA);
  padding: 3px;
  border-radius: 10px;
}

.btn-group button {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  border: none;
  background: transparent;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text, #13213D);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.btn-group button.active {
  background: var(--color-primary, #1B4F94);
  color: #FFFFFF;
}

.sort-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sort {
  padding: 0.45rem 0.85rem;
  background: var(--color-surface-alt, #EDF3FA);
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-heading, #1D3159);
  cursor: pointer;
}
.btn-sort:hover {
  border-color: var(--color-secondary, #409CA8);
}

/* Chart */
.stat-chart {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chart-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 680px) {
  .chart-row {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}

.chart-row__label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text, #13213D);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chart-row__bar-track {
  background: var(--color-surface-alt, #EDF3FA);
  border-radius: 999px;
  height: 28px;
  overflow: hidden;
  position: relative;
}

.chart-row__bar {
  background: linear-gradient(90deg, var(--color-primary, #1B4F94), var(--color-secondary, #409CA8));
  height: 100%;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.85rem;
  min-width: 48px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.bar-value {
  color: #FFFFFF;
  font-size: 0.8rem;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Table */
.stat-table-wrap {
  overflow-x: auto;
}

.stat-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.stat-table th,
.stat-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--color-border, #E2E8F0);
  font-size: 0.95rem;
}

.stat-table th {
  background: var(--color-surface-alt, #EDF3FA);
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 700;
  color: var(--color-heading, #1D3159);
  cursor: pointer;
}

.text-right {
  text-align: right;
}

.row-num {
  color: var(--color-text-muted, #4A5877);
  margin-right: 0.5rem;
  font-size: 0.85rem;
}

.count-cell {
  color: var(--color-primary, #1B4F94);
  font-size: 1.05rem;
}

.stat-widget__footer {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border, #E2E8F0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
  color: var(--color-text-muted, #4A5877);
}

.source-link {
  color: var(--color-primary, #1B4F94);
  font-weight: 600;
}
</style>
