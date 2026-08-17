// src/pages/NetworkPage/NetworkPage.tsx
import { useMemo, useState, useEffect } from 'react';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import { marked } from 'marked';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './NetworkPage.module.css';
import { networkMembers } from '../../data/networkMembers';
import type { NetworkMember } from '../../data/networkMembers';

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
  website?: string;
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
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [activeMapFilter, setActiveMapFilter] = useState<'all' | 'farmers' | 'advisors' | 'extension'>('all');
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
        website: item.meta.website as string | undefined,
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
      case 'farmers': return dairyIcon;
      case 'advisors': return appleIcon;
      case 'extension': return extensionIcon;
      default: return DefaultIcon;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'farmers': return 'Farmer';
      case 'advisors': return 'Ag Advisor';
      case 'extension': return 'Extension Associate';
      default: return 'Network Member';
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'farmers': return '🐄';
      case 'advisors': return '🍎';
      case 'extension': return '🏛️';
      default: return '📍';
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'farmers': return '#1976d2';
      case 'advisors': return '#d32f2f';
      case 'extension': return '#2e7d32';
      default: return '#666';
    }
  };

  const mapCounts = {
    all: networkMembers.length,
    dairy: networkMembers.filter(m => m.type === 'farmers').length,
    apple: networkMembers.filter(m => m.type === 'advisors').length,
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
            The Northeast CSF Network is a voluntary, trusted community of farmers, Extension specialists, agricultural advisors, and researchers committed to working together to improve climate-smart agricultural resilience and sustainability on farms.
          </p>
        </div>
        <div className={styles.heroPattern} aria-hidden />
      </div>

      {/* Map Section */}
      <div className={styles.mapSection}>
        <div className={styles.mapInner}>
          <h2 className={styles.mapTitle}>Explore Our Network</h2>
          <p className={styles.mapSubtitle}>
            Connect with farmers, Extension, and agricultural advisors across the Northeast
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
              className={`${styles.mapFilterButton} ${styles.dairy} ${activeMapFilter === 'farmers' ? styles.mapFilterActive : ''}`}
              onClick={() => setActiveMapFilter('farmers')}
            >
              🐄 Farmers ({mapCounts.dairy})
            </button>
            <button
              className={`${styles.mapFilterButton} ${styles.apple} ${activeMapFilter === 'advisors' ? styles.mapFilterActive : ''}`}
              onClick={() => setActiveMapFilter('advisors')}
            >
              🍎 Ag Advisors ({mapCounts.apple})
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
                <span>Farmer</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.appleDot}`}></span>
                <span>Ag Advisor</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.extensionDot}`}></span>
                <span>Extension Associate</span>
              </div>
            </div>
          </div>

          <p className={styles.mapDescription}>
              All information and resources shared by the network are provided without warranty of any kind, and network members assume no liability for any actions taken or not taken based on the information they provide. Any information provided by members of the network is for educational purposes only. No preference is implied for any commercial products or trade names mentioned, no discrimination is intended, and no endorsement by any university or corporation is implied.
            </p>

            <a href="https://docs.google.com/forms/d/e/1FAIpQLScz0iIGxv-TfuWoQfzn-6sO85D4frzKl5PQB3QXTZosswuxpQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" className={styles.joinButton}>
              JOIN THE NE CSF NETWORK
            </a>
            <p className={styles.joinDescription}>
              Individuals from any state in the Northeastern U.S. (CT, DE, ME, MD, MA, NH, NJ, NY, PA, RI, VT, WV, and the District of Columbia) can apply to be a part of the network. Please let us know your name, location, training or programs you have participated in or completed, certifications, farm adaptation or mitigation plans you have developed, and your interest in sharing your expertise as a peer or advisor. We will review all applications and get back to you. Thanks!
            </p>
        </div>
      </div>

      <div className={styles.body}>
        <h2 className={styles.specialistsTitle}>Climate Smart Farming Program Team</h2>

        <p className={styles.specialistsIntro}>
          The Cornell Climate Smart Farming Program team provides support to the CSF Network and farmers in New York and the Northeast.
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
                    expanded={expanded.has(p.id)}
                    onToggle={() => setExpanded(prev => { const next = new Set(prev); if (next.has(p.id)) { next.delete(p.id); } else { next.add(p.id); } return next; })}
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
                  expanded={expanded.has(p.id)}
                  onToggle={() => setExpanded(prev => { const next = new Set(prev); if (next.has(p.id)) { next.delete(p.id); } else { next.add(p.id); } return next; })}
                />
              ))}
            </div>
          )
        }

        <div className={styles.footerNote}>
            <ul>
              <li>
                For other agriculture Extension advisors in different regions of <strong>New York</strong>, you can search for the closest{' '}
                <a href="https://cals.cornell.edu/cornell-cooperative-extension/local-offices" target="_blank" rel="noopener noreferrer">
                  Cooperative Extension office
                </a>, or reach out to the Cornell Climate Change and Ag PWT leads,{' '}
                <a href="mailto:kitty.oneil@cornell.edu">Kitty O'Neil</a> or{' '}
                <a href="mailto:elb37@cornell.edu">Emily Berkowitz</a>.
              </li>
              <li>
                For assistance from agriculture and climate Extension specialists in other states in the
                Northeast Region (<strong>CT, DC, DE, MA, MD, ME, NH, NY, NJ, PA, RI, VT, or WV</strong>),
                contact the{' '}
                <a href="https://www.climatehubs.usda.gov/hubs/northeast" target="_blank" rel="noopener noreferrer">
                  USDA Northeast Climate Hub
                </a>, or search for the closest{' '}
                <a href="https://northeastextension.org/extension-near-you/" target="_blank" rel="noopener noreferrer">
                  state Cooperative Extension office
                </a>.
              </li>
            </ul>
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
              person.website ? (
                <a href={person.website} target="_blank" rel="noopener noreferrer">
                  <img src={person.image} alt={person.name} className={styles.avatar} />
                </a>
              ) : (
                <img src={person.image} alt={person.name} className={styles.avatar} />
              )
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
              {person.website && (
                <a href={person.website} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  Personal Website
                </a>
              )}
          </div>
        </div>
      )}
    </div>
  );
}


