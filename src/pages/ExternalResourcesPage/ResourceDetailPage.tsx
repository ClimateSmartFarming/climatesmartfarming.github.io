// src/pages/ExternalResourcesPage/ResourceDetailPage.tsx
// New file — add this alongside your existing ExternalResourcesPage.tsx

import React from 'react';
import ResourceDetail from '../../components/markdown/ResourceDetail';

const files = import.meta.glob('/src/content/resources/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const ResourceDetailPage: React.FC = () => <ResourceDetail files={files} />;

export default ResourceDetailPage;