// src/components/layout/Header/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../common/Container/Container';
import MobileMenu from './MobileMenu';
import styles from './Header.module.css';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavigationItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'CSF Tools',
    href: '/tools'
  },
  {
    label: 'Extension Materials',
    dropdown: [
      { label: 'Programs', href: '/programs' },
      { label: 'Videos & Webinars', href: '/videos' },
      { label: 'Explore Our Network', href: '/network' },
      { label: 'Fact Sheets', href: '/fact-sheets' },
      { label: 'Projects', href: '/projects' },
      { label: 'Climate Impacts', href: '/climate-impacts' },
    ]
  },
  {
    label: 'Community News & Stories',
    dropdown: [
      { label: 'News', href: '/news' },
      { label: 'Blog', href: '/blog' },
      { label: 'Farmer Stories', href: '/farmer-stories' },
    ]
  },
  {
    label: 'Additional Resources',
    dropdown: [
      { label: 'External Resources', href: '/resources/external' },
    ]
  },
  {
    label: 'About',
    dropdown: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Network', href: '/network' },
      { label: 'Contact Us', href: '/contact' },
    ]
  },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleMouseEnter = (label: string) => setActiveDropdown(label);
  const handleMouseLeave = () => setActiveDropdown(null);
  const handleLogoError = () => setLogoError(true);

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoArea}>
              {!logoError ? (
                <img
                  src="/csf-logo.png"
                  alt="Climate Smart Farming Logo"
                  className={styles.logo}
                  onError={handleLogoError}
                />
              ) : (
                <div className={styles.logoText}>
                  <span className={styles.logoMain}>Climate Smart Farming</span>
                  <span className={styles.logoSub}>Cornell University</span>
                </div>
              )}
            </div>
          </Link>

          <nav className={styles.navigation}>
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className={styles.navItemWrapper}
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link to={item.href} className={styles.navItem}>
                    {item.label}
                  </Link>
                ) : (
                  <button className={styles.navItem}>
                    {item.label}
                    <span className={styles.dropdownArrow}>▼</span>
                  </button>
                )}

                {item.dropdown && activeDropdown === item.label && (
                  <div className={styles.dropdownMenu}>
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        to={dropdownItem.href}
                        className={styles.dropdownItem}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </Container>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
      />
    </header>
  );
};

export default Header;