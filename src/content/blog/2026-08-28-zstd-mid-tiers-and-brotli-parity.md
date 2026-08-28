---
title: "The whole zstd ladder is optimal-parsed — and Brotli's high tiers reach parity"
date: 2026-08-28
excerpt: "Three releases since the container-layer announcement: zstd levels 8 through 22 all route through the price-parse optimal parser now, the mid tiers deliver near-ultra ratio at triple the encode speed, and the q10/11 literal-assignment contest closes Brotli's last documented size gap — beating the reference on q11. Measured, as always."
stats:
  - value: 28.2%
    label: "zstd/12 and /16 on enwik8 — near-ultra ratio"
  - value: 222.8 MiB/s
    label: "zstd/16 decode — the family's new speed record"
  - value: 0.709×
    label: "zstd/16 vs reference on the 100 MB conformance fixture"
  - value: v0.21.11
    label: "released today"
---

## One parser, the whole ladder

When the [btopt price-parse DP](/blog/2026-08-23-omnizip-rs-announcement#benchmarks-with-receipts)
landed for zstd levels 16–22, the mid tiers were still on the older lazy
strategies. Three releases later — 0.21.9 wiring Btlazy2 (L13–15),
0.21.11 wiring Lazy2 (L8–12), both through the optimal parser — **every
zstd level from 8 to 22 is price-parsed now**: the same dynamic-programming
parse that made the ultra tiers competitive with the C reference, all the
way down the ladder.

Measured this morning on enwik8 (100 MB, single thread, same methodology as
always — determinism and round-trip asserted per row):

| zstd level | Output | Ratio | Encode | Decode |
|---|---:|---:|---:|---:|
| 12 | 28,237,459 B | 28.2% | 1.8 MiB/s | 216.4 MiB/s |
| 16 | 28,186,051 B | 28.2% | 1.8 MiB/s | **222.8 MiB/s** |
| 19 | 26,991,678 B | 27.0% | 0.7 MiB/s | 134.9 MiB/s |
| 22 | 25,331,420 B | 25.3% | 0.7 MiB/s | 171.7 MiB/s |

The mid tiers are the story: **near-ultra ratio (28.2% vs 27.0%) at 2.6×
the encode speed, with the fastest decode the family has ever measured** —
223 MiB/s at level 16, edging out even level 22's 172. For the
ratio-per-second sweet spot, levels 12–16 just became the obvious pick.

## The 0.21.10 detail: ultra weights at level 16

The C reference deliberately handicaps offsets ≥ 2²⁰ in btopt's price model
(two bits per excess bit, favoring decode-side cache locality). Dropping
that handicap at L16 — using the ultra-tier price model there — moved the
conformance matrix hard:

| Fixture (100 MB / 4 MB corpora) | before | after | vs reference |
|---|---:|---:|---:|
| big100m, L16 | 8,222,199 B | **5,185,455 B** | 0.709× |
| fits4m, L16 | 2,657,726 B | 2,650,552 B | 0.995× |
| csv-real, L16 | 402,212 B | 401,332 B | 0.995× |

Level 16 now *beats* the reference on the big fixture outright — the
largest single-cell margin in the matrix — with L17–22 unchanged.

## Brotli: the last size gap, closed from the emission side

Brotli's q10/11 had one stubborn cell left. A DEC_STATS decomposition
showed the parse itself comparable — the gap was in literal entropy:
833K bits against the reference's 387K, fourteen literal trees against
166. The q5–9 "decided static map" shortcut had been silently disabling the
literal block splitter at the top tiers too.

The fix is a contest: at q10/11, both literal assignments — the decided
static map and the full splitter — are costed per metablock, and the
smaller one ships. Either can win depending on the corpus, so the encoder
measures instead of guessing:

| Fixture | before | after | reference |
|---|---:|---:|---:|
| regcsv q10 | 181,553 B (1.339×) | **139,326 B** | 135,599 B (1.027×) |
| regcsv q11 | 171,037 B (1.089×) | **138,592 B** | 157,106 B (**0.882× — beats**) |

q11 is now smaller than the C encoder on that fixture, q10 within 2.7%,
q5–9 outputs byte-identical to before, and the q10/11 outputs decode
byte-exact through the system `brotli` CLI. Four earlier attempts at
closing this from the parse side had failed; the gap was emission-side all
along.

## Ruby side

The reference gem is at **0.3.36**: convenience errors now name the
resolved format (no more guessing which handler rejected your `.7z`), and
the verify-password spec carries the PKCS#7 probabilistic caveat the
format actually has.

## The shape of the family

Step back and the pattern across these three releases is the point: the
porting phase produced correct codecs, and what follows is systematic,
measured convergence on the reference — one price model, one literal
contest, one strategy wiring at a time, each verified against the C tools
and the Ruby reference before it ships. The [benchmark table](/rust) keeps
the receipts.

- zstd: levels 8–22 optimal-parsed, mid tiers near-ultra at 223 MiB/s decode
- brotli: q11 beats the reference, q10 within 3%
- All of it: `#![forbid(unsafe_code)]`, byte-deterministic, 100/100 brotli
  and 184/184 zstd tests green
