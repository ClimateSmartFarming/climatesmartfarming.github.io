// src/components/markdown/ContentIndex.tsx
//
// A reusable listing/index page for any content section (News, Blog,
// Resources, Media, Programs…).
//
// Usage example — NewsPage.tsx becomes:
//
//   const files = import.meta.glob('/src/content/news/*.md', {
//     eager: true, query: '?raw', import: 'default'
//   });
//
//   export default function NewsPage() {
//     return (
//       <ContentIndex
//         files={files}
//         basePath="/news"
//         heroTitle="News & Updates"
//         heroSubtitle="Latest news from Cornell Climate Smart Farming"
//       />
//     );
//   }

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import HeroSection from '../sections/HeroSection/HeroSection';
import Container from '../common/Container/Container';
import styles from './ContentIndex.module.css';

const ITEMS_PER_PAGE = 12;

interface Props {
  /** Result of import.meta.glob('...', { eager: true, query: '?raw', import: 'default' }) */
  files: Record<string, string>;
  /** Base route for detail pages, e.g. "/news" → links to "/news/:slug" */
  basePath: string;
  heroTitle: string;
  heroSubtitle?: string;
  /** Optional category filter pill list */
  showCategories?: boolean;
}

const ContentIndex: React.FC<Props> = ({
  files,
  basePath,
  heroTitle,
  heroSubtitle,
  showCategories = true,
}) => {
  const { items } = useMarkdownContent(files);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Build unique category list
  const categories = [
    'All',
    ...Array.from(new Set(items.map((i) => i.meta.category).filter(Boolean) as string[])).sort(),
  ];

  const filtered =
    activeCategory === 'All'
      ? items
      : items.filter((i) => i.meta.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const changePage = (p: number) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeCategory = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [1];
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <div className={styles.page}>
      <HeroSection title={heroTitle} subtitle={heroSubtitle} />

      <Container>
        {/* Category filter pills */}
        {showCategories && categories.length > 2 && (
          <div className={styles.categoryBar}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.pill} ${activeCategory === cat ? styles.pillActive : ''}`}
                onClick={() => changeCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Results count */}
        <p className={styles.resultsInfo}>
          Showing {start + 1}–{Math.min(start + ITEMS_PER_PAGE, filtered.length)} of{' '}
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </p>

        {/* Grid */}
        {paginated.length === 0 ? (
          <p className={styles.empty}>No content available yet.</p>
        ) : (
          <div className={styles.grid}>
            {paginated.map((item) => (
              <Link
                key={item.slug}
                to={`${basePath}/${item.slug}`}
                className={styles.card}
              >
                {item.meta.image && (
                  <div className={styles.imageWrapper}>
                    <img
                      src={item.meta.image}
                      alt={item.meta.title}
                      className={styles.image}
                    />
                  </div>
                )}
                <div className={styles.cardBody}>
                  {item.meta.category && (
                    <span className={styles.category}>{item.meta.category}</span>
                  )}
                  <h2 className={styles.title}>{item.meta.title}</h2>
                  <p className={styles.date}>
                    {formatDate(item.meta.date)}
                    {item.meta.author && ` · ${item.meta.author}`}
                  </p>
                  {item.meta.excerpt && (
                    <p className={styles.excerpt}>{item.meta.excerpt}</p>
                  )}
                  <span className={styles.readMore}>Read More →</span>
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
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <div className={styles.pageNumbers}>
              {getPageNumbers().map((p, idx) =>
                p === '...' ? (
                  <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    className={`${styles.pageBtn} ${currentPage === p ? styles.pageActive : ''}`}
                    onClick={() => changePage(p as number)}
                  >
                    {p}
                  </button>
                )
              )}
            </div>
            <button
              className={styles.pageBtn}
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ContentIndex;