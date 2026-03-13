// src/pages/FarmerStoriesPage/FarmerStoryPage.tsx
import React from 'react';
import ContentDetail from '../../components/markdown/ContentDetail';

const files = import.meta.glob('/src/content/farmer-stories/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const FarmerStoryPage: React.FC = () => (
  <ContentDetail
    files={files}
    backPath="/farmer-stories"
    backLabel="Back to Farmer Stories"
  />
);

export default FarmerStoryPage;