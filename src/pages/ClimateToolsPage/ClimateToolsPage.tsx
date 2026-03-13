// src/pages/ClimateToolsPage/ClimateToolsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../components/sections/HeroSection/HeroSection';
import { featuredTools } from '../../data/tools';
import styles from './ClimateToolsPage.module.css';
import pageStyles from '../HomePage/HomePage.module.css';

const ClimateToolsPage: React.FC = () => {
  const categories = Array.from(new Set(featuredTools.map(tool => tool.category)));

  return (
    <div className={pageStyles.homePage}>
      <main className={pageStyles.mainContent}>
        <HeroSection
          title="CSF Tools"
          subtitle="Monitor weather conditions, track climate trends, and access historical climate data for your region"
        />
        <section className={styles.toolsSection}>
          <div className={styles.container}>
            <p className={styles.intro}>
              These climate monitoring tools provide access to real-time weather data, historical climate information,
              and future climate projections. Use these tools to track growing degree days, monitor drought conditions,
              understand climate trends, and plan for long-term climate variability.
            </p>
            {categories.map((category) => {
              const categoryTools = featuredTools.filter(t => t.category === category);
              return (
                <div key={category} className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>{category}</h2>
                  <div className={styles.toolsGrid}>
                    {categoryTools.map((tool) => (
                      <Link
                        key={tool.id}
                        to={`/tools/${tool.id}`}
                        className={styles.toolCard}
                      >
                        <div className={styles.toolIcon}>{tool.icon}</div>
                        <h3 className={styles.toolTitle}>{tool.title}</h3>
                        <p className={styles.toolDescription}>{tool.description}</p>
                        <span className={styles.externalLink}>Open Tool →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className={styles.backSection}>
              <Link to="/tools" className={styles.backLink}>← Back to Tools</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClimateToolsPage;