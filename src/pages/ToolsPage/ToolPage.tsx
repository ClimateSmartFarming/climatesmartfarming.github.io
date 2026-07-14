// src/pages/ToolsPage/ToolPage.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import MarkdownRenderer from '../../components/markdown/MarkdownRenderer';
import styles from './ToolPage.module.css';

// Import markdown files
const markdownFiles = import.meta.glob('/src/content/tools/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Fallback to tools.ts for tools not yet converted to markdown
import { featuredTools } from '../../data/tools';

const ToolPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getItem } = useMarkdownContent(markdownFiles);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Try to get tool from markdown first
  const markdownTool = id ? getItem(id) : undefined;

  // Fall back to tools.ts if not found in markdown
  const legacyTool = featuredTools.find(t => t.id === id);

  // Use markdown version if available, otherwise legacy
  const hasMarkdown = !!markdownTool;
  const tool = markdownTool ? {
    id: markdownTool.slug,
    title: markdownTool.meta.title as string,
    description: markdownTool.meta.description as string,
    category: markdownTool.meta.category as string,
    image: markdownTool.meta.image as string | undefined,
    externalLink: markdownTool.meta.externalLink as string | undefined,
    iframeUrl: markdownTool.meta.iframeUrl as string | undefined,
    iframeHeight: markdownTool.meta.iframeHeight as string | undefined,
    repoUrl: markdownTool.meta.repoUrl as string | undefined,
    hasIframe: markdownTool.meta.hasIframe as boolean,
    body: markdownTool.body,
  } : legacyTool ? {
    ...legacyTool,
    body: legacyTool.detail || '',
  } : null;

  if (!tool) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <Link to="/tools" className={styles.backLink}>← Back to Tools</Link>
          <p>Tool not found.</p>
        </div>
      </div>
    );
  }

  // External tools (hasIframe: false) get the simple markdown layout
  if (!tool.hasIframe) {
    return (
      <div className={styles.page}>
        <div className={styles.externalLayout}>
          <Link to="/tools" className={styles.backLink}>← All Tools</Link>

          <h1 className={styles.externalTitle}>{tool.title}</h1>

          {/* Render markdown body (includes clickable image) */}
          {hasMarkdown ? (
            <MarkdownRenderer content={tool.body} className={styles.externalBody} />
          ) : (
            <>
              {/* Legacy fallback for tools not yet in markdown */}
              {tool.image && tool.externalLink && (
                <a
                  href={tool.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalImageLink}
                >
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className={styles.externalImage}
                  />
                </a>
              )}
              <div
                className={styles.externalBody}
                dangerouslySetInnerHTML={{ __html: tool.body }}
              />
            </>
          )}
        </div>
      </div>
    );
  }

  // Iframe tools get the full layout
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
                <span>🔧</span>
              </div>
            )}
            <div className={styles.titleText}>
              <div className={styles.titleMeta}>
                <span className={styles.categoryBadge}>{tool.category}</span>
                <span className={styles.cornellBadge}>Cornell / NRCC</span>
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
          {!iframeError && tool.iframeUrl && (
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
      </div>

      {/* ── Detail content ─────────────────────────────────────────────── */}
      {tool.body && (
        <div className={styles.detailBand}>
          <div className={styles.detailInner}>
            {hasMarkdown ? (
              <MarkdownRenderer content={tool.body} className={styles.detailBody} />
            ) : (
              <div
                className={styles.detailBody}
                dangerouslySetInnerHTML={{ __html: tool.body }}
              />
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ToolPage;