<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  value: number | string
  label: string
  prefix?: string
  suffix?: string
}>()

const isLongValue = computed(() => String(props.value).length > 5)

const displayedValue = ref<number | string>(
  typeof props.value === 'number'
    ? (props.value > 1000 ? props.value - 30 : 0)
    : props.value
)
const rootEl = ref<HTMLElement | null>(null)
let animated = false

function animateCount() {
  if (typeof props.value !== 'number' || animated) return
  animated = true

  const target = props.value
  const startVal = target > 1000 ? target - 30 : 0
  const duration = 1400
  const start = performance.now()

  function step(now: number) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // easeOutQuad
    const eased = progress * (2 - progress)
    const current = Math.round(startVal + (target - startVal) * eased)
    displayedValue.value = current

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      displayedValue.value = target
    }
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window && rootEl.value) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        animateCount()
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(rootEl.value)
  } else {
    displayedValue.value = props.value
  }
})
</script>

<template>
  <div
    ref="rootEl"
    class="stat-counter"
  >
    <div
      class="stat-counter__number"
      :class="{ 'stat-counter__number--compact': isLongValue }"
    >
      <span
        v-if="prefix"
        class="prefix"
      >{{ prefix }}</span>
      <span class="value">{{ displayedValue }}</span>
      <span
        v-if="suffix"
        class="suffix"
      >{{ suffix }}</span>
    </div>
    <div class="stat-counter__label">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>
.stat-counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem;
  background: var(--color-surface, #FFFFFF);
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(19, 33, 61, 0.05);
  position: relative;
  overflow: hidden;
  min-width: 0;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.stat-counter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-secondary, #409CA8), var(--color-accent, #FFF351));
}

.stat-counter:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgba(19, 33, 61, 0.1);
}

.stat-counter__number {
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 800;
  font-size: clamp(1.85rem, 2.8vw, 2.75rem);
  color: var(--color-primary, #1B4F94);
  line-height: 1.1;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  max-width: 100%;
}

.stat-counter__number--compact {
  font-size: clamp(1.2rem, 1.8vw, 1.65rem);
  letter-spacing: -0.02em;
}

.suffix, .prefix {
  color: var(--color-secondary, #409CA8);
  font-size: 0.8em;
}

.stat-counter__label {
  margin-top: 0.65rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-muted, #4A5877);
  line-height: 1.4;
  max-width: 220px;
}
</style>
