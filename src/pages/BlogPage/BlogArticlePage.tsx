// src/pages/BlogPage/BlogArticlePage.tsx
import React from 'react';
import ContentDetail from '../../components/markdown/ContentDetail';

const files = import.meta.glob('/src/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const BlogArticlePage: React.FC = () => (
  <ContentDetail
    files={files}
    backPath="/blog"
    backLabel="Back to Blog"
  />
);

export default BlogArticlePage;