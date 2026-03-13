// src/components/sections/ToolsSection/ToolsSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { featuredTools } from '../../../data/tools';
import styles from './ToolsSection.module.css';

interface ToolsSectionProps {
  title: string;
  maxTools?: number;
  viewAllLink?: string;
}

const ToolsSection: React.FC<ToolsSectionProps> = ({
  title,
  maxTools = 6,
  viewAllLink = '/tools',
}) => {
  const toolsToShow = featuredTools.slice(0, maxTools);

  return (
    <section className={styles.toolsSection}>
      <div className={styles.toolsContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink} className={styles.viewAllLink}>
              View All Tools →
            </Link>
          )}
        </div>
        <div className={styles.toolsGrid}>
          {toolsToShow.map((tool) => (
            <Link
              key={tool.id}
              to={`/tools/${tool.id}`}
              className={styles.toolCard}
            >
              <div className={styles.toolIcon}>{tool.icon}</div>
              <h3 className={styles.toolTitle}>{tool.title}</h3>
              <p className={styles.toolDescription}>{tool.description}</p>
              <span className={styles.learnMore}>Learn More →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;