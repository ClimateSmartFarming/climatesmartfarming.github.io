// src/pages/FactSheetsPage/FactSheetsPage.tsx
import React from 'react';
import FactSheetsIndex from '../../components/markdown/FactSheetsIndex';

const files = import.meta.glob('/src/content/fact-sheets/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const FactSheetsPage: React.FC = () => (
  <FactSheetsIndex files={files} />
);

export default FactSheetsPage;