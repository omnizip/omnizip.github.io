<template>
  <header class="header" :class="{ 'header-scrolled': isScrolled }">
    <nav class="container-wide flex items-center justify-between h-16 sm:h-20">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 group">
        <div class="w-24 sm:w-32">
          <Logo class="w-full h-auto" />
        </div>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-1">
        <NavLink to="/" :as="RouterLink" :active="isActiveRoute('/')">
          Home
        </NavLink>
        <NavLink :href="config.docs.omnizip">
          Omnizip Docs
        </NavLink>
        <NavLink :href="config.docs.cabriolet">
          Cabriolet Docs
        </NavLink>
        <NavLink
          :href="config.github.organization"
          target="_blank"
          rel="noopener"
        >
          <span class="flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
            GitHub
          </span>
        </NavLink>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <ThemeToggle />

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-light-surface dark:hover:bg-dark-surface"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Navigation -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg">
        <div class="container-wide py-4 flex flex-col gap-1">
          <NavLink to="/" :as="RouterLink" :active="isActiveRoute('/')" @click="closeMobileMenu">
            Home
          </NavLink>
          <NavLink :href="config.docs.omnizip" @click="closeMobileMenu">
            Omnizip Docs
          </NavLink>
          <NavLink :href="config.docs.cabriolet" @click="closeMobileMenu">
            Cabriolet Docs
          </NavLink>
          <NavLink
            :href="config.github.organization"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </NavLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ThemeToggle from '../atoms/ThemeToggle.vue'
import NavLink from '../molecules/NavLink.vue'
import Logo from '../atoms/Logo.vue'
import config from '../../config'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const isActiveRoute = (path) => {
  return route.path === path
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  @apply sticky top-0 z-50;
  @apply bg-light-bg/80 dark:bg-dark-bg/80;
  @apply backdrop-blur-lg;
  @apply border-b border-transparent;
  @apply transition-all duration-300;
}

.header-scrolled {
  @apply border-light-border dark:border-dark-border;
  @apply shadow-sm;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
