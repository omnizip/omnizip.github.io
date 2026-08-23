<template>
  <div class="announcement">
    <div class="container-wide py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
      <span class="badge font-mono">New</span>
      <p class="text-sm text-light-text dark:text-dark-text">
        <strong>omnizip-rs is here</strong> — 18 pure Rust codecs, zero unsafe, live on crates.io
      </p>
      <router-link to="/blog/omnizip-rs-announcement" class="cta text-sm font-medium inline-flex items-center gap-1">
        Read the announcement
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.announcement {
  @apply bg-accent-purple/10 border-b border-accent-purple/20;
}

.badge {
  @apply text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full;
  @apply bg-accent-purple text-white;
}

.cta {
  @apply text-accent-purple hover:text-brand-primary transition-colors;
}
</style>
