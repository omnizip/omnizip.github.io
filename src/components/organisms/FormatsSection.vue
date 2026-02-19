<template>
  <section class="formats-section section-padding">
    <div class="container-wide">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
          Supported Formats
        </h2>
        <p class="text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
          Comprehensive coverage of archive formats and compression algorithms.
          Hover over each format to see read/write capabilities.
        </p>
      </div>

      <!-- Format categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Archive Formats -->
        <div class="format-category">
          <h3 class="text-lg font-semibold mb-4 text-light-text dark:text-dark-text flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
              <svg class="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </span>
            Archive Formats (Omnizip)
          </h3>
          <div class="flex flex-wrap gap-2">
            <FormatBadge v-for="format in archiveFormats" :key="format.name" :format="format.name" :variant="format.variant" :tooltip="format.tooltip" />
          </div>
        </div>

        <!-- Compression Algorithms -->
        <div class="format-category">
          <h3 class="text-lg font-semibold mb-4 text-light-text dark:text-dark-text flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-accent-gold/20 flex items-center justify-center">
              <svg class="w-4 h-4 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
            Compression Algorithms
          </h3>
          <div class="flex flex-wrap gap-2">
            <FormatBadge v-for="algo in compressionAlgos" :key="algo" :format="algo" />
          </div>
        </div>

        <!-- Microsoft Formats -->
        <div class="format-category">
          <h3 class="text-lg font-semibold mb-4 text-light-text dark:text-dark-text flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-accent-teal/20 flex items-center justify-center">
              <svg class="w-4 h-4 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            Microsoft Formats (Cabriolet)
          </h3>
          <div class="flex flex-wrap gap-2">
            <FormatBadge v-for="format in msFormats" :key="format.name" :format="format.name" :variant="format.variant" :tooltip="format.tooltip" />
          </div>
        </div>

        <!-- Preprocessing Filters -->
        <div class="format-category">
          <h3 class="text-lg font-semibold mb-4 text-light-text dark:text-dark-text flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center">
              <svg class="w-4 h-4 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </span>
            Preprocessing Filters
          </h3>
          <div class="flex flex-wrap gap-2">
            <FormatBadge v-for="f in filters" :key="f" :format="f" />
          </div>
        </div>

        <!-- Advanced Features -->
        <div class="format-category">
          <h3 class="text-lg font-semibold mb-4 text-light-text dark:text-dark-text flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center">
              <svg class="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            Advanced Features
          </h3>
          <div class="flex flex-wrap gap-2">
            <FormatBadge v-for="f in advancedFeatures" :key="f" :format="f" />
          </div>
        </div>

        <!-- Cabriolet Algorithms -->
        <div class="format-category">
          <h3 class="text-lg font-semibold mb-4 text-light-text dark:text-dark-text flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-accent-teal/20 flex items-center justify-center">
              <svg class="w-4 h-4 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            Microsoft Algorithms (Cabriolet)
          </h3>
          <div class="flex flex-wrap gap-2">
            <FormatBadge v-for="a in msAlgos" :key="a" :format="a" />
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-light-muted dark:text-dark-muted">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded bg-accent-teal/30" />
          <span>Read only</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded bg-accent-gold/30" />
          <span>Write only</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded bg-brand-primary/30" />
          <span>Read & Write</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import FormatBadge from '../atoms/FormatBadge.vue'

// Omnizip archive formats - all read/write unless noted
const archiveFormats = [
  { name: '7z', variant: 'rw', tooltip: 'Read & Write - Solid, multi-volume' },
  { name: 'ZIP', variant: 'rw', tooltip: 'Read & Write - ZIP64, AES' },
  { name: 'RAR4', variant: 'rw', tooltip: 'Read & Write - STORE, FASTEST, NORMAL' },
  { name: 'RAR5', variant: 'rw', tooltip: 'Read & Write - STORE, LZMA' },
  { name: 'TAR', variant: 'rw', tooltip: 'Read & Write - POSIX extensions' },
  { name: 'ISO', variant: 'rw', tooltip: 'Read & Write - Rock Ridge, Joliet' },
  { name: 'XAR', variant: 'rw', tooltip: 'Read & Write - XML TOC' },
  { name: 'CPIO', variant: 'rw', tooltip: 'Read & Write' },
  { name: 'XZ', variant: 'rw', tooltip: 'Read & Write - LZMA2' },
  { name: 'GZIP', variant: 'rw', tooltip: 'Read & Write' },
  { name: 'BZIP2', variant: 'rw', tooltip: 'Read & Write' },
  { name: 'PAR2', variant: 'rw', tooltip: 'Read & Write - Reed-Solomon' },
]

// Compression algorithms
const compressionAlgos = [
  'LZMA', 'LZMA2', 'BZip2', 'PPMd7', 'PPMd8', 'Deflate', 'Deflate64', 'Zstandard',
]

// Microsoft formats (Cabriolet) - all bidirectional
const msFormats = [
  { name: 'CAB', variant: 'rw', tooltip: 'Read & Write - All compression types' },
  { name: 'CHM', variant: 'rw', tooltip: 'Read & Write - Compiled HTML Help' },
  { name: 'SZDD', variant: 'rw', tooltip: 'Read & Write - Single-file LZSS' },
  { name: 'KWAJ', variant: 'rw', tooltip: 'Read & Write - Installation files' },
  { name: 'HLP', variant: 'rw', tooltip: 'Read & Write - QuickHelp & WinHelp' },
  { name: 'LIT', variant: 'rw', tooltip: 'Read & Write - Non-DRM eBooks' },
  { name: 'OAB', variant: 'rw', tooltip: 'Read & Write - Incremental patches' },
]

// Preprocessing filters
const filters = [
  'BCJ-x86', 'BCJ-ARM', 'BCJ-ARM64', 'BCJ-PPC', 'BCJ-SPARC', 'BCJ-IA64', 'BCJ2', 'Delta',
]

// Advanced features
const advancedFeatures = [
  'AES-256', 'CRC32', 'CRC64', 'Multi-volume', 'Solid', 'Parallel (Ractors)',
]

// Microsoft-specific algorithms
const msAlgos = [
  'LZSS', 'MSZIP', 'LZX', 'Quantum',
]
</script>

<style scoped>
.format-category {
  @apply p-6 rounded-xl;
  @apply bg-light-surface dark:bg-dark-surface;
  @apply border border-light-border dark:border-dark-border;
}
</style>
