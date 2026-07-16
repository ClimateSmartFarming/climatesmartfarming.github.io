import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './ResourcesPage.module.css';

// Import all resource markdown files
const resourceFiles = import.meta.glob('/src/content/resources/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// Parse frontmatter from markdown
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterStr = match[1];
  const body = match[2];

  const frontmatter: Record<string, string | string[]> = {};
  const lines = frontmatterStr.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1);
        const items = arrayContent.split(',').map(item => {
          let trimmed = item.trim();
          if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
              (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
            trimmed = trimmed.slice(1, -1);
          }
          return trimmed;
        }).filter(Boolean);
        frontmatter[key] = items;
      } else {
        frontmatter[key] = value;
      }
    }
  }

  return { frontmatter, body };
}

interface Resource {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  externalLink: string;
  image: string;
}

// Parse all resources
function getAllResources(): Resource[] {
  const resources: Resource[] = [];

  for (const [path, content] of Object.entries(resourceFiles)) {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { frontmatter } = parseFrontmatter(content as string);

    resources.push({
      slug,
      title: (frontmatter.title as string) || 'Untitled',
      description: (frontmatter.description as string) || '',
      category: (frontmatter.category as string) || 'General',
      tags: (frontmatter.tags as string[]) || [],
      externalLink: (frontmatter.externalLink as string) || '',
      image: (frontmatter.image as string) || '',
    });
  }

  return resources.sort((a, b) => a.title.localeCompare(b.title));
}

// Category data for sidebar filters
const filterCategories = {
  agriculturalSectors: {
    title: 'Agricultural Sectors',
    items: [
      { name: 'Dairy, Poultry, and Livestock', slug: 'dairy-poultry-and-livestock' },
      { name: 'Field Crops', slug: 'field-crops' },
      { name: 'Forestry', slug: 'forestry' },
      { name: 'Grapes', slug: 'grapes' },
      { name: 'Greenhouse, Nursery, and Sod', slug: 'greenhouse-nursery-and-sod' },
      { name: 'Maple', slug: 'maple' },
      { name: 'Specialty Crops', slug: 'specialty-crops' },
      { name: 'Tree Fruit and Berries', slug: 'tree-fruit-and-berries' },
      { name: 'Vegetables', slug: 'vegetables' },
    ],
  },
  mediaTypes: {
    title: 'Media Types',
    items: [
      { name: 'Decision Support Tool', slug: 'decision-support-tool' },
      { name: 'Fact Sheet', slug: 'fact-sheet' },
      { name: 'Grant Program', slug: 'grant-program' },
      { name: 'Online Courses', slug: 'online-courses' },
      { name: 'Reports and Studies', slug: 'reports-and-studies' },
      { name: 'Videos', slug: 'videos' },
      { name: 'Weather Map', slug: 'weather-map' },
      { name: 'Workshop Presentations', slug: 'workshop-presentations' },
    ],
  },
  vulnerabilityTypes: {
    title: 'Vulnerability Types',
    items: [
      { name: 'Drought', slug: 'drought' },
      { name: 'Extreme Rainfall', slug: 'extreme-rainfall' },
      { name: 'Flooding', slug: 'flooding' },
      { name: 'Frost Risk', slug: 'frost-risk' },
      { name: 'Heat Stress', slug: 'heat-stress' },
      { name: 'Insects', slug: 'insects' },
      { name: 'Multiple Vulnerabilities', slug: 'multiple-vulnerabilities' },
      { name: 'Weeds', slug: 'weeds' },
    ],
  },
  adaptationStrategies: {
    title: 'Adaptation Strategies',
    items: [
      { name: 'Conservation Tillage', slug: 'conservation-tillage' },
      { name: 'High-Residue Cover Crops', slug: 'high-residue-cover-crops' },
      { name: 'Irrigation', slug: 'irrigation' },
      { name: 'Multiple Adaptation Strategies', slug: 'multiple-adaptation-strategies' },
      { name: 'Sod-Based Rotation', slug: 'sod-based-rotation' },
      { name: 'Soil Health', slug: 'soil-health' },
    ],
  },
  mitigationStrategies: {
    title: 'Mitigation Strategies',
    items: [
      { name: 'Green House Gas Accounting', slug: 'green-house-gas-accounting' },
      { name: 'Multiple Mitigation Strategies', slug: 'multiple-mitigation-strategies' },
      { name: 'Nitrogen Management', slug: 'nitrogen-management' },
      { name: 'Renewable Energy', slug: 'renewable-energy' },
      { name: 'Solar', slug: 'solar' },
    ],
  },
};

