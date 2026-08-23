<template>
  <div class="rust-page">
    <!-- ============ Hero ============ -->
    <section class="hero section-padding relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-accent-purple/5 via-transparent to-accent-teal/5" />

      <div class="container-narrow relative z-10">
        <div class="text-center">
          <span class="eyebrow">New &middot; The Rust family</span>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-4 text-light-text dark:text-dark-text">
            <span class="font-mono">omnizip-rs</span>
          </h1>
          <p class="text-xl sm:text-2xl mb-4 text-light-text dark:text-dark-text">
            <span class="gradient-text">18 compression codecs.</span> Pure Rust. Zero unsafe.
          </p>
          <p class="text-lg text-light-muted dark:text-dark-muted max-w-2xl mx-auto mb-10">
            The Omnizip Ruby reference implementations, ported line by line to Rust for
            production speed &mdash; and verified byte-identical against the Ruby on every fixture,
            on every release.
          </p>

          <!-- Signature: the compression strip -->
          <div class="compress-strip glass-card mx-auto max-w-3xl p-6 text-left" aria-hidden="true">
            <div class="flex items-baseline justify-between mb-3">
              <span class="text-xs font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted">
                enwik8 &middot; 100,000,000 bytes in
              </span>
              <span class="text-xs font-mono text-accent-teal">round trip: ok</span>
            </div>
            <div class="hex-row" :class="{ compressed: stripCompressed }">
              <span v-for="(b, i) in hexBytes" :key="i" class="hex-byte" :style="{ transitionDelay: `${(hexBytes.length - i) * 18}ms` }">{{ b }}</span>
            </div>
            <div class="mt-4 flex items-baseline justify-between gap-4">
              <span class="text-xs font-mono text-light-muted dark:text-dark-muted truncate">
                {{ stripCompressed ? 'bzip2/9 · 100,000,000 B → ' + heroOutputBytes + ' B' : 'bzip2/9 · compressing…' }}
              </span>
              <span class="ratio-label font-mono" :class="{ shown: stripCompressed }">ratio {{ heroRatio }}</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <BaseButton as="a" :href="config.github.rust" target="_blank" rel="noopener" variant="primary" size="lg">
              View on GitHub
            </BaseButton>
            <BaseButton as="router-link" to="/blog/omnizip-rs-announcement" variant="secondary" size="lg">
              Read the announcement
            </BaseButton>
            <BaseButton as="a" :href="config.crates.index" target="_blank" rel="noopener" variant="ghost" size="lg">
              crates.io
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ Stat band ============ -->
    <section class="section-padding !pt-0">
      <div class="container-narrow">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ The verification story ============ -->
    <section class="section-padding bg-light-surface dark:bg-dark-surface">
      <div class="container-wide">
        <div class="text-center mb-12">
          <span class="eyebrow">How it was built</span>
          <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-light-text dark:text-dark-text">
            Ported from Ruby. Proven in CI.
          </h2>
          <p class="text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
            Ruby is too slow for production codecs, but the algorithms were already
            correct and tested. Rust adds the speed without re-deriving a single bit
            of the math.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(step, i) in pipeline" :key="step.title" class="pipeline-card glass-card p-6 relative">
            <div class="step-marker font-mono text-sm mb-3">{{ step.marker }}</div>
            <h3 class="text-lg font-bold mb-2 text-light-text dark:text-dark-text">{{ step.title }}</h3>
            <p class="text-sm text-light-muted dark:text-dark-muted leading-relaxed">{{ step.description }}</p>
            <svg v-if="i < pipeline.length - 1" class="pipeline-arrow hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        <div class="glass-card p-6 mt-6 text-sm text-light-muted dark:text-dark-muted text-center">
          <span class="font-mono text-brand-primary">release blocker:</span>
          a divergence between the Ruby and Rust output on any fixture under
          <span class="font-mono">omnizip/spec/fixtures/</span> fails the release.
        </div>
      </div>
    </section>

    <!-- ============ Crate family ============ -->
    <section class="section-padding">
      <div class="container-wide">
        <div class="text-center mb-12">
          <span class="eyebrow">The family</span>
          <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-light-text dark:text-dark-text">
            One crate per algorithm
          </h2>
          <p class="text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
            All published to crates.io at v0.16.89, dual licensed MIT OR Apache-2.0.
            Add exactly what you need &mdash; codecs never depend on each other.
          </p>
        </div>

        <div v-for="group in crateGroups" :key="group.name" class="mb-10">
          <div class="flex items-center gap-4 mb-4">
            <h3 class="text-xl font-bold whitespace-nowrap text-light-text dark:text-dark-text">{{ group.name }}</h3>
            <div class="h-px flex-grow bg-light-border dark:bg-dark-border" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              v-for="crate in group.crates"
              :key="crate.name"
              :href="'https://crates.io/crates/' + crate.name"
              target="_blank"
              rel="noopener"
              class="crate-card glass-card p-5 block group"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="font-mono font-semibold text-accent-purple dark:text-accent-purple">{{ crate.name }}</span>
                <svg class="w-4 h-4 text-light-muted dark:text-dark-muted opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <p class="text-sm text-light-muted dark:text-dark-muted leading-snug">{{ crate.description }}</p>
              <div class="mt-3 flex flex-wrap gap-1.5">
                <FormatBadge v-for="f in crate.formats" :key="f" :format="f" size="sm" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ Architecture ============ -->
    <section class="section-padding bg-light-surface dark:bg-dark-surface">
      <div class="container-wide">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="eyebrow">Architecture</span>
            <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-6 text-light-text dark:text-dark-text">
              One trait. One registry. No coupling.
            </h2>
            <ul class="space-y-4">
              <li v-for="point in architecturePoints" :key="point.title" class="flex gap-3">
                <div class="arch-check flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-light-text dark:text-dark-text">{{ point.title }}</h3>
                  <p class="text-sm text-light-muted dark:text-dark-muted">{{ point.description }}</p>
                </div>
              </li>
            </ul>
          </div>
          <CodeBlock language="rust">{{ architectureCode }}</CodeBlock>
        </div>
      </div>
    </section>

    <!-- ============ Guarantees ============ -->
    <section class="section-padding">
      <div class="container-wide">
        <div class="text-center mb-12">
          <span class="eyebrow">Non-negotiable</span>
          <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-light-text dark:text-dark-text">
            Guarantees every crate keeps
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="g in guarantees" :key="g.title" class="glass-card p-6">
            <div class="guarantee-icon mb-4">{{ g.icon }}</div>
            <h3 class="text-lg font-bold mb-2 text-light-text dark:text-dark-text">{{ g.title }}</h3>
            <p class="text-sm text-light-muted dark:text-dark-muted leading-relaxed">{{ g.description }}</p>
            <code v-if="g.code" class="guarantee-code mt-3 inline-block font-mono text-xs">{{ g.code }}</code>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ Benchmarks teaser ============ -->
    <section class="section-padding bg-light-surface dark:bg-dark-surface">
      <div class="container-narrow">
        <div class="text-center mb-10">
          <span class="eyebrow">Measured, not promised</span>
          <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-light-text dark:text-dark-text">
            Benchmarks on enwik8
          </h2>
          <p class="text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
            100 MB of English Wikipedia XML, single thread, best-of-N timing, measured with
            <span class="font-mono text-sm">omnizip-bench</span>. Every case also asserts a
            byte-identical double-encode and a clean round trip.
          </p>
        </div>

        <div class="glass-card overflow-x-auto">
          <table class="bench-table w-full">
            <thead>
              <tr>
                <th scope="col" class="text-left">Codec</th>
                <th scope="col" class="text-right">Level</th>
                <th scope="col" class="text-right">Output</th>
                <th scope="col" class="text-right">Ratio</th>
                <th scope="col" class="text-right">Encode</th>
                <th scope="col" class="text-right">Decode</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in benchHighlights" :key="row.codec + row.level">
                <td class="font-mono">{{ row.codec }}</td>
                <td class="text-right font-mono">{{ row.level }}</td>
                <td class="text-right font-mono">{{ row.output }}</td>
                <td class="text-right font-mono">{{ row.ratio }}</td>
                <td class="text-right font-mono">{{ row.encode }}</td>
                <td class="text-right font-mono">{{ row.decode }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-center mt-6">
          <router-link to="/blog/omnizip-rs-announcement" class="text-brand-primary font-medium hover:underline">
            Full methodology, all codecs and the honest caveats &rarr;
          </router-link>
        </p>
      </div>
    </section>

    <!-- ============ Usage ============ -->
    <section class="section-padding">
      <div class="container-narrow">
        <div class="text-center mb-10">
          <span class="eyebrow">Get started</span>
          <h2 class="text-3xl sm:text-4xl font-bold mt-3 mb-4 text-light-text dark:text-dark-text">
            Minutes to first byte
          </h2>
        </div>
        <CodeBlock language="toml">{{ cargoToml }}</CodeBlock>
        <div class="h-4" />
        <CodeBlock language="rust">{{ usageCode }}</CodeBlock>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <BaseButton as="a" :href="config.docsrs.lzma" target="_blank" rel="noopener" variant="primary" size="lg">
            API docs on docs.rs
          </BaseButton>
          <BaseButton as="a" :href="config.github.rust" target="_blank" rel="noopener" variant="secondary" size="lg">
            View on GitHub
          </BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import BaseButton from '../components/atoms/BaseButton.vue'
import FormatBadge from '../components/atoms/FormatBadge.vue'
import CodeBlock from '../components/molecules/CodeBlock.vue'
import config from '../config'

const { initScrollAnimation } = useScrollAnimation()

const stripCompressed = ref(false)

// Measured on enwik8 with omnizip-bench (release build); see the announcement post.
const heroOutputBytes = ref('31,527,197')
const heroRatio = ref('31.5%')

const hexBytes = Array.from({ length: 28 }, (_, i) =>
  (i * 7 + 0x2f).toString(16).padStart(2, '0')
)

onMounted(() => {
  initScrollAnimation()
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    stripCompressed.value = true
  } else {
    setTimeout(() => { stripCompressed.value = true }, 700)
  }
})

