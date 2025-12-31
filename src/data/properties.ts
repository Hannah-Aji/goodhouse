export interface Property {
  id: string;
  title: string;
  type: 'rent' | 'sale';
  propertyType: 'apartment' | 'house' | 'land' | 'commercial';
  price: number;
  priceUnit?: 'year' | 'month';
  location: {
    city: string;
    state: string;
    area: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  size: number;
  sizeUnit: 'sqm' | 'sqft' | 'plots';
  image: string;
  images?: string[];
  features: string[];
  description: string;
  agent: {
    name: string;
    phone: string;
    image?: string;
  };
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxurious 4 Bedroom Duplex in Lekki Phase 1',
    type: 'sale',
    propertyType: 'house',
    price: 180000000,
    location: { city: 'Lagos', state: 'Lagos', area: 'Lekki Phase 1' },
    bedrooms: 4,
    bathrooms: 5,
    size: 450,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    features: ['Swimming Pool', 'Smart Home', 'Garage', 'BQ'],
    description: 'Beautiful duplex with modern finishes in a serene environment.',
    agent: { name: 'Adebayo Okonkwo', phone: '+234 801 234 5678' },
    isVerified: true,
    isFeatured: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Modern 3 Bedroom Apartment for Rent',
    type: 'rent',
    propertyType: 'apartment',
    price: 4500000,
    priceUnit: 'year',
    location: { city: 'Lagos', state: 'Lagos', area: 'Victoria Island' },
    bedrooms: 3,
    bathrooms: 3,
    size: 180,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    features: ['24/7 Power', 'Gym', 'Security', 'Parking'],
    description: 'Fully serviced apartment in the heart of Victoria Island.',
    agent: { name: 'Chioma Eze', phone: '+234 802 345 6789' },
    isVerified: true,
    isFeatured: true,
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    title: '5 Bedroom Mansion with Pool in Banana Island',
    type: 'sale',
    propertyType: 'house',
    price: 850000000,
    location: { city: 'Lagos', state: 'Lagos', area: 'Banana Island' },
    bedrooms: 5,
    bathrooms: 6,
    size: 800,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    features: ['Swimming Pool', 'Cinema', 'Wine Cellar', 'Smart Home', 'Garden'],
    description: 'Exclusive waterfront mansion with breathtaking views.',
    agent: { name: 'Emmanuel Nwachukwu', phone: '+234 803 456 7890' },
    isVerified: true,
    isFeatured: true,
    createdAt: '2024-01-18',
  },
  {
    id: '4',
    title: 'Cozy 2 Bedroom Flat in Yaba',
    type: 'rent',
    propertyType: 'apartment',
    price: 1800000,
    priceUnit: 'year',
    location: { city: 'Lagos', state: 'Lagos', area: 'Yaba' },
    bedrooms: 2,
    bathrooms: 2,
    size: 95,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    features: ['Prepaid Meter', 'Security', 'Water'],
    description: 'Affordable and well-maintained flat close to amenities.',
    agent: { name: 'Fatima Abdullahi', phone: '+234 804 567 8901' },
    isVerified: true,
    isFeatured: false,
    createdAt: '2024-01-22',
  },
  {
    id: '5',
    title: 'Commercial Land in Abuja CBD',
    type: 'sale',
    propertyType: 'land',
    price: 500000000,
    location: { city: 'Abuja', state: 'FCT', area: 'Central Business District' },
    size: 2,
    sizeUnit: 'plots',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    features: ['C of O', 'Survey Plan', 'Gazette'],
    description: 'Prime commercial land with all documents intact.',
    agent: { name: 'Ibrahim Musa', phone: '+234 805 678 9012' },
    isVerified: true,
    isFeatured: true,
    createdAt: '2024-01-10',
  },
  {
    id: '6',
    title: 'Elegant 4 Bedroom Terrace in Ikeja GRA',
    type: 'rent',
    propertyType: 'house',
    price: 8000000,
    priceUnit: 'year',
    location: { city: 'Lagos', state: 'Lagos', area: 'Ikeja GRA' },
    bedrooms: 4,
    bathrooms: 4,
    size: 320,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    features: ['BQ', 'Garden', 'Security', 'Parking'],
    description: 'Beautifully finished terrace in a quiet neighborhood.',
    agent: { name: 'Ngozi Okafor', phone: '+234 806 789 0123' },
    isVerified: true,
    isFeatured: false,
    createdAt: '2024-01-25',
  },
  {
    id: '7',
    title: 'Office Space in Marina',
    type: 'rent',
    propertyType: 'commercial',
    price: 15000000,
    priceUnit: 'year',
    location: { city: 'Lagos', state: 'Lagos', area: 'Marina' },
    size: 250,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    features: ['Elevator', '24/7 Power', 'Central AC', 'Parking'],
    description: 'Premium office space in the commercial heart of Lagos.',
    agent: { name: 'Tunde Bakare', phone: '+234 807 890 1234' },
    isVerified: true,
    isFeatured: false,
    createdAt: '2024-01-28',
  },
  {
    id: '8',
    title: 'Residential Land in Ajah',
    type: 'sale',
    propertyType: 'land',
    price: 35000000,
    location: { city: 'Lagos', state: 'Lagos', area: 'Ajah' },
    size: 1,
    sizeUnit: 'plots',
    image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=800&q=80',
    features: ['Governor Consent', 'Survey Plan', 'Deed of Assignment'],
    description: 'Dry land in a developing estate with good road network.',
    agent: { name: 'Oluwaseun Adeyemi', phone: '+234 808 901 2345' },
    isVerified: true,
    isFeatured: true,
    createdAt: '2024-01-30',
  },
];

export const formatPrice = (price: number): string => {
  if (price >= 1000000000) {
    return `₦${(price / 1000000000).toFixed(1)}B`;
  }
  if (price >= 1000000) {
    return `₦${(price / 1000000).toFixed(1)}M`;
  }
  if (price >= 1000) {
    return `₦${(price / 1000).toFixed(0)}K`;
  }
  return `₦${price.toLocaleString()}`;
};

export const nigerianStates = [
  'Lagos', 'Abuja', 'Rivers', 'Kano', 'Oyo', 'Delta', 'Enugu', 
  'Kaduna', 'Anambra', 'Edo', 'Cross River', 'Imo', 'Ogun', 'Kwara'
];
