// src/components/markdown/ProgramIndex.tsx
//
// Renders programs as large alternating editorial banners.
// Each banner has: image, category tag, title, subtitle, body text, CTA button.
// Odd-indexed programs are image-left, even are image-right.
//
// Frontmatter fields: title, subtitle, excerpt, image, link, linkLabel, category, order

import React from 'react';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import MarkdownRenderer from './MarkdownRenderer';
import HeroSection from '../sections/HeroSection/HeroSection';
import Container from '../common/Container/Container';
import styles from './ProgramIndex.module.css';

interface Props {
  files: Record<string, string>;
}

const ProgramIndex: React.FC<Props> = ({ files }) => {
  const { items } = useMarkdownContent(files);

  // Sort by the `order` frontmatter field, fall back to date
  const sorted = [...items].sort((a, b) => {
    const oa = Number(a.meta.order ?? 99);
    const ob = Number(b.meta.order ?? 99);
    return oa - ob;
  });

  return (
    <div className={styles.page}>
      <HeroSection title="Programs" subtitle="Cornell Climate Smart Farming initiatives and partnerships" />

      <div className={styles.programList}>
        {sorted.map((item, index) => {
          const isReversed = index % 2 !== 0;
          const link = item.meta.link as string | undefined;
          const linkLabel = (item.meta.linkLabel as string) || 'Learn More';

          return (
            <article
              key={item.slug}
              className={`${styles.banner} ${isReversed ? styles.bannerReversed : ''}`}
            >
              {/* Image panel */}
              {item.meta.image && (
                <div className={styles.imagePanel}>
                  <div className={styles.imageInner}>
                    <img
                      src={item.meta.image as string}
                      alt={item.meta.title}
                      className={styles.image}
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                </div>
              )}

              {/* Content panel */}
              <div className={styles.contentPanel}>
                <div className={styles.contentInner}>
                  {item.meta.category && (
                    <span className={styles.tag}>{item.meta.category as string}</span>
                  )}
                  <h2 className={styles.title}>{item.meta.title}</h2>
                  {item.meta.subtitle && (
                    <p className={styles.subtitle}>{item.meta.subtitle as string}</p>
                  )}
                  <div className={styles.divider} />
                  <MarkdownRenderer content={item.body} className={styles.body} />
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cta}
                    >
                      {linkLabel}
                      <span className={styles.ctaArrow}>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramIndex;