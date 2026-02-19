<template>
  <div class="product-page section-padding">
    <div class="container-narrow">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-teal/20 mb-6">
          <span class="text-3xl">🚗</span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-light-text dark:text-dark-text">
          Cabriolet
        </h1>
        <p class="text-xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
          Pure Ruby implementation for Microsoft compression formats.
          Complete bidirectional support for 7 Microsoft formats with all compression algorithms.
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div class="stat-card" style="--accent: #58bab7;">
          <div class="stat-value">7</div>
          <div class="stat-label">Microsoft Formats</div>
        </div>
        <div class="stat-card" style="--accent: #58bab7;">
          <div class="stat-value">5</div>
          <div class="stat-label">Compression Algorithms</div>
        </div>
        <div class="stat-card" style="--accent: #58bab7;">
          <div class="stat-value">1225</div>
          <div class="stat-label">Tests (100% pass)</div>
        </div>
        <div class="stat-card" style="--accent: #58bab7;">
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
            <div class="feature-icon" style="background: rgba(88, 186, 183, 0.2); color: #58bab7;">
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

      <!-- Formats -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Supported Formats (All Bidirectional)
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="format in formats" :key="format.name" class="format-item">
            <FormatBadge :format="format.name" variant="rw" />
            <div class="ml-3">
              <div class="font-medium text-light-text dark:text-dark-text">{{ format.fullName }}</div>
              <div class="text-sm text-light-muted dark:text-dark-muted">{{ format.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Compression Algorithms -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Compression Algorithms
        </h2>
        <div class="glass-card p-6">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="algo in algorithms" :key="algo.name" class="text-center p-3 rounded-lg bg-light-bg dark:bg-dark-bg">
              <div class="font-mono font-semibold text-accent-teal">{{ algo.name }}</div>
              <div class="text-xs text-light-muted dark:text-dark-muted">{{ algo.desc }}</div>
            </div>
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
          :href="config.docs.cabriolet"
          variant="primary"
          size="lg"
        >
          Full Documentation
        </BaseButton>
        <BaseButton
          as="a"
          :href="config.github.cabriolet"
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
  { title: 'Pure Ruby', description: 'No compilation needed, works everywhere Ruby runs' },
  { title: 'Full Bidirectional', description: 'Complete read AND write support for all 7 formats' },
  { title: 'CAB Archives', description: 'All compression types, multi-part, embedded search' },
  { title: 'CHM Help Files', description: 'Extract and create compiled HTML help files' },
  { title: 'HLP Support', description: 'Both QuickHelp (DOS) and WinHelp 3.x/4.x formats' },
  { title: 'OAB Address Books', description: 'Offline address books with incremental patches' },
  { title: 'libmspack Compatible', description: '73 parity tests, 100% compatible extraction' },
  { title: 'Comprehensive CLI', description: '30+ commands for all operations' },
]

const formats = [
  { name: 'CAB', fullName: 'Microsoft Cabinet', description: 'Software distribution, multi-part spanning' },
  { name: 'CHM', fullName: 'Compiled HTML Help', description: 'Windows help files with LZX compression' },
  { name: 'SZDD', fullName: 'Single-file LZSS', description: 'DOS utilities, .TX_ style compression' },
  { name: 'KWAJ', fullName: 'Installation File', description: 'Microsoft setup packages' },
  { name: 'HLP', fullName: 'Windows Help', description: 'QuickHelp (DOS) & WinHelp 3.x/4.x' },
  { name: 'LIT', fullName: 'Microsoft Reader eBook', description: 'Non-DRM eBook format' },
  { name: 'OAB', fullName: 'Offline Address Book', description: 'Outlook/Exchange address data' },
]

const algorithms = [
  { name: 'None', desc: 'Uncompressed storage' },
  { name: 'LZSS', desc: '4KB window, 3 modes' },
  { name: 'MSZIP', desc: 'DEFLATE/RFC 1951' },
  { name: 'LZX', desc: 'Intel E8 preprocessing' },
  { name: 'Quantum', desc: 'Adaptive arithmetic' },
]

const codeExample = `# Installation
gem install cabriolet

# Basic usage
require 'cabriolet'

# === CAB Archives ===
decompressor = Cabriolet::CAB::Decompressor.new
cabinet = decompressor.open('example.cab')

# List files
cabinet.files.each do |file|
  puts "\#{file.filename}: \#{file.length} bytes"
end

# Extract all
decompressor.extract_all(cabinet, 'output/')

# Create CAB file
compressor = Cabriolet::CAB::Compressor.new
compressor.add_file('README.txt')
compressor.add_file('data.bin', 'custom/path.bin')
compressor.generate('output.cab', compression: :mszip)

# === CHM Help Files ===
decompressor = Cabriolet::CHM::Decompressor.new
chm = decompressor.open('help.chm')
chm.files&.each { |f| puts f.filename }
decompressor.extract_all(chm, 'output/')

# Create CHM
compressor = Cabriolet::CHM::Compressor.new
compressor.add_file('index.html', '/index.html', section: :compressed)
compressor.generate('help.chm', window_bits: 16)

# === SZDD Compression ===
compressor = Cabriolet::SZDD::Compressor.new
compressor.compress('file.txt', 'file.tx_', missing_char: 't')

# === Multi-part CABs ===
cab1 = decompressor.open('disk1.cab')
cab2 = decompressor.open('disk2.cab')
decompressor.append(cab1, cab2)
decompressor.extract_all(cab1, 'output/')

# === Search for embedded CABs ===
cabinet = decompressor.search('installer.exe')
while cabinet
  puts "Cabinet at offset \#{cabinet.base_offset}"
  cabinet = cabinet.next
end`
</script>

<style scoped>
.feature-item {
  @apply flex gap-3 p-4 rounded-lg;
  @apply bg-light-surface dark:bg-dark-surface;
  @apply border border-light-border dark:border-dark-border;
}

.feature-icon {
  @apply flex-shrink-0 w-6 h-6 rounded-full;
  @apply flex items-center justify-center;
}

.stat-card {
  @apply text-center p-4 rounded-lg;
  @apply bg-light-surface dark:bg-dark-surface;
  @apply border border-light-border dark:border-dark-border;
}

.stat-value {
  @apply text-2xl font-bold;
  color: var(--accent, #58bab7);
}

.stat-label {
  @apply text-sm text-light-muted dark:text-dark-muted;
}

.format-item {
  @apply flex items-start p-4 rounded-lg;
  @apply bg-light-surface dark:bg-dark-surface;
  @apply border border-light-border dark:border-dark-border;
}
</style>
