<template>
  <footer class="footer section-padding border-t border-light-border dark:border-dark-border">
    <div class="container-wide">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <!-- Brand -->
        <div class="md:col-span-2">
          <router-link to="/" class="inline-block mb-4">
            <div class="w-32">
              <Logo class="w-full h-auto" />
            </div>
          </router-link>
          <p class="text-light-muted dark:text-dark-muted text-sm max-w-md">
            Pure Ruby compression libraries with zero native dependencies.
            Works everywhere Ruby runs - JRuby, TruffleRuby, and all platforms.
          </p>
        </div>

        <!-- Products -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-light-text dark:text-dark-text mb-4">
            Products
          </h4>
          <ul class="space-y-2">
            <li>
              <a :href="config.docs.omnizip" class="text-sm text-light-muted dark:text-dark-muted hover:text-brand-primary transition-colors">
                Omnizip
              </a>
            </li>
            <li>
              <a :href="config.docs.cabriolet" class="text-sm text-light-muted dark:text-dark-muted hover:text-brand-primary transition-colors">
                Cabriolet
              </a>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-light-text dark:text-dark-text mb-4">
            Resources
          </h4>
          <ul class="space-y-2">
            <li>
              <a :href="config.github.organization" target="_blank" rel="noopener" class="text-sm text-light-muted dark:text-dark-muted hover:text-brand-primary transition-colors">
                GitHub
              </a>
            </li>
            <li>
              <a :href="config.rubygems.omnizip" target="_blank" rel="noopener" class="text-sm text-light-muted dark:text-dark-muted hover:text-brand-primary transition-colors">
                RubyGems
              </a>
            </li>
            <li>
              <a :href="config.github.omnizip + '/issues'" target="_blank" rel="noopener" class="text-sm text-light-muted dark:text-dark-muted hover:text-brand-primary transition-colors">
                Issue Tracker
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="pt-8 border-t border-light-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-light-muted dark:text-dark-muted">
          &copy; {{ currentYear }} Ribose Inc. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <a :href="config.ribose" target="_blank" rel="noopener" class="text-sm text-light-muted dark:text-dark-muted hover:text-brand-primary transition-colors">
            Ribose
          </a>
          <span class="text-light-border dark:text-dark-border">|</span>
          <a :href="config.github.omnizip + '/blob/main/LICENSE'" target="_blank" rel="noopener" class="text-sm text-light-muted dark:text-dark-muted hover:text-brand-primary transition-colors">
            MIT License
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import Logo from '../atoms/Logo.vue'
import config from '../../config'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  @apply bg-light-surface dark:bg-dark-surface;
}
</style>
