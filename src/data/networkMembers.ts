// src/data/networkMembers.ts

export interface NetworkMember {
  id: string;
  name: string;
  type: 'farmers' | 'advisors' | 'extension';
  location: string;
  coordinates: [number, number];
  description: string;
  county?: string;
  website?: string;
  email?: string;
  phone?: string;
}

export const networkMembers: NetworkMember[] = [
  // ===== FARMERS =====
  {
    id: 'new-moon-farmstead',
    name: 'New Moon Farmstead',
    type: 'farmers',
    location: 'Morrisville, NY',
    coordinates: [42.9799912, -75.6306513],
    description: 'Sustainable farm in Madison County.',
    website: 'https://www.newmoonfarmstead.com/'
  },
  {
    id: 'koval-brothers-dairy',
    name: 'Koval Brothers Dairy',
    type: 'farmers',
    location: 'Stillwater, NY',
    coordinates: [42.9391, -73.6526],
    description: 'Dairy farm in Saratoga County, New York.',
    county: 'Saratoga County'
  },
  {
    id: 'east-forty-farm',
    name: 'East Forty Farm',
    type: 'farmers',
    location: 'Waldoboro, ME',
    coordinates: [44.0956, -69.3756],
    description: 'Farm producing high-quality cheese and dairy products.',
    website: 'https://www.lakinsgorgescheese.com/east-forty-farm'
  },
  {
    id: 'opportunity-hub-farm',
    name: 'The Opportunity Hub Farm',
    type: 'farmers',
    location: 'Brooklyn, NY',
    coordinates: [40.6568, -73.8829],
    description: 'Urban farm focused on community agriculture.',
    website: 'https://www.theopphub.org/hub-services#farm'
  },

  // ===== ADVISORS =====
  {
    id: 'emily-mccarthy',
    name: 'Emily McCarthy',
    type: 'advisors',
    location: 'Rockland, ME',
    coordinates: [44.1037, -69.1089],
    description: 'Island Institute agricultural advisor.',
    website: 'https://www.islandinstitute.org/staff/emily-mccarthy/'
  },
  {
    id: 'sara-kelemen',
    name: 'Sara Kelemen',
    type: 'advisors',
    location: 'Morrill, ME',
    coordinates: [44.4231, -69.1292],
    description: 'American Farmland Trust advisor.',
    website: 'https://farmland.org/staff/sara-kelemen/'
  },
  {
    id: 'sarah-ficken',
    name: 'Sarah Ficken',
    type: 'advisors',
    location: 'Stockbridge, NY',
    coordinates: [42.8831, -75.5894],
    description: 'DGA National agricultural advisor.',
    website: 'https://www.dga-national.org/about/staff'
  },

  // ===== EXTENSION =====
  {
    id: 'amber-blodgett',
    name: 'Amber L Blodgett',
    type: 'extension',
    location: 'St. Albans, VT',
    coordinates: [44.8109, -73.0830],
    description: 'Dairy Research and Outreach, Northwest Crops and Soils.',
    email: 'ablodget@uvm.edu',
    phone: '(802) 355-2653',
    website: 'https://www.uvm.edu/extension/nwcrops/profile/amber-blodgett'
  },
  {
    id: 'kitty-oneil',
    name: "Kitty O'Neil",
    type: 'extension',
    location: 'Ithaca, NY',
    coordinates: [42.4534, -76.4735],
    description: 'Cornell University Extension specialist.',
    county: 'Tompkins County'
  },
  {
    id: 'emily-berkowitz',
    name: 'Emily Berkowitz',
    type: 'extension',
    location: 'Riverhead, NY',
    coordinates: [40.9176, -72.6620],
    description: 'CCE Suffolk County Extension.',
    email: 'el684@cornell.edu',
    county: 'Suffolk County'
  },
  {
    id: 'janice-degni',
    name: 'Janice Degni',
    type: 'extension',
    location: 'Cortland, NY',
    coordinates: [42.6012, -76.1804],
    description: 'South Central NY Dairy & Field Crops.',
    website: 'https://scnydfc.cce.cornell.edu/',
    county: 'Cortland County'
  },
  {
    id: 'erik-smith',
    name: 'Erik Smith',
    type: 'extension',
    location: 'Herkimer, NY',
    coordinates: [43.0268, -74.9857],
    description: 'CCE Herkimer County Extension.',
    county: 'Herkimer County'
  },
  {
    id: 'lindsay-ferlito',
    name: 'Lindsay Ferlito',
    type: 'extension',
    location: 'Ithaca, NY',
    coordinates: [42.4534, -76.4735],
    description: 'Cornell University Extension specialist.',
    website: 'https://cals.cornell.edu/people/lindsay-ferlito',
    county: 'Tompkins County'
  },
  {
    id: 'elizabeth-buck',
    name: 'Elizabeth Buck',
    type: 'extension',
    location: 'East Aurora, NY',
    coordinates: [42.7670, -78.6173],
    description: 'Cornell Cooperative Extension specialist.',
    website: 'https://cals.cornell.edu/people/elizabeth-buck',
    county: 'Erie County'
  },
  {
    id: 'jennifer-phillips-russo',
    name: 'Jennifer Phillips Russo',
    type: 'extension',
    location: 'Portland, NY',
    coordinates: [42.1534, -79.4673],
    description: 'Lake Erie Regional Grape Program.',
    website: 'https://lergp.cce.cornell.edu/contact_information.php',
    county: 'Chautauqua County'
  },
  {
    id: 'yolanda-gonzalez',
    name: 'Yolanda Gonzalez',
    type: 'extension',
    location: 'Brooklyn, NY',
    coordinates: [40.6862, -73.9776],
    description: 'Harvest NY Extension specialist.',
    website: 'https://harvestny.cce.cornell.edu/specialist.php?id=13',
    county: 'Kings County'
  }
];