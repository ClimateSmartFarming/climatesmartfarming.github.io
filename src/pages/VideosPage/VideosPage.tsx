import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import styles from './VideosPage.module.css';

const files = import.meta.glob('/src/content/videos/*.md', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>;

const CATEGORIES = ['All', 'Webinar', 'Tool Tutorial', 'Farm Interview'];
const ITEMS_PER_PAGE = 12;

function getYouTubeId(url: string): string | null {
  const match = url?.match(/embed\/([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function VideosPage() {
  const { items } = useMarkdownContent(files);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = (activeCategory === 'All'
    ? items
    : items.filter(i => i.meta.category === activeCategory)
  ).sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'All' ? items.length : items.filter(i => i.meta.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>Videos & Webinars</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>Farm interviews, tool tutorials, and webinars from the CSF program</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
            >
              {cat}
              <span className={styles.filterCount}>{counts[cat]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          <p className={styles.resultsInfo}>{filtered.length} videos</p>

          <div className={styles.grid}>
            {paginated.map(v => (
              <VideoCard
                key={v.slug}
                slug={v.slug}
                title={v.meta.title as string}
                excerpt={v.meta.excerpt as string}
                category={v.meta.category as string}
                date={v.meta.date}
                videoUrl={v.meta.videoUrl as string}
              />
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
        </div>
      </div>
    </div>
  );
}

function VideoCard({ slug, title, excerpt, category, date, videoUrl }: {
  slug: string; title: string; excerpt: string; category: string; date: string; videoUrl: string;
}) {
  const ytId = videoUrl?.match(/embed\/([A-Za-z0-9_-]{11})/)?.[1];
  const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null;

  function formatDate(d: string) {
    return d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '';
  }

  return (
    <Link to={`/videos/${slug}`} className={styles.card}>
      <div className={styles.cardThumb}>
        {thumbUrl ? (
          <img src={thumbUrl} alt={title} className={styles.cardThumbImg} />
        ) : (
          <div className={styles.cardThumbPlaceholder} />
        )}
        <div className={styles.cardPlayOverlay}>
          <div className={styles.cardPlay}>▶</div>
        </div>
        <span className={styles.cardCat}>{category}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardExcerpt}>{excerpt}</p>
        <div className={styles.cardFooter}>
          <span className={styles.cardDate}>{formatDate(date)}</span>
          <span className={styles.cardCta}>Watch →</span>
        </div>
      </div>
    </Link>
  );
}