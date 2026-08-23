// Site configuration
export const config = {
  // Base URL for the site
  baseUrl: 'https://www.omnizip.org',

  // Documentation URLs
  docs: {
    omnizip: 'https://www.omnizip.org/omnizip',
    cabriolet: 'https://www.omnizip.org/cabriolet',
    excavate: 'https://omnizip.github.io/excavate',
    rust: 'https://github.com/omnizip/omnizip-rs',
  },

  // Internal site routes
  routes: {
    rust: '/rust',
    blogOmnizipRs: '/blog/omnizip-rs-announcement',
  },

  // GitHub URLs
  github: {
    omnizip: 'https://github.com/omnizip/omnizip',
    cabriolet: 'https://github.com/omnizip/cabriolet',
    excavate: 'https://github.com/omnizip/excavate',
    rust: 'https://github.com/omnizip/omnizip-rs',
    organization: 'https://github.com/omnizip',
  },

  // RubyGems
  rubygems: {
    omnizip: 'https://rubygems.org/gems/omnizip',
    cabriolet: 'https://rubygems.org/gems/cabriolet',
    excavate: 'https://rubygems.org/gems/excavate',
  },

  // crates.io
  crates: {
    index: 'https://crates.io/search?q=omnizip',
    lzma: 'https://crates.io/crates/omnizip-lzma',
    zstd: 'https://crates.io/crates/omnizip-zstd',
    brotli: 'https://crates.io/crates/omnizip-brotli',
    codecs: 'https://crates.io/crates/omnizip-codecs',
  },

  // docs.rs
  docsrs: {
    lzma: 'https://docs.rs/omnizip-lzma',
    zstd: 'https://docs.rs/omnizip-zstd',
    codecs: 'https://docs.rs/omnizip-codecs',
  },

  // Ribose
  ribose: 'https://ribose.com',

  // Site metadata
  site: {
    title: 'Omnizip',
    description: 'Pure Ruby and pure Rust compression libraries with zero native dependencies. Supports 7z, ZIP, RAR, TAR, ISO, XZ, GZIP, BZIP2, ZSTD, Brotli and more.',
    keywords: ['ruby', 'rust', 'compression', 'archive', '7z', 'zip', 'rar', 'tar', 'gzip', 'bzip2', 'lzma', 'zstd', 'brotli', 'pure ruby', 'pure rust'],
  },
}

export default config
