---
title: Cabriolet — every Microsoft compression format, in pure Ruby
date: 2026-01-15
excerpt: "CAB, CHM, HLP, LIT, SZDD, KWAJ and OAB — read and write — with LZSS, MSZIP, LZX and Quantum. The formats libmspack and cabextract never fully covered, in a gem that runs anywhere Ruby runs."
stats:
  - value: 7
    label: Microsoft formats, read & write
  - value: 5
    label: compression methods
  - value: 0
    label: native dependencies
  - value: 2
    label: help formats nobody else writes
---

## The formats everyone forgot

Microsoft spent the 90s and 2000s shipping an entire parallel universe of
compression formats, and almost none of it is readable by modern tooling:

- **CAB** — the cabinet files inside Windows installers and updates
- **CHM** — compiled HTML Help, the documentation format of a thousand
  enterprise applications
- **HLP** — Windows Help (3.x through XP) and DOS QuickHelp
- **LIT** — Microsoft Reader eBooks
- **SZDD** and **KWAJ** — the single-file compressors from Microsoft
  installation media (you know, `.TX_` files)
- **OAB** — Exchange Offline Address Books

libmspack reads some of these. cabextract reads some of them. Almost nothing
*writes* any of them — try generating a valid CHM or repairing a multi-part
cabinet set with open tooling and you'll find the cupboard bare.

Cabriolet set out to cover the features of libmspack *and* cabextract, then
keep going: **complete bidirectional support for all seven formats**, in
pure Ruby.

## What's in 0.2.0

Today's release is general availability — the 0.1.x previews went out quietly
in November, and 0.2.0 is the version we're putting in front of everyone.

- **Full CAB support** including multi-part cabinet sets, embedded cabinet
  search, and a salvage mode for corrupted files — with all five compression
  methods: None, LZSS, MSZIP, LZX and Quantum
- **CHM** extraction *and creation* — rebuild the original HTML
  documentation, or compile new CHM files from HTML sources with proper LZX
  compression and indexing
- **SZDD** including the QBasic variant, with automatic filename
  reconstruction (`.TX_` → `.TXT`)
- **KWAJ** across every compression method, preserving or reconstructing
  original filenames
- **Windows Help** — both WinHelp and QuickHelp, which we believe makes
  Cabriolet the only library in any language that writes both
- **LIT** for non-DRM eBooks, and **OAB** for Exchange migrations

No C extensions, no system libraries: MRI, JRuby, TruffleRuby, any OS.

## Who needs this?

Digital preservation teams migrating legacy documentation. Forensics and
malware research, where installers are the specimen. Packaging teams that
need to *produce* these formats for older toolchains, not just read them.
And anyone maintaining software that still, somehow, in 2026, receives an
OAB.

```ruby
gem install cabriolet
```

```ruby
require 'cabriolet'

# Read a cabinet
cab = Cabriolet::Cabinet.open('example.cab')
cab.files.each do |file|
  puts file.name
  content = file.read
end

# Walk a compiled help file
chm = Cabriolet::Chm.open('documentation.chm')
chm.entries.each { |entry| puts entry.path }

# Extract an Offline Address Book
oab = Cabriolet::Oab.open('offline.oab')
oab.extract_all('/output/directory/')
```

## Part of a family

Cabriolet ships alongside [Omnizip](/ruby/omnizip), the pure Ruby compression
library we launched last month — same architecture philosophy, same
registry-based design, same "runs everywhere" guarantee. Between them, the
Ruby ecosystem can now read and write more archive formats than libarchive.

- Documentation: <https://www.omnizip.org/cabriolet>
- Source: <https://github.com/omnizip/cabriolet>
- Gem: <https://rubygems.org/gems/cabriolet>
