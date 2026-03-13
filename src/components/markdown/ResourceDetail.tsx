// src/components/markdown/ResourceDetail.tsx
//
// Internal detail page for a resource.
// Shows the full description/body and a prominent "Visit Resource" button
// that opens the external link from frontmatter.

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import MarkdownRenderer from './MarkdownRenderer';
import Container from '../common/Container/Container';
import styles from './ResourceDetail.module.css';

interface Props {
  files: Record<string, string>;
}

const ResourceDetail: React.FC<Props> = ({ files }) => {
  const { id } = useParams<{ id: string }>();
  const { getItem } = useMarkdownContent(files);
  const item = id ? getItem(id) : undefined;

  if (!item) {
    return (
      <Container>
        <div className={styles.notFound}>
          <h2>Resource not found</h2>
          <Link to="/resources" className={styles.backLink}>← Back to Resources</Link>
        </div>
      </Container>
    );
  }

  const externalLink = item.meta.link as string | undefined;

  return (
    <div className={styles.page}>
      <Container>
        <Link to="/resources" className={styles.backLink}>
          ← Back to Resources
        </Link>

        <article className={styles.article}>
          <header className={styles.header}>
            {item.meta.category && (
              <span className={styles.category}>{item.meta.category as string}</span>
            )}
            <h1 className={styles.title}>{item.meta.title}</h1>
          </header>

          {/* External visit button — prominent, above the body */}
          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.visitBtn}
            >
              Visit Resource ↗
            </a>
          )}

          {/* Body — full markdown description */}
          {item.body && (
            <MarkdownRenderer content={item.body} className={styles.body} />
          )}

          {/* Second visit button at the bottom for long pages */}
          {externalLink && item.body && item.body.length > 400 && (
            <div className={styles.bottomCta}>
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitBtn}
              >
                Visit Resource ↗
              </a>
            </div>
          )}
        </article>
      </Container>
    </div>
  );
};

export default ResourceDetail;