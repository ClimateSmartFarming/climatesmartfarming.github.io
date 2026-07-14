import React from 'react';
import FarmerStoriesIndex from '../../components/markdown/FarmerStoriesIndex';

const files = import.meta.glob('/src/content/farmer-stories/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const FarmerStoriesPage: React.FC = () => (
  <FarmerStoriesIndex files={files} />
);

export default FarmerStoriesPage;