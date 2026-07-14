// src/data/tools.ts
export interface Tool {
  id: string;
  title: string;
  description: string;
  icon?: string;
  category: string;
  iframeUrl?: string;
  externalLink?: string;
  repoUrl: string;
  hasIframe: boolean;
  iframeHeight?: string;
  image?: string;
  detail?: string;
}

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

export const featuredTools: Tool[] = [

  {
    id: 'gdd-calculator',
    image: '/images/tools/csf-gddtool-v3-thumbnail.png',
    title: 'Growing Degree Day Calculator',
    description: 'Plots Growing Degree Days (GDD) accumulated since a planting date, with 6-day forecasts and historical context to help predict crop development and pest/disease outbreaks.',
    detail: `<p>© Cornell University, 2016. Credits: <strong>Tool Developed by Art DeGaetano, Rick Moore &amp; Ben Eck.</strong></p><p>Please take a few minutes to fill out a <a href="https://cornell.ca1.qualtrics.com/jfe/form/SV_0vc48MwnoVRBq6N" target="_blank" rel="noopener noreferrer">brief questionnaire</a> on the CSF tools, so that we can continue to improve them. The questionnaire is voluntary and confidential.</p><p>View our <a href="https://youtu.be/fBY-3cJuzh0" target="_blank" rel="noopener">video tool tutorial on YouTube</a>.</p><p><strong>Instructions on Using the Tool:</strong></p><p><em>Choosing Your Location</em> — Click the "Change Location" button, which pops up a dialog box with a text field and a map. Create a new location by entering your address, zip code, or county in the text field and clicking "GO," or by clicking on the map at any location in the Northeast.</p><p><em>Selecting Your Date of Interest</em> — Click the small green calendar to display an interactive calendar. To view results from a previous growing season, select a date within the season of interest.</p><p><em>Choosing Your Season View</em> — Buttons below the varieties allow you to view a 30-day window of results, the entire season to date, or climate change projections.</p>`,
    category: 'Temperature',
    iframeUrl: 'https://nrcc-cornell.github.io/csf-gddtool-v4',
    externalLink: 'https://climatesmartfarming.org/tools/csf-growing-degree-day-calculator/',
    repoUrl: 'https://github.com/nrcc-cornell/csf-gddtool-v4',
    hasIframe: true,
  },

  {
    id: 'cover-crop-planner',
    image: '/images/tools/covercrop_thumbnail.png',
    title: 'Winter Cover Crop Planting Scheduler',
    description: 'Understand how the chances of growing a successful winter cover crop at your location are affected by planting date selection.',
    detail: `<p>© Cornell University, 2017. Credits: <strong>Tool Developed by Thomas Björkman, Kitty O'Neil &amp; Brian Belcher.</strong></p><p>Please take a few minutes to fill out a <a href="https://cornell.ca1.qualtrics.com/jfe/form/SV_0vc48MwnoVRBq6N" target="_blank" rel="noopener noreferrer">brief questionnaire</a> on the CSF tools so that we can continue to improve them. The questionnaire is voluntary and confidential.</p><p><strong>Why is this tool needed?</strong><br/>It is important to know how late into the growing season cover crops can be planted, and still be confident that these crops can accomplish the goals intended. This tool helps to quantify the chances of success and limits the risk involved.</p><p><strong>Producers can use this tool to:</strong></p><ul><li>Make the best selection of crop varieties and optimize planting times.</li><li>Respond to sudden changes — alter planting plans or crop type if unpredictable weather causes delay.</li><li>Assess confidence in planting date selection, or risk involved with delays.</li><li>Assess how a particular season compares to historical or future seasons given climate change.</li></ul><p>Please note that this tool only covers the Northeastern United States.</p>`,
    category: 'Crop Planning',
    iframeUrl: 'https://nrcc-cornell.github.io/csf-covercrop',
    externalLink: 'https://climatesmartfarming.org/tools/csf-cover-crop-planting-date-scheduler/',
    repoUrl: 'https://github.com/nrcc-cornell/csf-covercrop',
    hasIframe: true,
  },

  {
    id: 'runoff-risk',
    image: '/images/tools/runoff-risk-screenshot-cropped.png',
    title: 'Cornell NYS Runoff Risk Tool',
    description: 'The New York State Runoff Risk Forecast is a decision support tool designed to help farmers and commercial applicators determine the best time to spread manure.',
    detail: `<p>The New York State Runoff Risk Forecast is a decision support tool designed to help farmers and commercial applicators determine the best time to avoid runoff losses from fields.</p><p>The model uses National Weather Service forecasts for precipitation, temperature, soil moisture, snow cover, and landscape characteristics to provide information about potential runoff risk in your area for the next 10 days.</p><p>Please take a few minutes to fill out a <a href="https://cornell.ca1.qualtrics.com/jfe/form/SV_0vc48MwnoVRBq6N" target="_blank" rel="noopener noreferrer">brief questionnaire</a> on the CSF tools so that we can continue to improve them. The questionnaire is voluntary and confidential.</p>`,
    category: 'Water Management',
    iframeUrl: 'https://nrcc-cornell.github.io/runoff-risk',
    externalLink: 'https://runoff-risk.nrcc.cornell.edu/ny/',
    repoUrl: 'https://github.com/nrcc-cornell/runoff-risk',
    hasIframe: true,
  },

  {
    id: 'apple-freeze',
    image: '/images/tools/frapple_snapshot_20180103.png',
    title: 'Apple Stage & Freeze Damage Probability',
    description: 'Charts observed/forecasted daily minimum temperatures vs. apple hardiness thresholds in order to assess potential risk for freeze damage.',
    detail: `<p>© Cornell University, 2016. Credits: <strong>Tool Developed by Art DeGaetano, Rick Moore &amp; Ben Eck.</strong></p><p>View our <a href="https://youtu.be/muRToEGKFNI" target="_blank" rel="noopener">video tool tutorial on YouTube</a>.</p><p><strong>Why is this tool needed?</strong><br/>While climate change is causing frosts and freezes to be less severe, spring frosts are not receding as quickly as flowering is advancing, resulting in increased risk for damaging cold snaps.</p><p><strong>How does this tool work?</strong><br/>This tool uses the North Carolina Chilling Unit Model to estimate phenological stage of apple varieties at your location. Lethal damage temperatures (T10%, T50%, and T90%) are known for the apple varieties shown, and the tool graphs minimum temperature versus damage probability.</p><p><strong>Producers can use this tool to:</strong></p><ul><li>Determine the level of frost injury to crops due to sub-freezing temperatures.</li><li>Monitor the level of freeze tolerance of crops through time.</li><li>Track the phenological stage of development.</li></ul><p><strong>Unsure of what steps to take next? <a href="http://cce.cornell.edu/localoffices">Find your local Extension office</a> for more detailed advice.</strong></p>`,
    category: 'Specialty Crops',
    iframeUrl: 'https://nrcc-cornell.github.io/csf-frapple-v4',
    externalLink: 'https://climatesmartfarming.org/tools/csf-apple-stage/',
    repoUrl: 'https://github.com/nrcc-cornell/csf-frapple-v4',
    hasIframe: true,
  },

  {
    id: 'apple-freeze-classic',
    image: '/images/tools/frapple_snapshot_20180103.png',
    title: 'Apple Stage & Freeze Damage Tool (Classic)',
    description: 'The original version of the apple stage and freeze damage probability tool — still actively maintained alongside the v4 release.',
    category: 'Specialty Crops',
    iframeUrl: 'https://nrcc-cornell.github.io/csf-frapple',
    externalLink: 'https://climatesmartfarming.org/tools/csf-apple-stage/',
    repoUrl: 'https://github.com/nrcc-cornell/csf-frapple',
    hasIframe: true,
  },

  {
    id: 'turf-heat-stress',
    image: '/images/tools/Screen-Shot-2017-04-12-at-9.34.42-AM.png',
    title: 'Turf Grass Heat Stress Tool',
    description: 'Climate decision tool for turf grass managers, providing heat stress forecasts and historical climate context to guide irrigation and management decisions.',
    category: 'Specialty Crops',
    iframeUrl: 'https://nrcc-cornell.github.io/turf-page',
    externalLink: 'https://github.com/nrcc-cornell/turf-page',
    repoUrl: 'https://github.com/nrcc-cornell/turf-page',
    hasIframe: true,
  },

  {
    id: 'nwm-drought',
    image: '/images/tools/20161101_northeast_trd.jpg',
    title: 'Northeast Drought Indices (NWM)',
    description: 'National Water Model drought indices for the Northeast U.S., providing hydrological drought monitoring at fine spatial resolution.',
    category: 'Drought',
    iframeUrl: 'https://nrcc-cornell.github.io/nwm-drought',
    externalLink: 'https://github.com/nrcc-cornell/nwm-drought',
    repoUrl: 'https://github.com/nrcc-cornell/nwm-drought',
    hasIframe: true,
  },

  {
    id: 'nedews',
    image: '/images/tools/20161101_northeast_trd.jpg',
    title: 'Northeast Drought Early Warning System',
    description: 'Dashboard tracking drought conditions across the Northeast using multiple drought indices, providing early warning for farmers and water managers.',
    category: 'Drought',
    iframeUrl: 'https://nrcc-cornell.github.io/nedews-dashboard',
    externalLink: 'https://github.com/nrcc-cornell/nedews-dashboard',
    repoUrl: 'https://github.com/nrcc-cornell/nedews-dashboard',
    hasIframe: true,
  },

  {
    id: 'threadex',
    image: '/images/tools/Screen-Shot-2017-01-13-at-11.44.06-AM.png',
    title: 'ThreadEx Weather Data',
    description: 'Provides long-term daily weather data for Northeast U.S. locations, combining station observations and gridded data to create seamless climate records.',
    category: 'Historical Data',
    iframeUrl: 'https://nrcc-cornell.github.io/threadex',
    externalLink: 'https://github.com/nrcc-cornell/threadex',
    repoUrl: 'https://github.com/nrcc-cornell/threadex',
    hasIframe: true,
  },

  {
    id: 'grape-hardiness',
    image: '/images/tools/grapehard_snapshot_20180103.png',
    title: 'Grape Hardiness & Freeze Risk Tool',
    description: 'Charts hardiness temperature vs. daily observed/forecast temperatures for several varieties of grapes.',
    detail: `<p>View our <a href="https://youtu.be/vDwnDW-kQ4M" target="_blank" rel="noopener">video tool tutorial on YouTube</a>.</p><p><strong>Why is this tool needed?</strong><br/>While climate change is causing frosts and freezes to be less severe, spring frosts are not receding as quickly as flowering is advancing, resulting in increased risk for damaging cold snaps.</p><p><strong>How does this tool work?</strong><br/>The Grape Freeze Risk Tool graphs hardiness temperature versus observed temperature for several grape varieties over a specific date range. It also estimates the stage of development when determining a grape variety's hardiness to freeze risk.</p><p><strong>Producers can use this tool to:</strong></p><ul><li>Determine the level of frost injury to crops due to sub-freezing temperatures.</li><li>Monitor the level of freeze tolerance of crops through time.</li><li>Track the phenological stage of development.</li></ul><p><strong>Unsure of what steps to take next? <a href="http://cce.cornell.edu/localoffices">Find your local Extension office</a> for more detailed advice.</strong></p>`,
    category: 'Specialty Crops',
    externalLink: 'https://climatesmartfarming.org/tools/csf-grape-hardiness/',
    repoUrl: 'https://github.com/nrcc-cornell/csf-grapehard',
    hasIframe: false,
  },

  {
    id: 'scan-acis',
    image: '/images/tools/Screen-Shot-2016-05-04-at-10.52.40-AM.png',
    title: 'SCAN-ACIS Soil Climate Decision Tools',
    description: 'Decision support tools for the Soil Climate Analysis Network (SCAN), providing soil moisture and temperature data for agricultural management.',
    category: 'Soil Health',
    externalLink: 'https://github.com/nrcc-cornell/scan-acis-web',
    repoUrl: 'https://github.com/nrcc-cornell/scan-acis-web',
    hasIframe: false,
  },

  {
    id: 'regional-swh',
    image: '/images/tools/Screen-Shot-2016-05-04-at-10.49.44-AM.png',
    title: 'Regional Soil Water Holding Tool',
    description: 'Python-based regional tool for calculating and visualizing soil water holding capacity across the Northeast, supporting irrigation and drainage planning.',
    category: 'Soil Health',
    externalLink: 'https://github.com/nrcc-cornell/regional-swh',
    repoUrl: 'https://github.com/nrcc-cornell/regional-swh',
    hasIframe: false,
  },

  {
    id: 'drought-monitor-editor',
    image: '/images/tools/drought-monitor.jpg',
    title: 'NRCC Drought Monitor Editor',
    description: 'Internal NRCC tool for authoring and editing Drought Monitor assessments for the Northeast region.',
    category: 'Drought',
    externalLink: 'https://github.com/nrcc-cornell/nrcc-dm-editor',
    repoUrl: 'https://github.com/nrcc-cornell/nrcc-dm-editor',
    hasIframe: false,
  },

  {
    id: 'water-deficit',
    image: '/images/tools/water-def-calculator-v4.png',
    title: 'Water Deficit Calculator',
    description: 'Estimates current and forecasted water deficit in the effective root zone for specific crops, soil types, and irrigation applications across the Northeast.',
    detail: `<p>© Cornell University, 2016. Credits: <strong>Tool Developed by Art DeGaetano &amp; Brian Belcher.</strong></p><p>View our <a href="https://youtu.be/9A1F0mCUd8k" target="_blank" rel="noopener">video tool tutorial on YouTube</a>.</p><p><strong>Why is this tool needed?</strong><br/>The CSF Water Deficit Calculator estimates soil water content within a crop's effective root zone to inform decision makers about current and forecasted water deficits.</p><p><strong>How does this tool work?</strong><br/>This tool uses historical climatological data, forecasted rainfall and evapotranspiration, and site-specific data you provide about your farm to estimate current and forecasted water deficits.</p><p><strong>Producers can use this tool to:</strong></p><ul><li>Plan water applications with a goal of minimizing plant stress while maximizing water conservation.</li><li>Assess the probability of naturally reaching certain levels of soil water content over the next month.</li></ul><p><strong>Usage example:</strong> The CSF Water Deficit Calculator was used during <a href="https://www.uvm.edu/sites/default/files/media/IrrigationCaseStudy_Feb2018_cmyk_bleed.pdf" target="_blank" rel="noopener">an economic case study on the benefits of irrigation at Intervale Community Farm (ICF) in Vermont</a>.</p>`,
    category: 'Water Management',
    externalLink: 'https://climatesmartfarming.org/tools/csf-water-deficit-calculator/',
    repoUrl: 'https://github.com/nrcc-cornell',
    hasIframe: false,
  },

  {
    id: 'climate-change',
    image: '/images/tools/changetool_thumbnail_180_90.png',
    title: 'Visualizing Climate Change in the Northeast',
    description: 'Find out how the climate has changed in your county since 1950, and what is projected over the next century under different emissions scenarios.',
    detail: `<p>Credits: <strong>Developed by Art DeGaetano, Brian Belcher and Ben Eck with the <a href="http://climatechange.cornell.edu">CICSS</a> team.</strong> Data requests powered by <a href="http://www.rcc-acis.org">ACIS</a> web services. © Cornell University, 2018.</p><p>This tool was developed to show how the climate has changed in the Northeast United States since 1950, and how it is projected to change over the next century. Maps and charts provide data at the county level.</p><p>Please note that this tool is best viewed on Chrome, Firefox and Safari browsers.</p>`,
    category: 'Climate Trends',
    externalLink: 'https://climatesmartfarming.org/tools/csf-county-climate-change/',
    repoUrl: 'https://github.com/nrcc-cornell',
    hasIframe: false,
  },

  {
    id: 'hardiness-zones',
    image: '/images/tools/usda-plant-hardiness-screenshot-cropped.png',
    title: 'USDA Plant Hardiness Zone Map (2023)',
    description: 'Plant hardiness zone designations represent the average annual extreme minimum temperature at a given location — updated in 2023 to reflect recent climate shifts.',
    detail: `<p>USDA's 2023 Plant Hardiness Zone Map is the standard by which gardeners and growers can determine which plants are most likely to thrive at a location. Plant hardiness zone designations represent the "average annual extreme minimum temperature" at a given location during a 30-year period.</p><p>The 2023 map incorporates data from 13,412 weather stations compared to the 7,983 used for the 2012 map.</p><p>If you receive an error code when accessing this tool, please use a Google Chrome browser as the Plant Hardiness Tool is more compatible with this browser.</p>`,
    category: 'Climate Zones',
    externalLink: 'https://planthardiness.ars.usda.gov/',
    repoUrl: 'https://github.com/nrcc-cornell',
    hasIframe: false,
  },

  {
    id: 'drought-monitor',
    image: '/images/tools/drought-monitor.jpg',
    title: 'U.S. Drought Monitor',
    description: 'The map is based on measurements of climatic, hydrologic and soil conditions as well as reported impacts and observations from more than 350 contributors around the country.',
    detail: `<p>The US Drought Monitor is jointly produced by the National Drought Mitigation Center at the University of Nebraska-Lincoln, the United States Department of Agriculture, and the National Oceanic and Atmospheric Administration. Maps come out every Thursday morning at 8:30 am EST. Map courtesy of NDMC-UNL.</p>`,
    category: 'Drought',
    externalLink: 'https://droughtmonitor.unl.edu/',
    repoUrl: 'https://droughtmonitor.unl.edu/',
    hasIframe: false,
  },

  {
    id: 'drought-outlook',
    image: '/images/tools/us-seasonal-drought-outlook.png',
    title: 'U.S. Seasonal Drought Outlook',
    description: 'This map indicates how Drought Monitor intensity levels are expected to change in the U.S. over the next three months.',
    detail: `<p>The Climate Prediction Center's (CPC) Seasonal Drought Outlook depicts large-scale drought trends over the next three months. This outlook is issued monthly on the third Thursday of each month.</p>`,
    category: 'Drought',
    externalLink: 'https://www.cpc.ncep.noaa.gov/products/expert_assessment/seasonal_drought.html',
    repoUrl: 'https://www.cpc.ncep.noaa.gov/',
    hasIframe: false,
  },

  {
    id: 'comet-planner',
    image: '/images/tools/Screen-Shot-2016-05-18-at-12.22.11-PM.png',
    title: 'COMET-Farm GHG Accounting Tool',
    description: 'COMET-Farm is a whole farm and ranch carbon and greenhouse gas accounting system.',
    detail: `<p>COMET-Farm is a tool developed by Colorado State University in conjunction with the USDA and NRCS that estimates the carbon footprint for all or part of your farm or ranch operation and allows you to evaluate different options for reducing GHG emissions and sequestering more carbon.</p><p>The tool uses detailed spatially-explicit data on climate and soil conditions for your location and allows you to enter detailed information for your field and livestock operations.</p>`,
    category: 'Carbon & GHG',
    externalLink: 'http://cometfarm.nrel.colostate.edu/',
    repoUrl: 'https://comet-planner.com/',
    hasIframe: false,
  },

  {
    id: 'climate-normals',
    image: '/images/tools/Screen-Shot-2017-04-12-at-10.24.57-AM.png',
    title: 'Climate Normals — NRCC',
    description: 'Climate normals are an arithmetic average of a variable such as temperature over a prescribed 30-year period.',
    detail: `<p>The mission of the Northeast Regional Climate Center (NRCC) is to facilitate and enhance the collection, dissemination, and use of climate data and information, as well as to monitor and assess climatic conditions and impacts in the twelve-state northeastern region of the United States.</p><p>For more information on the NRCC tools, contact Dr. Art DeGaetano at <a href="mailto:atd2@cornell.edu">atd2@cornell.edu</a>.</p>`,
    category: 'Historical Data',
    externalLink: 'http://www.nrcc.cornell.edu/regional/climatenorms/climatenorms.html',
    repoUrl: 'https://github.com/nrcc-cornell',
    hasIframe: false,
  },

  {
    id: 'newa',
    image: '/images/tools/newa-screenshot-cropped.png',
    title: 'NEWA — Network for Environment and Weather Apps',
    description: 'NEWA makes it possible for farmers to share resources for weather data collection, analysis, distribution, and archiving.',
    detail: `<p>NEWA delivers weather information and apps based on the weather collected that support and advance integrated pest management (IPM) and best management practices for agricultural and green industries.</p>`,
    category: 'Historical Data',
    externalLink: 'http://newa.cornell.edu/',
    repoUrl: 'http://newa.cornell.edu/',
    hasIframe: false,
  },

  {
    id: 'adapt-n',
    image: '/images/tools/Adapt-N_VRT_Rec_800x406.png',
    title: 'Adapt-N Nitrogen Management Tool',
    description: 'Adapt-N is an online tool that will help you precisely manage your N inputs for grain, silage or sweet corn.',
    detail: `<p>Adapt-N is an online tool developed at Cornell University that inputs high resolution weather data coupled with soil and crop management information into a well-calibrated computer model, allowing users to precisely manage their nitrogen application for corn, grain, and silage production.</p>`,
    category: 'Crop Planning',
    externalLink: 'http://www.adapt-n.com/',
    repoUrl: 'http://www.adapt-n.com/',
    hasIframe: false,
  },

  {
    id: 'noaa-temp-outlook',
    image: '/images/tools/Screenshot-2023-11-20-at-11.07.25-AM.png',
    title: 'NOAA Seasonal Outlook: Temperature',
    description: 'A seasonal forecast is the best available prediction of what our climate will be like in the next few months.',
    detail: `<p>The Climate Prediction Center (CPC), under NOAA, delivers real-time products and information that predict and describe climate variations on timescales from weeks to years. For more information on how to read the Three-Month Outlook maps, see the <a href="http://www.cpc.ncep.noaa.gov/products/predictions/long_range/seasonal_info.php" target="_blank">CPC guidance page</a>.</p>`,
    category: 'Climate Trends',
    externalLink: 'http://www.cpc.ncep.noaa.gov/products/predictions/long_range/seasonal.php?lead=1',
    repoUrl: 'https://www.noaa.gov/',
    hasIframe: false,
  },

  {
    id: 'noaa-precip-outlook',
    image: '/images/tools/Screenshot-2023-11-20-at-11.07.25-AM.png',
    title: 'NOAA Seasonal Outlook: Precipitation',
    description: 'A seasonal forecast is the best available prediction of what our climate will be like in the next few months.',
    detail: `<p>The Climate Prediction Center (CPC), under NOAA, delivers real-time products and information that predict and describe climate variations on timescales from weeks to years. For more information on how to read the Three-Month Outlook maps, see the <a href="http://www.cpc.ncep.noaa.gov/products/predictions/long_range/seasonal_info.php" target="_blank">CPC guidance page</a>.</p>`,
    category: 'Climate Trends',
    externalLink: 'http://www.cpc.ncep.noaa.gov/products/predictions/long_range/seasonal.php?lead=1',
    repoUrl: 'https://www.noaa.gov/',
    hasIframe: false,
  },

  {
    id: 'cornell-cover-crop-veg',
    image: '/images/tools/covercrop_thumbnail.png',
    title: 'Cornell Cover Crop Tool for Vegetable Growers',
    description: 'This is an online tool to help you quickly narrow the choices of cover crop for your situation.',
    detail: `<p>This tool helps you quickly narrow the choices of cover crop for your situation based on Management Goal, Planting Time, and Duration. It is designed for the soil, climate, cropping practices and seed market in New York.</p><p>Please take a few minutes to fill out a <a href="https://cornell.ca1.qualtrics.com/jfe/form/SV_0vc48MwnoVRBq6N" target="_blank" rel="noopener noreferrer">brief questionnaire</a> on the CSF tools so that we can continue to improve them.</p>`,
    category: 'Crop Planning',
    externalLink: 'https://covercrop.org/cover_crops/',
    repoUrl: 'https://covercrop.org/',
    hasIframe: false,
  },

  {
    id: 'nrel-tools',
    image: '/images/tools/Screen-Shot-2016-05-18-at-12.22.11-PM.png',
    title: 'National Renewable Energy Laboratory Tools',
    description: 'Use models and tools developed or supported by NREL to assess, analyze, and optimize renewable energy and energy efficiency technologies for your project.',
    detail: `<p>Use models and tools developed or supported by NREL to assess, analyze, and optimize renewable energy and energy efficiency technologies for your project. Many of these tools can be applied on a global, regional, local, or project basis. NREL models and tools include several designed for the consumer or energy professional.</p>`,
    category: 'Carbon & GHG',
    externalLink: 'http://www.nrel.gov/analysis/models_tools.html',
    repoUrl: 'https://www.nrel.gov/',
    hasIframe: false,
  },

  {
    id: 'usda-adaptation-workbook',
    image: '/images/tools/Screenshot-2023-11-20-at-11.07.25-AM.png',
    title: 'USDA Adaptation Workbook Online',
    description: 'An interactive online climate change tool developed by the USDA for land management and conservation in the Northeast and Midwest.',
    detail: `<p>This online version of the USDA "Adaptation Resources for Agriculture" Workbook allows users to select their farm location and fill out information in interactive online forms to receive tailored information for their regional climate change impacts, to promote critical thinking and management.</p>`,
    category: 'Climate Trends',
    externalLink: 'https://adaptationworkbook.org/',
    repoUrl: 'https://adaptationworkbook.org/',
    hasIframe: false,
  },

  {
    id: 'cornell-forages',
    image: '/images/tools/forages-screenshot-cropped.png',
    title: 'Cornell Forage Species Selector Tool',
    description: 'Provides recommendations for field specific crops based on local soil type, drainage, and intended use.',
    detail: `<p>The Forage Species Selector Tool utilizes local variables and user-provided information to provide recommendations on what forage species may be a good fit for your farm.</p><p>Please take a few minutes to fill out a <a href="https://cornell.ca1.qualtrics.com/jfe/form/SV_0vc48MwnoVRBq6N" target="_blank" rel="noopener noreferrer">brief questionnaire</a> on the CSF tools so that we can continue to improve them.</p>`,
    category: 'Crop Planning',
    externalLink: 'https://forages.org/',
    repoUrl: 'https://forages.org/',
    hasIframe: false,
  },

  {
    id: 'grass-management',
    image: '/images/tools/grass-tools-screenshot-cropped.png',
    title: 'Grass Management Tools',
    description: 'Estimate current Neutral Detergent Fiber (NDF) and target harvest height for different grasses.',
    detail: `<p>Grass Management Tools estimate current Neutral Detergent Fiber (NDF) and target harvest height for different grasses. This page also contains fact and information sheets for a variety of grasses and a grass management manual for dairy cattle.</p>`,
    category: 'Crop Planning',
    externalLink: 'https://tools.forages.org/',
    repoUrl: 'https://tools.forages.org/',
    hasIframe: false,
  },

];