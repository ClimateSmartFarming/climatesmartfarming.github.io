// src/components/markdown/BlogIndex.tsx
// Featured blog layout:
//   - Sidebar: search + category filter
//   - Top: featured post (manual via `featured: true` frontmatter, else most recent)
//   - Right of featured: staff picks list (next 3 posts)
//   - Below: standard card grid for remaining posts

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import HeroSection from '../sections/HeroSection/HeroSection';
import styles from './BlogIndex.module.css';

interface Props {
  files: Record<string, string>;
}

const CATEGORIES = [
  'All',
  'Farm Management',
  'Soil Health',
  'Water Management',
  'Pest & Disease',
  'Cover Crops',
  'Climate Trends',
  'Crop Planning',
  'Energy & Carbon',
  'Research Updates',
  'Tools & Technology',
  'Policy & Funding',
];

const BlogIndex: React.FC<Props> = ({ files }) => {
  const { items } = useMarkdownContent(files);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  // Featured post: first with featured:true, else most recent
  const featuredPost = useMemo(() =>
    items.find(i => i.meta.featured === 'true' || i.meta.featured === true) ?? items[0],
    [items]
  );

  // Staff picks: next 4 after featured
  const staffPicks = useMemo(() =>
    items.filter(i => i.slug !== featuredPost?.slug).slice(0, 4),
    [items, featuredPost]
  );

  // Remaining posts after featured + staff picks, filtered by search + category
  const remaining = useMemo(() => {
    const excludeSlugs = new Set([
      featuredPost?.slug,
      ...staffPicks.map(i => i.slug),
    ]);
    return items
      .filter(i => !excludeSlugs.has(i.slug))
      .filter(i => activeCategory === 'All' || i.meta.category === activeCategory)
      .filter(i => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          i.meta.title.toLowerCase().includes(q) ||
          (i.meta.excerpt as string ?? '').toLowerCase().includes(q) ||
          (i.meta.author as string ?? '').toLowerCase().includes(q)
        );
      });
  }, [items, featuredPost, staffPicks, activeCategory, search]);

  if (items.length === 0) {
    return (
      <div>
        <HeroSection title="Blog" subtitle="Insights from the Cornell Climate Smart Farming team" />
        <div className={styles.emptyState}>
          <p>No blog posts yet. Check back soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <HeroSection
        title="Blog"
        subtitle="Insights, updates, and perspectives from the Cornell Climate Smart Farming team"
      />

      <div className={styles.layout}>

        {/* ── Sidebar ──────────────────────────────────────────── */}
        <aside className={styles.sidebar}>
          {/* Search */}
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Search posts…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>

          {/* Categories */}
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarHeading}>
              <span className={styles.sidebarIcon}>🌿</span> Topics
            </h3>
            <ul className={styles.categoryList}>
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button
                    className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryBtnActive : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About box */}
          <div className={styles.aboutBox}>
            <h3 className={styles.aboutTitle}>About This Blog</h3>
            <p className={styles.aboutText}>
              Written by Cornell researchers, extension specialists, and farm partners across the Northeast.
              Topics cover seasonal outlooks, on-farm adaptation, research findings, and climate tools.
            </p>
            <Link to="/news" className={styles.aboutLink}>See News & Updates →</Link>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────── */}
        <main className={styles.main}>

          {/* Featured + staff picks row */}
          {featuredPost && (
            <div className={styles.featuredRow}>

              {/* Featured post */}
              <Link to={`/blog/${featuredPost.slug}`} className={styles.featuredCard}>
                {featuredPost.meta.image ? (
                  <div className={styles.featuredImageWrapper}>
                    <img
                      src={featuredPost.meta.image as string}
                      alt={featuredPost.meta.title}
                      className={styles.featuredImage}
                    />
                  </div>
                ) : (
                  <div className={styles.featuredImagePlaceholder}>
                    <span>🌾</span>
                  </div>
                )}
                <div className={styles.featuredBody}>
                  {featuredPost.meta.category && (
                    <span className={styles.featuredCategory}>{featuredPost.meta.category as string}</span>
                  )}
                  <h2 className={styles.featuredTitle}>{featuredPost.meta.title}</h2>
                  {featuredPost.meta.excerpt && (
                    <p className={styles.featuredExcerpt}>{featuredPost.meta.excerpt as string}</p>
                  )}
                  <p className={styles.featuredMeta}>
                    {formatDate(featuredPost.meta.date)}
                    {featuredPost.meta.author && ` · ${featuredPost.meta.author as string}`}
                  </p>
                  <span className={styles.readMore}>Read More →</span>
                </div>
              </Link>

              {/* Staff picks sidebar */}
              {staffPicks.length > 0 && (
                <div className={styles.staffPicks}>
                  <h3 className={styles.staffPicksTitle}>
                    <span>⭐</span> Recent Posts
                  </h3>
                  <ul className={styles.staffPicksList}>
                    {staffPicks.map(item => (
                      <li key={item.slug} className={styles.staffPickItem}>
                        <Link to={`/blog/${item.slug}`} className={styles.staffPickLink}>
                          {item.meta.category && (
                            <span className={styles.staffPickCategory}>{item.meta.category as string}</span>
                          )}
                          <span className={styles.staffPickTitle}>{item.meta.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Remaining posts grid */}
          {remaining.length > 0 && (
            <>
              <h3 className={styles.morePostsHeading}>
                {activeCategory !== 'All' ? activeCategory : 'More Posts'}
                {search && ` — results for "${search}"`}
              </h3>
              <div className={styles.grid}>
                {remaining.map(item => (
                  <Link key={item.slug} to={`/blog/${item.slug}`} className={styles.card}>
                    {item.meta.image ? (
                      <div className={styles.cardImageWrapper}>
                        <img src={item.meta.image as string} alt={item.meta.title} className={styles.cardImage} />
                      </div>
                    ) : (
                      <div className={styles.cardImagePlaceholder}>🌱</div>
                    )}
                    <div className={styles.cardBody}>
                      {item.meta.category && (
                        <span className={styles.cardCategory}>{item.meta.category as string}</span>
                      )}
                      <h3 className={styles.cardTitle}>{item.meta.title}</h3>
                      <p className={styles.cardMeta}>
                        {formatDate(item.meta.date)}
                        {item.meta.author && ` · ${item.meta.author as string}`}
                      </p>
                      {item.meta.excerpt && (
                        <p className={styles.cardExcerpt}>{item.meta.excerpt as string}</p>
                      )}
                      <span className={styles.cardReadMore}>Read More →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {remaining.length === 0 && (search || activeCategory !== 'All') && (
            <p className={styles.noResults}>No posts match your search. Try a different topic or keyword.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default BlogIndex;