const stats = [
  { value: '18', label: 'codec crates' },
  { value: '0', label: 'unsafe blocks' },
  { value: '100%', label: 'deterministic encodes' },
  { value: 'v0.16.89', label: 'live on crates.io' },
  { value: '97k+', label: 'crate downloads' },
  { value: 'MIT/Apache', label: 'dual licensed' },
]

const pipeline = [
  {
    marker: 'ref',
    title: 'The Ruby reference',
    description: 'omnizip ships pure-Ruby LZMA, ZSTD, Brotli and friends — readable OOP, algorithmically correct, covered by thousands of specs. It is the authoritative source for every port.',
  },
  {
    marker: 'port',
    title: 'Line-by-line Rust port',
    description: 'Every Rust module translates its Ruby file directly, keeping method names and structure. Range-coder arithmetic gets explicit u32/u64 carry handling; nothing is re-derived.',
  },
  {
    marker: 'gate',
    title: 'Differential CI gate',
    description: 'CI clones the Ruby repo at a pinned ref, runs both implementations over the shared fixture corpus, and asserts byte-identical output. Divergence blocks the release.',
  },
]

const crateGroups = [
  {
    name: 'General-purpose codecs',
    crates: [
      { name: 'omnizip-lzma', description: 'LZMA / LZMA2 / XZ / lzip encoder + decoder, ported from the Ruby reference.', formats: ['.xz', '.lzma', '.lz'] },
      { name: 'omnizip-zstd', description: 'Zstandard frames with FSE, Huffman, sequences and dictionary support.', formats: ['.zst'] },
      { name: 'omnizip-brotli', description: 'From-spec RFC 7932 implementation with the full quality 0-11 range.', formats: ['.br'] },
      { name: 'omnizip-deflate', description: 'DEFLATE (RFC 1951) with zlib / gzip / raw output formats.', formats: ['zlib', 'gzip', 'raw'] },
      { name: 'omnizip-deflate64', description: 'Microsoft\'s DEFLATE64 extension — a true 64 KB window for ZIP method 9.', formats: ['ZIP m9'] },
      { name: 'omnizip-libdeflate', description: 'In-house libdeflate-compatible DEFLATE, tuned for speed.', formats: ['deflate'] },
      { name: 'omnizip-bzip2', description: 'BWT + MTF + RLE + Huffman, the classic block sorter in safe Rust.', formats: ['.bz2'] },
      { name: 'omnizip-lz4', description: 'LZ4 block + frame formats, fast and HC variants.', formats: ['.lz4'] },
      { name: 'omnizip-snappy', description: 'From-spec Snappy, the fixed-parameter format done exactly.', formats: ['snappy'] },
    ],
  },
  {
    name: 'Ratio hunters & text specialists',
    crates: [
      { name: 'omnizip-ppmd', description: 'PPMd7 + PPMd8 prediction by partial matching with user-tunable memory budgets.', formats: ['PPMd7', 'PPMd8'] },
      { name: 'omnizip-zpaq', description: 'ZPAQ context mixing with a 7-model portfolio — the archival ratio ceiling.', formats: ['.zpaq'] },
      { name: 'omnizip-glza', description: 'GLZA grammar-based compression: it learns a grammar for the input, then emits it.', formats: ['GLZA'] },
      { name: 'omnizip-fsst', description: 'FSST — Fast Static Symbol Table, string preprocessing built for text and CSV.', formats: ['FSST'] },
      { name: 'omnizip-ricepp', description: 'Rice++ for integer-pixel data: FITS images and sensor streams.', formats: ['ricepp'] },
    ],
  },
  {
    name: 'Domain codecs',
    crates: [
      { name: 'omnizip-flac', description: 'Lossless audio: verbatim, FIXED and full LPC prediction with Rice coding.', formats: ['.flac'] },
      { name: 'omnizip-blosc', description: 'BLOSC2 multi-codec container — byte/bit shuffle plus LZ4 for scientific arrays.', formats: ['BLOSC2'] },
    ],
  },
  {
    name: 'Infrastructure',
    crates: [
      { name: 'omnizip-codecs', description: 'The shared Codec trait, CodecRegistry, CompressionLevel and error types.', formats: ['trait'] },
      { name: 'omnizip-filters', description: 'BCJ executable-code filters (x86, ARM, ARM64, PPC, SPARC, IA-64) and delta.', formats: ['BCJ', 'delta'] },
    ],
  },
]

