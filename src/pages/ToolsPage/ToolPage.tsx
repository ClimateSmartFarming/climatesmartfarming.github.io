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

function ToolFooter() {
  return (
    <div className={styles.toolFooter}>
      <p>
        <strong>
          Unsure of what steps to take next?{' '}
          <a href="http://cce.cornell.edu/localoffices" target="_blank" rel="noopener noreferrer">
            Find your local Extension office
          </a>{' '}
          for more detailed advice.
        </strong>
      </p>
      <p>
        <strong>
          Please take a few minutes to take a{' '}
          <a href="https://cornell.qualtrics.com/jfe/form/SV_bj8b2GbRZJReGIB" target="_blank" rel="noopener noreferrer">
            brief survey
          </a>{' '}
          on the CSF tools,
        </strong>{' '}
        so that we can continue to improve them, and develop new tools that are most needed! The
        survey is voluntary and confidential (the password to complete the survey is CSF).
      </p>
    </div>
  );
}

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
    iframeWidth: markdownTool.meta.iframeWidth as string | undefined,
    repoUrl: markdownTool.meta.repoUrl as string | undefined,
    hasIframe: markdownTool.meta.hasIframe === true || markdownTool.meta.hasIframe === 'true',
    body: markdownTool.body,
  } : legacyTool ? {
    ...legacyTool,
    iframeWidth: undefined as string | undefined,
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

  const titleBand = (
    <div className={styles.titleBand}>
      <div className={styles.titleBandInner}>
        <Link to="/tools" className={styles.backLink}>← All Tools</Link>
        <div className={styles.titleRow}>
          <div className={styles.titleText}>
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
  );

  const metaBand = (
    <div className={styles.metaBand}>
      <div className={styles.metaInner}>
        <div className={styles.titleMeta}>
          <span className={styles.categoryBadge}>{tool.category}</span>
          <span className={styles.cornellBadge}>Cornell / NRCC</span>
        </div>
        <ToolFooter />
      </div>
    </div>
  );

  // External tools (hasIframe: false) get the simple markdown layout
  if (!tool.hasIframe) {
    return (
      <div className={styles.page}>
        {titleBand}

        <div className={styles.externalLayout}>
          {/* Render markdown body (includes clickable image) */}
          {hasMarkdown ? (
            <MarkdownRenderer content={tool.body} className={styles.externalBody} />
          ) : (
            <>
              {/* Legacy fallback for tools not yet in markdown */}
              {tool.image && tool.externalLink && (
                <a href={tool.externalLink} target="_blank" rel="noopener noreferrer" className={styles.externalImageLink}>
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

        {metaBand}
      </div>
    );
  }

  // Iframe tools get the full layout
  return (
    <div className={styles.page}>

      {titleBand}

      {/* ── Tool area ──────────────────────────────────────────────────── */}
      <div className={styles.toolArea}>
        <div
          className={styles.iframeWrapper}
          style={tool.iframeWidth ? { maxWidth: tool.iframeWidth } : {}}
        >
          {!iframeLoaded && !iframeError && tool.iframeUrl && (
            <div className={styles.iframeLoading}>
              <div className={styles.spinner} />
              <p>Loading tool…</p>
            </div>
          )}
          {(iframeError || !tool.iframeUrl) && (
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

      {metaBand}

    </div>
  );
};

export default ToolPage;