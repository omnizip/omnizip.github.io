<template>
  <section class="quickstart-section section-padding bg-light-surface dark:bg-dark-surface">
    <div class="container-narrow">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
          Quick Start
        </h2>
        <p class="text-light-muted dark:text-dark-muted">
          Get up and running in three simple steps.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Step 1 -->
        <div class="step-card">
          <div class="step-number">1</div>
          <h3 class="text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
            Install the Gem
          </h3>
          <div class="step-content">
            <code class="text-sm">gem install omnizip</code>
          </div>
          <p class="mt-3 text-sm text-light-muted dark:text-dark-muted">
            Or add to your Gemfile:
            <code class="text-xs">gem 'omnizip'</code>
          </p>
        </div>

        <!-- Step 2 -->
        <div class="step-card">
          <div class="step-number">2</div>
          <h3 class="text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
            Require & Open
          </h3>
          <div class="step-content">
            <pre class="text-xs"><code>require 'omnizip'

archive = Omnizip::Archive.open('file.7z')</code></pre>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="step-card">
          <div class="step-number">3</div>
          <h3 class="text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
            Extract & Done
          </h3>
          <div class="step-content">
            <pre class="text-xs"><code>archive.entries.each do |e|
  puts e.name
end
archive.extract_all('/output/')</code></pre>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 text-center">
        <BaseButton
          as="a"
          :href="config.docs.omnizip"
          variant="primary"
          size="lg"
        >
          Read the Documentation
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import BaseButton from '../atoms/BaseButton.vue'
import config from '../../config'
</script>

<style scoped>
.step-card {
  @apply relative p-6 rounded-xl;
  @apply bg-light-bg dark:bg-dark-bg;
  @apply border border-light-border dark:border-dark-border;
}

.step-number {
  @apply absolute -top-4 left-6;
  @apply w-8 h-8 rounded-full;
  @apply bg-brand-primary text-white;
  @apply flex items-center justify-center;
  @apply font-bold text-sm;
}

.step-content {
  @apply p-3 rounded-lg mt-3;
  @apply bg-dark-bg text-dark-text;
}

.step-content code,
.step-content pre {
  font-family: 'JetBrains Mono', monospace;
}
</style>