const architecturePoints = [
  {
    title: 'Codec trait, implemented 18 times',
    description: 'compress(level) covers the 90% case; compress_with_options(...) exposes per-codec tunables with real types, no type-erased &dyn Any escape hatch.',
  },
  {
    title: 'Registry dispatch, open for extension',
    description: 'Adding a codec is one new crate and one register() call. Dispatch code never changes — the open/closed principle applied to codecs.',
  },
  {
    title: 'Strict downward layers',
    description: 'Codecs depend on omnizip-codecs only and never reach into each other. Consumers pick codecs via the registry, never codec internals.',
  },
  {
    title: 'Shared utilities, not copy-paste',
    description: 'The binary arithmetic coder and FNV-1a/DJB2 hashes live in omnizip-codecs and are reused by every codec that needs them.',
  },
]

const architectureCode = `use omnizip_codecs::{CodecId, CodecRegistry, CompressionLevel};
use omnizip_lzma::LzmaCodec;
use omnizip_zstd::ZstdCodec;

let mut registry = CodecRegistry::new();
registry.register(Box::new(ZstdCodec::new()));
registry.register(Box::new(LzmaCodec::new()));

// Dispatch by id — dispatch code never changes
// when you add more codecs.
let compressed = registry.compress(
    CodecId::ZSTD,
    data,
    CompressionLevel::new(9),
)?;

let original = registry.decompress(
    CodecId::ZSTD,
    &compressed,
    data.len() as u32,
)?;`

