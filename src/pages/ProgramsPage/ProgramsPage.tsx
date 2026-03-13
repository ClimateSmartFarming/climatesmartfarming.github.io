// src/pages/ProgramsPage/ProgramsPage.tsx
// Replace your existing ProgramsPage.tsx with this.
// To add or edit a program: edit its .md file in src/content/programs/
// The `order` frontmatter field controls display order (1 = first).

import React from 'react';
import ProgramIndex from '../../components/markdown/ProgramIndex';

const files = import.meta.glob('/src/content/programs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const ProgramsPage: React.FC = () => <ProgramIndex files={files} />;

export default ProgramsPage;