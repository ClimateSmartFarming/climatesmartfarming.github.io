// src/pages/DecisionToolsPage/DecisionToolsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../components/sections/HeroSection/HeroSection';
import { featuredTools } from '../../data/tools';
import styles from './DecisionToolsPage.module.css';
import pageStyles from '../HomePage/HomePage.module.css';

const DecisionToolsPage: React.FC = () => {
  const categories = Array.from(new Set(featuredTools.map(tool => tool.category)));

  return (
    <div className={pageStyles.homePage}>
      <main className={pageStyles.mainContent}>
        <HeroSection
          title="CSF Tools"
          subtitle="Make informed decisions about production systems based on location-specific climate data, weather forecasts, and future outlooks"
        />

        <section className={styles.toolsSection}>
          <div className={styles.container}>
            <p className={styles.intro}>
              These decision support tools help farmers optimize planting dates, manage water resources,
              protect crops from frost, and make data-driven management decisions. All CSF tools allow
              for selection of multiple locations, at the field level, to receive the most local and relevant data.
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

export default DecisionToolsPage;