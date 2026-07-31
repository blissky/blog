import { createContentLoader } from 'vitepress'

const datePattern = /^\d{4}-\d{2}-\d{2}$/

function requireString(value, field, url) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${url}: frontmatter.${field} must be a non-empty string`)
  }
  return value.trim()
}

function requireDate(value, url) {
  const date = value instanceof Date
    ? value.toISOString().slice(0, 10)
    : requireString(value, 'date', url)

  if (!datePattern.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`${url}: frontmatter.date must be a valid YYYY-MM-DD date`)
  }
  return date
}

function normalizePost(entry) {
  const { frontmatter, url } = entry
  const title = requireString(frontmatter.title, 'title', url)
  const date = requireDate(frontmatter.date, url)
  const description = requireString(frontmatter.description, 'description', url)

  if (!Array.isArray(frontmatter.tags)) {
    throw new Error(`${url}: frontmatter.tags must be a non-empty string array`)
  }

  const tags = [...new Set(frontmatter.tags.map((tag) => String(tag).trim()).filter(Boolean))]
  if (!tags.length) {
    throw new Error(`${url}: frontmatter.tags must be a non-empty string array`)
  }

  return { title, date, year: date.slice(0, 4), description, tags, url }
}

function tagId(tag) {
  return `tag-${encodeURIComponent(tag.toLowerCase()).replaceAll('%', '-')}`
}

export default createContentLoader('posts/*.md', {
  transform(entries) {
    const posts = entries
      .filter(({ frontmatter }) => frontmatter.draft !== true)
      .map(normalizePost)
      .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))

    const tags = new Map()
    const years = new Map()

    for (const post of posts) {
      for (const tag of post.tags) {
        const taggedPosts = tags.get(tag) ?? []
        taggedPosts.push(post)
        tags.set(tag, taggedPosts)
      }

      const yearlyPosts = years.get(post.year) ?? []
      yearlyPosts.push(post)
      years.set(post.year, yearlyPosts)
    }

    return {
      posts,
      tagGroups: [...tags.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, posts]) => ({ name, id: tagId(name), posts })),
      yearGroups: [...years.entries()]
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([year, posts]) => ({ year, posts }))
    }
  }
})
