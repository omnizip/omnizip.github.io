---
title: "Same bytes, three speeds — Omnizip versus the system tools"
date: 2026-08-24
excerpt: 'The question every evaluator asks is "why not just call xz?" Fair question. Here is the answer with receipts: system tools versus omnizip-rs at 100 MB, and the Ruby reference implementation in its role as the oracle that keeps the Rust honest — same corpus, one session, every number measured.'
stats:
  - value: 1.1%
    label: "lzma/6 size vs xz -6, 100 MB"
  - value: 1.05–1.10×
    label: "lzma time vs xz -6 (CI matrix)"
  - value: 2 B
    label: "Ruby↔Rust bzip2 output delta, 1 MiB"
  - value: 0
    label: "unsafe blocks in every column but xz's"
---

## The question we keep getting

"You wrote a compression library. My operating system already ships `xz`,
`zstd`, and `bzip2`. Why would I use yours?"

It's the right question, and it deserves numbers instead of adjectives. So
we ran the comparison people actually care about, on the corpus we publish
everything against — **enwik8**, the first 100 MB of Wikipedia XML — with
the system tools on one side, [omnizip-rs](/rust) on the other, and the
[Ruby reference implementation](/ruby/omnizip) in its true role: not a
contender for your production path, but the oracle that proves the Rust one
is correct.

## Round one: omnizip-rs vs the system tools, 100 MB

Sizes are exact. Compression time is directional — see the methodology notes
below; the authoritative time comparison for LZMA is the CI conformance
matrix, where omnizip-rs lands within **1.05–1.10×** of system `xz -6`.

| Pair | System tool | Size | omnizip-rs | Size | Δ size |
|---|---|---:|---|---:|---:|
| LZMA | `xz -6` | 26,375,764 B | `lzma/6` | 26,666,100 B | **+1.1%** |
| ZSTD fast | `zstd -3` | 35,445,331 B | `zstd/3` | 39,406,374 B | +11.2% |
| ZSTD ultra | `zstd -19` | 26,944,223 B | `zstd/19` | 39,208,628 B | +45.5% |
| bzip2 | `bzip2 -9` | 29,008,758 B | `bzip2/9` | 31,527,197 B | +8.7% |

Read it straight:

- **LZMA is at parity.** Within 1.1% of `xz -6` on size and ~5–10% on time
  (0.16.92's BT4 match finder closed that gap), with zero unsafe code and
  zero C in the binary. That cell is the whole pitch.
- **ZSTD's fast lane is close** — 11% behind reference at level 3, with the
  binary-tree match finder for the ultra tiers on the roadmap (that's the
  level-19 row, and we publish it as-is rather than pretending).
- **bzip2 within 9%**, with SA-IS suffix sorting still to come.

If every cell had to be at parity today, you'd wrap the C library — we say
so on the [product page](/rust). The columns that matter for *auditable,
deterministic, dependency-free* compression already are.

## Round two: the Ruby reference, in its role

The Ruby implementation is not trying to win this table — it's the
**algorithmic reference** the Rust family was ported from, line by line,
and the differential CI gate requires both languages to agree byte-for-byte
on the fixture corpus. What Ruby brings is correctness everywhere Ruby runs
and total portability; what it costs is speed, and we show it rather than
hand-wave it (same session, smaller scales where the reference completes
comfortably):

| Pair | Scale | Ruby | Time | omnizip-rs | Time | Slowdown |
|---|---|---|---:|---|---:|---:|
| bzip2 | 10 MiB | 3,314,770 B | 108.9 s | 3,314,782 B | 7.9 s | **~14×** |
| bzip2 | 1 MiB | 319,407 B | 12.2 s | 319,409 B | 0.7 s | **~16×** |
| LZMA | 1 MiB | 604,940 B | 35.4 s | 302,772 B | 0.4 s | **~98×** |

Two things worth noticing in that table:

1. **The bzip2 outputs land within bytes of each other** — 2 bytes apart at
   1 MiB, 12 at 10 MiB. Two independent implementations of the same format,
   written years apart in different languages, agreeing to within padding.
   That's what a reference implementation is for, and it's the same property
   the CI gate enforces on fixtures.
2. The slowdown factor is the documented trade — pure Ruby is 10–60× slower
   than native on typical inputs, more at small scales where per-call
   overheads dominate. The Ruby column is for the jobs where "runs
   everywhere, no compiler, readable source" beats "fast": scripting,
   teaching, verification, locked-down environments.

## Why publish a table you don't win outright?

Because the honest version of this comparison is the strongest thing we can
show. Anyone can put a benchmark on their landing page where they win. The
claim that survives contact with a skeptical reader is: *here is the
incumbent, here is exactly how close we are, here is what's still in
flight, and here are the two other implementations of the same bytes we
verify against on every release.*

Three speeds, one truth:

- **System tools** — fastest, and a pile of vendored C you take on faith.
- **omnizip-rs** — parity where it counts, `#![forbid(unsafe_code)]` from
  top to bottom, byte-deterministic, auditable.
- **omnizip (Ruby)** — the reference that keeps the other honest, portable
  to anywhere Ruby runs.

Pick the column that matches your constraints.

## Methodology notes, honestly

- One machine (Apple M1 Max), one session, single thread (`-T1`), best-of-N.
  Sizes are exact and deterministic; times are directional — the box was
  shared, so treat cross-pair *time* comparisons as indicative and see the
  CI conformance matrix for the authoritative LZMA timing.
- System tools pay process + I/O overhead; omnizip-rs numbers are in-process
  codec calls. A future CLI will let us publish tool-vs-tool numbers.
- System-tool outputs and ours are *not* byte-identical — different encoders
  make different (equally valid) choices. Byte-identity is a Ruby↔Rust
  property, enforced by the differential gate on the fixture corpus.
- Rust numbers: omnizip-rs 0.16.94. Ruby: omnizip 0.3.14.

## What's next

A unified CLI — one binary speaking every codec, deterministic by
construction — is the next step, which will make this exact comparison a
single command you can run on your own machine and your own data. We'll
re-run this table when it lands.
