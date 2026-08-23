---
title: Excavate joins the Omnizip family
date: 2026-02-25
excerpt: "The recursive-extraction engine born inside the Fontist project five years ago is now a first-class Omnizip suite member — 100% pure Ruby, rebuilt on Omnizip and Cabriolet, and shipping 1.0 today."
stats:
  - value: 5 years
    label: in production inside Fontist
  - value: 100%
    label: pure Ruby, zero compiled deps
  - value: 1.0
    label: released today
  - value: ∞
    label: nesting depth (within reason)
---

## Born in Fontist

If you've ever installed a font programmatically, you know the real problem
isn't the font — it's the packaging. Fonts arrive as ZIP and 7z and TAR.GZ
and MSI and RPM, and then *inside* those archives, more archives. In 2021
the [Fontist](https://github.com/fontist/fontist) project — the font
installer used by document toolchains — needed something that could unpack
whatever it was handed, recursively, without a committee of format-specific
handlers. The extractor that grew there was called Excavate, and today we're
adopting it into the Omnizip family.

Five years of font packages, installers and weird nested distributions have
hammered Excavate into exactly the tool this job needs. It's earned its own
home.

## Went pure Ruby, then went 1.0

Two things happened on the way here:

First, Excavate shed its compiled dependencies. As of 0.3.9 it is **100%
pure Ruby with zero native code** — the format and compression engines were
replaced by [Omnizip](/ruby/omnizip) and [Cabriolet](/ruby/cabriolet), our pure Ruby
compression libraries. One dependency decision eliminated an entire class
of "doesn't build on this platform" issues.

Then today, with its new home and its new foundations, Excavate 1.0 ships:

- **Recursive extraction** — archives inside archives, with multi-level
  nested path support and recursion auto-enabled
- **One interface for every format** — ZIP, 7z, TAR, GZIP, XZ, BZIP2,
  CAB, MSI, RPM, PKG, CPIO…, all behind the same `extract` call
- **Selective extraction** — by file list, glob filter, or arbitrary
  predicate
- **A CLI**, for when you just want the files out

```ruby
gem install excavate
```

```ruby
require 'excavate'

# Just extract it
Excavate::Archive.new('package.zip').extract

# An installer with archives inside archives
Excavate::Archive.new('installer.msi').extract(
  recursive_packages: true
)

# Only what you need
Excavate::Archive.new('fonts.7z').extract(
  filter: '**/*.ttf'
)
Excavate::Archive.new('data.tar.gz').extract(
  files: ['config/settings.json']
)
```

## The suite is complete

With Excavate in place, the Omnizip family now covers the whole story in
pure Ruby:

- **Omnizip** — read and write every major archive and compression format
- **Cabriolet** — the Microsoft formats, bidirectionally
- **Excavate** — the glue that unpacks anything, recursively

Point Excavate at whatever you downloaded. It'll get to the bottom of it.

- Documentation: <https://omnizip.github.io/excavate>
- Source: <https://github.com/omnizip/excavate>
- Gem: <https://rubygems.org/gems/excavate>