const guarantees = [
  {
    icon: '🛡️',
    title: 'No unsafe, anywhere',
    description: '#![forbid(unsafe_code)] is workspace-wide — not a lint to be silenced, a hard error. Memory safety is not a per-crate decision.',
    code: '#![forbid(unsafe_code)]',
  },
  {
    icon: '🔁',
    title: 'Byte-identical determinism',
    description: 'Same input + same level = the same output on every run, every machine, every Rust version. No hash-map iteration in encode paths, no time-seeded randomness. Content-addressed storage depends on it — and gets it.',
    code: 'assert_eq!(encode(x), encode(x))',
  },
  {
    icon: '🚫',
    title: 'No native dependencies',
    description: 'Not a binding layer over C libraries. Each crate compiles to pure Rust on stable with no build-time code generation — the same property that made the Ruby original portable everywhere.',
    code: '[dependencies] # none',
  },
]

const benchHighlights = [
  { codec: 'bzip2', level: '9', output: '31.5 MB', ratio: '31.5%', encode: '0.9 MiB/s', decode: '1.5 MiB/s' },
  { codec: 'ppmd7', level: '9', output: '32.5 MB', ratio: '32.5%', encode: '1.1 MiB/s', decode: '1.1 MiB/s' },
  { codec: 'lzma (xz)', level: '6', output: '35.7 MB', ratio: '35.7%', encode: '0.2 MiB/s', decode: '46.4 MiB/s' },
  { codec: 'zstd', level: '22', output: '43.6 MB', ratio: '43.6%', encode: '0.3 MiB/s', decode: '79.4 MiB/s' },
  { codec: 'zstd', level: '19', output: '45.2 MB', ratio: '45.2%', encode: '30.8 MiB/s', decode: '149.2 MiB/s' },
  { codec: 'lz4', level: '12', output: '53.0 MB', ratio: '53.0%', encode: '73.1 MiB/s', decode: '145.0 MiB/s' },
]

