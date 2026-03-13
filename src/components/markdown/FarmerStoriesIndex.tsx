// src/components/markdown/FarmerStoriesIndex.tsx
// Like ContentIndex but shows farm name / location from frontmatter.
// Frontmatter fields: title, date, excerpt, author, category, image, farmName, location

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import HeroSection from '../sections/HeroSection/HeroSection';
import Container from '../common/Container/Container';
import styles from './ContentIndex.module.css';

const ITEMS_PER_PAGE = 12;

interface Props {
  files: Record<string, string>;
}

const FarmerStoriesIndex: React.FC<Props> = ({ files }) => {
  const { items } = useMarkdownContent(files);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    ...Array.from(new Set(items.map(i => i.meta.category).filter(Boolean) as string[])).sort(),
  ];

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.meta.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const formatDate = (d: string) => d
    ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <div className={styles.page}>
      <HeroSection
        title="Farmer Stories"
        subtitle="Real experiences from Northeast farmers adapting to a changing climate"
      />
      <Container>
        {categories.length > 2 && (
          <div className={styles.categoryBar}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.pill} ${activeCategory === cat ? styles.pillActive : ''}`}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <p className={styles.resultsInfo}>
          Showing {start + 1}–{Math.min(start + ITEMS_PER_PAGE, filtered.length)} of {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
        </p>

        {paginated.length === 0 ? (
          <p className={styles.empty}>No stories available yet.</p>
        ) : (
          <div className={styles.grid}>
            {paginated.map(item => (
              <Link key={item.slug} to={`/farmer-stories/${item.slug}`} className={styles.card}>
                {item.meta.image && (
                  <div className={styles.imageWrapper}>
                    <img src={item.meta.image as string} alt={item.meta.title} className={styles.image} />
                  </div>
                )}
                <div className={styles.cardBody}>
                  {item.meta.category && (
                    <span className={styles.category}>{item.meta.category as string}</span>
                  )}
                  <h2 className={styles.title}>{item.meta.title}</h2>
                  {/* Farm name + location */}
                  {(item.meta.farmName || item.meta.location) && (
                    <p style={{ fontSize: '0.85rem', color: '#2e7d32', fontWeight: 600, margin: '0 0 4px' }}>
                      {[item.meta.farmName, item.meta.location].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  <p className={styles.date}>
                    {formatDate(item.meta.date)}
                    {item.meta.author && ` · ${item.meta.author as string}`}
                  </p>
                  {item.meta.excerpt && (
                    <p className={styles.excerpt}>{item.meta.excerpt as string}</p>
                  )}
                  <span className={styles.readMore}>Read Story →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button className={styles.pageBtn} onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>← Previous</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} className={`${styles.pageBtn} ${currentPage === p ? styles.pageActive : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
            ))}
            <button className={styles.pageBtn} onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Next →</button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default FarmerStoriesIndex;