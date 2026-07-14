import { useParams, Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import styles from './VideoDetailPage.module.css';

const files = import.meta.glob('/src/content/videos/*.md', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>;

function formatDate(d: string) {
  return d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '';
}

export default function VideoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getItem, items } = useMarkdownContent(files);
  const item = id ? getItem(id) : undefined;

  if (!item) {
    return (
      <div className={styles.notFound}>
        <Link to="/videos" className={styles.backLink}>← Back to Videos</Link>
        <p>Video not found.</p>
      </div>
    );
  }

  const videoUrl = item.meta.videoUrl as string;
  const kalturaId = item.meta.kalturaId as string | undefined;
  const resourcesUrl = item.meta.resourcesUrl as string | undefined;
  const related = items
    .filter(i => i.slug !== item.slug && i.meta.category === item.meta.category)
    .slice(0, 4);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* Back link */}
        <Link to="/videos" className={styles.backLink}>← All Videos</Link>

        {/* Title */}
        <div className={styles.titleBlock}>
          <span className={styles.categoryBadge}>{item.meta.category as string}</span>
          <h1 className={styles.title}>{item.meta.title}</h1>
          {item.meta.excerpt && <p className={styles.excerpt}>{item.meta.excerpt as string}</p>}
          <p className={styles.date}>{formatDate(item.meta.date)}</p>
        </div>

        {/* Video embed — full width of the inner container */}
        {kalturaId ? (
          <div className={styles.embedWrap}>
            <iframe
              src={`https://cdnapisec.kaltura.com/p/520801/sp/52080100/embedIframeJs/uiconf_id/31230141/partner_id/520801?iframeembed=true&playerId=kplayer&entry_id=${kalturaId}`}
              title={item.meta.title as string}
              allowFullScreen
              className={styles.embed}
            />
          </div>
        ) : videoUrl ? (
          <div className={styles.embedWrap}>
            <iframe
              src={videoUrl}
              title={item.meta.title as string}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.embed}
            />
          </div>
        ) : null}

        {/* Resources bar */}
        {resourcesUrl && (
          <div className={styles.resourcesBar}>
            <span>📎 Webinar resources & presentations:</span>
            <a href={resourcesUrl} target="_blank" rel="noopener noreferrer" className={styles.resourcesLink}>
              View Resources ↗
            </a>
          </div>
        )}

        {/* Related videos */}
        {related.length > 0 && (
          <div className={styles.related}>
            <h2 className={styles.relatedTitle}>More {item.meta.category as string}s</h2>
            <div className={styles.relatedGrid}>
              {related.map(r => {
                const ytId = (r.meta.videoUrl as string)?.match(/embed\/([A-Za-z0-9_-]{11})/)?.[1];
                return (
                  <Link key={r.slug} to={`/videos/${r.slug}`} className={styles.relatedCard}>
                    <div className={styles.relatedThumb}>
                      {ytId ? (
                        <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={r.meta.title as string} className={styles.relatedThumbImg} />
                      ) : (
                        <div className={styles.relatedThumbPlaceholder} />
                      )}
                      <div className={styles.relatedPlay}>▶</div>
                    </div>
                    <div className={styles.relatedText}>
                      <span className={styles.relatedItemTitle}>{r.meta.title as string}</span>
                      <span className={styles.relatedDate}>{formatDate(r.meta.date)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}