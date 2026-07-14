import { useParams, Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import MarkdownRenderer from '../../components/markdown/MarkdownRenderer';
import styles from './FarmerStoryPage.module.css';

const files = import.meta.glob('/src/content/farmer-stories/*.md', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>;

export default function FarmerStoryPage() {
  const { id } = useParams<{ id: string }>();
  const { getItem, items } = useMarkdownContent(files);
  const item = id ? getItem(id) : undefined;

  if (!item) {
    return (
      <div className={styles.page}>
        <div className={styles.layout}>
          <div className={styles.notFound}>
            <Link to="/farmer-stories" className={styles.backLink}>← Back to Farmer Stories</Link>
            <p>Story not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = items.findIndex(i => i.slug === item.slug);
  const prevItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : null;
  const nextItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const relatedItems = items.filter(i => i.slug !== item.slug && i.meta.category === item.meta.category).slice(0, 3);

  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* Article */}
        <article className={styles.article}>
          <Link to="/farmer-stories" className={styles.backLink}>← All Farmer Stories</Link>

          <MarkdownRenderer content={item.body} className={styles.body} />

          {/* Prev / Next */}
          <nav className={styles.prevNext}>
            <div>
              {prevItem && (
                <Link to={`/farmer-stories/${prevItem.slug}`} className={styles.navLink}>
                  <span className={styles.navDir}>← Previous Story</span>
                  <span className={styles.navTitle}>{prevItem.meta.title}</span>
                </Link>
              )}
            </div>
            <div className={styles.navRight}>
              {nextItem && (
                <Link to={`/farmer-stories/${nextItem.slug}`} className={styles.navLink}>
                  <span className={styles.navDir}>Next Story →</span>
                  <span className={styles.navTitle}>{nextItem.meta.title}</span>
                </Link>
              )}
            </div>
          </nav>
        </article>

        {/* Sidebar */}
        <aside className={styles.sidebar}>

          {/* Farm details card */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>About This Farm</h3>
            <dl className={styles.farmDetails}>
              {item.meta.farmName && (
                <>
                  <dt>Farm</dt>
                  <dd>{item.meta.farmName as string}</dd>
                </>
              )}
              {item.meta.location && (
                <>
                  <dt>Location</dt>
                  <dd>{item.meta.location as string}</dd>
                </>
              )}
              {item.meta.category && (
                <>
                  <dt>Topic</dt>
                  <dd>{item.meta.category as string}</dd>
                </>
              )}
              {item.meta.author && (
                <>
                  <dt>Author</dt>
                  <dd>{item.meta.author as string}</dd>
                </>
              )}
            </dl>
          </div>

          {/* Related stories */}
          {relatedItems.length > 0 && (
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>Related Stories</h3>
              <div className={styles.relatedList}>
                {relatedItems.map(r => (
                  <Link key={r.slug} to={`/farmer-stories/${r.slug}`} className={styles.relatedItem}>
                    {r.meta.image && (
                      <div className={styles.relatedImg} style={{ backgroundImage: `url(${r.meta.image})` }} />
                    )}
                    <div className={styles.relatedText}>
                      {r.meta.farmName && <span className={styles.relatedFarm}>{r.meta.farmName as string}</span>}
                      <span className={styles.relatedTitle}>{r.meta.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CSF callout */}
          <div className={`${styles.sideCard} ${styles.sideCardDark}`}>
            <p className={styles.calloutLabel}>🌾 Climate Smart Farming</p>
            <p className={styles.calloutText}>
              Explore free tools and resources to help your farm adapt to a changing climate.
            </p>
            <Link to="/tools" className={styles.calloutBtn}>Explore CSF Tools →</Link>
          </div>

        </aside>
      </div>
    </div>
  );
}