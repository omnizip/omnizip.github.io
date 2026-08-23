---
title: Introducing Omnizip — pure Ruby compression, zero dependencies
date: 2025-12-24
excerpt: "Five releases in three days: pure Ruby LZMA, PPMd, Zstandard and friends, reading and writing 7z, ZIP, TAR, ISO, XZ, BZIP2 — and now RAR4 and RAR5. No C extensions, no system libraries, every platform Ruby runs on."
stats:
  - value: 10+
    label: archive formats read & write
  - value: 8+
    label: compression algorithms
  - value: 0
    label: native dependencies
  - value: 5
    label: releases in 3 days
---

## The problem we kept hitting

Want to read a 7z file from Ruby? You shell out to `7z` and parse text.
Want to create a RAR archive? You pray the binary exists on the container image.
Every serious Ruby compression option is either a pipe to a system tool or a C
binding over libarchive, zlib, or xz.

That means your compression layer is only as portable as your deployment
target. It breaks on JRuby and TruffleRuby. It drags a compiled supply chain
into places — document toolchains, CI runners, locked-down appliances — where
you really don't want it.

So we wrote the compression layer in Ruby. All of it.

## What shipped this week

Omnizip went from first commit to five releases in three days, and the
launch-week feature set is already the broadest pure-Ruby compression library
we know of:

**Archive formats** — full read *and* write:

- **7z** with solid compression, multi-volume support and AES-256
- **ZIP** including ZIP64 and WinZip AES encryption
- **TAR** with POSIX extensions
- **ISO 9660** with Rock Ridge and Joliet
- **XZ**, **GZIP**, **BZIP2** single-file compression
- **RAR4** — read all compression methods, write STORE/FASTEST/NORMAL
- **RAR5** — full read/write with STORE and LZMA, multi-volume, solid
  archives, AES-256 encryption, and PAR2 recovery records
- **PAR2** parity volumes for detecting and *repairing* corruption using
  Reed-Solomon codes

**Compression algorithms** — LZMA and LZMA2 (SDK-compatible, decodable by
XZ Utils and 7-Zip), BZip2, PPMd7 and PPMd8, Deflate, Deflate64,
Zstandard, and Store.

**Preprocessing filters** — the BCJ family for executable code (x86, ARM,
ARM64, PPC, SPARC, IA-64), BCJ2, and Delta — so binaries and tabular data
compress like they should.

There's a command-line interface (`omnizip archive create …`) and a clean
object API, and every archive and result class is Enumerable, because this
is still Ruby and it should feel like it.

## The honest tradeoff

Pure Ruby is 10–60x slower than the native libraries. We're not going to
pretend otherwise. Omnizip is built for the cases where *portable, auditable
and dependency-free* beats *fast*: document pipelines, archival tooling,
cross-platform packaging, anywhere you'd rather not compile C.

If you need every last megabyte per second, bind the C library. If you need
compression that goes everywhere Ruby goes — MRI, JRuby, TruffleRuby, no
compiler in sight — that's what this is.

## It reads like Ruby

```ruby
gem install omnizip
```

```ruby
require 'omnizip'

# Create a 7z archive
Omnizip::Formats::SevenZip::Writer.create('archive.7z') do |sz|
  sz.add_file('document.pdf')
  sz.add_directory('photos/')
end

# Read it back
Omnizip::Formats::SevenZip::Reader.open('archive.7z') do |sz|
  sz.extract_all('output/')
  sz.entries.each { |e| puts e.name }
end

# One-liners
Omnizip.compress_file('input.txt', 'output.zip')
Omnizip.extract_archive('archive.zip', 'output/')
entries = Omnizip.list_archive('archive.zip')
```

## Built to grow

Formats register themselves into a registry; algorithms implement a shared
contract. Adding a format is adding a class, not editing a switch statement
somewhere in the core. That architecture is why this week could move this
fast — and why there's more coming.

The repository, documentation and RubyGems page are live. Pull it down,
throw your weirdest archive at it, and tell us what breaks.

- Documentation: <https://www.omnizip.org/omnizip>
- Source: <https://github.com/omnizip/omnizip>
- Gem: <https://rubygems.org/gems/omnizip>
