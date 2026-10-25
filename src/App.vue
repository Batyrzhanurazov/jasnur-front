<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import AccessibilityPanel from '@/components/AccessibilityPanel.vue'
import FloatingCallButton from '@/components/FloatingCallButton.vue'
</script>

<template>
  <div class="app-layout">
    <Header />
    <main
      id="main-content"
      class="main-content"
      tabindex="-1"
    >
      <router-view :key="$route.fullPath" />
    </main>
    <Footer />
    <AccessibilityPanel />
    <FloatingCallButton />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1 0 auto;
  outline: none;
}
</style>
