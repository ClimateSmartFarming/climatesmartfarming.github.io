// src/pages/ExternalResourcesPage/ExternalResourcesPage.tsx
// Replace your existing file with this.
// To add a resource: drop a .md file into src/content/resources/

import React from 'react';
import ResourceIndex from '../../components/markdown/ResourceIndex';

const files = import.meta.glob('/src/content/resources/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const ExternalResourcesPage: React.FC = () => <ResourceIndex files={files} />;

export default ExternalResourcesPage;