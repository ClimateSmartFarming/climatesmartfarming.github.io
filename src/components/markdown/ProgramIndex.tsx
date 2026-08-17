import React from 'react';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import MarkdownRenderer from './MarkdownRenderer';
import styles from './ProgramIndex.module.css';

interface Props {
  files: Record<string, string>;
}

const ProgramIndex: React.FC<Props> = ({ files }) => {
  const { items } = useMarkdownContent(files);

  const sorted = [...items].sort((a, b) => {
    const oa = Number(a.meta.order ?? 99);
    const ob = Number(b.meta.order ?? 99);
    return oa - ob;
  });

  return (
    <div className={styles.page}>

      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Cornell Climate Smart Farming</p>
        <h1 className={styles.heroTitle}>Programs & Partners</h1>
        <div className={styles.heroDivider} />
        <p className={styles.heroSub}>
          Collaborating organizations and initiatives working alongside CSF to build climate resilience across the Northeast
        </p>
        </div>
      </div>

      <div className={styles.programList}>
        {sorted.map((item, index) => {
          const isReversed = false;
          const link = item.meta.link as string | undefined;
          const linkLabel = (item.meta.linkLabel as string) || 'Learn More';

          return (
            <article key={item.slug} className={`${styles.banner} ${isReversed ? styles.bannerReversed : ''}`}>

              {/* Header band — small square image alternates sides */}
              <div className={styles.bannerHeader}>
                {!isReversed && (
                  <div className={styles.headerImgWrap}>
                    {item.meta.image ? (
                      <img src={item.meta.image as string} alt={item.meta.title} className={styles.headerImg} />
                    ) : (
                      <div className={styles.headerImgPlaceholder} />
                    )}
                  </div>
                )}
                <div className={styles.headerText}>
                  {item.meta.category && (
                    <span className={styles.tag}>{item.meta.category as string}</span>
                  )}
                  <h2 className={styles.title}>{item.meta.title}</h2>
                  {item.meta.subtitle && (
                    <p className={styles.subtitle}>{item.meta.subtitle as string}</p>
                  )}
                </div>
                {isReversed && (
                  <div className={styles.headerImgWrap}>
                    {item.meta.image ? (
                      <img src={item.meta.image as string} alt={item.meta.title} className={styles.headerImg} />
                    ) : (
                      <div className={styles.headerImgPlaceholder} />
                    )}
                  </div>
                )}
              </div>

              {/* Body — markdown renders inline images naturally */}
              <div className={styles.bannerBody}>
                <div className={styles.divider} />
                <MarkdownRenderer content={item.body} className={styles.body} />

                {/* Read More button */}
                {link && (
                  <a href={link} target="_blank" rel="noopener noreferrer" className={styles.cta}>
                    Visit ↗
                  </a>
                )}
              </div>

            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramIndex;

