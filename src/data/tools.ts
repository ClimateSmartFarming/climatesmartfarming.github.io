// src/data/tools.ts
// CSF tool list — sourced from confirmed nrcc-cornell GitHub repos.
//
// GitHub Pages pattern: https://nrcc-cornell.github.io/[repo-name]
//
// hasIframe: true  = embed via iframe (GitHub Pages likely deployed)
// hasIframe: false = link out only (Python/backend tool, no GH Pages)
//
// Repo list confirmed from: github.com/nrcc-cornell (41 repos)

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  iframeUrl?: string;       // GitHub Pages embed URL
  externalLink?: string;    // Canonical public-facing link (CSF site or GitHub)
  repoUrl: string;          // GitHub source repo
  hasIframe: boolean;
  iframeHeight?: string;    // Override default iframe height if needed
  image?: string;           // Screenshot or representative image
}

// ─── Category list (for filters) ─────────────────────────────────────────────
export const toolCategories = [
  'All',
  'Temperature',
  'Crop Planning',
  'Specialty Crops',
  'Water Management',
  'Drought',
  'Soil Health',
  'Historical Data',
  'Carbon & GHG',
  'Climate Trends',
  'Climate Zones',
];

// ─── Tools ───────────────────────────────────────────────────────────────────
export const featuredTools: Tool[] = [

  // ── Cornell CSF Core Tools — iframe-embeddable ───────────────────────────

  {
    id: 'gdd-calculator',
    image: '/images/tools/gdd-calculator.jpg',
    title: 'Growing Degree Day Calculator',
    description:
      'Plots Growing Degree Days (GDD) accumulated since a planting date, with 6-day forecasts and historical context to help predict crop development and pest/disease outbreaks.',
    icon: '🌡️',
    category: 'Temperature',
    iframeUrl: 'https://nrcc-cornell.github.io/csf-gddtool-v4',
    externalLink: 'https://climatesmartfarming.org/tools/csf-growing-degree-day-calculator/',
    repoUrl: 'https://github.com/nrcc-cornell/csf-gddtool-v4',
    hasIframe: true,
  },

  {
    id: 'cover-crop-planner',
    image: '/images/tools/cover-crop-planner.jpg',
    title: 'Winter Cover Crop Planting Scheduler',
    description:
      'Recommends optimal seeding windows for winter cover crops based on your location, selected species, and local climate data.',
    icon: '🌿',
    category: 'Crop Planning',
    iframeUrl: 'https://nrcc-cornell.github.io/csf-covercrop',
    externalLink: 'https://climatesmartfarming.org/tools/csf-cover-crop-planting-date-scheduler/',
    repoUrl: 'https://github.com/nrcc-cornell/csf-covercrop',
    hasIframe: true,
  },

  {
    id: 'runoff-risk',
    image: '/images/tools/runoff-risk.jpg',
    title: 'NY State Runoff Risk Advisory Forecast',
    description:
      'Helps farmers and applicators determine the best time to spread manure by estimating the risk of nutrient runoff based on soil saturation and weather forecasts.',
    icon: '🌧️',
    category: 'Water Management',
    iframeUrl: 'https://nrcc-cornell.github.io/runoff-risk',
    externalLink: 'https://climatesmartfarming.org/tools/csf-runoff-risk/',
    repoUrl: 'https://github.com/nrcc-cornell/runoff-risk',
    hasIframe: true,
  },

  {
    id: 'apple-freeze',
    image: '/images/tools/apple-freeze.jpg',
    title: 'Apple Stage & Freeze Damage Probability',
    description:
      'Tracks apple phenological stage based on accumulated GDDs and estimates the probability of freeze damage given current and forecast temperatures.',
    icon: '🍎',
    category: 'Specialty Crops',
    iframeUrl: 'https://nrcc-cornell.github.io/csf-frapple-v4',
    externalLink: 'https://climatesmartfarming.org/tools/csf-apple-stage/',
    repoUrl: 'https://github.com/nrcc-cornell/csf-frapple-v4',
    hasIframe: true,
  },

  {
    id: 'apple-freeze-classic',
    image: '/images/tools/apple-freeze-classic.jpg',
    title: 'Apple Stage & Freeze Damage Tool (Classic)',
    description:
      'The original version of the apple stage and freeze damage probability tool — still actively maintained alongside the v4 release.',
    icon: '🍏',
    category: 'Specialty Crops',
    iframeUrl: 'https://nrcc-cornell.github.io/csf-frapple',
    externalLink: 'https://climatesmartfarming.org/tools/csf-apple-stage/',
    repoUrl: 'https://github.com/nrcc-cornell/csf-frapple',
    hasIframe: true,
  },

  {
    id: 'turf-heat-stress',
    image: '/images/tools/turf-heat-stress.jpg',
    title: 'Turf Grass Heat Stress Tool',
    description:
      'Climate decision tool for turf grass managers, providing heat stress forecasts and historical climate context to guide irrigation and management decisions.',
    icon: '🌱',
    category: 'Specialty Crops',
    iframeUrl: 'https://nrcc-cornell.github.io/turf-page',
    externalLink: 'https://github.com/nrcc-cornell/turf-page',
    repoUrl: 'https://github.com/nrcc-cornell/turf-page',
    hasIframe: true,
  },

  {
    id: 'nwm-drought',
    image: '/images/tools/nwm-drought.jpg',
    title: 'Northeast Drought Indices (NWM)',
    description:
      'National Water Model drought indices for the Northeast U.S., providing hydrological drought monitoring at fine spatial resolution.',
    icon: '🏜️',
    category: 'Drought',
    iframeUrl: 'https://nrcc-cornell.github.io/nwm-drought',
    externalLink: 'https://github.com/nrcc-cornell/nwm-drought',
    repoUrl: 'https://github.com/nrcc-cornell/nwm-drought',
    hasIframe: true,
  },

  {
    id: 'nedews',
    image: '/images/tools/nedews.jpg',
    title: 'Northeast Drought Early Warning System',
    description:
      'Dashboard tracking drought conditions across the Northeast using multiple drought indices, providing early warning for farmers and water managers.',
    icon: '⚠️',
    category: 'Drought',
    iframeUrl: 'https://nrcc-cornell.github.io/nedews-dashboard',
    externalLink: 'https://github.com/nrcc-cornell/nedews-dashboard',
    repoUrl: 'https://github.com/nrcc-cornell/nedews-dashboard',
    hasIframe: true,
  },

  {
    id: 'threadex',
    image: '/images/tools/threadex.jpg',
    title: 'ThreadEx Weather Data',
    description:
      'Provides long-term daily weather data for Northeast U.S. locations, combining station observations and gridded data to create seamless climate records.',
    icon: '📈',
    category: 'Historical Data',
    iframeUrl: 'https://nrcc-cornell.github.io/threadex',
    externalLink: 'https://github.com/nrcc-cornell/threadex',
    repoUrl: 'https://github.com/nrcc-cornell/threadex',
    hasIframe: true,
  },

  // ── Tools without confirmed GitHub Pages — link out ──────────────────────

  {
    id: 'grape-hardiness',
    image: '/images/tools/grape-hardiness.jpg',
    title: 'Grape Hardiness & Freeze Risk Tool',
    description:
      'Monitors grapevine cold hardiness and estimates the risk of freeze damage during the dormant season and spring, helping growers protect their vineyards.',
    icon: '🍇',
    category: 'Specialty Crops',
    externalLink: 'https://climatesmartfarming.org/tools/csf-grape-hardiness/',
    repoUrl: 'https://github.com/nrcc-cornell/csf-grapehard',
    hasIframe: false,
  },

  {
    id: 'scan-acis',
    image: '/images/tools/scan-acis.jpg',
    title: 'SCAN-ACIS Soil Climate Decision Tools',
    description:
      'Decision support tools for the Soil Climate Analysis Network (SCAN), providing soil moisture and temperature data for agricultural management.',
    icon: '🌾',
    category: 'Soil Health',
    externalLink: 'https://github.com/nrcc-cornell/scan-acis-web',
    repoUrl: 'https://github.com/nrcc-cornell/scan-acis-web',
    hasIframe: false,
  },

  {
    id: 'regional-swh',
    image: '/images/tools/regional-swh.jpg',
    title: 'Regional Soil Water Holding Tool',
    description:
      'Python-based regional tool for calculating and visualizing soil water holding capacity across the Northeast, supporting irrigation and drainage planning.',
    icon: '🪣',
    category: 'Soil Health',
    externalLink: 'https://github.com/nrcc-cornell/regional-swh',
    repoUrl: 'https://github.com/nrcc-cornell/regional-swh',
    hasIframe: false,
  },

  {
    id: 'drought-monitor-editor',
    image: '/images/tools/drought-monitor-editor.jpg',
    title: 'NRCC Drought Monitor Editor',
    description:
      'Internal NRCC tool for authoring and editing Drought Monitor assessments for the Northeast region.',
    icon: '✏️',
    category: 'Drought',
    externalLink: 'https://github.com/nrcc-cornell/nrcc-dm-editor',
    repoUrl: 'https://github.com/nrcc-cornell/nrcc-dm-editor',
    hasIframe: false,
  },

  {
    id: 'water-deficit',
    image: '/images/tools/water-deficit.jpg',
    title: 'Water Deficit Calculator',
    description:
      'Estimates current and forecasted water deficit in the effective root zone for specific crops, soil types, and irrigation applications across the Northeast.',
    icon: '💧',
    category: 'Water Management',
    externalLink: 'https://climatesmartfarming.org/tools/csf-water-deficit-calculator/',
    repoUrl: 'https://github.com/nrcc-cornell',
    hasIframe: false,
  },

  {
    id: 'climate-change',
    image: '/images/tools/climate-change.jpg',
    title: 'Visualizing Climate Change in the Northeast',
    description:
      'Find out how the climate has changed in your county since 1950, and what is projected over the next century under different emissions scenarios.',
    icon: '📊',
    category: 'Climate Trends',
    externalLink: 'https://climatesmartfarming.org/tools/csf-county-climate-change/',
    repoUrl: 'https://github.com/nrcc-cornell',
    hasIframe: false,
  },

  {
    id: 'hardiness-zones',
    image: '/images/tools/hardiness-zones.jpg',
    title: 'USDA Plant Hardiness Zone Map (2023)',
    description:
      'Plant hardiness zone designations represent the average annual extreme minimum temperature at a given location — updated in 2023 to reflect recent climate shifts.',
    icon: '🗺️',
    category: 'Climate Zones',
    externalLink: 'https://planthardiness.ars.usda.gov/',
    repoUrl: 'https://github.com/nrcc-cornell',
    hasIframe: false,
  },

  {
    id: 'drought-monitor',
    image: '/images/tools/drought-monitor.jpg',
    title: 'U.S. Drought Monitor',
    description:
      'Weekly map based on measurements of climatic, hydrologic and soil conditions plus reported impacts from over 350 contributors around the country.',
    icon: '🌵',
    category: 'Drought',
    externalLink: 'https://droughtmonitor.unl.edu/',
    repoUrl: 'https://droughtmonitor.unl.edu/',
    hasIframe: false,
  },

  {
    id: 'drought-outlook',
    image: '/images/tools/drought-outlook.jpg',
    title: 'U.S. Seasonal Drought Outlook',
    description:
      'Indicates how Drought Monitor intensity levels are expected to change across the U.S. over the next three months.',
    icon: '🔭',
    category: 'Drought',
    externalLink: 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/seasonal_drought.html',
    repoUrl: 'https://www.cpc.ncep.noaa.gov/',
    hasIframe: false,
  },

  {
    id: 'comet-planner',
    image: '/images/tools/comet-planner.jpg',
    title: 'USDA COMET-Planner',
    description:
      'Estimates carbon sequestration and greenhouse gas reductions from conservation practices on your farm, supporting climate-smart agriculture planning.',
    icon: '🌍',
    category: 'Carbon & GHG',
    externalLink: 'https://comet-planner.com/',
    repoUrl: 'https://comet-planner.com/',
    hasIframe: false,
  },

  {
    id: 'climate-normals',
    image: '/images/tools/climate-normals.jpg',
    title: 'Climate Normals — NRCC',
    description:
      'Climate normals are 30-year averages of climate variables, providing a baseline for comparing current conditions and planning on your farm.',
    icon: '📉',
    category: 'Historical Data',
    externalLink: 'https://www.nrcc.cornell.edu/',
    repoUrl: 'https://github.com/nrcc-cornell',
    hasIframe: false,
  },

];