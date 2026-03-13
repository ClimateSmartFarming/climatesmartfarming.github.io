// src/pages/HomePage/HomePage.tsx
import React from 'react';
import Carousel from '../../components/sections/Carousel/Carousel';
import MissionStatement from '../../components/sections/MissionStatement/MissionStatement';
import ToolsSection from '../../components/sections/ToolsSection/ToolsSection';
import MapSection from '../../components/sections/MapSection/MapSection';
import ResourcesSection from '../../components/sections/ResourcesSection/ResourcesSection';
import { CarouselSlides } from '../../data/Carousel';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePage}>
      <main className={styles.mainContent}>

        {/* Carousel Banner */}
        <Carousel slides={CarouselSlides} autoPlayInterval={5000} />

        {/* Mission Statement Section */}
        <MissionStatement
          mission="The mission of Cornell Climate Smart Farming is to develop knowledge in agrometeorology and agroclimatology and transfer that knowledge to help agricultural managers mitigate production risks associated with climate variability and change."
          subtitle="Why Climate Smart Farming?"
        />

        {/* CSF Tools Section */}
        <ToolsSection
          title="CSF Tools"
          maxTools={6}
          viewAllLink="/tools"
        />

        {/* Network Map Section */}
        <MapSection />

        {/* Featured Resources Section */}
        <ResourcesSection
          title="Featured Resources"
          maxResources={6}
          featuredOnly={true}
        />

      </main>
    </div>
  );
};

export default HomePage;