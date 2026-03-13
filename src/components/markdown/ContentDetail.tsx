// src/components/markdown/ContentDetail.tsx
// Editorial article page — Option 2 (magazine) + Option 3 (Field Report / CSF brand)
//
// Layout:
//   - Full-width dark green header band with title overlaid in serif type
//   - Narrow centered article body with drop cap on first paragraph
//   - Pull quotes break out to the side in green boxes
//   - Right sidebar: related CSF tools + recent articles
//   - Prev/next navigation at the bottom

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import MarkdownRenderer from './MarkdownRenderer';
import Container from '../common/Container/Container';
import { featuredTools } from '../../data/tools';
import styles from './ContentDetail.module.css';

interface Props {
  files: Record<string, string>;
  backPath: string;
  backLabel?: string;
}

const ContentDetail: React.FC<Props> = ({ files, backPath, backLabel = 'Back' }) => {
  const { id } = useParams<{ id: string }>();
  const { getItem, items } = useMarkdownContent(files);
  const item = id ? getItem(id) : undefined;

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    }) : '';

  if (!item) {
    return (
      <Container>
        <div className={styles.notFound}>
          <h2>Article not found</h2>
          <Link to={backPath} className={styles.backLink}>← {backLabel}</Link>
        </div>
      </Container>
    );
  }

  const currentIndex = items.findIndex(i => i.slug === item.slug);
  const prevItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : null;
  const nextItem = currentIndex > 0 ? items[currentIndex - 1] : null;

  // Pick 3 random tools for sidebar
  const sidebarTools = featuredTools.slice(0, 3);

  // Recent articles (not current)
  const recentItems = items.filter(i => i.slug !== item.slug).slice(0, 4);

  return (
    <div className={styles.page}>

      {/* ── Hero band ─────────────────────────────────────────── */}
      <div className={styles.heroBand}>
        {item.meta.image && (
          <img
            src={item.meta.image as string}
            alt={item.meta.title}
            className={styles.heroImage}
          />
        )}
        <div className={styles.heroOverlay}>
          <div className={styles.heroInner}>
            <Link to={backPath} className={styles.heroBackLink}>
              ← {backLabel}
            </Link>
            {item.meta.category && (
              <span className={styles.heroCategory}>{item.meta.category as string}</span>
            )}
            <h1 className={styles.heroTitle}>{item.meta.title}</h1>
            {item.meta.excerpt && (
              <p className={styles.heroDeck}>{item.meta.excerpt as string}</p>
            )}
            <div className={styles.heroMeta}>
              {item.meta.author && (
                <span className={styles.heroAuthor}>By {item.meta.author as string}</span>
              )}
              {item.meta.author && item.meta.date && <span className={styles.heroDot}>·</span>}
              <span className={styles.heroDate}>{formatDate(item.meta.date)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body layout: article + sidebar ───────────────────── */}
      <div className={styles.bodyLayout}>

        {/* Article column */}
        <article className={styles.article}>
          <MarkdownRenderer content={item.body} className={styles.body} />

          {/* Author card */}
          {item.meta.author && (
            <div className={styles.authorCard}>
              <div className={styles.authorAvatar}>
                {(item.meta.author as string).charAt(0)}
              </div>
              <div>
                <p className={styles.authorName}>{item.meta.author as string}</p>
                <p className={styles.authorRole}>Cornell Climate Smart Farming Program</p>
              </div>
            </div>
          )}

          {/* Prev / Next */}
          <nav className={styles.prevNext}>
            <div className={styles.prevNextItem}>
              {prevItem && (
                <Link to={`${backPath}/${prevItem.slug}`} className={styles.navLink}>
                  <span className={styles.navDirection}>← Older</span>
                  <span className={styles.navTitle}>{prevItem.meta.title}</span>
                </Link>
              )}
            </div>
            <div className={`${styles.prevNextItem} ${styles.nextItem}`}>
              {nextItem && (
                <Link to={`${backPath}/${nextItem.slug}`} className={styles.navLink}>
                  <span className={styles.navDirection}>Newer →</span>
                  <span className={styles.navTitle}>{nextItem.meta.title}</span>
                </Link>
              )}
            </div>
          </nav>
        </article>

        {/* Sidebar */}
        <aside className={styles.sidebar}>

          {/* CSF Tools box */}
          <div className={styles.sidebarBox}>
            <h3 className={styles.sidebarHeading}>
              <span className={styles.sidebarIcon}>🛠</span> CSF Tools
            </h3>
            <p className={styles.sidebarSubtext}>
              Decision support tools mentioned or relevant to this topic:
            </p>
            <ul className={styles.toolList}>
              {sidebarTools.map(tool => (
                <li key={tool.id}>
                  <Link to={`/tools/${tool.id}`} className={styles.toolLink}>
                    <span className={styles.toolEmoji}>{tool.icon}</span>
                    <span className={styles.toolName}>{tool.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/tools" className={styles.allToolsLink}>View All Tools →</Link>
          </div>

          {/* Recent articles box */}
          {recentItems.length > 0 && (
            <div className={styles.sidebarBox}>
              <h3 className={styles.sidebarHeading}>
                <span className={styles.sidebarIcon}>📰</span> Recent Articles
              </h3>
              <ul className={styles.recentList}>
                {recentItems.map(recent => (
                  <li key={recent.slug} className={styles.recentItem}>
                    <Link to={`${backPath}/${recent.slug}`} className={styles.recentLink}>
                      {recent.meta.category && (
                        <span className={styles.recentCategory}>{recent.meta.category as string}</span>
                      )}
                      <span className={styles.recentTitle}>{recent.meta.title}</span>
                      <span className={styles.recentDate}>{formatDate(recent.meta.date)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Field notes callout */}
          <div className={`${styles.sidebarBox} ${styles.fieldNotesBox}`}>
            <p className={styles.fieldNotesLabel}>🌾 Field Notes</p>
            <p className={styles.fieldNotesText}>
              The Cornell Climate Smart Farming Program develops tools and resources
              to help Northeast farmers adapt to a changing climate.
            </p>
            <a
              href="https://climatesmartfarming.org"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fieldNotesLink}
            >
              Learn More ↗
            </a>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default ContentDetail;