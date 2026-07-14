// src/pages/NetworkPage/NetworkPage.tsx
import { useMemo, useState, useEffect } from 'react';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import { marked } from 'marked';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './NetworkPage.module.css';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom colored icons
const createColoredIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      ">
        ${color === '#1976d2' ? '🐄' : color === '#d32f2f' ? '🍎' : '🏛️'}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

const dairyIcon = createColoredIcon('#1976d2');
const appleIcon = createColoredIcon('#d32f2f');
const extensionIcon = createColoredIcon('#2e7d32');

interface NetworkMember {
  id: string;
  name: string;
  type: 'dairy' | 'apple' | 'extension';
  location: string;
  coordinates: [number, number];
  description: string;
  county: string;
}

const networkMembers: NetworkMember[] = [
  // Dairy Farmers
  {
    id: 'dairy-1',
    name: 'Hillside Dairy Farm',
    type: 'dairy',
    location: 'Cortland, NY',
    coordinates: [42.6012, -76.1804],
    description: 'Family-owned dairy farm focusing on sustainable practices and climate adaptation.',
    county: 'Cortland County'
  },
  {
    id: 'dairy-2',
    name: 'Green Valley Dairy',
    type: 'dairy',
    location: 'Canton, NY',
    coordinates: [44.5956, -75.1690],
    description: 'Third-generation dairy farm implementing cover crops and improved manure management.',
    county: 'St. Lawrence County'
  },
  {
    id: 'dairy-3',
    name: 'Sunrise Dairy',
    type: 'dairy',
    location: 'Cooperstown, NY',
    coordinates: [42.7006, -74.9240],
    description: 'Mid-sized dairy operation working on heat stress mitigation for livestock.',
    county: 'Otsego County'
  },
  {
    id: 'dairy-4',
    name: 'Mountain View Dairy',
    type: 'dairy',
    location: 'Lowville, NY',
    coordinates: [43.7867, -75.4921],
    description: 'Dairy farm utilizing rotational grazing and soil health practices.',
    county: 'Lewis County'
  },
  {
    id: 'dairy-5',
    name: 'Lakeshore Dairy',
    type: 'dairy',
    location: 'Watertown, NY',
    coordinates: [43.9748, -75.9107],
    description: 'Large dairy operation focused on water management and nutrient efficiency.',
    county: 'Jefferson County'
  },
  {
    id: 'dairy-6',
    name: 'Rolling Hills Dairy',
    type: 'dairy',
    location: 'Bath, NY',
    coordinates: [42.3370, -77.3177],
    description: 'Dairy farm implementing tile drainage and flood management strategies.',
    county: 'Steuben County'
  },
  // Apple Farmers
  {
    id: 'apple-1',
    name: 'Hudson Valley Orchards',
    type: 'apple',
    location: 'Highland, NY',
    coordinates: [41.7212, -73.9607],
    description: 'Apple orchard using frost protection and integrated pest management.',
    county: 'Ulster County'
  },
  {
    id: 'apple-2',
    name: 'Finger Lakes Apple Farm',
    type: 'apple',
    location: 'Geneva, NY',
    coordinates: [42.8689, -76.9777],
    description: 'Research-focused orchard working with Cornell on climate-resilient varieties.',
    county: 'Ontario County'
  },
  {
    id: 'apple-3',
    name: 'Lake Ontario Orchards',
    type: 'apple',
    location: 'Sodus, NY',
    coordinates: [43.2348, -77.0622],
    description: 'Large apple operation utilizing CSF freeze risk tools for frost protection.',
    county: 'Wayne County'
  },
  {
    id: 'apple-4',
    name: 'Champlain Valley Apples',
    type: 'apple',
    location: 'Peru, NY',
    coordinates: [44.5784, -73.5268],
    description: 'Apple farm adapting to changing growing seasons and pest pressures.',
    county: 'Clinton County'
  },
  {
    id: 'apple-5',
    name: 'Capital Region Orchards',
    type: 'apple',
    location: 'Altamont, NY',
    coordinates: [42.7009, -74.0335],
    description: 'Family orchard implementing water deficit monitoring and irrigation.',
    county: 'Albany County'
  },
  // Extension Associates
  {
    id: 'ext-1',
    name: 'Cornell Cooperative Extension - Ithaca',
    type: 'extension',
    location: 'Ithaca, NY',
    coordinates: [42.4440, -76.5019],
    description: 'Main CSF program hub at Cornell University providing statewide support.',
    county: 'Tompkins County'
  },
  {
    id: 'ext-2',
    name: 'CCE Hudson Valley Regional Office',
    type: 'extension',
    location: 'Millbrook, NY',
    coordinates: [41.7851, -73.6940],
    description: 'Regional extension office supporting farmers in the Hudson Valley region.',
    county: 'Dutchess County'
  },
  {
    id: 'ext-3',
    name: 'CCE North Country Regional Office',
    type: 'extension',
    location: 'Plattsburgh, NY',
    coordinates: [44.6995, -73.4529],
    description: 'Extension office serving dairy and crop farmers in Northern New York.',
    county: 'Clinton County'
  },
  {
    id: 'ext-4',
    name: 'CCE Western NY Regional Office',
    type: 'extension',
    location: 'Batavia, NY',
    coordinates: [42.9981, -78.1875],
    description: 'Regional hub for vegetable, dairy, and field crop climate support.',
    county: 'Genesee County'
  },
  {
    id: 'ext-5',
    name: 'CCE Central NY Office',
    type: 'extension',
    location: 'Syracuse, NY',
    coordinates: [43.0481, -76.1474],
    description: 'Extension office coordinating urban agriculture and regional outreach.',
    county: 'Onondaga County'
  },
  {
    id: 'ext-6',
    name: 'CCE Southern Tier Office',
    type: 'extension',
    location: 'Binghamton, NY',
    coordinates: [42.0987, -75.9180],
    description: 'Extension support for diverse farming operations in the Southern Tier.',
    county: 'Broome County'
  },
  {
    id: 'ext-7',
    name: 'Harvest NY - Albany',
    type: 'extension',
    location: 'Albany, NY',
    coordinates: [42.6526, -73.7562],
    description: 'Harvest NY Ag Climate Resiliency specialists supporting Capital Region farmers.',
    county: 'Albany County'
  }
];

