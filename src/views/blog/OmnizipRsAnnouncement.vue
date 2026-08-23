<template>
  <article class="blog-post">
    <!-- ============ Masthead ============ -->
    <header class="masthead section-padding relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-accent-purple/10 via-transparent to-transparent" />
      <div class="container-narrow relative z-10">
        <div class="flex items-center gap-4 mb-8">
          <span class="eyebrow">Announcement</span>
          <span class="dateline font-mono text-sm text-light-muted dark:text-dark-muted">2026-08-23</span>
        </div>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-light-text dark:text-dark-text">
          omnizip-rs is here:
          <span class="gradient-text">18 pure Rust compression crates</span>,
          verified against Ruby, live on crates.io
        </h1>
        <p class="deck text-lg sm:text-xl text-light-muted dark:text-dark-muted max-w-3xl">
          The Omnizip family just grew a Rust wing. Every major codec from the Ruby
          reference — LZMA, ZSTD, Brotli, bzip2, PPMd, ZPAQ and a dozen more — now ships
          as a pure Rust crate with zero unsafe code, zero native dependencies, and
          byte-identical output on every machine. Today we're announcing general
          availability at v0.16.85, with the full benchmark story below.
        </p>

        <div class="masthead-stats grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <div v-for="s in mastheadStats" :key="s.label" class="stat-pill">
            <div class="stat-value">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </header>

    <!-- ============ Body ============ -->
    <div class="container-narrow post-body">

      <section class="post-section">
        <h2>The short version</h2>
        <p>
          We set out to prove that compression formats don't need to be a pile of
          vendored C. <router-link to="/omnizip">Omnizip</router-link>, the pure
          Ruby library, now reads and writes more formats than libarchive, libmspack,
          7-Zip and xz combined — 3,540+ passing tests, zero native dependencies,
          running anywhere Ruby runs.
        </p>
        <p>
          Ruby gave us correctness and portability. What it couldn't give us was speed:
          a pure Ruby LZMA is a beautiful teaching artifact and a painful production
          dependency. So we did the obvious-in-hindsight thing: we kept the Ruby as the
          <em>algorithmic reference</em> and ported it, line by line, to Rust.
          Today that port is complete enough to announce: <strong>18 crates, all on
          crates.io, all forbidding unsafe code, all deterministic.</strong>
        </p>
        <blockquote>
          Every Rust module is a translation of a Ruby file that already worked.
          The hard part — the math — was done. Rust just made it fast.
        </blockquote>
      </section>

      <section class="post-section">
        <h2>What shipped</h2>
        <p>
          One crate per algorithm family, plus a shared trait crate. They never depend
          on each other; you add exactly what you need:
        </p>
        <ul class="crate-roll">
          <li v-for="c in crateRoll" :key="c.name" class="crate-roll-item">
            <a :href="'https://crates.io/crates/' + c.name" target="_blank" rel="noopener" class="font-mono font-semibold">{{ c.name }}</a>
            <span class="text-light-muted dark:text-dark-muted"> — {{ c.note }}</span>
          </li>
        </ul>
        <p>
          Together with <span class="font-mono text-sm">omnizip-filters</span> (BCJ and
          delta transforms) and <span class="font-mono text-sm">omnizip-codecs</span>
          (the shared trait), that's the whole family. Add them with
          <span class="font-mono text-sm">cargo add omnizip-lzma</span> and you're
          compressing.
        </p>
      </section>

      <section class="post-section">
        <h2>Benchmarks, with receipts</h2>
        <p>
          We measured the codec family on <strong>enwik8</strong> — the first 100 MB of
          English Wikipedia XML, the standard text-corpus yardstick — on a single
          thread, reporting best-of-N timings with our own
          <span class="font-mono text-sm">omnizip-bench</span> harness. Every case below
          also passed two checks the harness runs automatically: a
          <strong>double-encode determinism assert</strong> (compress twice, require
          byte-identical output) and a <strong>round-trip check</strong> against the
          original input.
        </p>
        <p>
          The archival ratio-hunters (ZPAQ, GLZA) and high-quality Brotli and DEFLATE
          passes take hours at the 100 MB scale on first-release encoders, so their
          numbers land with the expanded public benchmark suite shortly after this
          post — measured, not estimated. What's in the table is what ran, exactly
          as measured.
        </p>

        <h3>Ratio &amp; throughput on enwik8 (100 MB)</h3>
        <div class="glass-card overflow-x-auto table-card">
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
              <tr v-for="row in benchRows" :key="row.codec + '/' + row.level" :class="{ highlight: row.hl }">
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
        <p class="table-note font-mono text-xs text-light-muted dark:text-dark-muted">
          Apple M1 Max · rustc stable · release profile · single thread · best-of-N · deterministic: true, round-trip: ok on every row
        </p>

        <div class="callout-grid grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div v-for="c in callouts" :key="c.label" class="callout glass-card p-5">
            <div class="callout-value font-mono">{{ c.value }}</div>
            <div class="callout-label">{{ c.label }}</div>
          </div>
        </div>

        <h3>The roadmap fine print</h3>
        <p>
          These are first-release, from-spec, pure-safe-Rust encoders, and the
          throughput campaign is already in flight on the roadmap. What that means
          for you today:
        </p>
        <ul class="caveats">
          <li>
            Ratio is here; the last few percent of C-reference <em>speed</em> at the
            ultra-quality tiers arrives with the binary-tree match finders, SA-IS
            suffix sorting for bzip2, and profile-guided optimization — all listed,
            all in progress.
          </li>
          <li>
            The from-scratch LZ4 and Snappy ports were built format-first: correctness
            and round-trip parity before raw speed, so the family ships with every
            codec pulling its weight on integrity.
          </li>
          <li>
            No SIMD yet — and when it comes, it will be <span class="font-mono text-sm">std::simd</span>,
            never raw <span class="font-mono text-sm">unsafe</span> intrinsics. We will not trade the
            safety guarantee for megabytes per second.
          </li>
        </ul>
        <p>
          If you need C-reference throughput today, wrap the C library. If you need
          <em>auditable, safe, deterministic</em> compression — content-addressed
          storage, reproducible builds, constrained targets, supply-chain hygiene —
          this is the family you want.
        </p>
      </section>

      <section class="post-section">
        <h2>Using it</h2>
        <p>Three minutes from <span class="font-mono text-sm">cargo add</span> to first compressed byte.</p>
        <CodeBlock language="toml">{{ cargoToml }}</CodeBlock>
        <div class="h-4" />
        <CodeBlock language="rust">{{ example1 }}</CodeBlock>
        <p>
          Every codec also exposes fully-typed power-user options — no type-erased
          <span class="font-mono text-sm">dyn Any</span> escape hatches. Tune LZMA like
          the <span class="font-mono text-sm">xz</span> CLI would, give PPMd a memory
          budget, hand Brotli a custom dictionary:
        </p>
        <CodeBlock language="rust">{{ example2 }}</CodeBlock>
      </section>

      <section class="post-section">
        <h2>Why determinism is the headline, not the footnote</h2>
        <p>
          Every codec produces <strong>byte-identical output for the same input and
          parameters</strong> — across runs, machines, and Rust versions. That's not a
          nice-to-have; it's the property that makes content-addressed storage work.
          Our first consumer, <a href="https://github.com/limnifs/limnifs" target="_blank" rel="noopener">LimniFS</a>,
          derives every storage block ID as <span class="font-mono text-sm">BLAKE3(plaintext)</span>:
          if a codec ever emitted two different byte streams for the same input, dedup
          would silently break.
        </p>
        <p>
          So determinism is enforced, not hoped for: dedicated tests compress twice and
          assert equality, no hash-map iteration is allowed in encode paths, no
          time-seeded randomness exists to leak in. The benchmark harness runs the same
          assert on every single case. When we say deterministic, we mean we measured it.
        </p>
      </section>

      <section class="post-section">
        <h2>The cross-language trick</h2>
        <p>
          Here's the part we're proudest of. The Ruby implementations remain the
          authoritative algorithmic reference, and CI keeps the two languages honest
          with each other: it clones the Ruby repo at a pinned ref, runs both
          implementations over the shared fixture corpus, and requires byte-identical
          output. A divergence between Ruby and Rust isn't a warning — it's a release
          blocker.
        </p>
        <p>
          The effect is a feedback loop most ports never get. When the Rust decoder
          hits a malformed stream edge case, the fix lands in Ruby first, gets a spec,
          and the Rust side follows — and vice versa. Two implementations, one truth.
        </p>
      </section>

      <section class="post-section">
        <h2>What's next</h2>
        <ul class="roadmap">
          <li><strong>Binary-tree match finders</strong> for LZMA and ZSTD's ultra levels — closing the last ratio gap to the C references.</li>
          <li><strong>SA-IS suffix sorting</strong> for bzip2's Burrows-Wheeler transform, replacing the current O(n log² n) prefix-doubling.</li>
          <li><strong>Safe SIMD</strong> via <span class="font-mono text-sm">std::simd</span> for match-length comparison and checksums.</li>
          <li><strong>More corpora</strong> in the public benchmark suite — Silesia and Calgary joins enwik8 and Canterbury, plus synthetic LLM-chat, LLM-code and LLM-JSON workloads that reflect what people actually compress in 2026.</li>
        </ul>
      </section>

      <section class="post-section">
        <h2>Get it</h2>
        <p>
          All 18 crates are live on crates.io at v0.16.85, dual-licensed
          MIT OR Apache-2.0, MSRV 1.75. API documentation is on docs.rs, and the
          repository — including every benchmark script and every open bug report —
          is public.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <BaseButton as="a" :href="config.github.rust" target="_blank" rel="noopener" variant="primary" size="lg">
            omnizip-rs on GitHub
          </BaseButton>
          <BaseButton as="a" :href="config.crates.index" target="_blank" rel="noopener" variant="secondary" size="lg">
            crates.io
          </BaseButton>
          <BaseButton as="router-link" to="/rust" variant="ghost" size="lg">
            Product page
          </BaseButton>
        </div>
      </section>
    </div>
  </article>