const cargoToml = `# Cargo.toml — pick exactly the codecs you need
[dependencies]
omnizip-codecs = "0.16"
omnizip-lzma   = "0.16"
omnizip-zstd   = "0.16"`

const usageCode = `use omnizip_codecs::{CodecId, CodecRegistry, CompressionLevel};
use omnizip_lzma::LzmaCodec;
use omnizip_zstd::{ZstdCodec, ZstdLevel};

// One-liners per format
let zst = omnizip_zstd::compress(data, ZstdLevel::Default)?;
let xz = omnizip_lzma::xz_compress(data, 6)?;

// Power-user tunables, fully typed
use omnizip_lzma::LzmaOptions;
let opts = LzmaOptions {
    lc: 3, lp: 0, pb: 2,
    dict_size: 1 << 24,             // 16 MB
    use_optimal_parser: true,
};
let best = omnizip_lzma::xz_compress_with_options(data, &opts)?;`
</script>

<style scoped>
.eyebrow {
  @apply inline-block text-xs font-mono font-semibold uppercase tracking-widest;
  @apply text-accent-purple;
}

.stat-card {
  @apply text-center p-4 rounded-lg;
  @apply bg-light-surface dark:bg-dark-surface;
  @apply border border-light-border dark:border-dark-border;
}

.stat-value {
  @apply text-2xl font-bold text-accent-purple;
}

.stat-label {
  @apply text-sm text-light-muted dark:text-dark-muted;
}

/* Signature: the compression strip */
.hex-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.hex-byte {
  @apply font-mono text-xs px-1.5 py-0.5 rounded;
  @apply bg-accent-teal/10 text-accent-teal;
  transition: opacity 480ms ease, transform 480ms ease;
}

.hex-row.compressed .hex-byte:nth-child(2n) {
  opacity: 0;
  transform: scale(0.4);
}

.hex-row.compressed .hex-byte {
  @apply bg-accent-purple/10 text-accent-purple;
}

.ratio-label {
  @apply text-sm font-bold text-accent-purple;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 400ms ease 600ms, transform 400ms ease 600ms;
}

.ratio-label.shown {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .hex-byte,
  .ratio-label {
    transition: none;
  }
}

/* Pipeline */
.pipeline-card:hover {
  @apply border-accent-purple/40;
}

.step-marker {
  @apply inline-block px-2 py-1 rounded;
  @apply bg-accent-purple/10 text-accent-purple;
}

.pipeline-arrow {
  @apply absolute top-1/2 -right-5 w-6 h-6 -translate-y-1/2;
  @apply text-light-muted dark:text-dark-muted;
}

/* Crates */
.crate-card {
  transition: transform 200ms ease, border-color 200ms ease;
}

.crate-card:hover {
  transform: translateY(-2px);
  @apply border-accent-purple/40;
}

/* Architecture */
.arch-check {
  @apply w-6 h-6 rounded-full;
  @apply bg-accent-purple/20 text-accent-purple;
  @apply flex items-center justify-center;
}

/* Guarantees */
.guarantee-icon {
  @apply w-12 h-12 rounded-xl;
  @apply bg-accent-purple/10;
  @apply flex items-center justify-center text-2xl;
}

.guarantee-code {
  @apply px-2 py-1 rounded bg-light-bg dark:bg-dark-bg;
  @apply text-brand-primary;
}

/* Bench table */
.bench-table {
  @apply text-sm;
}

.bench-table th {
  @apply px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider;
  @apply text-light-muted dark:text-dark-muted;
  @apply border-b border-light-border dark:border-dark-border;
}

.bench-table td {
  @apply px-4 py-3;
  @apply border-b border-light-border/50 dark:border-dark-border/50;
  @apply text-light-text dark:text-dark-text;
}

.bench-table tbody tr:last-child td {
  @apply border-b-0;
}
</style>
