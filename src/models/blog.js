// Blog model — the single source of truth for posts.
//
// A post is a markdown file under src/content/blog/ with frontmatter:
//
//   ---
//   title: string (required)
//   date: YYYY-MM-DD (required)
//   excerpt: string (required)
//   category: string (optional, defaults to "Announcement")
//   stats: (optional) list of { value, label }
//   ---
//   …markdown body…
//
// The filename is the slug (SSOT: no slug field to drift out of sync).
// Invalid frontmatter throws at build/dev time — content errors fail loud.

import { load as jsYamlLoad, CORE_SCHEMA } from 'js-yaml'

const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
const DATE = /^\d{4}-\d{2}-\d{2}$/

function parsePost(path, raw) {
  const file = path.split('/').pop()
  const match = raw.match(FRONTMATTER)
  if (!match) {
    throw new Error(`blog/${file}: missing frontmatter block`)
  }

  let meta
  try {
    // CORE schema: plain data only — dates stay strings, no implicit typing.
    meta = jsYamlLoad(match[1], { schema: CORE_SCHEMA })
  } catch (e) {
    throw new Error(`blog/${file}: invalid frontmatter YAML: ${e.message}`)
  }

  for (const field of ['title', 'date', 'excerpt']) {
    if (typeof meta[field] !== 'string' || !meta[field].trim()) {
      throw new Error(`blog/${file}: frontmatter field "${field}" is required`)
    }
  }
  if (!DATE.test(meta.date)) {
    throw new Error(`blog/${file}: date must be YYYY-MM-DD, got "${meta.date}"`)
  }

  return {
    slug: file.replace(/\.md$/, ''),
    title: meta.title,
    date: meta.date,
    excerpt: meta.excerpt,
    category: typeof meta.category === 'string' ? meta.category : 'Announcement',
    stats: Array.isArray(meta.stats) ? meta.stats : [],
    body: match[2],
  }
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date))

export function getPost(slug) {
  return posts.find((p) => p.slug === slug)
}