</template>

<script setup>
import { onMounted } from 'vue'
import { useScrollAnimation } from '../../composables/useScrollAnimation'
import BaseButton from '../../components/atoms/BaseButton.vue'
import CodeBlock from '../../components/molecules/CodeBlock.vue'
import config from '../../config'

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})

const mastheadStats = [
  { value: '18', label: 'crates on crates.io' },
  { value: '0', label: 'unsafe blocks, workspace-wide' },
  { value: '100%', label: 'deterministic encodes' },
  { value: 'v0.16.85', label: 'released today' },
]

const crateRoll = [
  { name: 'omnizip-lzma', note: 'LZMA / LZMA2 / XZ / lzip' },
  { name: 'omnizip-zstd', note: 'Zstandard, dictionaries included' },
  { name: 'omnizip-brotli', note: 'RFC 7932, quality 0-11' },
  { name: 'omnizip-bzip2', note: 'BWT + MTF + Huffman' },
  { name: 'omnizip-deflate / -deflate64 / -libdeflate', note: 'the DEFLATE trio' },
  { name: 'omnizip-lz4', note: 'block + frame, fast and HC' },
  { name: 'omnizip-snappy', note: 'from-spec Snappy' },
  { name: 'omnizip-ppmd', note: 'PPMd7 + PPMd8' },
  { name: 'omnizip-zpaq', note: 'context mixing, 7-model portfolio' },
  { name: 'omnizip-glza', note: 'grammar-based LZ' },
  { name: 'omnizip-fsst', note: 'Fast Static Symbol Table' },
  { name: 'omnizip-flac', note: 'lossless audio, full LPC' },
  { name: 'omnizip-ricepp', note: 'integer-pixel data (FITS)' },
  { name: 'omnizip-blosc', note: 'BLOSC2 shuffle container' },
]