function getFilterDisplayName(slug: string): string {
  for (const category of Object.values(filterCategories)) {
    const item = category.items.find(i => i.slug === slug);
    if (item) return item.name;
  }
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const ITEMS_PER_PAGE = 12;

export default function ResourcesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get('filter') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [searchQuery, setSearchQuery] = useState('');

  const allResources = useMemo(() => getAllResources(), []);

  // Filter resources
  const filteredResources = useMemo(() => {
    let results = allResources;

    if (activeFilter) {
      const filterName = getFilterDisplayName(activeFilter);
      results = results.filter(resource =>
        resource.tags.some(tag =>
          tag.toLowerCase() === filterName.toLowerCase()
        ) ||
        resource.category.toLowerCase() === filterName.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(resource =>
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return results;
  }, [allResources, activeFilter, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResources = filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterClick = (slug: string) => {
    if (slug === activeFilter) {
      setSearchParams({});
    } else {
      setSearchParams({ filter: slug });
    }
  };

  const handlePageChange = (page: number) => {
    const params: Record<string, string> = { page: page.toString() };
    if (activeFilter) params.filter = activeFilter;
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeFilter) {
      setSearchParams({ filter: activeFilter });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={styles.resourcesPage}>
      {/* Hero Band */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Resources</h1>
          <p className={styles.heroSubtitle}>
            Fact sheets, reports, tools, and educational materials for climate-smart agriculture
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          {/* Resource Listing */}
          <main className={styles.main}>
            {/* Search Bar */}
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                Search
              </button>
              {(activeFilter || searchQuery) && (
                <button type="button" onClick={clearFilters} className={styles.clearButton}>
                  Clear
                </button>
              )}
            </form>

            {/* Active Filter Display */}
            {activeFilter && (
              <div className={styles.activeFilter}>
                <span>Filtering by:</span>
                <span className={styles.filterBadge}>
                  {getFilterDisplayName(activeFilter)}
                  <button
                    onClick={() => setSearchParams({})}
                    className={styles.removeFilter}
                    aria-label="Remove filter"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}

            {/* Results Count */}
            <p className={styles.resultsCount}>
              Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredResources.length)} of {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
            </p>

            {/* Resource Grid */}
            <div className={styles.resourceGrid}>
              {paginatedResources.map((resource) => (
                <article key={resource.slug} className={styles.resourceCard}>
                  <Link to={`/resources/${resource.slug}`} className={styles.cardLink}>
                    {resource.image ? (
                      <div
                        className={styles.cardImage}
                        style={{ backgroundImage: `url(${resource.image})` }}
                      />
                    ) : (
                      <div className={styles.cardImagePlaceholder}>
                        <span>📄</span>
                      </div>
                    )}
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{resource.title}</h3>
                      <span className={styles.cardCta}>View Resource →</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className={styles.noResults}>
                <p>No resources found matching your criteria.</p>
                <button onClick={clearFilters} className={styles.clearButton}>
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className={styles.pagination}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={styles.pageButton}
                >
                  ← Previous
                </button>

                <div className={styles.pageNumbers}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`${styles.pageNumber} ${page === currentPage ? styles.active : ''}`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page} className={styles.pageEllipsis}>…</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={styles.pageButton}
                >
                  Next →
                </button>
              </nav>
            )}
          </main>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {Object.entries(filterCategories).map(([key, category]) => (
              <div key={key} className={styles.sidebarSection}>
                <h4 className={styles.sidebarTitle}>{category.title}</h4>
                <ul className={styles.sidebarList}>
                  {category.items.map((item) => (
                    <li key={item.slug}>
                      <button
                        onClick={() => handleFilterClick(item.slug)}
                        className={`${styles.sidebarButton} ${
                          activeFilter === item.slug ? styles.active : ''
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}