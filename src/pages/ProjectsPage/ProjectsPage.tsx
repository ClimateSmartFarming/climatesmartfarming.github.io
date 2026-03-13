// src/pages/ProjectsPage/ProjectsPage.tsx
import React from 'react';
import ContentIndex from '../../components/markdown/ContentIndex';

const files = import.meta.glob('/src/content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const ProjectsPage: React.FC = () => (
  <ContentIndex
    files={files}
    basePath="/projects"
    heroTitle="Projects"
    heroSubtitle="Research and extension projects advancing climate smart agriculture in the Northeast"
    showCategories={true}
  />
);

export default ProjectsPage;