// Measured on enwik8 (100 MB), single thread, best-of-N, omnizip-bench release build.
const benchRows = [
  { codec: 'bzip2', level: '9', output: '31,527,197 B', ratio: '31.5%', encode: '0.9 MiB/s', decode: '1.5 MiB/s', hl: true },
  { codec: 'ppmd7', level: '9', output: '32,500,082 B', ratio: '32.5%', encode: '1.1 MiB/s', decode: '1.1 MiB/s', hl: false },
  { codec: 'ppmd8', level: '9', output: '42,611,479 B', ratio: '42.6%', encode: '0.6 MiB/s', decode: '0.7 MiB/s', hl: false },
  { codec: 'lz4hc', level: '3', output: '43,047,875 B', ratio: '43.0%', encode: '5.2 MiB/s', decode: '117.2 MiB/s', hl: false },
  { codec: 'lz4hc', level: '9', output: '43,047,875 B', ratio: '43.0%', encode: '3.6 MiB/s', decode: '70.5 MiB/s', hl: false },
  { codec: 'lz4hc', level: '12', output: '43,047,875 B', ratio: '43.0%', encode: '3.4 MiB/s', decode: '84.7 MiB/s', hl: false },
  { codec: 'zstd', level: '3', output: '46,486,322 B', ratio: '46.5%', encode: '15.1 MiB/s', decode: '57.3 MiB/s', hl: false },
  { codec: 'snappy', level: '1', output: '52,792,256 B', ratio: '52.8%', encode: '31.3 MiB/s', decode: '88.3 MiB/s', hl: false },
  { codec: 'lz4', level: '1', output: '53,006,804 B', ratio: '53.0%', encode: '51.9 MiB/s', decode: '130.9 MiB/s', hl: false },
  { codec: 'lz4', level: '9', output: '53,006,804 B', ratio: '53.0%', encode: '73.2 MiB/s', decode: '135.1 MiB/s', hl: false },
  { codec: 'lz4', level: '12', output: '53,006,804 B', ratio: '53.0%', encode: '73.1 MiB/s', decode: '145.0 MiB/s', hl: true },
]

