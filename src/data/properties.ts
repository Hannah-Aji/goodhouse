export interface Property {
  id: string;
  title: string;
  type: 'rent' | 'sale';
  propertyType: 'apartment' | 'house';
  price: number;
  priceUnit?: 'year' | 'month';
  location: {
    city: string;
    state: string;
    area: string;
    address?: string;
    lat?: number;
    lng?: number;
  };
  bedrooms: number;
  bathrooms: number;
  size: number;
  sizeUnit: 'sqm' | 'sqft';
  image: string;
  images: string[];
  features: string[];
  description: string;
  agent: {
    name: string;
    phone: string;
    email?: string;
    image?: string;
  };
  isVerified: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxurious 4 Bedroom Duplex with Swimming Pool',
    type: 'sale',
    propertyType: 'house',
    price: 180000000,
    location: { 
      city: 'Lagos', 
      state: 'Lagos', 
      area: 'Lekki Phase 1',
      address: '15 Admiralty Way, Lekki Phase 1, Lagos',
      lat: 6.4478,
      lng: 3.4723
    },
    bedrooms: 4,
    bathrooms: 5,
    size: 450,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    ],
    features: ['Swimming Pool', 'Smart Home', 'Garage', 'BQ', '24/7 Security', 'Gym'],
    description: 'This stunning 4-bedroom duplex offers the epitome of luxury living in one of Lagos\'s most prestigious neighborhoods. The property features a modern open-plan design with floor-to-ceiling windows that flood the space with natural light. The master suite includes a walk-in closet and spa-like bathroom. Outside, enjoy the private swimming pool and beautifully landscaped garden. Smart home technology throughout allows you to control lighting, security, and climate with ease.',
    agent: { 
      name: 'Adebayo Okonkwo', 
      phone: '+234 801 234 5678',
      email: 'adebayo@goodhouses.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
    },
    isVerified: true,
    isFeatured: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Modern 3 Bedroom Serviced Apartment',
    type: 'rent',
    propertyType: 'apartment',
    price: 4500000,
    priceUnit: 'year',
    location: { 
      city: 'Lagos', 
      state: 'Lagos', 
      area: 'Victoria Island',
      address: '22 Adeola Odeku Street, Victoria Island, Lagos',
      lat: 6.4281,
      lng: 3.4219
    },
    bedrooms: 3,
    bathrooms: 3,
    size: 180,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80',
    ],
    features: ['24/7 Power', 'Gym', 'Security', 'Parking', 'Swimming Pool', 'Elevator'],
    description: 'Experience premium living in this fully serviced 3-bedroom apartment located in the heart of Victoria Island. This contemporary unit features high-end finishes, including Italian marble floors and German kitchen appliances. Residents enjoy access to world-class amenities including a rooftop pool, fully-equipped gym, and 24-hour concierge service. Perfect for professionals and families who appreciate convenience and luxury.',
    agent: { 
      name: 'Chioma Eze', 
      phone: '+234 802 345 6789',
      email: 'chioma@goodhouses.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80'
    },
    isVerified: true,
    isFeatured: true,
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    title: '5 Bedroom Waterfront Mansion',
    type: 'sale',
    propertyType: 'house',
    price: 850000000,
    location: { 
      city: 'Lagos', 
      state: 'Lagos', 
      area: 'Banana Island',
      address: '8 Banana Island Road, Ikoyi, Lagos',
      lat: 6.4598,
      lng: 3.4352
    },
    bedrooms: 5,
    bathrooms: 6,
    size: 800,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    ],
    features: ['Swimming Pool', 'Private Jetty', 'Cinema Room', 'Wine Cellar', 'Smart Home', 'Garden', 'Staff Quarters'],
    description: 'An extraordinary waterfront mansion on the exclusive Banana Island. This architectural masterpiece spans three floors and offers unparalleled luxury with breathtaking lagoon views. Features include a private jetty for boat access, home cinema, wine cellar, and expansive outdoor entertainment areas. The property is finished with the finest materials imported from Italy and includes staff quarters and a 6-car garage.',
    agent: { 
      name: 'Emmanuel Nwachukwu', 
      phone: '+234 803 456 7890',
      email: 'emmanuel@goodhouses.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80'
    },
    isVerified: true,
    isFeatured: true,
    createdAt: '2024-01-18',
  },
  {
    id: '4',
    title: 'Cozy 2 Bedroom Apartment in Yaba',
    type: 'rent',
    propertyType: 'apartment',
    price: 1800000,
    priceUnit: 'year',
    location: { 
      city: 'Lagos', 
      state: 'Lagos', 
      area: 'Yaba',
      address: '45 Herbert Macaulay Way, Yaba, Lagos',
      lat: 6.5095,
      lng: 3.3711
    },
    bedrooms: 2,
    bathrooms: 2,
    size: 95,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80',
    ],
    features: ['Prepaid Meter', 'Security', 'Water Supply', 'Parking'],
    description: 'A well-maintained 2-bedroom apartment ideal for young professionals or small families. Located in the vibrant Yaba neighborhood, close to tech hubs, restaurants, and public transportation. The apartment features modern finishes, ample natural light, and a functional layout that maximizes space.',
    agent: { 
      name: 'Fatima Abdullahi', 
      phone: '+234 804 567 8901',
      email: 'fatima@goodhouses.com',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80'
    },
    isVerified: true,
    isFeatured: false,
    createdAt: '2024-01-22',
  },
  {
    id: '5',
    title: 'Elegant 4 Bedroom Terrace House',
    type: 'rent',
    propertyType: 'house',
    price: 8000000,
    priceUnit: 'year',
    location: { 
      city: 'Lagos', 
      state: 'Lagos', 
      area: 'Ikeja GRA',
      address: '12 Sobo Arobiodu Street, Ikeja GRA, Lagos',
      lat: 6.5833,
      lng: 3.3458
    },
    bedrooms: 4,
    bathrooms: 4,
    size: 320,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    ],
    features: ['BQ', 'Garden', 'Security', 'Parking', 'Generator'],
    description: 'A beautifully finished 4-bedroom terrace house in the serene Ikeja GRA neighborhood. This property offers spacious living areas, a modern kitchen, and a private garden. The quiet, tree-lined streets provide a peaceful retreat while remaining close to shopping centers, schools, and the domestic airport.',
    agent: { 
      name: 'Ngozi Okafor', 
      phone: '+234 806 789 0123',
      email: 'ngozi@goodhouses.com',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80'
    },
    isVerified: true,
    isFeatured: false,
    createdAt: '2024-01-25',
  },
  {
    id: '6',
    title: 'Luxury 3 Bedroom Penthouse with Ocean View',
    type: 'sale',
    propertyType: 'apartment',
    price: 250000000,
    location: { 
      city: 'Lagos', 
      state: 'Lagos', 
      area: 'Eko Atlantic',
      address: 'Azuri Towers, Eko Atlantic City, Lagos',
      lat: 6.4100,
      lng: 3.4050
    },
    bedrooms: 3,
    bathrooms: 4,
    size: 280,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80',
    ],
    features: ['Ocean View', 'Private Terrace', 'Concierge', 'Gym', 'Pool', 'Smart Home'],
    description: 'An exceptional penthouse in the iconic Eko Atlantic City. This premium residence offers panoramic ocean views, a private rooftop terrace, and world-class amenities. The open-concept living space features floor-to-ceiling windows, designer finishes, and smart home technology. Residents enjoy exclusive access to the building\'s infinity pool, spa, and 24-hour concierge service.',
    agent: { 
      name: 'Tunde Bakare', 
      phone: '+234 807 890 1234',
      email: 'tunde@goodhouses.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80'
    },
    isVerified: true,
    isFeatured: true,
    createdAt: '2024-01-28',
  },
  {
    id: '7',
    title: 'Spacious 3 Bedroom Flat in Surulere',
    type: 'rent',
    propertyType: 'apartment',
    price: 2500000,
    priceUnit: 'year',
    location: { 
      city: 'Lagos', 
      state: 'Lagos', 
      area: 'Surulere',
      address: '88 Adeniran Ogunsanya Street, Surulere, Lagos',
      lat: 6.4969,
      lng: 3.3525
    },
    bedrooms: 3,
    bathrooms: 2,
    size: 140,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    ],
    features: ['Balcony', 'Security', 'Water Supply', 'Parking'],
    description: 'A spacious and well-ventilated 3-bedroom flat in the heart of Surulere. This apartment offers generous living spaces, modern finishes, and a convenient location near markets, schools, and entertainment venues. Ideal for families looking for comfort and accessibility.',
    agent: { 
      name: 'Oluwaseun Adeyemi', 
      phone: '+234 808 901 2345',
      email: 'seun@goodhouses.com',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80'
    },
    isVerified: true,
    isFeatured: false,
    createdAt: '2024-01-30',
  },
  {
    id: '8',
    title: 'Contemporary 5 Bedroom Detached House',
    type: 'sale',
    propertyType: 'house',
    price: 320000000,
    location: { 
      city: 'Lagos', 
      state: 'Lagos', 
      area: 'Ikoyi',
      address: '5 Bourdillon Road, Ikoyi, Lagos',
      lat: 6.4510,
      lng: 3.4290
    },
    bedrooms: 5,
    bathrooms: 5,
    size: 550,
    sizeUnit: 'sqm',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80',
    ],
    features: ['Swimming Pool', 'Home Office', 'Staff Quarters', 'Generator', 'CCTV', 'Electric Fence'],
    description: 'A stunning contemporary home in prestigious Ikoyi. This 5-bedroom detached house combines modern architecture with practical luxury. Features include a home office, dedicated staff quarters, and comprehensive security systems. The outdoor space includes a swimming pool and BBQ area perfect for entertaining.',
    agent: { 
      name: 'Adebayo Okonkwo', 
      phone: '+234 801 234 5678',
      email: 'adebayo@goodhouses.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
    },
    isVerified: true,
    isFeatured: true,
    createdAt: '2024-02-01',
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

export const formatPriceFull = (price: number): string => {
  return `₦${price.toLocaleString()}`;
};

export const nigerianStates = [
  'Lagos', 'Abuja', 'Rivers', 'Kano', 'Oyo', 'Delta', 'Enugu', 
  'Kaduna', 'Anambra', 'Edo', 'Cross River', 'Imo', 'Ogun', 'Kwara'
];
