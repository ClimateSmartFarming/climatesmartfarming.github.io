// src/components/markdown/NewsIndex.tsx
// Newspaper-style news page:
//   - Top: offset hero grid with 4 most recent posts
//   - Below: sticky left sidebar with category filters + scrollable card grid

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import styles from './NewsIndex.module.css';

interface Props {
  files: Record<string, string>;
  basePath: string;
}

const NEWS_CATEGORIES = [
  'All',
  'Farm Management',
  'Climate Research',
  'Soil Health',
  'Water Management',
  'Pest & Disease',
  'Cover Crops',
  'Climate Policy',
  'Grants & Funding',
  'Events & Conferences',
  'Tools & Technology',
  'Program Updates',
  'Farmer Stories',
  'Extension News',
];

const ITEMS_PER_PAGE = 12;

const NewsIndex: React.FC<Props> = ({ files, basePath }) => {
  const { items } = useMarkdownContent(files);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  const formatDateShort = (d: string) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  // Top 4 for hero — always most recent regardless of category filter
  const heroItems = useMemo(() => items.slice(0, 4), [items]);
  const [heroMain, ...heroSide] = heroItems;

  // Remaining items for the scrollable grid (exclude hero 4)
  const heroSlugs = useMemo(() => new Set(heroItems.map(i => i.slug)), [heroItems]);

  const filtered = useMemo(() => {
    const pool = items.filter(i => !heroSlugs.has(i.slug));
    if (activeCategory === 'All') return pool;
    return pool.filter(i => i.meta.category === activeCategory);
  }, [items, heroSlugs, activeCategory]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No news articles yet.</h2>
        <p>Add .md files to src/content/news/ to get started.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* ── Masthead ──────────────────────────────────────────── */}
      {/* ── Hero Banner ──────────────────────────────────────── */}
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>News & Updates</h1>
          </div>
        </div>

      {/* ── Hero grid ─────────────────────────────────────────── */}
      <div className={styles.heroSection}>
        <div className={styles.heroGrid}>

          {/* Main hero — large left panel */}
          {heroMain && (
            <Link to={`${basePath}/${heroMain.slug}`} className={styles.heroMain}>
              {heroMain.meta.image ? (
                <img src={heroMain.meta.image as string} alt={heroMain.meta.title} className={styles.heroMainImage} />
              ) : (
                <div className={styles.heroMainPlaceholder} />
              )}
              <div className={styles.heroMainOverlay}>
                {heroMain.meta.category && (
                  <span className={styles.heroCategory}>{heroMain.meta.category as string}</span>
                )}
                <h2 className={styles.heroMainTitle}>{heroMain.meta.title}</h2>
                <p className={styles.heroMainMeta}>{formatDateShort(heroMain.meta.date)}</p>
              </div>
            </Link>
          )}

          {/* Right side: 2 small cards + 1 wide card */}
          <div className={styles.heroSideGrid}>
            {heroSide.map((item, idx) => (
              <Link
                key={item.slug}
                to={`${basePath}/${item.slug}`}
                className={`${styles.heroSideCard} ${idx === 2 ? styles.heroSideCardWide : ''}`}
              >
                {item.meta.image ? (
                  <img src={item.meta.image as string} alt={item.meta.title} className={styles.heroSideImage} />
                ) : (
                  <div className={styles.heroSidePlaceholder} />
                )}
                <div className={styles.heroSideOverlay}>
                  {item.meta.category && (
                    <span className={styles.heroSideCategory}>{item.meta.category as string}</span>
                  )}
                  <h3 className={styles.heroSideTitle}>{item.meta.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular strip */}
        <div className={styles.popularStrip}>
          <span className={styles.popularLabel}>RECENT COVERAGE</span>
          <div className={styles.popularList}>
            {heroItems.map((item, idx) => (
              <Link key={item.slug} to={`${basePath}/${item.slug}`} className={styles.popularItem}>
                <span className={styles.popularNum}>{idx + 1}</span>
                <span className={styles.popularTitle}>{item.meta.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section divider ───────────────────────────────────── */}
      <div className={styles.sectionDivider}>
        <span className={styles.sectionDividerText}>All Articles</span>
      </div>

      {/* ── Main body: sidebar + grid ─────────────────────────── */}
      <div className={styles.body}>

        {/* Sticky sidebar */}
        <aside className={styles.sidebar}>
          <h3 className={styles.sidebarHeading}>Sections</h3>
          <ul className={styles.categoryList}>
            {NEWS_CATEGORIES.map(cat => (
              <li key={cat}>
                <button
                  className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryBtnActive : ''}`}
                  onClick={() => handleCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Article grid */}
        <div className={styles.gridArea}>
          <p className={styles.resultsInfo}>
            {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            {activeCategory !== 'All' && ` in ${activeCategory}`}
          </p>

          {paginated.length === 0 ? (
            <p className={styles.noResults}>No articles in this section yet.</p>
          ) : (
            <div className={styles.grid}>
              {paginated.map(item => (
                <Link key={item.slug} to={`${basePath}/${item.slug}`} className={styles.card}>
                  {item.meta.image ? (
                    <div className={styles.cardImageWrapper}>
                      <img src={item.meta.image as string} alt={item.meta.title} className={styles.cardImage} />
                    </div>
                  ) : (
                    <div className={styles.cardImagePlaceholder}>📰</div>
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
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
              >← Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`${styles.pageBtn} ${currentPage === p ? styles.pageActive : ''}`}
                  onClick={() => setCurrentPage(p)}
                >{p}</button>
              ))}
              <button
                className={styles.pageBtn}
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
              >Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsIndex;

