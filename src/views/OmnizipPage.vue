<template>
  <div class="product-page section-padding">
    <div class="container-narrow">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-primary/20 mb-6">
          <span class="text-3xl">📦</span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-light-text dark:text-dark-text">
          Omnizip
        </h1>
        <p class="text-xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
          Comprehensive pure Ruby compression library with zero native dependencies.
          Supports more formats than libarchive, libmspack, 7-zip, and xz combined.
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div class="stat-card">
          <div class="stat-value">10+</div>
          <div class="stat-label">Archive Formats</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">8+</div>
          <div class="stat-label">Compression Algorithms</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">3406</div>
          <div class="stat-label">Tests (100% pass)</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Native Dependencies</div>
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

      <!-- Archive Formats -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Archive Formats (Read & Write)
        </h2>
        <div class="glass-card p-6">
          <div class="flex flex-wrap gap-2">
            <FormatBadge format="7z" variant="rw" tooltip="Solid compression, multi-volume, AES-256" />
            <FormatBadge format="ZIP" variant="rw" tooltip="ZIP64, WinZip AES encryption" />
            <FormatBadge format="RAR4" variant="rw" tooltip="Read all, write STORE/FASTEST/NORMAL" />
            <FormatBadge format="RAR5" variant="rw" tooltip="Read/write with STORE and LZMA" />
            <FormatBadge format="TAR" variant="rw" tooltip="POSIX extensions" />
            <FormatBadge format="ISO" variant="rw" tooltip="Rock Ridge, Joliet" />
            <FormatBadge format="XAR" variant="rw" tooltip="XML TOC, gzip/bzip2/lzma" />
            <FormatBadge format="CPIO" variant="rw" tooltip="newc, CRC formats" />
            <FormatBadge format="XZ" variant="rw" tooltip="LZMA2, CRC32/64/SHA256" />
            <FormatBadge format="GZIP" variant="rw" />
            <FormatBadge format="BZIP2" variant="rw" />
            <FormatBadge format="PAR2" variant="rw" tooltip="Reed-Solomon error correction" />
          </div>
        </div>
      </div>

      <!-- Compression Algorithms -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Compression Algorithms
        </h2>
        <div class="glass-card p-6">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="algo in algorithms" :key="algo.name" class="text-center">
              <div class="font-mono font-semibold text-brand-primary">{{ algo.name }}</div>
              <div class="text-xs text-light-muted dark:text-dark-muted">{{ algo.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preprocessing Filters -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Preprocessing Filters
        </h2>
        <div class="glass-card p-6">
          <div class="flex flex-wrap gap-2">
            <FormatBadge v-for="f in filters" :key="f" :format="f" />
          </div>
        </div>
      </div>

      <!-- Code Example -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Usage Examples
        </h2>
        <CodeBlock language="ruby">{{ codeExample }}</CodeBlock>
      </div>

      <!-- Links -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <BaseButton
          as="a"
          :href="config.docs.omnizip"
          variant="primary"
          size="lg"
        >
          Full Documentation
        </BaseButton>
        <BaseButton
          as="a"
          :href="config.github.omnizip"
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
import FormatBadge from '../components/atoms/FormatBadge.vue'
import BaseButton from '../components/atoms/BaseButton.vue'
import CodeBlock from '../components/molecules/CodeBlock.vue'
import config from '../config'

const features = [
  { title: 'Pure Ruby', description: 'No native dependencies. Works on MRI, JRuby, TruffleRuby' },
  { title: '7-Zip Format', description: 'Full read/write with solid compression, multi-volume' },
  { title: 'XZ Format', description: 'Complete LZMA2 support with XZ Utils compatibility' },
  { title: 'RAR Support', description: 'RAR4 read all/write some, RAR5 full read/write' },
  { title: 'ZIP & ZIP64', description: 'Full support including WinZip AES encryption' },
  { title: 'ISO 9660', description: 'Read/write with Rock Ridge and Joliet extensions' },
  { title: 'PAR2 Archives', description: 'Reed-Solomon error correction and recovery' },
  { title: 'Parallel Processing', description: 'Multi-threaded compression using Ractors' },
]

const algorithms = [
  { name: 'LZMA', desc: 'High compression ratio' },
  { name: 'LZMA2', desc: 'Improved LZMA' },
  { name: 'BZip2', desc: 'Burrows-Wheeler' },
  { name: 'PPMd7/8', desc: 'Text compression' },
  { name: 'Deflate', desc: 'ZIP-compatible' },
  { name: 'Deflate64', desc: '64KB window' },
  { name: 'Zstandard', desc: 'Modern fast' },
  { name: 'Store', desc: 'No compression' },
]

const filters = [
  'BCJ-x86', 'BCJ-ARM', 'BCJ-ARM64', 'BCJ-PPC', 'BCJ-SPARC', 'BCJ-IA64', 'BCJ2', 'Delta',
]

const codeExample = `# Installation
gem install omnizip

# Basic usage
require 'omnizip'

# === 7-Zip Archives ===
Omnizip::Formats::SevenZip::Writer.create('archive.7z') do |sz|
  sz.add_file('document.pdf')
  sz.add_directory('photos/')
end

Omnizip::Formats::SevenZip::Reader.open('archive.7z') do |sz|
  sz.extract_all('output/')
  sz.entries.each { |e| puts e.name }
end

# === XZ Archives (LZMA2) ===
compressed = Omnizip::Formats::Xz.compress(data, check_type: :crc64)
decompressed = Omnizip::Formats::Xz.decompress(compressed)

# === ZIP Archives ===
Omnizip::Formats::Zip::Writer.create('backup.zip') do |zip|
  zip.add_file('readme.md')
  zip.add_directory('src/')
end

# === RAR5 Archives ===
writer = Omnizip::Formats::Rar::Rar5::Writer.new('archive.rar',
  compression: :lzma,
  level: 5,
  solid: true,
  password: 'secret',
  recovery: true
)
writer.add_directory('project/')
writer.write

# === One-liners ===
Omnizip.compress_file('input.txt', 'output.zip')
Omnizip.extract_archive('archive.zip', 'output/')
entries = Omnizip.list_archive('archive.zip')`
</script>

<style scoped>
.feature-item {
  @apply flex gap-3 p-4 rounded-lg;
  @apply bg-light-surface dark:bg-dark-surface;
  @apply border border-light-border dark:border-dark-border;
}

.feature-icon {
  @apply flex-shrink-0 w-6 h-6 rounded-full;
  @apply bg-brand-primary/20 text-brand-primary;
  @apply flex items-center justify-center;
}

.stat-card {
  @apply text-center p-4 rounded-lg;
  @apply bg-light-surface dark:bg-dark-surface;
  @apply border border-light-border dark:border-dark-border;
}

.stat-value {
  @apply text-2xl font-bold text-brand-primary;
}

.stat-label {
  @apply text-sm text-light-muted dark:text-dark-muted;
}
</style>
