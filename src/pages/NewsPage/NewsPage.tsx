// src/pages/NewsPage/NewsPage.tsx
import React from 'react';
import NewsIndex from '../../components/markdown/NewsIndex';

const files = import.meta.glob('/src/content/news/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const NewsPage: React.FC = () => (
  <NewsIndex files={files} basePath="/news" />
);

export default NewsPage;