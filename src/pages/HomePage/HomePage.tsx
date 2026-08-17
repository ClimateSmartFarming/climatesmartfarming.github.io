// src/pages/HomePage/HomePage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/sections/Carousel/Carousel';
import Container from '../../components/common/Container/Container';
import { CarouselSlides } from '../../data/Carousel';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import styles from './HomePage.module.css';

// Import all markdown files
const farmerStoryFiles = import.meta.glob('/src/content/farmer-stories/*.md', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>;

const videoFiles = import.meta.glob('/src/content/videos/*.md', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>;

const newsFiles = import.meta.glob('/src/content/news/*.md', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>;

const resourceFiles = import.meta.glob('/src/content/resources/*.md', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>;

const toolFiles = import.meta.glob('/src/content/tools/*.md', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>;

// Helper to get YouTube thumbnail from embed URL
const getYouTubeThumbnail = (videoUrl: string): string => {
  const match = videoUrl?.match(/embed\/([A-Za-z0-9_-]{11})/);
  if (match) return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  const watchMatch = videoUrl?.match(/watch\?v=([A-Za-z0-9_-]{11})/);
  if (watchMatch) return `https://img.youtube.com/vi/${watchMatch[1]}/hqdefault.jpg`;
  const shortMatch = videoUrl?.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (shortMatch) return `https://img.youtube.com/vi/${shortMatch[1]}/hqdefault.jpg`;
  return '';
};

// Parse frontmatter helper
function parseFrontmatter(content: string) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatter: Record<string, string | string[]> = {};
  match[1].split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  });
  return { frontmatter, body: match[2] };
}

// Get current season
function getCurrentSeason(): string {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return 'spring';  // Mar-May
  if (month >= 5 && month <= 7) return 'summer';  // Jun-Aug
  if (month >= 8 && month <= 10) return 'fall';   // Sep-Nov
  return 'winter'; // Dec-Feb
}

// Placeholder image component - shows icon for tools
const PlaceholderImage: React.FC<{ title: string; color?: string; showIcon?: boolean }> = ({
  title,
  color = '#3D5A45',
  showIcon = false
}) => (
  <div style={{
    width: '100%',
    height: '100%',
    background: `linear-gradient(135deg, ${color} 0%, #2a4330 100%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
    gap: '0.5rem'
  }}>
    {showIcon ? (
      <>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
        <span style={{ fontSize: '0.8rem', fontWeight: 500, opacity: 0.9, maxWidth: '80%' }}>{title}</span>
      </>
    ) : (
      <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{title}</span>
    )}
  </div>
);

// Image with fallback - use showIcon for tool images
const ImageWithFallback: React.FC<{ src: string; alt: string; className?: string; showIcon?: boolean }> = ({
  src,
  alt,
  className,
  showIcon = false
}) => {
  const [error, setError] = React.useState(false);

  if (error || !src) {
    return <PlaceholderImage title={alt} showIcon={showIcon} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

// Parse all tools from markdown
function getAllTools() {
  return Object.entries(toolFiles).map(([path, content]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { frontmatter } = parseFrontmatter(content as string);
    return {
      id: slug,
      title: (frontmatter.title as string) || 'Tool',
      description: (frontmatter.description as string) || '',
      image: (frontmatter.image as string) || '',
      toolType: (frontmatter.toolType as string) || 'external',
      season: (frontmatter.season as string) || 'all',
      hasIframe: frontmatter.hasIframe === 'true',
      externalLink: (frontmatter.externalLink as string) || '',
    };
  });
}

// Parse all fact sheets from resources - filter by category "Fact Sheet"
function getAllFactSheets() {
  const sheets = Object.entries(resourceFiles).map(([path, content]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { frontmatter } = parseFrontmatter(content as string);
    const title = (frontmatter.title as string) || '';
    const category = (frontmatter.category as string) || '';
    return {
      id: slug,
      title: title,
      category: category,
      image: (frontmatter.image as string) || '',
      link: `/resources/${slug}`
    };
  });
  // Filter to only include items with "Fact Sheet" category (case insensitive)
  return sheets.filter(sheet =>
    sheet.title &&
    sheet.category.toLowerCase().includes('fact sheet')
  );
}

// Check for reduced motion preference
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

const HomePage: React.FC = () => {
  const currentSeason = getCurrentSeason();
  const allTools = getAllTools();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Seasonal Tools: integrated tools matching current season
  const seasonalTools = allTools.filter(tool =>
    tool.toolType === 'integrated' &&
    tool.season === currentSeason
  );

  // Featured Tools: integrated tools that are NOT in the seasonal spotlight
  // This includes year-round tools (season: 'all') plus tools from other seasons
  const seasonalToolIds = new Set(seasonalTools.map(t => t.id));
  const featuredTools = allTools
    .filter(tool =>
      tool.toolType === 'integrated' &&
      !seasonalToolIds.has(tool.id)
    )
    .slice(0, 3);

  // Seasonal spotlight rotation state
  const [currentSpotlightIndex, setCurrentSpotlightIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-advance seasonal spotlight
  useEffect(() => {
    if (seasonalTools.length <= 1 || isPaused || hasInteracted || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentSpotlightIndex(prev => (prev + 1) % seasonalTools.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [seasonalTools.length, isPaused, hasInteracted, prefersReducedMotion]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentSpotlightIndex(index);
    setHasInteracted(true);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSpotlightIndex(prev => prev === 0 ? seasonalTools.length - 1 : prev - 1);
    setHasInteracted(true);
  }, [seasonalTools.length]);

  const handleNext = useCallback(() => {
    setCurrentSpotlightIndex(prev => (prev + 1) % seasonalTools.length);
    setHasInteracted(true);
  }, [seasonalTools.length]);

  // Fact sheets
  const factSheets = getAllFactSheets().slice(0, 2);

  // Get farmer stories from markdown files
  const { items: allFarmerStories } = useMarkdownContent(farmerStoryFiles);
  const farmerStories = allFarmerStories.slice(0, 2).map(story => ({
    id: story.slug,
    title: story.meta.title as string,
    farmName: (story.meta.farmName as string) || '',
    location: (story.meta.location as string) || '',
    excerpt: (story.meta.excerpt as string) || '',
    image: (story.meta.image as string) || '',
    link: `/farmer-stories/${story.slug}`
  }));

  // Get videos from markdown files
  const { items: allVideos } = useMarkdownContent(videoFiles);
  const recentVideos = allVideos.slice(0, 2).map(video => ({
    id: video.slug,
    title: video.meta.title as string,
    category: (video.meta.category as string) || 'Video',
    videoUrl: (video.meta.videoUrl as string) || '',
    link: `/videos/${video.slug}`
  }));

  // Resource tab state - 'overview' shows 1 of each, category names show 3 of that category
  const [activeResourceTab, setActiveResourceTab] = useState<'overview' | 'farmer-stories' | 'videos' | 'fact-sheets'>('overview');

  // Get 3 of each for expanded view
  const farmerStoriesExpanded = allFarmerStories.slice(0, 3).map(story => ({
    id: story.slug,
    title: story.meta.title as string,
    farmName: (story.meta.farmName as string) || '',
    location: (story.meta.location as string) || '',
    excerpt: (story.meta.excerpt as string) || '',
    image: (story.meta.image as string) || '',
    link: `/farmer-stories/${story.slug}`
  }));

  const videosExpanded = allVideos.slice(0, 3).map(video => ({
    id: video.slug,
    title: video.meta.title as string,
    category: (video.meta.category as string) || 'Video',
    videoUrl: (video.meta.videoUrl as string) || '',
    link: `/videos/${video.slug}`
  }));

  const factSheetsExpanded = getAllFactSheets().slice(0, 3);

  // Handle tab click
  const handleTabClick = (tab: 'overview' | 'farmer-stories' | 'videos' | 'fact-sheets') => {
    setActiveResourceTab(tab);
  };

  // Get news from markdown files
  const { items: allNews } = useMarkdownContent(newsFiles);
  const recentNews = allNews.slice(0, 4).map(news => ({
    id: news.slug,
    title: news.meta.title as string,
    date: news.meta.date ? new Date(news.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
    excerpt: (news.meta.excerpt as string) || '',
    image: (news.meta.image as string) || '',
    link: `/news/${news.slug}`
  }));

  // Get all external resources from markdown files (excluding Fact Sheets which are in CSF Resources)
  const allExternalResources = Object.entries(resourceFiles).map(([path, content]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { frontmatter } = parseFrontmatter(content as string);
    const category = (frontmatter.category as string) || 'General';
    return {
      id: slug,
      title: (frontmatter.title as string) || 'Resource',
      description: (frontmatter.description as string) || '',
      category: category,
      image: (frontmatter.image as string) || '',
      externalLink: (frontmatter.externalLink as string) || `/resources/${slug}`
    };
  }).filter(r => !r.category.toLowerCase().includes('fact sheet'));

  // Get top 4 categories by count
  const categoryCounts = allExternalResources.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([cat]) => cat);

  // External resource tab state
  const [activeExternalTab, setActiveExternalTab] = useState<string>('overview');

  // Get resources by category
  const getResourcesByCategory = (category: string) =>
    allExternalResources.filter(r => r.category === category).slice(0, 3);

  // Overview: 1 from each top category (4 total)
  const externalOverviewResources = topCategories.map(cat =>
    allExternalResources.find(r => r.category === cat)
  ).filter(Boolean);

  // Helper to get category class name
  const getExternalCategoryClass = (category: string): string => {
    if (category.includes('Dairy') || category.includes('Livestock')) return 'dairy';
    if (category === 'General') return 'general';
    if (category.includes('Field Crops')) return 'fieldCrops';
    if (category.includes('Multiple')) return 'multiple';
    return '';
  };

  // Helper to get tab class name
  const getExternalTabClass = (category: string): string => {
    if (category === 'overview') return styles.externalTabOverview;
    if (category.includes('Dairy') || category.includes('Livestock')) return styles.externalTabDairy;
    if (category === 'General') return styles.externalTabGeneral;
    if (category.includes('Field Crops')) return styles.externalTabFieldCrops;
    if (category.includes('Multiple')) return styles.externalTabMultiple;
    return '';
  };

  // Season display name
  const seasonDisplayName = currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1);

  // Current spotlight tool
  const spotlightTool = seasonalTools[currentSpotlightIndex];

  return (
    <div className={styles.homePage}>
      <main className={styles.mainContent}>

        {/* Carousel Banner */}
        <Carousel slides={CarouselSlides} autoPlayInterval={5000} />

        {/* ===== CLIMATE SMART FARMING TOOLS SECTION ===== */}
        <section className={styles.toolsSection}>
          <Container>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Climate Smart Farming Tools</h2>
              <p className={styles.sectionSubtitle}>
                Data-driven tools to help you make informed decisions about your farm
              </p>
            </div>

            {/* Seasonal Spotlight Band */}
            {seasonalTools.length > 0 && spotlightTool && (<><h3 className={styles.featuredToolsTitle}>Seasonal Tools</h3><div
                className={styles.seasonalBand}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
              >
                {/* Season Label Pill */}
                

                {/* Hero Strip Card */}
                <Link to={`/tools/${spotlightTool.id}`} className={styles.heroStrip}>
                  {/* Text Side */}
                  <div className={styles.heroText}>
                    <span className={styles.heroRotationTag}>
                      {seasonDisplayName} tool · {currentSpotlightIndex + 1} of {seasonalTools.length}
                    </span>
                    <h3 className={styles.heroTitle}>{spotlightTool.title}</h3>
                    <p className={styles.heroDescription}>{spotlightTool.description}</p>
                    <span className={styles.heroLink}>
                      Open tool →
                    </span>
                  </div>

                  {/* Image Side */}
                  <div className={styles.heroImageWrapper}>
                    <ImageWithFallback
                      src={spotlightTool.image}
                      alt={spotlightTool.title}
                      className={styles.heroImage}
                      showIcon
                    />
                  </div>
                </Link>

                {/* Navigation Controls */}
                {seasonalTools.length > 1 && (
                  <div className={styles.spotlightNav}>
                    <button
                      onClick={(e) => { e.preventDefault(); handlePrev(); }}
                      className={styles.navArrow}
                      aria-label="Previous tool"
                    >
                      ‹
                    </button>

                    <div className={styles.navDots}>
                      {seasonalTools.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => { e.preventDefault(); handleDotClick(index); }}
                          className={`${styles.navDot} ${index === currentSpotlightIndex ? styles.navDotActive : ''}`}
                          aria-label={`Go to tool ${index + 1}`}
                          aria-current={index === currentSpotlightIndex ? 'true' : undefined}
                        />
                      ))}
                    </div>

                    <button
                      onClick={(e) => { e.preventDefault(); handleNext(); }}
                      className={styles.navArrow}
                      aria-label="Next tool"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            </>
            )}

            {/* Featured Tools Grid */}
            {featuredTools.length > 0 && (
              <div className={styles.featuredToolsSection}>
                <h3 className={styles.featuredToolsTitle}>Featured Tools</h3>
                <div className={styles.featuredToolsGrid}>
                  {featuredTools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/tools/${tool.id}`}
                      className={styles.featuredToolCard}
                    >
                      <div className={styles.featuredToolImageWrapper}>
                        <ImageWithFallback
                          src={tool.image}
                          alt={tool.title}
                          className={styles.featuredToolImage}
                          showIcon
                        />
                      </div>
                      <div className={styles.featuredToolContent}>
                        <h4 className={styles.featuredToolTitle}>{tool.title}</h4>
                        <p className={styles.featuredToolDescription}>{tool.description}</p>
                        <span className={styles.featuredToolLink}>Open tool →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.viewAllWrapper}>
              <Link to="/tools" className={styles.viewAllButton}>
                View All Tools →
              </Link>
            </div>
          </Container>
        </section>

        {/* ===== CSF RESOURCES SECTION ===== */}
        <section className={styles.resourcesSection}>
          <Container>
            <div className={styles.resourcesHeader}>
              <h2 className={styles.resourcesTitle}>Climate Smart Farming Resources</h2>
            </div>

            {/* Resource Tabs */}
            <div className={styles.resourceTabs}>
              <button
                className={`${styles.resourceTab} ${activeResourceTab === 'overview' ? styles.resourceTabActive : ''} ${styles.resourceTabOverview}`}
                onClick={() => handleTabClick('overview')}
              >
                Overview
              </button>
              <button
                className={`${styles.resourceTab} ${activeResourceTab === 'farmer-stories' ? styles.resourceTabActive : ''} ${styles.resourceTabFarmerStory}`}
                onClick={() => handleTabClick('farmer-stories')}
              >
                Farmer Stories
              </button>
              <button
                className={`${styles.resourceTab} ${activeResourceTab === 'videos' ? styles.resourceTabActive : ''} ${styles.resourceTabVideo}`}
                onClick={() => handleTabClick('videos')}
              >
                Videos & Webinars
              </button>
              <button
                className={`${styles.resourceTab} ${activeResourceTab === 'fact-sheets' ? styles.resourceTabActive : ''} ${styles.resourceTabFactSheet}`}
                onClick={() => handleTabClick('fact-sheets')}
              >
                Fact Sheets
              </button>
            </div>

            {/* Overview - Show 1 of each */}
            {activeResourceTab === 'overview' && (
              <div className={styles.resourceTabContent}>
                <div className={styles.resourceRowCollapsed}>
                  {/* 1 Farmer Story */}
                  {farmerStories[0] && (
                    <Link to={farmerStories[0].link} className={styles.resourceImageCard} data-category="farmer-story">
                      <div className={styles.resourceImageWrapper}>
                        <ImageWithFallback src={farmerStories[0].image} alt={farmerStories[0].title} className={styles.resourceImage} />
                        <div className={`${styles.resourceColorBar} ${styles.colorBarFarmerStory}`} />
                      </div>
                      <div className={styles.resourceImageContent}>
                        <span className={`${styles.resourceCategoryLabel} ${styles.farmerStory}`}>Farmer Story</span>
                        <h4 className={styles.resourceImageTitle}>{farmerStories[0].title}</h4>
                        {farmerStories[0].excerpt && <p className={styles.resourceExcerpt}>{farmerStories[0].excerpt}</p>}
                      </div>
                    </Link>
                  )}

                  {/* 1 Video */}
                  {recentVideos[0] && (
                    <Link to={recentVideos[0].link} className={styles.resourceImageCard} data-category="video">
                      <div className={styles.resourceImageWrapper}>
                        <ImageWithFallback src={getYouTubeThumbnail(recentVideos[0].videoUrl)} alt={recentVideos[0].title} className={styles.resourceImage} />
                        <div className={`${styles.resourceColorBar} ${styles.colorBarVideo}`} />
                        <div className={styles.videoPlayOverlay}>
                          <div className={styles.videoPlayButton}>▶</div>
                        </div>
                      </div>
                      <div className={styles.resourceImageContent}>
                        <span className={`${styles.resourceCategoryLabel} ${styles.video}`}>Video</span>
                        <h4 className={styles.resourceImageTitle}>{recentVideos[0].title}</h4>
                      </div>
                    </Link>
                  )}

                  {/* 1 Fact Sheet */}
                  {factSheets[0] && (
                    <Link to={factSheets[0].link} className={styles.resourceImageCard} data-category="fact-sheet">
                      <div className={styles.resourceImageWrapper}>
                        <ImageWithFallback src={factSheets[0].image} alt={factSheets[0].title} className={styles.resourceImage} />
                        <div className={`${styles.resourceColorBar} ${styles.colorBarFactSheet}`} />
                      </div>
                      <div className={styles.resourceImageContent}>
                        <span className={`${styles.resourceCategoryLabel} ${styles.factSheet}`}>Fact Sheet</span>
                        <h4 className={styles.resourceImageTitle}>{factSheets[0].title}</h4>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Farmer Stories Expanded */}
            {activeResourceTab === 'farmer-stories' && (
              <div className={styles.resourceTabContent}>
                <div className={styles.resourceTabPanel}>
                  <div className={styles.resourceRowExpanded}>
                    {farmerStoriesExpanded.map((story) => (
                      <Link key={story.id} to={story.link} className={styles.resourceImageCard} data-category="farmer-story">
                        <div className={styles.resourceImageWrapper}>
                          <ImageWithFallback src={story.image} alt={story.title} className={styles.resourceImage} />
                          <div className={`${styles.resourceColorBar} ${styles.colorBarFarmerStory}`} />
                        </div>
                        <div className={styles.resourceImageContent}>
                          <span className={`${styles.resourceCategoryLabel} ${styles.farmerStory}`}>Farmer Story</span>
                          <span className={styles.resourceMeta}>
                            {[story.farmName, story.location].filter(Boolean).join(' • ') || 'Farmer Story'}
                          </span>
                          <h4 className={styles.resourceImageTitle}>{story.title}</h4>
                          {story.excerpt && <p className={styles.resourceExcerpt}>{story.excerpt}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className={styles.resourceTabFooter}>
                    <Link to="/farmer-stories" className={styles.viewAllButton}>View All Farmer Stories →</Link>
                  </div>
                </div>
              </div>
            )}

            {/* Videos & Webinars Expanded */}
            {activeResourceTab === 'videos' && (
              <div className={styles.resourceTabContent}>
                <div className={styles.resourceTabPanel}>
                  <div className={styles.resourceRowExpanded}>
                    {videosExpanded.map((video) => (
                      <Link key={video.id} to={video.link} className={styles.resourceImageCard} data-category="video">
                        <div className={styles.resourceImageWrapper}>
                          <ImageWithFallback src={getYouTubeThumbnail(video.videoUrl)} alt={video.title} className={styles.resourceImage} />
                          <div className={`${styles.resourceColorBar} ${styles.colorBarVideo}`} />
                          <div className={styles.videoPlayOverlay}>
                            <div className={styles.videoPlayButton}>▶</div>
                          </div>
                        </div>
                        <div className={styles.resourceImageContent}>
                          <span className={`${styles.resourceCategoryLabel} ${styles.video}`}>Video</span>
                          <h4 className={styles.resourceImageTitle}>{video.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className={styles.resourceTabFooter}>
                    <Link to="/videos" className={styles.viewAllButton}>View All Videos →</Link>
                  </div>
                </div>
              </div>
            )}

            {/* Fact Sheets Expanded */}
            {activeResourceTab === 'fact-sheets' && (
              <div className={styles.resourceTabContent}>
                <div className={styles.resourceTabPanel}>
                  <div className={styles.resourceRowExpanded}>
                    {factSheetsExpanded.map((sheet) => (
                      <Link key={sheet.id} to={sheet.link} className={styles.resourceImageCard} data-category="fact-sheet">
                        <div className={styles.resourceImageWrapper}>
                          <ImageWithFallback src={sheet.image} alt={sheet.title} className={styles.resourceImage} />
                          <div className={`${styles.resourceColorBar} ${styles.colorBarFactSheet}`} />
                        </div>
                        <div className={styles.resourceImageContent}>
                          <span className={`${styles.resourceCategoryLabel} ${styles.factSheet}`}>Fact Sheet</span>
                          <h4 className={styles.resourceImageTitle}>{sheet.title}</h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className={styles.resourceTabFooter}>
                    <Link to="/resources" className={styles.viewAllButton}>View All Fact Sheets →</Link>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* ===== NEWS SECTION ===== */}
        {recentNews.length > 0 && (
          <section className={styles.newsSection}>
            <Container>
              <div className={styles.newsSectionHeader}><h2 className={styles.sectionTitleCentered}>Latest News</h2></div>

              <div className={styles.newsGrid}>
                {/* Featured story (first/most recent) */}
                {recentNews[0] && (
                  <Link
                    to={recentNews[0].link}
                    className={styles.newsCardFeatured}
                  >
                    <div className={styles.newsImageWrapper}>
                      <ImageWithFallback src={recentNews[0].image} alt={recentNews[0].title} className={styles.newsImage} />
                    </div>
                    <div className={styles.newsContent}>
                      <span className={styles.newsDate}>{recentNews[0].date}</span>
                      <h3 className={styles.newsTitle}>{recentNews[0].title}</h3>
                      <p className={styles.newsExcerpt}>{recentNews[0].excerpt}</p>
                      <span className={styles.newsLink}>Read More →</span>
                    </div>
                  </Link>
                )}

                {/* Stacked smaller stories (next three) */}
                <div className={styles.newsStackedColumn}>
                  {recentNews.slice(1, 4).map((item) => (
                    <Link
                      key={item.id}
                      to={item.link}
                      className={styles.newsCardSmall}
                    >
                      <div className={styles.newsImageWrapper}>
                        <ImageWithFallback src={item.image} alt={item.title} className={styles.newsImage} />
                      </div>
                      <div className={styles.newsContent}>
                        <span className={styles.newsDate}>{item.date}</span>
                        <h3 className={styles.newsTitle}>{item.title}</h3>
                        <span className={styles.newsLink}>Read More →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className={styles.viewAllWrapper}>
                <Link to="/news" className={styles.viewAllButton}>
                  View All News Articles →
                </Link>
              </div>
            </Container>
          </section>
        )}

        {/* ===== EXTERNAL RESOURCES SECTION ===== */}
        {allExternalResources.length > 0 && (
          <section className={styles.externalSection}>
            <Container>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>External Resources</h2>
                <p className={styles.sectionSubtitle}>
                  Trusted tools and information from our partner organizations
                </p>
              </div>

              {/* External Resource Tabs */}
              <div className={styles.externalTabs}>
                <button
                  className={`${styles.externalTab} ${styles.externalTabOverview} ${activeExternalTab === 'overview' ? styles.externalTabActive : ''}`}
                  onClick={() => setActiveExternalTab('overview')}
                >
                  Overview
                </button>
                {topCategories.map((category) => (
                  <button
                    key={category}
                    className={`${styles.externalTab} ${getExternalTabClass(category)} ${activeExternalTab === category ? styles.externalTabActive : ''}`}
                    onClick={() => setActiveExternalTab(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Overview - 4 in a row, 1 from each category */}
              {activeExternalTab === 'overview' && (
                <div className={styles.externalTabContent}>
                  <div className={styles.externalGridFour}>
                    {externalOverviewResources.map((resource) => resource && (
                      <a
                        key={resource.id}
                        href={resource.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.externalCardCompact} ${styles[getExternalCategoryClass(resource.category)]}`}
                      >
                        <div className={styles.externalImageWrapperCompact}>
                          <ImageWithFallback src={resource.image} alt={resource.title} className={styles.externalImage} />
                        </div>
                        <div className={styles.externalInfoCompact}>
                          <span className={`${styles.externalCategoryLabel} ${styles[getExternalCategoryClass(resource.category)]}`}>{resource.category}</span>
                          <h3>{resource.title}</h3>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Category tabs - 3 resources each */}
              {topCategories.map((category) => (
                activeExternalTab === category && (
                  <div key={category} className={styles.externalTabContent}>
                    <div className={styles.externalGridThree}>
                      {getResourcesByCategory(category).map((resource) => (
                        <a
                          key={resource.id}
                          href={resource.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.externalCardCompact} ${styles[getExternalCategoryClass(resource.category)]}`}
                        >
                          <div className={styles.externalImageWrapperCompact}>
                            <ImageWithFallback src={resource.image} alt={resource.title} className={styles.externalImage} />
                          </div>
                          <div className={styles.externalInfoCompact}>
                            <span className={`${styles.externalCategoryLabel} ${styles[getExternalCategoryClass(resource.category)]}`}>{resource.category}</span>
                            <h3>{resource.title}</h3>
                            <p>{resource.description}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    
                  </div>
                )
              ))}

              <div className={styles.viewAllWrapper}>
                <Link to="/resources" className={styles.viewAllButton}>
                  View All External Resources →
                </Link>
              </div>
            </Container>
          </section>
        )}

      </main>
    </div>
  );
};

export default HomePage;





