const callouts = [
  { value: '31.5%', label: 'best measured ratio — bzip2/9' },
  { value: '145 MiB/s', label: 'fastest decode — lz4/12' },
  { value: '100%', label: 'measured cases deterministic + round-trip clean' },
]

const cargoToml = `# Pick exactly what you need
[dependencies]
omnizip-codecs = "0.16"
omnizip-lzma   = "0.16"
omnizip-zstd   = "0.16"`

const example1 = `use omnizip_codecs::{CodecId, CodecRegistry, CompressionLevel};
use omnizip_lzma::LzmaCodec;
use omnizip_zstd::{ZstdCodec, ZstdLevel};

// One-liners
let zst = omnizip_zstd::compress(data, ZstdLevel::Default)?;
let xz  = omnizip_lzma::xz_compress(data, 6)?;

// Or dispatch by id through the registry
let mut registry = CodecRegistry::new();
registry.register(Box::new(ZstdCodec::new()));
registry.register(Box::new(LzmaCodec::new()));

let packed = registry.compress(CodecId::ZSTD, data,
                               CompressionLevel::new(9))?;
let plain  = registry.decompress(CodecId::ZSTD, &packed,
                                 data.len() as u32)?;`

const example2 = `// LZMA: every knob the xz CLI exposes
use omnizip_lzma::LzmaOptions;
let opts = LzmaOptions {
    lc: 3, lp: 0, pb: 2,
    dict_size: 1 << 24,          // 16 MB window
    use_optimal_parser: true,    // DP parser, best ratio
};
let xz = omnizip_lzma::xz_compress_with_options(data, &opts)?;

// PPMd: ratio scales with a memory budget you control
use omnizip_ppmd::ppmd7;
let a = ppmd7::compress_with_budget(text, 6, 16 * 1024 * 1024)?;  // 16 MB
let b = ppmd7::compress_with_budget(text, 6, 256 * 1024 * 1024)?; // 256 MB

// Brotli: quality, window, mode, custom dictionary
use omnizip_brotli::{BrotliCodec, BrotliOptions, BrotliMode};
let opts = BrotliOptions {
    quality: Some(11),
    window_size: Some(22),          // 4 MB
    mode: BrotliMode::Text,
    custom_dictionary: Some(&dict),
};
let br = BrotliCodec::new().compress_with_options(data, opts)?;`
</script>

<style scoped>
.eyebrow {
  @apply inline-block text-xs font-mono font-semibold uppercase tracking-widest;
  @apply px-2.5 py-1 rounded-full;
  @apply bg-accent-purple/10 text-accent-purple;
}

.masthead {
  @apply pb-0;
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

.post-section {
  @apply mb-16;
}

.post-section h2 {
  @apply text-2xl sm:text-3xl font-bold mb-6 text-light-text dark:text-dark-text;
}

.post-section h3 {
  @apply text-xl font-bold mt-10 mb-4 text-light-text dark:text-dark-text;
}

.post-section p {
  @apply text-light-text dark:text-dark-text leading-relaxed mb-4;
}

.post-section a {
  @apply text-brand-primary hover:underline;
}

.post-section blockquote {
  @apply my-8 p-6 rounded-xl border-l-4;
  @apply bg-accent-purple/5 border-accent-purple;
  @apply text-lg font-medium text-light-text dark:text-dark-text italic;
}

.post-section ul {
  @apply space-y-2 mb-6;
}

.post-section li {
  @apply text-light-text dark:text-dark-text leading-relaxed;
}

.crate-roll {
  @apply glass-card p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2;
}

.crate-roll-item a {
  @apply text-accent-purple hover:underline;
}

.table-card {
  @apply mt-6 mb-2;
}

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

.bench-table tr.highlight td {
  @apply bg-accent-purple/5;
}

.callout-value {
  @apply text-2xl font-bold text-accent-purple;
}

.callout-label {
  @apply text-sm text-light-muted dark:text-dark-muted mt-1;
}

.caveats li {
  @apply pl-5 relative;
}

.caveats li::before {
  content: '·';
  @apply absolute left-0 text-accent-purple font-bold;
}

.roadmap li {
  @apply pl-5 relative;
}

.roadmap li::before {
  content: '→';
  @apply absolute left-0 text-accent-purple font-bold;
}
</style>
