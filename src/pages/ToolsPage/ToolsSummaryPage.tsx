import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredTools, toolCategories } from '../../data/tools';
import styles from './ToolsSummaryPage.module.css';

const sortedTools = [...featuredTools].sort((a, b) => a.title.localeCompare(b.title));

const sortedCategories = [
  'All',
  ...toolCategories.filter(c => c !== 'All').sort((a, b) => a.localeCompare(b)),
];

const ToolsSummaryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const filtered = sortedTools.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  const handleFilter = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (q: string) => {
    setSearch(q);
    setCurrentPage(1);
  };

  return (
    <div className={styles.page}>

      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>Climate Smart Farming Tools</h1>
          <p className={styles.heroSubtitle}>
            Free, location-specific climate and weather tools designed to help Northeast farmers
            make informed decisions — developed by the{' '}
            <a href="https://www.nrcc.cornell.edu/" target="_blank" rel="noopener noreferrer" className={styles.heroLink}>
              Northeast Regional Climate Center
            </a>{' '}
            at Cornell University.
          </p>
        </div>
      </div>

      <div className={styles.layout}>

        <aside className={styles.sidebar}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search tools…"
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className={styles.searchInput}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => handleSearch('')}>✕</button>
            )}
          </div>

          <div className={styles.catBox}>
            <p className={styles.catHeading}>Categories</p>
            {sortedCategories.map(cat => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ''}`}
              >
                {cat}
                <span className={styles.catCount}>
                  {cat === 'All'
                    ? featuredTools.length
                    : featuredTools.filter(t => t.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          <div className={styles.aboutBox}>
            <p className={styles.aboutLabel}>🏛️ NRCC at Cornell</p>
            <p className={styles.aboutText}>
              These tools are built and maintained by the Northeast Regional Climate Center (NRCC).
              All tools are free and updated daily with observed climate data.
            </p>
            <a href="https://github.com/nrcc-cornell" target="_blank" rel="noopener noreferrer" className={styles.aboutLink}>
              View All Repos on GitHub ↗
            </a>
          </div>
        </aside>

        <main className={styles.main}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <p>No tools match your search. Try a different keyword or category.</p>
              <button onClick={() => { handleSearch(''); handleFilter('All'); }} className={styles.resetBtn}>
                Reset filters
              </button>
            </div>
          ) : (
            <>
              <div className={styles.resultsRow}>
                <p className={styles.resultsInfo}>
                  Showing {start + 1}–{Math.min(start + itemsPerPage, filtered.length)} of {filtered.length} tools
                </p>
                <div className={styles.perPageSelect}>
                  <label className={styles.perPageLabel}>Per page:</label>
                  <select
                    className={styles.perPageDropdown}
                    value={itemsPerPage}
                    onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  >
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>All</option>
                  </select>
                </div>
              </div>

              <div className={styles.grid}>
                {paginated.map(tool => (
                  <Link
                    key={tool.id}
                    to={`/tools/${tool.id}`}
                    className={`${styles.card} ${!tool.hasIframe ? styles.cardExternal : ''}`}
                  >
                    {tool.image ? (
                      <div className={styles.cardImage} style={{ backgroundImage: `url(${tool.image})` }} />
                    ) : (
                      <div className={styles.cardImagePlaceholder}>
                        <span className={styles.cardIconLarge}>{tool.icon}</span>
                      </div>
                    )}
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{tool.title}</h3>
                      <p className={styles.cardDesc}>{tool.description}</p>
                      <div className={styles.cardFooter}>
                        <span className={styles.cardCta}>
                          {tool.hasIframe ? 'Launch Tool →' : 'View Details →'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button className={styles.pageBtn} onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>← Previous</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} className={`${styles.pageBtn} ${currentPage === p ? styles.pageActive : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
                  ))}
                  <button className={styles.pageBtn} onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Next →</button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ToolsSummaryPage;