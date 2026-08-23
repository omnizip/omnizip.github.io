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
      <div class="hidden lg:flex items-center gap-1">
        <router-link to="/" class="nav-link" :class="{ 'active': isActiveRoute('/') }">
          Home
        </router-link>

        <NavDropdown label="Ruby" :items="rubyItems" :active="rubyActive" />
        <NavDropdown label="Rust" :items="rustItems" :active="rustActive" />

        <router-link to="/blog" class="nav-link" :class="{ 'active': isActiveRoute('/blog') }">
          Blog
        </router-link>

        <span class="nav-divider" aria-hidden="true" />

        <a
          :href="config.github.organization"
          target="_blank"
          rel="noopener"
          class="nav-link"
        >
          <span class="flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
            GitHub
          </span>
        </a>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <ThemeToggle />

        <!-- Mobile menu button -->
        <button
          class="lg:hidden p-2 rounded-lg text-light-muted dark:text-dark-muted hover:bg-light-surface dark:hover:bg-dark-surface"
          :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
          aria-label="Toggle menu"
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
      <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg">
        <div class="container-wide py-4 flex flex-col gap-1">
          <router-link to="/" class="nav-link" :class="{ 'active': isActiveRoute('/') }" @click="closeMobileMenu">
            Home
          </router-link>
          <router-link to="/blog" class="nav-link" :class="{ 'active': isActiveRoute('/blog') }" @click="closeMobileMenu">
            Blog
          </router-link>

          <div class="mobile-group-label">Ruby</div>
          <template v-for="item in rubyItems" :key="'m-ruby-' + item.label">
            <div v-if="item.divider" class="nav-divider !h-px !w-auto my-1" />
            <router-link v-else-if="item.to" :to="item.to" class="nav-link" @click="closeMobileMenu">
              {{ item.label }}
            </router-link>
            <a v-else :href="item.href" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener' : undefined" class="nav-link" @click="closeMobileMenu">
              {{ item.label }}<span v-if="item.external" class="text-[10px] opacity-60 ml-1">↗</span>
            </a>
          </template>

          <div class="mobile-group-label">Rust</div>
          <template v-for="item in rustItems" :key="'m-rust-' + item.label">
            <div v-if="item.divider" class="nav-divider !h-px !w-auto my-1" />
            <router-link v-else-if="item.to" :to="item.to" class="nav-link" @click="closeMobileMenu">
              {{ item.label }}
            </router-link>
            <a v-else :href="item.href" :target="item.external ? '_blank' : undefined" :rel="item.external ? 'noopener' : undefined" class="nav-link" @click="closeMobileMenu">
              {{ item.label }}<span v-if="item.external" class="text-[10px] opacity-60 ml-1">↗</span>
            </a>
          </template>

          <a
            :href="config.github.organization"
            target="_blank"
            rel="noopener"
            class="nav-link"
          >
            GitHub
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from '../atoms/ThemeToggle.vue'
import Logo from '../atoms/Logo.vue'
import NavDropdown from '../molecules/NavDropdown.vue'
import config from '../../config'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const rubyItems = [
  { label: 'Omnizip', to: '/ruby/omnizip', hint: 'The complete Ruby library' },
  { label: 'Cabriolet', to: '/ruby/cabriolet', hint: 'Microsoft formats' },
  { label: 'Excavate', to: '/ruby/excavate', hint: 'Recursive extraction' },
  { divider: true },
  { label: 'Omnizip Docs', href: config.docs.omnizip, external: true },
  { label: 'Cabriolet Docs', href: config.docs.cabriolet, external: true },
  { label: 'Excavate Docs', href: config.docs.excavate, external: true },
]

const rustItems = [
  { label: 'omnizip-rs', to: '/rust', hint: '18 pure Rust codec crates' },
  { divider: true },
  { label: 'Crates on crates.io', href: config.crates.index, external: true },
  { label: 'API docs on docs.rs', href: config.docsrs.codecs, external: true },
  { label: 'GitHub', href: config.github.rust, external: true },
]

const isActiveRoute = (path) => {
  if (path === '/blog') {
    return route.path === '/blog' || route.path.startsWith('/blog/')
  }
  return route.path === path
}

const rubyActive = computed(() =>
  ['/ruby/omnizip', '/ruby/cabriolet', '/ruby/excavate'].some((p) => route.path.startsWith(p))
)
const rustActive = computed(() => route.path === '/rust')

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

.nav-link {
  @apply px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200;
  @apply text-light-muted dark:text-dark-muted;
  @apply hover:text-light-text dark:hover:text-dark-text;
  @apply hover:bg-light-surface dark:hover:bg-dark-surface;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50;
}

.nav-link.active {
  @apply text-brand-primary bg-brand-primary/10;
}

.nav-divider {
  @apply h-5 w-px mx-2;
  @apply bg-light-border dark:bg-dark-border;
}

.mobile-group-label {
  @apply px-3 pt-4 pb-1 text-xs font-mono font-semibold uppercase tracking-widest;
  @apply text-light-muted dark:text-dark-muted;
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
