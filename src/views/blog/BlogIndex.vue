<template>
  <div class="blog-index">
    <header class="masthead section-padding relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-accent-purple/10 via-transparent to-transparent" />
      <div class="container-narrow relative z-10">
        <div class="flex items-center gap-4 mb-6">
          <span class="eyebrow">Blog</span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-light-text dark:text-dark-text">
          Notes from the <span class="gradient-text">compression workshop</span>
        </h1>
        <p class="text-lg text-light-muted dark:text-dark-muted max-w-2xl">
          Announcements, benchmark write-ups, and format deep-dives from the team
          building the Omnizip family in Ruby and Rust.
        </p>
      </div>
    </header>

    <div class="container-narrow pt-12 pb-24">
      <router-link
        v-for="post in posts"
        :key="post.slug"
        :to="'/blog/' + post.slug"
        class="post-card glass-card flex gap-6 p-6 sm:p-8 mb-6"
      >
        <span class="post-date font-mono text-sm text-accent-purple pt-1 shrink-0 tabular-nums">
          {{ post.date }}
        </span>
        <div class="min-w-0">
          <h2 class="text-xl sm:text-2xl font-bold mb-3 text-light-text dark:text-dark-text leading-snug">
            {{ post.title }}
          </h2>
          <p class="text-light-muted dark:text-dark-muted leading-relaxed mb-4">
            {{ post.excerpt }}
          </p>
          <span class="read-more text-sm font-medium text-brand-primary inline-flex items-center gap-1">
            Read the post
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useScrollAnimation } from '../../composables/useScrollAnimation'
import { posts } from '../../models/blog'

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})
</script>

<style scoped>
.eyebrow {
  @apply inline-block text-xs font-mono font-semibold uppercase tracking-widest;
  @apply px-2.5 py-1 rounded-full;
  @apply bg-accent-purple/10 text-accent-purple;
}

.post-card {
  transition: transform 200ms ease, border-color 200ms ease;
}

.post-card:hover {
  transform: translateY(-2px);
  @apply border-accent-purple/40;
}

.post-card:hover .read-more {
  @apply gap-2;
}
</style>
