import { GymInfo } from '../types';

export const gymData: GymInfo = {
  name: 'Fitness Edge Prime',
  tagline: 'Yelahanka Bengaluru\'s Premier Fitness Hub',
  slogan: 'Train with Purpose, Become Unstoppable',
  address: {
    street: '44, CNR Complex, Ananthapura Main Rd, Vinayaka Nagar',
    district: 'Yelahanka New Town',
    city: 'Bengaluru',
    state: 'Karnataka',
    zip: '560064',
    landmark: 'Ananthapura Main Rd, Vinayaka Nagar',
  },
  coordinates: {
    lat: 13.114134288644202,
    lng: 77.57896477289223,
    formatted: '13.1141343° N, 77.5789648° E',
    mapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=13.114134288644202,77.57896477289223',
    directionsUrl: 'https://www.google.com/maps?q=13.114134288644202,77.57896477289223',
  },
  contact: {
    phone: '+91 99020 02764 / +91 86600 36397',
    emergencyPhone: '+91 99020 02764',
    email: 'info@fitedge.fit',
    conciergeEmail: 'concierge@fitedge.fit',
  },
  hours: {
    general: 'Monday - Saturday: 5:30 AM – 10:00 PM',
    sunday: 'Sunday: 9:00 AM – 12:00 PM',
  },
  pricing: {
    monthlyBand: '₹1,500 - ₹4,000 / month',
    annualBand: '₹10,000 - ₹14,000 / year',
    feeRange: 'Mid-range fee band',
  },
  amenities: [
    'Modern equipment',
    'Clean and hygienic environment',
    'Rooftop Artificial Turf (HYROX & TRUF)',
    'Steam bath',
    'Free Trial Available'
  ],
  services: [
    'HYROX Training',
    'TRUF Outdoor Functional',
    'Step Aerobics (Reebok)',
    'CrossFit Batches (7 AM & 7 PM)',
    'Resistance Training',
    'MMA & Kickboxing',
    'Personal Training',
    'Yoga & Zumba'
  ],
  trainerNames: [
    'Pawan Kumar',
    'Rajesh',
    'Akshay',
    'Prathiksha Shetty',
    'Dhanush Raj',
    'Sudheer Shetty'
  ],
  stats: {
    sqft: '28,000 sq.ft. (Network)',
    freeWeightsMax: '150 lb Dumbbells',
    squatRacks: 14,
    olympicPlatforms: 8,
    activeAthletes: '1,240+ Active Members',
  },
  founder: {
    name: 'Siddhu Yadav',
    handle: '@siddhu_fitnessedge_',
    role: 'Proprietor @fitnessedge.vpr & President @skbfa_official',
    bio: 'Information Science Engineer turned Fitness Entrepreneur and President of SKBFA (Karnataka Bodybuilding Federation). Certified Personal Trainer and Prep Coach passionate about myth-busting, functional fitness, and organizing state & national bodybuilding expos.',
    youtube: 'youtube.com/@fitnesssecretswithsiddhu',
  },
  branches: [
    {
      name: 'Fitness Edge Prime (Yelahanka)',
      address: '44, CNR Complex, Ananthapura Main Rd, Vinayaka Nagar, Yelahanka New Town, Bengaluru 560064',
      highlight: 'Flagship Facility | Rooftop Artificial Turf for HYROX & TRUF',
      image: '/facilities/1.webp'
    },
    {
      name: 'FitnessEDGE 1 (Vidyaranyapura)',
      address: 'Nanjappa - Thindlu Rd, GD Layout, Doddabommasandra, Vidyaranyapura, Bengaluru 560097',
      highlight: 'Spacious Weight Floor & Fitnessedge Outdoor Sports Turf',
      image: '/facilities/2.webp'
    },
    {
      name: 'FitnessEdge 2 (Kodigehalli)',
      address: 'No 164/7, 3rd Floor, Sundraresh Complex, Above Indian Bank, Kodigehalli - Thindlu Main Rd, Bengaluru 560092',
      highlight: 'Established 2013 | 2,400 Sq.Ft. Functional & Heavy Iron Facility',
      image: '/facilities/3.webp'
    },
    {
      name: 'FitnessEdge 3 / Prime 2 (Sahakar Nagar)',
      address: 'B Block, CQAL Layout, Sahakar Nagar (Above I Mart & Opp. Sterling Apartments), Bengaluru 560092',
      highlight: 'Dual Setup | High-Hygiene Circuits & Group Fitness Batches',
      image: '/facilities/4.webp'
    }
  ]
};
