// src/pages/ContactPage/ContactPage.tsx
import React from 'react';
import styles from './ContactPage.module.css';

const PARTNERS = [
  {
    name: 'Cornell Cooperative Extension',
    desc: 'CCE Regional Ag Teams',
    url: 'https://cce.cornell.edu',
  },
  {
    name: 'NEWA IPM Decision Tools',
    desc: 'Sister site: newa.cornell.edu',
    url: 'https://newa.cornell.edu',
  },
  {
    name: 'Northeast Regional Climate Center',
    desc: 'NRCC at Cornell University',
    url: 'https://www.nrcc.cornell.edu',
  },
  {
    name: 'USDA Northeast Regional Climate Hub',
    desc: 'Federal climate-ag partnership',
    url: 'https://www.climatehubs.usda.gov/hubs/northeast',
  },
];

const PHOTO_CREDITS = [
  { label: 'Flooded Fields in Spencer, NY', credit: '© Anja Timm' },
  { label: 'Red Barns in Wallkill, NY', credit: '© John Hergenhan' },
  { label: 'Flooded Corn Field', credit: '© George Shinn' },
  { label: 'CSF Website Design', credit: 'Knowledge Town' },
  { label: 'CSF Logo', credit: 'Bill Akunevitz, Jr. — DragonFish Studio' },
];

export default function ContactPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroSub}>
            Reach out to the CSF Program team or connect with Extension specialists across New York and the Northeast.
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.grid}>

          {/* Primary contact */}
          <div className={styles.primaryCard}>
            <div className={styles.cardLabel}>Cornell CSF Program</div>
            <div className={styles.addressBlock}>
              <div className={styles.addressLine}>School of Integrated Plant Sciences</div>
              <div className={styles.addressLine}>College of Agriculture and Life Sciences</div>
              <div className={styles.addressLine}>Cornell University</div>
              <div className={styles.addressLine}>1008 Bradfield Hall</div>
              <div className={styles.addressLine}>Ithaca, NY 14853</div>
            </div>
            <a href="mailto:climatesmartsolutions@gmail.com" className={styles.emailLink}>
              <span className={styles.emailIcon}>✉</span>
              climatesmartsolutions@gmail.com
            </a>
            <a href="/network" className={styles.teamLink}>
              Contact the CSF Program Team Members →
            </a>
          </div>

          {/* Social */}
          <div className={styles.socialCard}>
            <div className={styles.cardLabel}>Connect With Us</div>
            <p className={styles.socialDesc}>Follow the Cornell Climate Smart Farming Program on social media for the latest news, tools, and resources.</p>
            <div className={styles.socialLinks}>
              <a
                href="https://www.linkedin.com/company/cornell-climate-smart-farming-program/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://www.facebook.com/CornellClimateSmartFarming"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              <a
                href="https://www.instagram.com/cornell_climate_smart_farming/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Partners */}
          <div className={styles.partnersCard}>
            <div className={styles.cardLabel}>In Partnership With</div>
            <div className={styles.partnersList}>
              {PARTNERS.map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.partnerItem}>
                  <div className={styles.partnerDot} />
                  <div>
                    <div className={styles.partnerName}>{p.name}</div>
                    <div className={styles.partnerDesc}>{p.desc}</div>
                  </div>
                  <span className={styles.partnerArrow}>→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Photo credits */}
          <div className={styles.creditsCard}>
            <div className={styles.cardLabel}>Photo Credits</div>
            <ul className={styles.creditsList}>
              {PHOTO_CREDITS.map(c => (
                <li key={c.label} className={styles.creditItem}>
                  <span className={styles.creditLabel}>{c.label}</span>
                  <span className={styles.creditName}>{c.credit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Map / address visual strip */}
        <div className={styles.addressStrip}>
          <div className={styles.addressStripContent}>
            <div className={styles.addressStripLabel}>📍 Find Us</div>
            <div className={styles.addressStripText}>
              Cornell University · 1008 Bradfield Hall · Ithaca, NY 14853
            </div>
            <a
              href="https://maps.google.com/?q=Bradfield+Hall+Cornell+University+Ithaca+NY"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

