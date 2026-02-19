<template>
  <section class="hero-section min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-accent-purple/5" />

    <!-- Animated background shapes -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-shape shape-1" />
      <div class="floating-shape shape-2" />
      <div class="floating-shape shape-3" />
    </div>

    <div class="container-narrow relative z-10 py-20 text-center">
      <!-- Logo -->
      <div class="mb-8 flex justify-center">
        <div class="w-48 sm:w-64 md:w-80">
          <Logo :animated="true" />
        </div>
      </div>

      <!-- Tagline -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-light-text dark:text-dark-text">
        <span class="gradient-text">Pure Ruby</span> Compression
      </h1>

      <!-- Subtitle -->
      <p class="text-lg sm:text-xl text-light-muted dark:text-dark-muted mb-8 max-w-2xl mx-auto">
        Zero native dependencies. Works everywhere Ruby runs.
        <br class="hidden sm:block" />
        Supporting more formats than libarchive, libmspack, 7-zip, and xz.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <BaseButton
          as="a"
          :href="config.docs.omnizip"
          variant="primary"
          size="lg"
        >
          Get Started
        </BaseButton>
        <BaseButton
          as="a"
          :href="config.github.organization"
          target="_blank"
          rel="noopener"
          variant="secondary"
          size="lg"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
          View on GitHub
        </BaseButton>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <svg class="w-6 h-6 text-light-muted dark:text-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import Logo from '../atoms/Logo.vue'
import BaseButton from '../atoms/BaseButton.vue'
import config from '../../config'
</script>

<style scoped>
.floating-shape {
  @apply absolute rounded-full opacity-20 blur-3xl;
}

.shape-1 {
  @apply w-96 h-96 bg-brand-primary;
  top: -10%;
  right: -10%;
  animation: float 8s ease-in-out infinite;
}

.shape-2 {
  @apply w-64 h-64 bg-accent-purple;
  bottom: 20%;
  left: -5%;
  animation: float 10s ease-in-out infinite 2s;
}

.shape-3 {
  @apply w-72 h-72 bg-accent-teal;
  top: 40%;
  right: -15%;
  animation: float 12s ease-in-out infinite 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.05);
  }
}
</style>
