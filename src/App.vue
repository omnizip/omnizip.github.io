<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300">
    <TheHeader />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'
import TheHeader from './components/organisms/TheHeader.vue'
import TheFooter from './components/organisms/TheFooter.vue'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
