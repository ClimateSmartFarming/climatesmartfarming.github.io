// src/components/markdown/ResourceIndex.tsx
//
// Listing page for External Resources.
// Keeps the sidebar category filter from the original ExternalResourcesPage
// but reads all data from .md files instead of hardcoded arrays.
//
// Frontmatter fields used:
//   title, date, description (or excerpt), category, subcategory, link, image

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import HeroSection from '../sections/HeroSection/HeroSection';
import Container from '../common/Container/Container';
import styles from './ResourceIndex.module.css';

interface Props {
  files: Record<string, string>;
}

const ResourceIndex: React.FC<Props> = ({ files }) => {
  const { items } = useMarkdownContent(files);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Build sidebar category groups: { "Agricultural Sectors": ["Dairy...", "Field Crops"...], ... }
  // Each resource uses frontmatter: category (group) + subcategory (item), OR just category.
  const categoryGroups = useMemo(() => {
    const groups: Record<string, Set<string>> = {};
    for (const item of items) {
      const group = item.meta.categoryGroup as string | undefined;
      const cat = item.meta.category as string | undefined;
      if (group && cat) {
        if (!groups[group]) groups[group] = new Set();
        groups[group].add(cat);
      } else if (cat) {
        if (!groups['Resources']) groups['Resources'] = new Set();
        groups['Resources'].add(cat);
      }
    }
    // Convert sets to sorted arrays
    return Object.entries(groups).map(([group, cats]) => ({
      group,
      categories: Array.from(cats).sort(),
    }));
  }, [items]);

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((i) => i.meta.category === activeCategory);

  // Count per category for sidebar badges
  const countByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of items) {
      const cat = item.meta.category as string | undefined;
      if (cat) counts[cat] = (counts[cat] ?? 0) + 1;
    }
    return counts;
  }, [items]);

  return (
    <div className={styles.page}>
      <HeroSection
        title="External Resources"
        subtitle="Best management practices, research, and tools for climate-smart farming"
      />

      <Container>
        <section className={styles.layout}>

          {/* ── Sidebar ─────────────────────────────────────── */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Browse by Category</h2>

            {/* All button */}
            <button
              className={`${styles.allBtn} ${activeCategory === 'All' ? styles.allBtnActive : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All Resources
              <span className={styles.count}>({items.length})</span>
            </button>

            {categoryGroups.map(({ group, categories }) => (
              <div key={group} className={styles.categoryBlock}>
                <h3 className={styles.categoryGroupTitle}>{group}</h3>
                <ul className={styles.categoryList}>
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryBtnActive : ''}`}
                        onClick={() => setActiveCategory(cat)}
                      >
                        {cat}
                        <span className={styles.count}>({countByCategory[cat] ?? 0})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={styles.calloutBox}>
              <h3>More Resources</h3>
              <p>Visit the full Climate Smart Farming Resources page for additional materials.</p>
              <a
                href="https://climatesmartfarming.org/resources/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewAllButton}
              >
                View All
              </a>
            </div>
          </aside>

          {/* ── Main grid ───────────────────────────────────── */}
          <div className={styles.main}>
            <p className={styles.resultsInfo}>
              {filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}
              {activeCategory !== 'All' && ` in "${activeCategory}"`}
            </p>

            {filtered.length === 0 ? (
              <p className={styles.empty}>No resources in this category yet.</p>
            ) : (
              <div className={styles.grid}>
                {filtered.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/resources/${item.slug}`}
                    className={styles.card}
                  >
                    <div className={styles.cardBody}>
                      {item.meta.category && (
                        <span className={styles.category}>{item.meta.category}</span>
                      )}
                      <h3 className={styles.cardTitle}>{item.meta.title}</h3>
                      <p className={styles.cardDesc}>
                        {(item.meta.excerpt as string) ?? (item.meta.description as string) ?? ''}
                      </p>
                      <span className={styles.readMore}>Learn More →</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </section>
      </Container>
    </div>
  );
};

export default ResourceIndex;