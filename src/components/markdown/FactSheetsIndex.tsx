import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import styles from './FactSheetsIndex.module.css';

const ITEMS_PER_PAGE = 9;

function getBodyPreview(body: string, maxChars = 600): string {
  const cleaned = body
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  if (cleaned.length <= maxChars) return cleaned;
  return cleaned.slice(0, maxChars).replace(/\s+\S*$/, '') + '…';
}

interface Props {
  files: Record<string, string>;
}

export default function FactSheetsIndex({ files }: Props) {
  const { items } = useMarkdownContent(files);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    'All',
    ...Array.from(new Set(items.map(i => i.meta.category).filter(Boolean) as string[])).sort(),
  ];

  const featured = items[0];

  // Include ALL items in filtered list (not slice(1))
  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => i.meta.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>Fact Sheets</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Educational resources and guides for climate-smart agriculture
          </p>
        </div>
      </div>

      {/* Featured fact sheet */}
      {featured && activeCategory === 'All' && currentPage === 1 && (
        <div className={styles.featuredWrap}>
          <div className={styles.featuredInner}>
            <p className={styles.featuredLabel}>✦ Featured Fact Sheet</p>
            <Link to={`/fact-sheets/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredFrame}>
                <div className={styles.featuredImgWrap}>
                  {featured.meta.image ? (
                    <img
                      src={featured.meta.image as string}
                      alt={featured.meta.title}
                      className={styles.featuredImg}
                    />
                  ) : (
                    <div className={styles.featuredImgPlaceholder}>📄</div>
                  )}
                </div>
                <div className={styles.featuredContent}>
                  {featured.meta.category && (
                    <span className={styles.featuredBadge}>{featured.meta.category as string}</span>
                  )}
                  <h2 className={styles.featuredTitle}>{featured.meta.title}</h2>
                  {featured.meta.excerpt && (
                    <p className={styles.featuredExcerpt}>{featured.meta.excerpt as string}</p>
                  )}
                  <p className={styles.featuredBodyPreview}>{getBodyPreview(featured.body)}</p>
                  <span className={styles.featuredCta}>Read Fact Sheet →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          <p className={styles.resultsInfo}>
            {filtered.length} {filtered.length === 1 ? 'fact sheet' : 'fact sheets'}
          </p>

          {paginated.length === 0 ? (
            <p className={styles.empty}>No fact sheets available yet.</p>
          ) : (
            <div className={styles.grid}>
              {paginated.map(item => (
                <Link key={item.slug} to={`/fact-sheets/${item.slug}`} className={styles.card}>
                  <div className={styles.cardImage}>
                    {item.meta.image ? (
                      <img src={item.meta.image as string} alt={item.meta.title} className={styles.cardImg} />
                    ) : (
                      <div className={styles.cardImgPlaceholder}>📄</div>
                    )}
                    {item.meta.category && (
                      <span className={styles.cardBadge}>{item.meta.category as string}</span>
                    )}
                  </div>
                  <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>{item.meta.title}</h2>
                    {item.meta.excerpt && (
                      <p className={styles.cardExcerpt}>{item.meta.excerpt as string}</p>
                    )}
                    <span className={styles.cardCta}>Read Fact Sheet →</span>
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
        </div>
      </div>
    </div>
  );
}