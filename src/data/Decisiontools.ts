// src/data/decisionTools.ts

export interface DecisionTool {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  externalLink: string;
  category: string;
}

export const decisionTools: DecisionTool[] = [
  {
    id: 'planting-date',
    title: 'Planting Date Planner',
    description: 'Optimize planting dates based on climate data and crop requirements to maximize yields.',
    image: '/images/tools/planting-date.jpg',
    link: '/tools/planting-date-planner',
    externalLink: 'http://climatesmartfarming.org/tools/csf-planting-date/',
    category: 'Crop Planning'
  },
  {
    id: 'crop-yield',
    title: 'Crop Yield Estimator',
    description: 'Predict potential crop yields based on weather patterns, soil conditions, and management practices.',
    image: '/images/tools/crop-yield.jpg',
    link: '/tools/crop-yield-estimator',
    externalLink: 'http://climatesmartfarming.org/tools/',
    category: 'Crop Planning'
  },
  {
    id: 'risk-assessment',
    title: 'Climate Risk Assessment',
    description: 'Evaluate climate-related risks for your farm including drought, flooding, and extreme weather.',
    image: '/images/tools/risk-assessment.jpg',
    link: '/tools/risk-assessment',
    externalLink: 'http://climatesmartfarming.org/tools/',
    category: 'Risk Management'
  },
  {
    id: 'irrigation-scheduler',
    title: 'Irrigation Scheduler',
    description: 'Plan irrigation schedules based on soil moisture, weather forecasts, and crop water needs.',
    image: '/images/tools/irrigation.jpg',
    link: '/tools/irrigation-scheduler',
    externalLink: 'http://climatesmartfarming.org/tools/csf-water-deficit-calculator/',
    category: 'Water Management'
  },
  {
    id: 'pest-forecast',
    title: 'Pest & Disease Forecast',
    description: 'Predict pest and disease pressure based on weather conditions and historical patterns.',
    image: '/images/tools/pest-forecast.jpg',
    link: '/tools/pest-forecast',
    externalLink: 'http://climatesmartfarming.org/tools/',
    category: 'Pest Management'
  },
  {
    id: 'soil-health',
    title: 'Soil Health Tracker',
    description: 'Monitor and analyze soil health metrics to improve fertility and long-term productivity.',
    image: '/images/tools/soil-health.jpg',
    link: '/tools/soil-health',
    externalLink: 'http://climatesmartfarming.org/tools/',
    category: 'Soil Management'
  },
  {
    id: 'harvest-timing',
    title: 'Harvest Timing Advisor',
    description: 'Determine optimal harvest windows based on crop maturity and weather forecasts.',
    image: '/images/tools/harvest-timing.jpg',
    link: '/tools/harvest-timing',
    externalLink: 'http://climatesmartfarming.org/tools/',
    category: 'Crop Planning'
  },
  {
    id: 'cover-crop',
    title: 'Cover Crop Selector',
    description: 'Choose the best cover crops for your soil type, climate zone, and farming goals.',
    image: '/images/tools/cover-crop.jpg',
    link: '/tools/cover-crop',
    externalLink: 'http://climatesmartfarming.org/tools/',
    category: 'Soil Management'
  }
];