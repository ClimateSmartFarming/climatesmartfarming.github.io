// src/pages/ProjectsPage/ProjectDetailPage.tsx
import React from 'react';
import ContentDetail from '../../components/markdown/ContentDetail';

const files = import.meta.glob('/src/content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const ProjectDetailPage: React.FC = () => (
  <ContentDetail
    files={files}
    backPath="/projects"
    backLabel="Back to Projects"
  />
);

export default ProjectDetailPage;