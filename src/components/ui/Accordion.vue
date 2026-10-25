<script setup lang="ts">
import { ref } from 'vue'

export interface AccordionItem {
  id: string
  title: string
  content: string
}

const props = defineProps<{
  items: AccordionItem[]
}>()

const openItems = ref<Set<string>>(new Set([props.items[0]?.id || '']))

function toggle(id: string) {
  if (openItems.value.has(id)) {
    openItems.value.delete(id)
  } else {
    openItems.value.add(id)
  }
}

function isOpen(id: string) {
  return openItems.value.has(id)
}
</script>

<template>
  <div class="accordion">
    <div
      v-for="item in items"
      :key="item.id"
      class="accordion-item"
      :class="{ 'accordion-item--open': isOpen(item.id) }"
    >
      <h3>
        <button
          :id="`acc-btn-${item.id}`"
          type="button"
          class="accordion-header"
          :aria-expanded="isOpen(item.id)"
          :aria-controls="`acc-panel-${item.id}`"
          @click="toggle(item.id)"
        >
          <span class="title">{{ item.title }}</span>
          <span
            class="chevron"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        :id="`acc-panel-${item.id}`"
        class="accordion-panel"
        role="region"
        :aria-labelledby="`acc-btn-${item.id}`"
        :hidden="!isOpen(item.id)"
      >
        <div class="panel-content">
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.accordion-item {
  background: var(--color-surface, #FFFFFF);
  border: 1px solid var(--color-border, #E2E8F0);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.accordion-item--open {
  border-color: var(--color-secondary, #409CA8);
  box-shadow: 0 6px 20px rgba(19, 33, 61, 0.06);
}

.accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: transparent;
  border: none;
  text-align: left;
  font-family: 'Montserrat Variable', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--color-heading, #1D3159);
  cursor: pointer;
  transition: background 0.15s ease;
}

.accordion-header:hover {
  background: var(--color-surface-alt, #EDF3FA);
}

.chevron {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-secondary, #409CA8);
  transition: transform 0.25s ease;
}

.chevron svg {
  width: 20px;
  height: 20px;
}

.accordion-item--open .chevron {
  transform: rotate(180deg);
  color: var(--color-primary, #1B4F94);
}

.panel-content {
  padding: 0 1.5rem 1.25rem 1.5rem;
  color: var(--color-text, #13213D);
  line-height: 1.6;
}

.panel-content p {
  margin: 0;
}
</style>
