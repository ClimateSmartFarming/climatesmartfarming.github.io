// src/pages/ExternalResourcesPage/ExternalResourcesPage.tsx
import React from 'react';
import ResourceIndex from '../../components/markdown/ResourceIndex';
import styles from './ExternalResourcesPage.module.css';

const files = import.meta.glob('/src/content/resources/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const ExternalResourcesPage: React.FC = () => (
  <div className={styles.page}>
    {/* Hero Banner - matching Tools page style */}
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.heroEyebrow}>Cornell Climate Smart Farming</p>
        <h1 className={styles.heroTitle}>External Resources</h1>
        <p className={styles.heroSubtitle}>
          Trusted tools and information from our partner organizations to support climate-smart agriculture
        </p>
      </div>
    </div>

    <ResourceIndex files={files} />
  </div>
);

export default ExternalResourcesPage;