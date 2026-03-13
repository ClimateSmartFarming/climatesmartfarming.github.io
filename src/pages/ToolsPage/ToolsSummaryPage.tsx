// src/pages/ToolsPage/ToolsSummaryPage.tsx
// Full tools directory with category sidebar filter.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredTools, toolCategories } from '../../data/tools';
import styles from './ToolsSummaryPage.module.css';

const cornellTools = featuredTools.filter(t => t.hasIframe);
const externalTools = featuredTools.filter(t => !t.hasIframe);

const ToolsSummaryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filterTools = (tools: typeof featuredTools) =>
    tools.filter(t => {
      const matchCat = activeCategory === 'All' || t.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

  const visibleCornell = filterTools(cornellTools);
  const visibleExternal = filterTools(externalTools);
  const totalVisible = visibleCornell.length + visibleExternal.length;

  return (
    <div className={styles.page}>

      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>Climate Smart Farming Tools</h1>
          <p className={styles.heroSubtitle}>
            Free, location-specific climate and weather tools designed to help Northeast farmers
            make informed decisions — developed by the{' '}
            <a
              href="https://www.nrcc.cornell.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.heroLink}
            >
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
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          <div className={styles.catBox}>
            <p className={styles.catHeading}>Categories</p>
            {toolCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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
              These tools are built and maintained by the Northeast Regional Climate Center
              (NRCC), which has 41 open-source repositories on GitHub.
              All tools are free and updated daily with observed climate data.
            </p>
            <a
              href="https://github.com/nrcc-cornell"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.aboutLink}
            >
              View All Repos on GitHub ↗
            </a>
          </div>
        </aside>

        <main className={styles.main}>
          {totalVisible === 0 ? (
            <div className={styles.empty}>
              <p>No tools match your search. Try a different keyword or category.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className={styles.resetBtn}>
                Reset filters
              </button>
            </div>
          ) : (
            <>
              {visibleCornell.length > 0 && (
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Cornell / NRCC Tools</h2>
                    <span className={styles.sectionCount}>{visibleCornell.length} tools</span>
                  </div>

                  <div className={styles.grid}>
                    {visibleCornell.map(tool => (
                      <Link key={tool.id} to={`/tools/${tool.id}`} className={styles.card}>
                        {tool.image ? (
                          <div className={styles.cardImage} style={{ backgroundImage: `url(${tool.image})` }} />
                        ) : (
                          <div className={styles.cardImagePlaceholder}>
                            <span className={styles.cardIconLarge}>{tool.icon}</span>
                          </div>
                        )}
                        <div className={styles.cardBody}>
                          <span className={styles.cardCategory}>{tool.category}</span>
                          <h3 className={styles.cardTitle}>{tool.title}</h3>
                          <p className={styles.cardDesc}>{tool.description}</p>
                          <div className={styles.cardFooter}>
                            <span className={styles.cardCta}>Launch Tool →</span>
                            <a
                              href={tool.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.cardRepo}
                              onClick={e => e.stopPropagation()}
                            >
                              GitHub ↗
                            </a>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {visibleExternal.length > 0 && (
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>🔗 Additional & Partner Tools</h2>
                    <span className={styles.sectionCount}>{visibleExternal.length} tools</span>
                  </div>
                  <p className={styles.sectionNote}>
                    Tools from NOAA, USDA, and other NRCC repositories — open in a new tab.
                  </p>
                  <div className={styles.grid}>
                    {visibleExternal.map(tool => (
                      <a
                        key={tool.id}
                        href={tool.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.card} ${styles.cardExternal}`}
                      >
                        {tool.image ? (
                          <div className={styles.cardImage} style={{ backgroundImage: `url(${tool.image})` }} />
                        ) : (
                          <div className={styles.cardImagePlaceholder}>
                            <span className={styles.cardIconLarge}>{tool.icon}</span>
                          </div>
                        )}
                        <div className={styles.cardBody}>
                          <span className={styles.cardCategory}>{tool.category}</span>
                          <h3 className={styles.cardTitle}>{tool.title}</h3>
                          <p className={styles.cardDesc}>{tool.description}</p>
                          <div className={styles.cardFooter}>
                            <span className={styles.cardCta}>Open Tool ↗</span>
                            {tool.repoUrl && tool.repoUrl.includes('github.com/nrcc-cornell/') && (
                              <a
                                href={tool.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.cardRepo}
                                onClick={e => e.stopPropagation()}
                              >
                                GitHub ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ToolsSummaryPage;