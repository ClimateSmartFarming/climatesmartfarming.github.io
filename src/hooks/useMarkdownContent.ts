// src/hooks/useMarkdownContent.ts
//
// HOW IT WORKS:
// Vite's import.meta.glob() eagerly imports all .md files at build time.
// Each file is expected to have YAML frontmatter at the top, e.g.:
//
//   ---
//   title: My Article
//   date: 2026-01-15
//   excerpt: A short summary.
//   author: Jane Doe
//   category: Research
//   image: /images/my-image.jpg
//   ---
//
//   Full article body goes here...
//
// The hook returns a list of { meta, body, slug } objects, sorted newest-first.

import { useMemo } from 'react';

export interface ContentMeta {
  title: string;
  date: string;
  excerpt?: string;
  author?: string;
  category?: string;
  image?: string;
  tags?: string[];
  [key: string]: unknown; // allow extra frontmatter fields
}

export interface ContentItem {
  slug: string;        // derived from filename, e.g. "my-article"
  meta: ContentMeta;
  body: string;        // raw markdown body (below frontmatter)
}

// ─── Frontmatter parser ──────────────────────────────────────────────────────
// No external dependency needed — a simple regex handles YAML frontmatter.

function parseFrontmatter(raw: string): { meta: ContentMeta; body: string } {
  const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/;
  const match = raw.match(fmRegex);

  if (!match) {
    return { meta: { title: 'Untitled', date: '' }, body: raw };
  }

  const [, yamlBlock, body] = match;
  const meta: Record<string, unknown> = {};

  for (const line of yamlBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value: unknown = line.slice(colonIdx + 1).trim();

    // Remove surrounding quotes
    if (typeof value === 'string' && /^['"].*['"]$/.test(value)) {
      value = value.slice(1, -1);
    }
    // Parse inline arrays: [a, b, c]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ''));
    }
    if (key) meta[key] = value;
  }

  return {
    meta: meta as ContentMeta,
    body: body.trim(),
  };
}

// ─── Slug from path ───────────────────────────────────────────────────────────

function slugFromPath(path: string): string {
  // e.g. "../content/news/my-article.md" → "my-article"
  return path.replace(/^.*\//, '').replace(/\.md$/, '');
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

type GlobResult = Record<string, string>;

/**
 * Pass in the result of a Vite import.meta.glob('...', { eager: true, query: '?raw', import: 'default' }) call.
 *
 * Example usage in a page component:
 *
 *   const files = import.meta.glob('/src/content/news/*.md', { eager: true, query: '?raw', import: 'default' });
 *   const { items, getItem } = useMarkdownContent(files);
 */
export function useMarkdownContent(globResult: GlobResult) {
  const items: ContentItem[] = useMemo(() => {
    return Object.entries(globResult)
      .map(([path, raw]) => {
        const slug = slugFromPath(path);
        const { meta, body } = parseFrontmatter(raw);
        return { slug, meta, body };
      })
      .sort((a, b) => {
        // Sort newest first; fall back to alphabetical by slug
        const da = a.meta.date ? new Date(a.meta.date).getTime() : 0;
        const db = b.meta.date ? new Date(b.meta.date).getTime() : 0;
        return db - da;
      });
  }, [globResult]);

  /** Look up a single item by slug */
  function getItem(slug: string): ContentItem | undefined {
    return items.find((item) => item.slug === slug);
  }

  /** Filter by category */
  function filterByCategory(category: string): ContentItem[] {
    return items.filter(
      (item) => item.meta.category?.toLowerCase() === category.toLowerCase()
    );
  }

  return { items, getItem, filterByCategory };
}