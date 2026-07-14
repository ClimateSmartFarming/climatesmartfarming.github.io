// src/components/markdown/ContentDetail.tsx
// Editorial article page — Magazine Spread + Asymmetrical Layout
//
// Features:
//   - Full-width dark green header band with title overlaid
//   - First image large, then alternating left/right smaller images
//   - Pull quotes that break into margins
//   - Reading time indicator
//   - Progress bar on scroll
//   - Drop cap on first paragraph
//   - Right sidebar: related CSF tools + recent articles
//   - Prev/next navigation at the bottom

import React, { useState, useEffect, useRef } from 'react';
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
  const [readingProgress, setReadingProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // Calculate reading time (average 200 words per minute)
  const calculateReadingTime = (text: string) => {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes;
  };

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('[data-article-content]');
      if (!article) return;

      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const articleHeight = article.getBoundingClientRect().height;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const progress = Math.min(
        Math.max((scrollY - articleTop + windowHeight * 0.5) / articleHeight, 0),
        1
      );
      setReadingProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  const readingTime = calculateReadingTime(item.body);

  // Pick 3 random tools for sidebar
  const sidebarTools = featuredTools.slice(0, 3);

  // Recent articles (not current)
  const recentItems = items.filter(i => i.slug !== item.slug).slice(0, 4);

  return (
    <div className={styles.page}>
      {/* Reading progress bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${readingProgress}%` }}
        />
      </div>

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
            <div className={styles.heroMeta}>
              {item.meta.category && (
                <span className={styles.heroCategory}>{item.meta.category as string}</span>
              )}
              <span className={styles.readingTime}>📖 {readingTime} min read</span>
            </div>
            <h1 className={styles.heroTitle}>{item.meta.title}</h1>
            {item.meta.excerpt && (
              <p className={styles.heroDeck}>{item.meta.excerpt as string}</p>
            )}
            <div className={styles.heroByline}>
              {item.meta.author && (
                <>
                  <div className={styles.authorAvatarSmall}>
                    {(item.meta.author as string).charAt(0)}
                  </div>
                  <div className={styles.bylineText}>
                    <span className={styles.heroAuthor}>{item.meta.author as string}</span>
                    <span className={styles.heroDate}>{formatDate(item.meta.date)}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body layout: article + sidebar ───────────────────── */}
      <div className={styles.bodyLayout}>

        {/* Article column */}
        <article className={styles.article} data-article-content ref={articleRef}>
          <MarkdownRenderer content={item.body} className={styles.body} />

          {/* Clear any floats */}
          <div className={styles.clearfix}></div>

          {/* Share bar */}
          <div className={styles.shareBar}>
            <span className={styles.shareLabel}>Share this article</span>
            <div className={styles.shareButtons}>
              <button className={styles.shareButton} title="Share on Twitter">𝕏</button>
              <button className={styles.shareButton} title="Share on Facebook">f</button>
              <button className={styles.shareButton} title="Share on LinkedIn">in</button>
              <button className={styles.shareButton} title="Copy link">🔗</button>
            </div>
          </div>

          {/* Author card */}
          {item.meta.author && (
            <div className={styles.authorCard}>
              <div className={styles.authorAvatar}>
                {(item.meta.author as string).charAt(0)}
              </div>
              <div className={styles.authorInfo}>
                <p className={styles.authorLabel}>Written by</p>
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
                  <span className={styles.navDirection}>← Previous Article</span>
                  <span className={styles.navTitle}>{prevItem.meta.title}</span>
                </Link>
              )}
            </div>
            <div className={`${styles.prevNextItem} ${styles.nextItem}`}>
              {nextItem && (
                <Link to={`${backPath}/${nextItem.slug}`} className={styles.navLink}>
                  <span className={styles.navDirection}>Next Article →</span>
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