// Component to handle map view changes
const MapController: React.FC<{ center: [number, number] | null }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, 10, { duration: 1 });
    }
  }, [center, map]);

  return null;
};

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
  const [activeMapFilter, setActiveMapFilter] = useState<'all' | 'dairy' | 'apple' | 'extension'>('all');
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

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

  // Map helper functions
  const filteredMapMembers = activeMapFilter === 'all'
    ? networkMembers
    : networkMembers.filter(m => m.type === activeMapFilter);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'dairy': return dairyIcon;
      case 'apple': return appleIcon;
      case 'extension': return extensionIcon;
      default: return DefaultIcon;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'dairy': return 'Dairy Farmer';
      case 'apple': return 'Apple Farmer';
      case 'extension': return 'Extension Associate';
      default: return 'Network Member';
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'dairy': return '🐄';
      case 'apple': return '🍎';
      case 'extension': return '🏛️';
      default: return '📍';
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'dairy': return '#1976d2';
      case 'apple': return '#d32f2f';
      case 'extension': return '#2e7d32';
      default: return '#666';
    }
  };

  const mapCounts = {
    all: networkMembers.length,
    dairy: networkMembers.filter(m => m.type === 'dairy').length,
    apple: networkMembers.filter(m => m.type === 'apple').length,
    extension: networkMembers.filter(m => m.type === 'extension').length
  };

  // New York State bounds and center
  const nysBounds: [[number, number], [number, number]] = [
    [40.4961, -79.7621],
    [45.0158, -71.8562]
  ];
  const nysCenter: [number, number] = [42.9538, -75.5268];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>The Northeast CSF Network</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            A trusted network of Extension specialists, ag advisors, climate scientists, and
            researchers working together to help Northeast farmers build resilience.
          </p>
        </div>
        <div className={styles.heroPattern} aria-hidden />
      </div>

      {/* Map Section */}
      <div className={styles.mapSection}>
        <div className={styles.mapInner}>
          <h2 className={styles.mapTitle}>Explore Our Network</h2>
          <p className={styles.mapSubtitle}>
            Connect with featured farmers and extension associates across New York State
          </p>

          {/* Filter Buttons */}
          <div className={styles.mapFilterBar}>
            <button
              className={`${styles.mapFilterButton} ${activeMapFilter === 'all' ? styles.mapFilterActive : ''}`}
              onClick={() => setActiveMapFilter('all')}
            >
              All ({mapCounts.all})
            </button>
            <button
              className={`${styles.mapFilterButton} ${styles.dairy} ${activeMapFilter === 'dairy' ? styles.mapFilterActive : ''}`}
              onClick={() => setActiveMapFilter('dairy')}
            >
              🐄 Dairy Farmers ({mapCounts.dairy})
            </button>
            <button
              className={`${styles.mapFilterButton} ${styles.apple} ${activeMapFilter === 'apple' ? styles.mapFilterActive : ''}`}
              onClick={() => setActiveMapFilter('apple')}
            >
              🍎 Apple Farmers ({mapCounts.apple})
            </button>
            <button
              className={`${styles.mapFilterButton} ${styles.extension} ${activeMapFilter === 'extension' ? styles.mapFilterActive : ''}`}
              onClick={() => setActiveMapFilter('extension')}
            >
              🏛️ Extension Associates ({mapCounts.extension})
            </button>
          </div>

          {/* Map Container */}
          <div className={styles.mapContainer}>
            <MapContainer
              center={nysCenter}
              zoom={7}
              style={{ height: '100%', width: '100%' }}
              maxBounds={nysBounds}
              minZoom={6}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapController center={mapCenter} />

              {filteredMapMembers.map((member) => (
                <Marker
                  key={member.id}
                  position={member.coordinates}
                  icon={getMarkerIcon(member.type)}
                  eventHandlers={{
                    click: () => setMapCenter(member.coordinates),
                  }}
                >
                  <Popup>
                    <div className={styles.popupContent}>
                      <strong>{member.name}</strong>
                      <br />
                      <span style={{ color: getMarkerColor(member.type) }}>
                        {getTypeEmoji(member.type)} {getTypeLabel(member.type)}
                      </span>
                      <br />
                      <small>{member.location}</small>
                      <br />
                      <small className={styles.popupCounty}>{member.county}</small>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Legend */}
            <div className={styles.legend}>
              <h4>Legend</h4>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dairyDot}`}></span>
                <span>Dairy Farmer</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.appleDot}`}></span>
                <span>Apple Farmer</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.extensionDot}`}></span>
                <span>Extension Associate</span>
              </div>
            </div>
          </div>

          <p className={styles.mapDescription}>
            This map highlights featured members of our Climate Smart Farming Network—farmers,
            researchers, and extension associates who collaborate with us or utilize our tools.
            These are individuals who have chosen to share their work with the broader community.
          </p>

          <a href="/network/join" className={styles.joinButton}>
            Join Our Network →
          </a>
        </div>
      </div>

      <div className={styles.body}>
        <h2 className={styles.specialistsTitle}>Climate Smart Farming Extension Specialists</h2>

        <p className={styles.specialistsIntro}>
          The NE Climate Smart Farming Network provides farmers in New York and the Northeast with
          access to top Extension specialists and ag advisors trained to help producers manage the
          risks posed by the changing climate, and develop plans for their farms. Working in
          partnership with climate scientists at Cornell and other Land Grant Universities, the
          network draws on the latest science to answer producers' questions.
        </p>

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