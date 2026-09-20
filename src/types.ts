export interface NavItem {
  label: string;
  id: string;
  path: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  popular?: boolean;
  features: string[];
  accessHours: string;
  perks: string[];
  cta: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  category?: string;
  description: string;
  specs: string[];
  image: string;
  highlight: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  nickname?: string;
  experience: string;
  certifications: string[];
  specialties: string[];
  bio: string;
  quote: string;
  image: string;
  stats: {
    clientsTrained: string;
    prDeadlift?: string;
    prSquat?: string;
  };
  whatsapp?: string;
  instagram?: string;
}

export interface Review {
  id: string;
  author: string;
  membershipType: string;
  duration: string;
  rating: number;
  title: string;
  content: string;
  avatar: string;
  metricAchieved?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category?: string;
  caption: string;
  imageUrl: string;
  aspect?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'membership' | 'access' | 'training' | 'facilities';
}

export interface GymInfo {
  name: string;
  tagline: string;
  slogan: string;
  address: {
    street: string;
    district: string;
    city: string;
    state: string;
    zip: string;
    landmark: string;
  };
  coordinates: {
    lat: number;
    lng: number;
    formatted: string;
    mapsSearchUrl: string;
    directionsUrl: string;
  };
  contact: {
    phone: string;
    emergencyPhone: string;
    email: string;
    conciergeEmail: string;
  };
  hours: {
    general: string;
    sunday: string;
  };
  pricing: {
    monthlyBand: string;
    annualBand: string;
    feeRange: string;
  };
  amenities: string[];
  services: string[];
  trainerNames: string[];
  stats: {
    sqft: string;
    freeWeightsMax: string;
    squatRacks: number;
    olympicPlatforms: number;
    activeAthletes: string;
  };
  founder?: {
    name: string;
    handle: string;
    role: string;
    bio: string;
    youtube?: string;
  };
  branches?: Array<{
    name: string;
    address: string;
    highlight: string;
    image?: string;
  }>;
}
