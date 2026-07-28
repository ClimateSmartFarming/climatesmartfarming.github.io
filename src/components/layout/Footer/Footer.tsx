import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../common/Container/Container';
import styles from './Footer.module.css';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface Partner {
  name: string;
  logo: string;
  url: string;
}

// Collaborators - light green section (use transparent logos)
const collaborators: Partner[] = [
  {
    name: 'Northeast Regional Climate Center',
    logo: 'https://res.cloudinary.com/evqzzm9k/image/upload/h_200/v1784697147/csf/logos/NRCC-banner.png',
    url: 'http://www.nrcc.cornell.edu/'
  },
  {
    name: 'NY Soil Health',
    logo: 'https://res.cloudinary.com/evqzzm9k/image/upload/v1784746364/csf/logos/NYSoilHealthLogo.png',
    url: 'https://www.newyorksoilhealth.org/'
  },
  {
    name: 'AI-LEAF',
    logo: 'https://res.cloudinary.com/evqzzm9k/image/upload/h_200/v1784686264/csf/logos/ai-leaf-full-logo.png',
    url: 'https://ai-leaf.org'
  },
  {
    name: 'USDA Northeast Climate Hub',
    logo: 'https://res.cloudinary.com/evqzzm9k/image/upload/h_200/v1784696809/csf/logos/NEclimatehub1.png',
    url: 'https://www.climatehubs.usda.gov/hubs/northeast'
  }
];

const footerSections: FooterSection[] = [
  {
    title: 'Tools & Resources',
    links: [
      { label: 'CSF Decision Tools', href: '/tools' },
      { label: 'Resources', href: '/resources' },
      { label: 'News and Updates', href: '/news' }
    ]
  }
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Collaborators Section - Light Green */}
      <div className={styles.partnersSection}>
        <Container>
          <h3 className={styles.partnersTitle}>Our Collaborators</h3>
          <div className={styles.partnersGrid}>
            {collaborators.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                className={styles.partnerCard}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className={styles.partnerLogo}
                />
              </a>
            ))}
          </div>
        </Container>
      </div>

      {/* Main Footer Content - Dark Green */}
      <Container>
        <div className={styles.footerContent}>
          {/* Cornell Branding Column */}
          <div className={styles.brandColumn}>
            <div className={styles.footerLogo}>
              <span className={styles.logoText}>Cornell Climate Smart Farming</span>
            </div>
            <div className={styles.footerDescription}>
              <p>
                Supporting New York farmers with research-based tools and resources
                for climate adaptation and sustainable agriculture.
              </p>
            </div>

            {/* Cornell Logos Section */}
            <div className={styles.cornellLogosSection}>
              <div className={styles.cornellLogoItem}>
                <span className={styles.cornellLogoLabel}>Cornell University</span>
                <img
                  src="https://res.cloudinary.com/evqzzm9k/image/upload/v1784746235/csf/logos/cornell_logo_simple_b31b1b.png"
                  alt="Cornell University logo"
                  className={styles.cornellLogo}
                />
              </div>
              <div className={styles.cornellLogoItem}>
                <span className={styles.cornellLogoLabel}>College of Agriculture and Life Sciences</span>
                <img
                  src="https://res.cloudinary.com/evqzzm9k/image/upload/v1784746236/csf/logos/Cornell-Cals-t.png"
                  alt="Cornell CALS logo"
                  className={styles.cornellLogo}
                />
              </div>
            </div>
          </div>

          {/* Links Column */}
          {footerSections.map((section) => (
            <div key={section.title} className={styles.footerColumn}>
              <h4 className={styles.columnTitle}>
                {section.title}
              </h4>
              <ul className={styles.footerLinks}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        className={styles.footerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className={styles.footerLink}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>© {currentYear} Cornell University. All rights reserved.</p>
          </div>
          <div className={styles.bottomLinks}>
            <Link to="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
            <Link to="/accessibility" className={styles.bottomLink}>Accessibility</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;



