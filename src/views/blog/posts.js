// Blog post registry — the index at /blog lists whatever is registered here.
// Adding a post: create src/views/blog/<Name>.vue, add a route in src/router/index.js,
// and add its metadata here (newest first).
export const posts = [
  {
    slug: 'omnizip-rs-announcement',
    title: 'omnizip-rs is here: 18 pure Rust compression crates, verified against Ruby, live on crates.io',
    date: '2026-08-23',
    excerpt: 'The Omnizip family grows a Rust wing. Every major codec from the Ruby reference — LZMA, ZSTD, Brotli, bzip2, PPMd, ZPAQ and a dozen more — now ships as a pure Rust crate with zero unsafe code and byte-identical output. Benchmarks, examples, and the full story inside.',
  },
]
