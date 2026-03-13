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
                href="https://twitter.com/ClimateSmartCU"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter / X
              </a>
              <a
                href="https://www.facebook.com/ClimateSmartCU"
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
                href="https://www.youtube.com/channel/UC18K9H429WZ8V-H9gGrJzzQ"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
              >
                <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube
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