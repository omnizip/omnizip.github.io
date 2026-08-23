---
title: omnizip-rs is here — 18 pure Rust compression crates, verified against Ruby, live on crates.io
date: 2026-08-23
excerpt: "The Omnizip family just grew a Rust wing. Every major codec from the Ruby reference — LZMA, ZSTD, Brotli, bzip2, PPMd, ZPAQ and a dozen more — now ships as a pure Rust crate with zero unsafe code, zero native dependencies, and byte-identical output on every machine. Today we're announcing general availability at v0.16.89, with the full benchmark story below."
stats:
  - value: 18
    label: crates on crates.io
  - value: 0
    label: unsafe blocks, workspace-wide
  - value: 100%
    label: deterministic encodes
  - value: v0.16.89
    label: released today
---

## The short version

We set out to prove that compression formats don't need to be a pile of
vendored C. [Omnizip](/ruby/omnizip), the pure Ruby library, now reads and writes
more formats than libarchive, libmspack, 7-Zip and xz combined — 3,540+
passing tests, zero native dependencies, running anywhere Ruby runs.

Ruby gave us correctness and portability. What it couldn't give us was
speed: a pure Ruby LZMA is a beautiful teaching artifact and a painful
production dependency. So we did the obvious-in-hindsight thing: we kept the
Ruby as the *algorithmic reference* and ported it, line by line, to Rust.
Today that port is complete enough to announce: **18 crates, all on
crates.io, all forbidding unsafe code, all deterministic.**

> Every Rust module is a translation of a Ruby file that already worked.
> The hard part — the math — was done. Rust just made it fast.

## What shipped

One crate per algorithm family, plus a shared trait crate. They never depend
on each other; you add exactly what you need:

