import { useMemo } from 'react';
import { useMarkdownContent } from '../../hooks/useMarkdownContent';
import { marked } from 'marked';
import styles from './AboutPage.module.css';

const files = import.meta.glob('/src/content/about/*.md', {
  eager: true, query: '?raw', import: 'default',
}) as Record<string, string>;

const PILLARS = [
  {
    label: 'Productivity',
    desc: 'Increase agricultural productivity and farming incomes sustainably',
  },
  {
    label: 'Mitigation',
    desc: 'Reduce greenhouse gas emissions through best management practices and renewable energy',
  },
  {
    label: 'Resiliency',
    desc: 'Increase farm resilience to extreme weather through climate change adaptation practices',
  },
];

export default function AboutPage() {
  const { items } = useMarkdownContent(files);

  const { meta, html } = useMemo(() => {
    const item = items[0];
    if (!item) return { meta: {}, html: '<p>Content coming soon.</p>' };
    return {
      meta: item.meta,
      html: marked(item.body) as string,
    };
  }, [items]);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>About Our Program</h1>
          <div className={styles.heroDivider} />
          <p className={styles.heroTagline}>
            Empowering Northeast farmers with science-based tools and strategies for a changing climate
          </p>
        </div>
        <div className={styles.heroPattern} aria-hidden />
      </div>

      <div className={styles.pillarsBar}>
        <div className={styles.pillarsInner}>
          {PILLARS.map(p => (
            <div key={p.label} className={styles.pillar}>
              <strong className={styles.pillarLabel}>{p.label}</strong>
              <p className={styles.pillarDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.contentWrap}>
          <blockquote className={styles.pullQuote}>
            "Our program follows the three pillars of Climate-Smart Agriculture, as defined by the
            UN Food and Agriculture Organization, and the USDA's Climate-Smart Agriculture and
            Forestry Initiative."
          </blockquote>

          <div className={styles.imageContentRow}>
            <div className={styles.imageBlock}>
              <img
                src={meta.image || '/images/about/LauraMcDermottfield.jpg'}
                alt="Laura McDermott in the field"
                className={styles.featuredImage}
              />
              <div className={styles.imageCaption}>
                Cornell University researchers and extension specialists work directly with farmers across New York State.
              </div>
            </div>
            <div className={styles.introText}>
              <h2 className={styles.sectionTitle}>A Trusted Partner for Farmers</h2>
              <p>
                The Cornell Climate Smart Farming program is a voluntary initiative helping farmers
                across New York and the Northeastern United States navigate the challenges and
                opportunities of a changing climate — through cutting-edge research, practical
                extension outreach, and free digital decision-support tools.
              </p>
              <p>
                Working in partnership with climate scientists and agriculture researchers at Cornell
                University and other Land Grant Universities in the Northeast, our network draws on
                the latest science to answer producers' questions about farming and management
                practices that can reduce risks and help them adapt.
              </p>
              <a href="/network" className={styles.ctaLink}>Meet the CSF Network →</a>
            </div>
          </div>

          <div
            className={styles.markdownBody}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className={styles.contactCta}>
            <div className={styles.contactCtaInner}>
              <h3>Get In Touch</h3>
              <p>
                For more information about the Cornell Climate Smart Farming Program, reach out to our team directly.
              </p>
              <a href="mailto:climatesmartsolutions@gmail.com" className={styles.contactBtn}>
                climatesmartsolutions@gmail.com
              </a>
              <a href="/contact" className={styles.contactBtnSecondary}>Visit Contact Page →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}