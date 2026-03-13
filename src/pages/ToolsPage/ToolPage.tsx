// src/pages/ToolsPage/ToolPage.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { featuredTools } from '../../data/tools';
import styles from './ToolPage.module.css';

const ToolPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tool = featuredTools.find(t => t.id === id);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  if (!tool) {
    return (
      <div className={styles.notFound}>
        <Link to="/tools" className={styles.backLink}>← Back to Tools</Link>
        <p>Tool not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* ── Title band ─────────────────────────────────────────────────── */}
      <div className={styles.titleBand}>
        <div className={styles.titleBandInner}>
          <Link to="/tools" className={styles.backLink}>← All Tools</Link>
          <div className={styles.titleRow}>
            {tool.image ? (
              <div className={styles.titleImg} style={{ backgroundImage: `url(${tool.image})` }} />
            ) : (
              <div className={styles.titleImgPlaceholder}>
                <span>{tool.icon}</span>
              </div>
            )}
            <div className={styles.titleText}>
              <div className={styles.titleMeta}>
                <span className={styles.categoryBadge}>{tool.category}</span>
                {tool.hasIframe && <span className={styles.cornellBadge}>Cornell / NRCC</span>}
              </div>
              <h1 className={styles.title}>{tool.title}</h1>
              <p className={styles.description}>{tool.description}</p>
              <div className={styles.titleLinks}>
                {tool.externalLink && (
                  <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className={styles.linkExternal}>
                    Open full page ↗
                  </a>
                )}
                {tool.repoUrl && tool.repoUrl.includes('github.com') && (
                  <a href={tool.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.linkRepo}>
                    View source on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tool area ──────────────────────────────────────────────────── */}
      <div className={styles.toolArea}>
        {tool.hasIframe && tool.iframeUrl ? (
          <div className={styles.iframeWrapper}>
            {!iframeLoaded && !iframeError && (
              <div className={styles.iframeLoading}>
                <div className={styles.spinner} />
                <p>Loading tool…</p>
              </div>
            )}
            {iframeError && (
              <div className={styles.iframeError}>
                <p>⚠️ The tool could not be loaded inline.</p>
                {tool.externalLink && (
                  <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className={styles.externalBtn}>
                    Open Tool in New Tab ↗
                  </a>
                )}
              </div>
            )}
            {!iframeError && (
              <iframe
                src={tool.iframeUrl}
                title={tool.title}
                width="100%"
                height={tool.iframeHeight ?? '780px'}
                frameBorder="0"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
                className={`${styles.iframe} ${iframeLoaded ? styles.iframeVisible : ''}`}
              />
            )}
          </div>
        ) : (
          <div className={styles.externalOnly}>
            <p className={styles.externalNote}>
              This tool is hosted externally and opens in a new tab.
            </p>
            {tool.externalLink && (
              <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className={styles.externalBtn}>
                Open {tool.title} ↗
              </a>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default ToolPage;