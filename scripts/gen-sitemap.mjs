// Regenerates public/sitemap.xml from the actual routes and blog posts.
// The blog post URLs derive from the src/content/blog filenames ({date}-{name}.md),
// same as src/models/blog.js — no hand-maintained URLs to drift.

import { readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const BASE = 'https://www.omnizip.org'

const staticRoutes = [
  { loc: '/', changefreq: 'weekly' },
  { loc: '/rust', changefreq: 'weekly' },
  { loc: '/ruby/omnizip', changefreq: 'weekly' },
  { loc: '/ruby/cabriolet', changefreq: 'weekly' },
  { loc: '/ruby/excavate', changefreq: 'weekly' },
  { loc: '/blog', changefreq: 'weekly' },
]

const posts = readdirSync(join(process.cwd(), 'src/content/blog'))
  .filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f))
  .map((f) => ({ loc: `/blog/${f.replace(/\.md$/, '')}`, changefreq: 'monthly' }))
  .sort((a, b) => a.loc.localeCompare(b.loc))

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticRoutes, ...posts]
  .map((u) => `  <url><loc>${BASE}${u.loc}</loc><changefreq>${u.changefreq}</changefreq></url>`)
  .join('\n')}
</urlset>
`

writeFileSync(join(process.cwd(), 'public/sitemap.xml'), xml)
console.log(`sitemap.xml: ${staticRoutes.length} static + ${posts.length} posts`)
