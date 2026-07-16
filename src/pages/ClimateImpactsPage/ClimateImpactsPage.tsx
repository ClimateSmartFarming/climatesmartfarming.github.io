// src/pages/ClimateImpactsPage/ClimateImpactsPage.tsx
import React from 'react';
import Container from '../../components/common/Container/Container';
import styles from './ClimateImpactsPage.module.css';

const ClimateImpactsPage: React.FC = () => {
  return (
    <div>
      {/* Hero Banner */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>Cornell Climate Smart Farming</p>
          <h1 className={styles.heroTitle}>Climate Impacts</h1>
          <p className={styles.heroSubtitle}>
            Understanding how climate change affects Northeast agriculture and strategies for adaptation
          </p>
        </div>
      </div>

      <Container>
        <article className={styles.impactsContent}>
          {/* Introduction */}
          <section className={styles.introSection}>
            <blockquote className={styles.mainQuote}>
              "Climate change is already affecting Northeast agriculture. Understanding these impacts
              is the first step toward building resilient farming systems."
            </blockquote>

            <p>
              The Northeast region is experiencing significant climate shifts that directly impact
              agricultural operations. Rising temperatures, changing precipitation patterns, and
              more frequent extreme weather events are creating both challenges and opportunities
              for farmers across New York and the broader region.
            </p>

            <p>
              Climate Smart Farming tools and resources help farmers understand these changes and
              make informed decisions to protect their operations while maintaining productivity.
            </p>

            <div className={styles.resourceBox}>
              <p>Quick Links to Climate Adaptation Resources:</p>
              <ul>
                <li><a href="/tools">Decision Support Tools</a></li>
                <li><a href="/resources">Fact Sheets & Guides</a></li>
                <li><a href="/videos">Educational Webinars</a></li>
              </ul>
            </div>
          </section>

          {/* Temperature Changes */}
          <section className={styles.impactSection}>
            <h2 className={styles.impactTitle}>Rising Temperatures</h2>
            <p className={styles.impactIntro}>
              Average temperatures in the Northeast have increased by approximately 2°F since 1970,
              with winter temperatures rising even faster.
            </p>

            <div className={styles.challengeSolution}>
              <div className={styles.challenges}>
                <h3>Challenges</h3>
                <ul>
                  <li>Extended growing seasons altering crop timing</li>
                  <li>Increased heat stress on livestock and crops</li>
                  <li>New pest and disease pressures</li>
                  <li>Reduced winter chill hours for fruit crops</li>
                  <li>Higher irrigation demands</li>
                </ul>
              </div>

              <div className={styles.solutions}>
                <h3>Adaptation Strategies</h3>
                <ul>
                  <li>Use GDD calculators to optimize planting dates</li>
                  <li>Select heat-tolerant crop varieties</li>
                  <li>Implement shade structures for livestock</li>
                  <li>Adjust irrigation scheduling with soil moisture monitoring</li>
                  <li>Explore new crop opportunities</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Precipitation Changes */}
          <section className={styles.impactSection}>
            <h2 className={styles.impactTitle}>Changing Precipitation Patterns</h2>
            <p className={styles.impactIntro}>
              While total annual precipitation has increased, it's becoming more variable with
              longer dry periods punctuated by intense rainfall events.
            </p>

            <div className={styles.challengeSolution}>
              <div className={styles.challenges}>
                <h3>Challenges</h3>
                <ul>
                  <li>More frequent flooding and waterlogging</li>
                  <li>Increased soil erosion during heavy rains</li>
                  <li>Drought stress during extended dry periods</li>
                  <li>Difficulty timing field operations</li>
                  <li>Nutrient runoff and water quality concerns</li>
                </ul>
              </div>

              <div className={styles.solutions}>
                <h3>Adaptation Strategies</h3>
                <ul>
                  <li>Install drainage improvements</li>
                  <li>Use cover crops to protect soil</li>
                  <li>Implement water deficit calculators</li>
                  <li>Build soil organic matter for water retention</li>
                  <li>Consider irrigation infrastructure investments</li>
                </ul>
              </div>
            </div>

            <div className={styles.caseStudy}>
              <h4>Case Study: Managing Field Runoff</h4>
              <p>
                The CSF Runoff Risk Forecast tool helps farmers identify high-risk periods for
                nutrient runoff, allowing them to time manure and fertilizer applications to
                minimize environmental impact while maintaining crop productivity.
              </p>
            </div>
          </section>

          {/* Extreme Weather */}
          <section className={styles.impactSection}>
            <h2 className={styles.impactTitle}>Extreme Weather Events</h2>
            <p className={styles.impactIntro}>
              The frequency and intensity of extreme weather events—including heat waves,
              heavy precipitation, and late spring frosts—are increasing across the region.
            </p>

            <div className={styles.challengeSolution}>
              <div className={styles.challenges}>
                <h3>Challenges</h3>
                <ul>
                  <li>Crop damage from late frosts after early warm spells</li>
                  <li>Infrastructure damage from severe storms</li>
                  <li>Livestock losses during extreme heat</li>
                  <li>Harvest delays and quality losses</li>
                  <li>Financial uncertainty and risk management</li>
                </ul>
              </div>

              <div className={styles.solutions}>
                <h3>Adaptation Strategies</h3>
                <ul>
                  <li>Use freeze risk tools for frost-sensitive crops</li>
                  <li>Diversify crop and livestock operations</li>
                  <li>Strengthen farm infrastructure</li>
                  <li>Develop emergency response plans</li>
                  <li>Explore crop insurance options</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Livestock Impacts */}
          <section className={styles.impactSection}>
            <h2 className={styles.impactTitle}>Livestock and Dairy Impacts</h2>
            <p className={styles.impactIntro}>
              Heat stress significantly affects livestock health, reproduction, and productivity,
              with dairy cattle being particularly sensitive to high temperatures.
            </p>

            <div className={styles.calloutBox}>
              <h4>Heat Stress in Dairy Cattle</h4>
              <p>
                Dairy cows begin experiencing heat stress at temperatures as low as 68°F when
                combined with high humidity. This can reduce milk production by 10-25% and
                affect reproduction rates significantly.
              </p>

              <div className={styles.livestockSolutions}>
                <div>
                  <h5>Cooling Strategies</h5>
                  <ul>
                    <li>Improved barn ventilation</li>
                    <li>Sprinkler and fan systems</li>
                    <li>Shade structures in pastures</li>
                    <li>Night grazing schedules</li>
                  </ul>
                </div>
                <div>
                  <h5>Management Adjustments</h5>
                  <ul>
                    <li>Adjusted feeding times</li>
                    <li>Modified ration formulations</li>
                    <li>Breeding timing changes</li>
                    <li>Monitoring with heat stress indices</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className={styles.conclusionSection}>
            <h2>Taking Action</h2>
            <p>
              While climate change presents real challenges for Northeast agriculture, proactive
              adaptation can help farmers maintain productive and profitable operations. The
              Climate Smart Farming program provides tools, resources, and support to help
              farmers navigate these changes successfully.
            </p>
            <p>
              Explore our decision support tools, connect with extension educators, and join
              our network of climate-smart farmers working together to build resilient
              agricultural systems for the future.
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
};

export default ClimateImpactsPage;