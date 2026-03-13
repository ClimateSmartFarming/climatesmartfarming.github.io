// src/components/markdown/FactSheetsIndex.tsx
// External-link grid for fact sheets — like ResourceIndex but simpler.
// Frontmatter fields: title, excerpt, category, link, linkLabel, image

import React, { useState } from 'react';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import HeroSection from '../sections/HeroSection/HeroSection';
import Container from '../common/Container/Container';
import styles from './FactSheetsIndex.module.css';

interface Props {
  files: Record<string, string>;
}

const FactSheetsIndex: React.FC<Props> = ({ files }) => {
  const { items } = useMarkdownContent(files);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    ...Array.from(new Set(items.map(i => i.meta.category).filter(Boolean) as string[])).sort(),
  ];

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.meta.category === activeCategory);

  return (
    <div>
      <HeroSection
        title="Fact Sheets"
        subtitle="Concise, research-based guides for farmers and agricultural professionals"
      />
      <Container>
        {categories.length > 2 && (
          <div className={styles.categoryBar}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.pill} ${activeCategory === cat ? styles.pillActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <p className={styles.resultsInfo}>
          {filtered.length} {filtered.length === 1 ? 'fact sheet' : 'fact sheets'}
          {activeCategory !== 'All' && ` in "${activeCategory}"`}
        </p>

        {filtered.length === 0 ? (
          <p className={styles.empty}>No fact sheets available yet.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map(item => (
              <a
                key={item.slug}
                href={item.meta.link as string}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                {item.meta.image && (
                  <div className={styles.imageWrapper}>
                    <img src={item.meta.image as string} alt={item.meta.title} className={styles.image} />
                  </div>
                )}
                <div className={styles.cardBody}>
                  {item.meta.category && (
                    <span className={styles.category}>{item.meta.category as string}</span>
                  )}
                  <h3 className={styles.title}>{item.meta.title}</h3>
                  {item.meta.excerpt && (
                    <p className={styles.excerpt}>{item.meta.excerpt as string}</p>
                  )}
                  <span className={styles.linkLabel}>
                    {(item.meta.linkLabel as string) || 'Download / View ↗'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default FactSheetsIndex;