// src/pages/BlogPage/BlogPage.tsx
import React from 'react';
import BlogIndex from '../../components/markdown/BlogIndex';

const files = import.meta.glob('/src/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const BlogPage: React.FC = () => <BlogIndex files={files} />;

export default BlogPage;