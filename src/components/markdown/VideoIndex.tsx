// src/components/markdown/VideoIndex.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './VideoIndex.module.css';

/* ───────────────────────────────────────────────────────────
   TYPES
─────────────────────────────────────────────────────────── */
interface VideoMeta {
  slug: string;
  title: string;
  description: string;
  date: string;           // yyyy-mm-dd
  category: string;
  thumbnail: string;
  videoId: string;        // YouTube ID
  duration?: string;
  presenter?: string;
}

interface Props {
  files: Record<string, string>;
}

/* ───────────────────────────────────────────────────────────
   FRONTMATTER PARSER (no gray-matter)
─────────────────────────────────────────────────────────── */
function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const block = match[1];
  const meta: Record<string, string> = {};
  for (const line of block.split('\n')) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      meta[key] = val;
    }
  }
  return meta;
}

/* ───────────────────────────────────────────────────────────
   COMPONENT
─────────────────────────────────────────────────────────── */
const VideoIndex: React.FC<Props> = ({ files }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Build video list from markdown files
  const videos: VideoMeta[] = useMemo(() => {
    return Object.entries(files).map(([path, raw]) => {
      const slug = path.split('/').pop()?.replace('.md', '') ?? '';
      const fm = parseFrontmatter(raw);
      return {
        slug,
        title: fm.title ?? slug,
        description: fm.description ?? '',
        date: fm.date ?? '',
        category: fm.category ?? 'Uncategorized',
        thumbnail: fm.thumbnail ?? '',
        videoId: fm.videoId ?? '',
        duration: fm.duration,
        presenter: fm.presenter,
      };
    }).sort((a, b) => b.date.localeCompare(a.date)); // newest first
  }, [files]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(videos.map(v => v.category));
    return ['All', ...Array.from(cats).sort()];
  }, [videos]);

  // Filter videos
  const filtered = useMemo(() => {
    return videos.filter(v => {
      const matchesCat = activeCategory === 'All' || v.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        (v.presenter?.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [videos, activeCategory, search]);

  return (
    <div>
      {/* Hero Banner - matching Tools page style */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>Videos & Webinars</h1>
          <p className={styles.heroSubtitle}>
            Watch recordings of our climate-smart farming webinars and tutorials.
          </p>
        </div>
      </div>

      <div className={styles.page}>
        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="Search videos…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.search}
          />
          <div className={styles.cats}>
            {categories.map(cat => (
              <button
                key={cat}
                className={activeCategory === cat ? styles.catActive : styles.cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <section className={styles.grid}>
          {filtered.map(v => (
            <Link to={`/videos/${v.slug}`} key={v.slug} className={styles.card}>
              <div className={styles.thumb}>
                {v.videoId ? (
                  <img
                    src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                    alt={v.title}
                  />
                ) : v.thumbnail ? (
                  <img src={v.thumbnail} alt={v.title} />
                ) : (
                  <div className={styles.placeholder}>🎬</div>
                )}
                {v.duration && <span className={styles.duration}>{v.duration}</span>}
              </div>
              <div className={styles.body}>
                <p className={styles.bodyCat}>{v.category}</p>
                <h2>{v.title}</h2>
                {v.presenter && <p className={styles.presenter}>{v.presenter}</p>}
                <p className={styles.desc}>{v.description}</p>
                <time>{v.date}</time>
              </div>
            </Link>
          ))}
        </section>

        {filtered.length === 0 && (
          <p className={styles.empty}>No videos match your search.</p>
        )}
      </div>
    </div>
  );
};

export default VideoIndex;