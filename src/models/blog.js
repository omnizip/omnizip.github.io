// Blog model — the single source of truth for posts.
//
// A post is a markdown file under src/content/blog/ named {date}-{slug}.md
// with frontmatter:
//
//   ---
//   title: string (required)
//   date: YYYY-MM-DD (required; must match the filename date)
//   excerpt: string (required)
//   category: string (optional, defaults to "Announcement")
//   stats: (optional) list of { value, label }
//   ---
//   …markdown body…
//
// The filename date prefix and the slug are canonical (SSOT: the frontmatter
// date must agree with the filename or the model throws). Invalid content
// fails loud at build/dev time.

import { load as jsYamlLoad, CORE_SCHEMA } from 'js-yaml'

const modules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
const FILENAME = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/

function parsePost(path, raw) {
  const file = path.split('/').pop()
  const name = file.match(FILENAME)
  if (!name) {
    throw new Error(`blog/${file}: filename must be {{date}}-{{slug}}.md`)
  }
  const [, fileDate, slug] = name

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
  if (meta.date !== fileDate) {
    throw new Error(
      `blog/${file}: frontmatter date "${meta.date}" does not match filename date "${fileDate}"`
    )
  }

  return {
    slug,
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
