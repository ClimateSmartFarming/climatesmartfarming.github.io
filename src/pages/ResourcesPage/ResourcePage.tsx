import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './ResourcePage.module.css';

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

// Sidebar category data
const sidebarCategories = {
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

// Helper to categorize tags
function categorizeTag(tag: string): string | null {
  const tagLower = tag.toLowerCase();

  for (const [, category] of Object.entries(sidebarCategories)) {
    for (const item of category.items) {
      if (item.name.toLowerCase() === tagLower) {
        return category.title;
      }
    }
  }
  return null;
}

function slugifyTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ResourcePage() {
  const { id } = useParams<{ id: string }>();

  // Find the matching markdown file
  const filePath = Object.keys(resourceFiles).find((path) =>
    path.endsWith(`/${id}.md`)
  );

  if (!filePath) {
    return (
      <div className={styles.notFound}>
        <div className={styles.container}>
          <h1>Resource Not Found</h1>
          <p>The resource you're looking for doesn't exist.</p>
          <Link to="/resources" className={styles.backLink}>
            ← Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  const rawContent = resourceFiles[filePath] as string;
  const { frontmatter, body } = parseFrontmatter(rawContent);

  const title = frontmatter.title as string || 'Untitled Resource';
  const externalLink = frontmatter.externalLink as string || '';
  const image = frontmatter.image as string || '';
  const tags = (frontmatter.tags as string[]) || [];

  // Group tags by category
  const tagsByCategory: Record<string, string[]> = {};
  tags.forEach(tag => {
    const category = categorizeTag(tag);
    if (category) {
      if (!tagsByCategory[category]) {
        tagsByCategory[category] = [];
      }
      tagsByCategory[category].push(tag);
    }
  });

  return (
    <div className={styles.resourcePage}>
      {/* Header breadcrumb area */}
      <div className={styles.breadcrumbBar}>
        <div className={styles.breadcrumbContainer}>
          <Link to="/resources" className={styles.backLink}>
            ← Back to Resources
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          {/* Main Article */}
          <article className={styles.article}>
            <h1 className={styles.title}>{title}</h1>

            {/* Content with optional image */}
            <div className={styles.contentArea}>
              {image && (
                <div className={styles.imageWrapper}>
                  <img src={image} alt={title} className={styles.resourceImage} />
                </div>
              )}

              <div className={styles.body}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {body}
                </ReactMarkdown>
              </div>
            </div>

            {/* External Link Button */}
            {externalLink && (
              <div className={styles.ctaWrapper}>
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.ctaButton}
                >
                  Visit This Website →
                </a>
              </div>
            )}

            {/* Categories section with button-style tags */}
            {Object.keys(tagsByCategory).length > 0 && (
              <div className={styles.categoriesSection}>
                <h3 className={styles.categoriesTitle}>Categories</h3>
                {Object.entries(tagsByCategory).map(([category, categoryTags]) => (
                  <div key={category} className={styles.categoryRow}>
                    <span className={styles.categoryLabel}>{category}:</span>
                    <div className={styles.categoryTags}>
                      {categoryTags.map((tag) => (
                        <Link
                          key={tag}
                          to={`/resources?filter=${slugifyTag(tag)}`}
                          className={styles.tagButton}
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {Object.entries(sidebarCategories).map(([key, category]) => (
              <div key={key} className={styles.sidebarSection}>
                <h4 className={styles.sidebarTitle}>{category.title}</h4>
                <ul className={styles.sidebarList}>
                  {category.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/resources?filter=${item.slug}`}
                        className={styles.sidebarLink}
                      >
                        {item.name}
                      </Link>
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