<template>
  <div class="product-page section-padding">
    <div class="container-narrow">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-gold/20 mb-6">
          <span class="text-3xl">⛏️</span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-light-text dark:text-dark-text">
          Excavate
        </h1>
        <p class="text-xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
          Unified extraction for nested archives. Born in the Fontist project,
          now part of the Omnizip suite — 100% pure Ruby with zero compiled
          dependencies.
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div class="stat-card">
          <div class="stat-value">10+</div>
          <div class="stat-label">Archive Formats</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">100%</div>
          <div class="stat-label">Pure Ruby</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">∞</div>
          <div class="stat-label">Nesting Depth</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Compiled Dependencies</div>
        </div>
      </div>

      <!-- Features -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Key Features
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="feature in features" :key="feature.title" class="feature-item">
            <div class="feature-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-light-text dark:text-dark-text">
                {{ feature.title }}
              </h3>
              <p class="text-sm text-light-muted dark:text-dark-muted">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Supported Formats -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Supported Formats (All Recursive)
        </h2>
        <div class="glass-card p-6">
          <div class="flex flex-wrap gap-2">
            <FormatBadge v-for="format in formats" :key="format" :format="format" variant="read" :tooltip="tooltips[format] || ''" />
          </div>
          <p class="text-sm text-light-muted dark:text-dark-muted mt-4">
            Self-extracting executables (CAB and 7-Zip SFX) are detected and
            unpacked automatically.
          </p>
        </div>
      </div>

      <!-- Code Example -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Usage Examples
        </h2>
        <CodeBlock language="ruby">{{ codeExample }}</CodeBlock>
      </div>

      <!-- Built on -->
      <div class="glass-card p-6 mb-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
        <div class="flex items-center gap-6">
          <router-link to="/ruby/omnizip" class="text-lg font-bold text-brand-primary hover:underline">Omnizip</router-link>
          <span class="text-light-muted dark:text-dark-muted">+</span>
          <router-link to="/ruby/cabriolet" class="text-lg font-bold text-accent-teal hover:underline">Cabriolet</router-link>
          <span class="text-light-muted dark:text-dark-muted">=</span>
          <span class="text-lg font-bold text-accent-gold">Excavate</span>
        </div>
        <p class="text-sm text-light-muted dark:text-dark-muted max-w-sm">
          The extraction engines are Omnizip and Cabriolet — pure Ruby end to end.
        </p>
      </div>

      <!-- Links -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <BaseButton
          as="a"
          :href="config.docs.excavate"
          variant="primary"
          size="lg"
        >
          Full Documentation
        </BaseButton>
        <BaseButton
          as="a"
          :href="config.github.excavate"
          target="_blank"
          rel="noopener"
          variant="secondary"
          size="lg"
        >
          View on GitHub
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import FormatBadge from '../components/atoms/FormatBadge.vue'
import BaseButton from '../components/atoms/BaseButton.vue'
import CodeBlock from '../components/molecules/CodeBlock.vue'
import config from '../config'

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})

const features = [
  { title: 'Recursive Extraction', description: 'Archives within archives, unpacked to the bottom — multi-level nested paths included' },
  { title: 'Unified Interface', description: 'One Archive class across every format; no format-specific handlers in your code' },
  { title: 'Selective Extraction', description: 'Take exactly what you need by file list, glob filter, or predicate' },
  { title: 'SFX Detection', description: 'Self-extracting CAB and 7-Zip executables recognized and unpacked' },
  { title: '100% Pure Ruby', description: 'No compiled extensions — MRI, JRuby, TruffleRuby, every OS' },
  { title: 'Command Line', description: 'A CLI for when you just want the files out' },
]

const formats = ['ZIP', '7z', 'TAR', 'GZIP', 'XZ', 'CAB', 'MSI', 'RPM', 'PKG', 'CPIO', 'SFX']

const tooltips = {
  ZIP: 'Including nested archives',
  PKG: 'XAR packages (macOS installers)',
  SFX: 'Self-extracting CAB / 7-Zip executables',
}

const codeExample = `# Installation
gem install excavate

# Basic usage
require 'excavate'

# Just extract it
Excavate::Archive.new('package.zip').extract

# An installer with archives inside archives
Excavate::Archive.new('installer.msi').extract(
  recursive_packages: true
)

# Only what you need
Excavate::Archive.new('fonts.7z').extract(
  filter: '**/*.ttf'
)

Excavate::Archive.new('data.tar.gz').extract(
  files: ['config/settings.json']
)`
</script>

<style scoped>
.feature-item {
  @apply flex gap-3 p-4 rounded-lg;
  @apply bg-light-surface dark:bg-dark-surface;
  @apply border border-light-border dark:border-dark-border;
}

.feature-icon {
  @apply flex-shrink-0 w-6 h-6 rounded-full;
  @apply bg-accent-gold/20 text-accent-gold;
  @apply flex items-center justify-center;
}

.stat-card {
  @apply text-center p-4 rounded-lg;
  @apply bg-light-surface dark:bg-dark-surface;
  @apply border border-light-border dark:border-dark-border;
}

.stat-value {
  @apply text-2xl font-bold text-accent-gold;
}

.stat-label {
  @apply text-sm text-light-muted dark:text-dark-muted;
}
</style>