- [omnizip-lzma](https://crates.io/crates/omnizip-lzma) — LZMA / LZMA2 / XZ / lzip
- [omnizip-zstd](https://crates.io/crates/omnizip-zstd) — Zstandard, dictionaries included
- [omnizip-brotli](https://crates.io/crates/omnizip-brotli) — RFC 7932, quality 0-11
- [omnizip-bzip2](https://crates.io/crates/omnizip-bzip2) — BWT + MTF + Huffman
- [omnizip-deflate](https://crates.io/crates/omnizip-deflate) / [-deflate64](https://crates.io/crates/omnizip-deflate64) / [-libdeflate](https://crates.io/crates/omnizip-libdeflate) — the DEFLATE trio
- [omnizip-lz4](https://crates.io/crates/omnizip-lz4) — block + frame, fast and HC
- [omnizip-snappy](https://crates.io/crates/omnizip-snappy) — from-spec Snappy
- [omnizip-ppmd](https://crates.io/crates/omnizip-ppmd) — PPMd7 + PPMd8
- [omnizip-zpaq](https://crates.io/crates/omnizip-zpaq) — context mixing, 7-model portfolio
- [omnizip-glza](https://crates.io/crates/omnizip-glza) — grammar-based LZ
- [omnizip-fsst](https://crates.io/crates/omnizip-fsst) — Fast Static Symbol Table
- [omnizip-flac](https://crates.io/crates/omnizip-flac) — lossless audio, full LPC
- [omnizip-ricepp](https://crates.io/crates/omnizip-ricepp) — integer-pixel data (FITS)
- [omnizip-blosc](https://crates.io/crates/omnizip-blosc) — BLOSC2 shuffle container

Together with `omnizip-filters` (BCJ and delta transforms) and
`omnizip-codecs` (the shared trait), that's the whole family. Add them with
`cargo add omnizip-lzma` and you're compressing.

## Benchmarks, with receipts

We measured the codec family on **enwik8** — the first 100 MB of English
Wikipedia XML, the standard text-corpus yardstick — on a single thread,
reporting best-of-N timings with our own `omnizip-bench` harness. Every case
below also passed two checks the harness runs automatically: a
**double-encode determinism assert** (compress twice, require byte-identical
output) and a **round-trip check** against the original input.

The archival ratio-hunters (ZPAQ, GLZA) and high-quality Brotli and DEFLATE
passes take hours at the 100 MB scale on first-release encoders, so their
numbers land with the expanded public benchmark suite shortly after this
post — measured, not estimated. What's in the table is what ran, exactly
as measured.

The headline numbers: **31.5%** best measured ratio (bzip2/9), **149 MiB/s**
fastest decode (zstd/19), and **100%** of measured cases deterministic with
clean round-trips.

| Codec | Level | Output | Ratio | Encode | Decode |
|---|---:|---:|---:|---:|---:|
| bzip2 | 9 | 31,527,197 B | 31.5% | 0.9 MiB/s | 1.5 MiB/s |
| ppmd7 | 9 | 32,500,082 B | 32.5% | 1.1 MiB/s | 1.1 MiB/s |
| lzma (xz) | 6 | 35,650,060 B | 35.7% | 0.2 MiB/s | 46.4 MiB/s |
| ppmd8 | 9 | 42,611,479 B | 42.6% | 0.6 MiB/s | 0.7 MiB/s |
| lz4hc | 3 | 43,047,875 B | 43.0% | 5.2 MiB/s | 117.2 MiB/s |
| lz4hc | 9 | 43,047,875 B | 43.0% | 3.6 MiB/s | 70.5 MiB/s |
| lz4hc | 12 | 43,047,875 B | 43.0% | 3.4 MiB/s | 84.7 MiB/s |
| zstd | 22 | 43,630,876 B | 43.6% | 0.3 MiB/s | 79.4 MiB/s |
| zstd | 19 | 45,167,014 B | 45.2% | 30.8 MiB/s | 149.2 MiB/s |
| zstd | 3 | 46,486,322 B | 46.5% | 15.1 MiB/s | 57.3 MiB/s |
| snappy | 1 | 52,792,256 B | 52.8% | 31.3 MiB/s | 88.3 MiB/s |
| lz4 | 1 | 53,006,804 B | 53.0% | 51.9 MiB/s | 130.9 MiB/s |
| lz4 | 9 | 53,006,804 B | 53.0% | 73.2 MiB/s | 135.1 MiB/s |
| lz4 | 12 | 53,006,804 B | 53.0% | 73.1 MiB/s | 145.0 MiB/s |

`Apple M1 Max · rustc stable · release profile · single thread · best-of-N · deterministic: true, round-trip: ok on every row`

`Results updated after the LZMA2 scale fix (0.16.87) and the ZSTD literals fix (0.16.88); the lzma and zstd 19/22 rows were measured on the fixed releases.`

`0.16.89: fixed external xz interop on mixed content (#329) — a conformance fix; measured ratios are unchanged.`

### The roadmap fine print

These are first-release, from-spec, pure-safe-Rust encoders, and the
throughput campaign is already in flight on the roadmap. What that means for
you today:

- Ratio is here; the last few percent of C-reference *speed* at the
  ultra-quality tiers arrives with the binary-tree match finders, SA-IS
  suffix sorting for bzip2, and profile-guided optimization — all listed,
  all in progress.
- The from-scratch LZ4 and Snappy ports were built format-first: correctness
  and round-trip parity before raw speed, so the family ships with every
  codec pulling its weight on integrity.
- No SIMD yet — and when it comes, it will be `std::simd`, never raw
  `unsafe` intrinsics. We will not trade the safety guarantee for megabytes
  per second.

If you need C-reference throughput today, wrap the C library. If you need
*auditable, safe, deterministic* compression — content-addressed storage,
reproducible builds, constrained targets, supply-chain hygiene — this is the
family you want.

## Using it

Three minutes from `cargo add` to first compressed byte.

```toml
# Pick exactly what you need
[dependencies]
omnizip-codecs = "0.16"
omnizip-lzma   = "0.16"
omnizip-zstd   = "0.16"
```

```rust
use omnizip_codecs::{CodecId, CodecRegistry, CompressionLevel};
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
                                 data.len() as u32)?;
```

Every codec also exposes fully-typed power-user options — no type-erased
`dyn Any` escape hatches. Tune LZMA like the `xz` CLI would, give PPMd a
memory budget, hand Brotli a custom dictionary:

```rust
// LZMA: every knob the xz CLI exposes
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
let br = BrotliCodec::new().compress_with_options(data, opts)?;
```

## Why determinism is the headline, not the footnote

Every codec produces **byte-identical output for the same input and
parameters** — across runs, machines, and Rust versions. That's not a
nice-to-have; it's the property that makes content-addressed storage work.
Our first consumer, [LimniFS](https://github.com/limnifs/limnifs), derives
every storage block ID as `BLAKE3(plaintext)`: if a codec ever emitted two
different byte streams for the same input, dedup would silently break.

So determinism is enforced, not hoped for: dedicated tests compress twice and
assert equality, no hash-map iteration is allowed in encode paths, no
time-seeded randomness exists to leak in. The benchmark harness runs the same
assert on every single case. When we say deterministic, we mean we measured
it.

## The cross-language trick

Here's the part we're proudest of. The Ruby implementations remain the
authoritative algorithmic reference, and CI keeps the two languages honest
with each other: it clones the Ruby repo at a pinned ref, runs both
implementations over the shared fixture corpus, and requires byte-identical
output. A divergence between Ruby and Rust isn't a warning — it's a release
blocker.

The effect is a feedback loop most ports never get. When the Rust decoder
hits a malformed stream edge case, the fix lands in Ruby first, gets a spec,
and the Rust side follows — and vice versa. Two implementations, one truth.

## What's next

- **Binary-tree match finders** for LZMA and ZSTD's ultra levels — closing
  the last ratio gap to the C references.
- **SA-IS suffix sorting** for bzip2's Burrows-Wheeler transform, replacing
  the current O(n log² n) prefix-doubling.
- **Safe SIMD** via `std::simd` for match-length comparison and checksums.
- **More corpora** in the public benchmark suite — Silesia and Calgary join
  enwik8 and Canterbury, plus synthetic LLM-chat, LLM-code and LLM-JSON
  workloads that reflect what people actually compress in 2026.

## Get it

All 18 crates are live on crates.io at v0.16.89, dual-licensed
MIT OR Apache-2.0, MSRV 1.75. API documentation is on docs.rs, and the
repository — including every benchmark script — is public.

- Product page: [/rust](/rust)
- Source: <https://github.com/omnizip/omnizip-rs>
- Crates: <https://crates.io/search?q=omnizip>
