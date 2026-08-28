---
title: "The container layer lands — ozip, every format, deterministic by default"
date: 2026-08-28
excerpt: "omnizip-rs grew from 18 codec crates to 31: RAR5 read/write with encrypted headers, RAR4 read with PPMd and VM filters, 7z with AES, ZIP64, ISO with Rock Ridge and Joliet, XAR, PAR2, RPM — and ozip, a single pure-Rust binary that creates and extracts them all, byte-identical every time. ZSTD's ultra tiers just reached reference parity: 26.99% on enwik8 vs the C zstd's 26.94%."
stats:
  - value: 31
    label: crates in the workspace
  - value: 12
    label: archive formats read/write
  - value: 26.99%
    label: "zstd/19 on enwik8 — reference is 26.94%"
  - value: v0.21.11
    label: current release
---

## What happened since the launch

Five weeks ago we [announced](/blog/2026-08-23-omnizip-rs-announcement) 18
pure Rust codec crates. The plan back then had a second half: the Ruby gem's
archive-container layer — everything that turns a codec into a format —
porting to Rust so a single binary could speak every format the family
supports. That half is done.

The workspace is now **31 crates**: the 18 codecs (137k+ downloads on
crates.io), a 12-crate container layer (`omnizip-archive-core`, `omnizip-zip`,
`omnizip-tar`, `omnizip-sevenzip`, `omnizip-rar`, `omnizip-iso`, `omnizip-xar`,
`omnizip-cpio`, `omnizip-rpm`, `omnizip-par2`, `omnizip-ole`,
`omnizip-crypto`) — and `ozip`, the CLI that ties it all together.

## ozip: one binary, every format

```
ozip xz -6 file              # the codec side: xz/zstd/gzip/bzip2/lzip/lzma
ozip c backup.tar.gz dir/    # create (format by extension or -f)
ozip x archive.zip -C out/   # extract (auto-detected, any format)
ozip t archive.7z            # list names
ozip l archive.rar           # long listing: mode/size/mtime
ozip c data.7z -p secret --volume 100m   # encrypted, split volumes
```

The format registry today: **tar / tar.gz / tar.bz2 / tar.xz / tar.zst, ZIP,
cpio, 7z, RPM, RAR5** — read *and* write — plus **RAR4, XAR** read, with
`--formats` printing the live table. RAR4 and RAR5 take `-p` for encrypted
archives. Creation is **deterministic by default**: the same tree and the
same options produce a byte-identical archive across runs and machines —
timestamps normalized, ordering fixed, `#![forbid(unsafe_code)]` from
argument parsing to the last bit of entropy coding.

## The formats, briefly

Every port kept the house rules: the Ruby implementation as behavioral
reference, the reference C tools as oracles, and acceptance means the
foreign tool and ours agree byte-exactly.

- **RAR5** — read/write, and we went deep: AES-256 entry decryption and
  encrypted headers (`-hp`), multi-volume set stitching, solid streams, LZ
  methods 1–5, BLAKE2sp verification in pure Rust.
- **RAR4** — read-only, and the hard parts are the point: LZSS 15/20/29,
  PPMd variant H/I, the VM filter machinery, RAR3 AES KDF, multi-volume
  stitching, the E8 filter.
- **7z** — solid archives with the full coder mapping onto our codec
  crates, plus real 7zAES key derivation; `7zz` and `ozip t` agree on
  archives either one made.
- **ZIP + ZIP64** — verified past 4 GiB and 65,535 entries.
- **ISO 9660** — a dual-tree writer: primary volume descriptor plus a
  Joliet supplementary descriptor, both trees carrying full Rock Ridge
  metadata, so either tree yields complete POSIX semantics.
- **XAR, cpio, RPM, PAR2, OLE** — XML TOCs, RPM payloads over our codecs,
  Reed-Solomon parity volumes, compound documents.

And the same hardening on the way in: symlink-target validation and
write-through-symlink guards on every extraction path (shipped in 0.20.1),
with unsafe-path opt-outs explicit and per-flag, never global.

## ZSTD's ultra tiers hit reference parity

The binary-tree optimal parser (the `zstd_opt.c` price-parse DP) landed for
levels 16–22 across 0.21.8/.9, and the enwik8 numbers moved accordingly —
measured this morning on the same 100 MB corpus, same session, same
methodology as always:

| zstd level | before | now | reference (system `zstd`) |
|---|---:|---:|---:|
| 3 | 39.41% | 39.41% | 35.45% |
| 19 | 39.21% | **26.99%** | 26.94% |
| 22 | — | **25.33%** | ~26.4% |

Level 19 is at parity with the C encoder's level 19, and level 22 now beats
it — while decoding at **171.7 MiB/s**, the fastest decode we have measured
on any codec. Every row: deterministic encode, clean round-trip. The full
[benchmark table](/blog/2026-08-23-omnizip-rs-announcement#benchmarks-with-receipts)
on the announcement post is updated.

Brotli moved too — the btopt optimal parser for the q10/11 tier and two
ladder fixes that held the rep-driven shape through q6–q9 — with a
performance campaign behind it.

## Ruby side

The reference implementation is not standing still either: the Ruby gem is
at **0.3.34**, with the convenience layer routing archive formats by
extension (`.7z`, `.tar` directory compression), `list_archive` and
`read_from_archive` working on 7z, and the `omnizip` executable repaired.
The differential gate keeps both languages honest on every fixture, on
every release.

## Get it

- Codecs: any of the 18 on crates.io (`cargo add omnizip-lzma`), now at 0.21.9
- `ozip`: build from [the repository](https://github.com/omnizip/omnizip-rs)
  (`cargo build --release -p ozip`) — the CLI ships from the repo while the
  container crates head to the registry
- [Product page](/rust) with the full crate map, updated benchmarks, and the
  format registry
