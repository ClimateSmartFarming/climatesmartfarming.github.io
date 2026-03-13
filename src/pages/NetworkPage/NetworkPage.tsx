import { useMemo, useState } from 'react';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import { marked } from 'marked';
import styles from './NetworkPage.module.css';

const files = import.meta.glob('/src/content/network/*.md', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>;

interface Person {
  id: string;
  name: string;
  title: string;
  region: string;
  subregion: string;
  organization: string;
  email?: string;
  phone?: string;
  image?: string;
  order: number;
  html: string;
}

const REGIONS = ['All', 'New York', 'Cornell University', 'USDA Northeast Climate Hub'];

function getInitials(name: string) {
  return name.replace(/^Dr\.\s*/, '').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function NetworkPage() {
  const { items } = useMarkdownContent(files);
  const [activeRegion, setActiveRegion] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const people: Person[] = useMemo(() => {
    return items.map(item => ({
      id: item.slug,
      name: item.meta.name as string || '',
      title: item.meta.title as string || '',
      region: item.meta.region as string || '',
      subregion: item.meta.subregion as string || '',
      organization: item.meta.organization as string || '',
      email: item.meta.email as string | undefined,
      phone: item.meta.phone as string | undefined,
      image: item.meta.image as string | undefined,
      order: item.meta.order as number || 99,
      html: marked(item.body) as string,
    })).sort((a, b) => a.order - b.order);
  }, [items]);

  const filtered = activeRegion === 'All'
    ? people
    : people.filter(p => p.region === activeRegion);

  const grouped = REGIONS.slice(1).reduce((acc, region) => {
    const group = filtered.filter(p => p.region === region);
    if (group.length) acc[region] = group;
    return acc;
  }, {} as Record<string, Person[]>);

  const regionCounts = REGIONS.reduce((acc, r) => {
    acc[r] = r === 'All' ? people.length : people.filter(p => p.region === r).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>The NE CSF Network</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            A trusted network of Extension specialists, ag advisors, climate scientists, and
            researchers working together to help Northeast farmers build resilience.
          </p>
        </div>
        <div className={styles.heroPattern} aria-hidden />
      </div>

      <div className={styles.introBand}>
        <div className={styles.introInner}>
          <p>
            The NE Climate Smart Farming Network provides farmers in New York and the Northeast with
            access to top Extension specialists and ag advisors trained to help producers manage the
            risks posed by the changing climate, and develop plans for their farms. Working in
            partnership with climate scientists at Cornell and other Land Grant Universities, the
            network draws on the latest science to answer producers' questions.
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.filterRow}>
          {REGIONS.map(r => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`${styles.filterBtn} ${activeRegion === r ? styles.filterBtnActive : ''}`}
            >
              {r}
              <span className={styles.filterCount}>{regionCounts[r]}</span>
            </button>
          ))}
        </div>

        {activeRegion === 'All'
          ? Object.entries(grouped).map(([region, members]) => (
            <section key={region} className={styles.regionSection}>
              <div className={styles.regionHeader}>
                <h2 className={styles.regionTitle}>{region}</h2>
                <div className={styles.regionLine} />
              </div>
              <div className={styles.grid}>
                {members.map(p => (
                  <PersonCard
                    key={p.id}
                    person={p}
                    expanded={expanded === p.id}
                    onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
                  />
                ))}
              </div>
            </section>
          ))
          : (
            <div className={styles.grid}>
              {filtered.map(p => (
                <PersonCard
                  key={p.id}
                  person={p}
                  expanded={expanded === p.id}
                  onToggle={() => setExpanded(expanded === p.id ? null : p.id)}
                />
              ))}
            </div>
          )
        }

        <div className={styles.footerNote}>
          <p>
            For assistance from agriculture and climate Extension specialists in other states in the
            Northeast Region (including CT, DC, DE, MA, MD, ME, NH, NY, NJ, PA, RI, VT, or WV),
            contact the{' '}
            <a href="https://www.climatehubs.usda.gov/hubs/northeast" target="_blank" rel="noopener noreferrer">
              USDA Northeast Climate Hub
            </a>.
          </p>
          <p>
            For other agriculture Extension advisors in different regions of New York, reach out to
            the Statewide Ag Resiliency Specialists:{' '}
            <a href="mailto:kitty.oneil@cornell.edu">Kitty O'Neil</a> or{' '}
            <a href="mailto:ss2655@cornell.edu">Savanna Shelnutt</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

function PersonCard({ person, expanded, onToggle }: {
  person: Person;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`${styles.card} ${expanded ? styles.cardExpanded : ''}`}>
      <div className={styles.cardTop} onClick={onToggle}>
        <div className={styles.avatarWrap}>
          {person.image ? (
            <img src={person.image} alt={person.name} className={styles.avatar} />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {getInitials(person.name)}
            </div>
          )}
        </div>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardName}>{person.name}</h3>
          <p className={styles.cardTitle}>{person.title}</p>
          <p className={styles.cardOrg}>{person.subregion}</p>
        </div>
        <span className={styles.toggle}>{expanded ? '−' : '+'}</span>
      </div>

      {expanded && (
        <div className={styles.cardDetail}>
          <div className={styles.cardOrganization}>{person.organization}</div>
          <div
            className={styles.cardBio}
            dangerouslySetInnerHTML={{ __html: person.html }}
          />
          <div className={styles.cardContact}>
            {person.email && (
              <a href={`mailto:${person.email}`} className={styles.contactLink}>
                ✉ {person.email}
              </a>
            )}
            {person.phone && (
              <span className={styles.contactPhone}>📞 {person.phone}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}