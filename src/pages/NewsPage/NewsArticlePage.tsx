// src/pages/NewsPage/NewsArticlePage.tsx
// Drop-in replacement. All logic lives in ContentDetail.

import React from 'react';
import ContentDetail from '../../components/markdown/ContentDetail';

const files = import.meta.glob('/src/content/news/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const NewsArticlePage: React.FC = () => (
  <ContentDetail
    files={files}
    backPath="/news"
    backLabel="Back to News"
  />
);

export default NewsArticlePage;