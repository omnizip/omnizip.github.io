<template>
  <article v-if="post" class="blog-post">
    <!-- ============ Masthead ============ -->
    <header class="masthead section-padding relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-accent-purple/10 via-transparent to-transparent" />
      <div class="container-narrow relative z-10">
        <div class="flex items-center gap-4 mb-8">
          <span class="eyebrow">{{ post.category }}</span>
          <span class="dateline font-mono text-sm text-light-muted dark:text-dark-muted">{{ post.date }}</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-light-text dark:text-dark-text">
          {{ post.title }}
        </h1>
        <p class="deck text-lg sm:text-xl text-light-muted dark:text-dark-muted max-w-3xl">
          {{ post.excerpt }}
        </p>

        <div v-if="post.stats.length" class="masthead-stats grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <div v-for="s in post.stats" :key="s.label" class="stat-pill">
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </header>

    <!-- ============ Body ============ -->
    <div class="container-narrow post-body">
      <!-- eslint-disable-next-line vue/no-v-html -- content is markdown rendered with html:false -->
      <div class="post-prose" v-html="rendered"></div>

      <div class="post-footer-nav mt-16 pt-8 border-t border-light-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <router-link to="/blog" class="text-sm font-medium text-brand-primary hover:underline">
          &larr; All posts
        </router-link>
        <span class="text-xs font-mono text-light-muted dark:text-dark-muted">omnizip.org/blog</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { getPost } from '../../models/blog'
import { useScrollAnimation } from '../../composables/useScrollAnimation'

const route = useRoute()
const router = useRouter()

const md = new MarkdownIt({ html: false, linkify: true, typographer: true })

const defaultLink =
  md.renderer.rules.link_open ||
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const href = tokens[idx].attrGet('href') || ''
  if (/^https?:\/\//.test(href)) {
    tokens[idx].attrSet('target', '_blank')
    tokens[idx].attrSet('rel', 'noopener')
  }
  return defaultLink(tokens, idx, options, env, self)
}

const post = computed(() => getPost(route.params.slug))

// Markdown links are plain <a>; keep internal ones inside the SPA.
const handleBodyClick = (event) => {
  const anchor = event.target.closest('a')
  if (!anchor) return
  const href = anchor.getAttribute('href') || ''
  if (href.startsWith('/') && !href.startsWith('//')) {
    event.preventDefault()
    router.push(href)
  }
}

const rendered = computed(() => (post.value ? md.render(post.value.body) : ''))

watch(
  () => post.value?.slug,
  () => {
    document.title = post.value
      ? `${post.value.title} — Omnizip`
      : 'Blog — Omnizip'
    if (!post.value) {
      router.replace('/blog')
    } else {
      window.scrollTo({ top: 0 })
    }
  },
  { immediate: true }
)

const { initScrollAnimation } = useScrollAnimation()
initScrollAnimation()
</script>

<style scoped>
.eyebrow {
  @apply inline-block text-xs font-mono font-semibold uppercase tracking-widest;
  @apply px-2.5 py-1 rounded-full;
  @apply bg-accent-purple/10 text-accent-purple;
}

.deck {
  @apply leading-relaxed;
}

.stat-pill {
  @apply text-center p-4 rounded-xl;
  @apply bg-light-surface dark:bg-dark-surface;
  @apply border border-light-border dark:border-dark-border;
}

.stat-value {
  @apply text-2xl font-bold text-accent-purple;
}

.stat-label {
  @apply text-xs text-light-muted dark:text-dark-muted mt-1;
}

.post-body {
  @apply pt-16 pb-24;
}

.post-prose :deep(h2) {
  @apply text-2xl sm:text-3xl font-bold mt-14 mb-6 text-light-text dark:text-dark-text;
}

.post-prose :deep(h3) {
  @apply text-xl font-bold mt-10 mb-4 text-light-text dark:text-dark-text;
}

.post-prose :deep(p) {
  @apply text-light-text dark:text-dark-text leading-relaxed mb-4;
}

.post-prose :deep(a) {
  @apply text-brand-primary hover:underline;
}

.post-prose :deep(blockquote) {
  @apply my-8 p-6 rounded-xl border-l-4;
  @apply bg-accent-purple/5 border-accent-purple;
  @apply text-lg font-medium text-light-text dark:text-dark-text italic;
}

.post-prose :deep(ul) {
  @apply space-y-2 mb-6 list-disc pl-6;
}

.post-prose :deep(li) {
  @apply text-light-text dark:text-dark-text leading-relaxed;
}

.post-prose :deep(strong) {
  @apply font-semibold text-light-text dark:text-dark-text;
}

.post-prose :deep(pre) {
  @apply my-6 p-4 rounded-xl overflow-x-auto text-sm;
  @apply bg-dark-bg text-dark-text;
  font-family: 'JetBrains Mono', monospace;
}

.post-prose :deep(pre code) {
  @apply bg-transparent text-inherit;
  font-family: inherit;
}

.post-prose :deep(p code), .post-prose :deep(li code) {
  @apply px-1.5 py-0.5 rounded text-sm font-mono;
  @apply bg-light-bg dark:bg-dark-bg text-brand-primary;
}

.post-prose :deep(table) {
  @apply w-full my-6 text-sm border-collapse;
}

.post-prose :deep(th) {
  @apply px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-left;
  @apply text-light-muted dark:text-dark-muted;
  @apply border-b border-light-border dark:border-dark-border;
}

.post-prose :deep(td) {
  @apply px-4 py-3;
  @apply border-b border-light-border/50 dark:border-dark-border/50;
  @apply text-light-text dark:text-dark-text;
}

.post-prose :deep(tbody tr:last-child td) {
  @apply border-b-0;
}

.post-prose :deep(hr) {
  @apply my-10 border-light-border dark:border-dark-border;
}
</style>
