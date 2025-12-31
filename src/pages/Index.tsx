import { Navbar } from '@/components/Navbar';
import { HeroSection, Filters } from '@/components/HeroSection';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { Footer } from '@/components/Footer';
import { useState, useMemo } from 'react';
import { mockProperties, Property } from '@/data/properties';

interface SearchFilters {
  location: string;
  listingType: 'all' | 'rent' | 'sale';
  minPrice: string;
  maxPrice: string;
}

const defaultFilters: Filters = {
  bedrooms: 'Any',
  bathrooms: 'Any',
  sizeRange: { min: 0, max: 10000 },
  features: [],
  verified: false,
};

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    listingType: 'all',
    minPrice: '',
    maxPrice: '',
  });
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      // Category filter (house/apartment)
      if (activeCategory !== 'all' && property.propertyType !== activeCategory) {
        return false;
      }

      // Location filter
      if (searchFilters.location && searchFilters.location !== 'all') {
        const locationMatch = 
          property.location.state.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
          property.location.city.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
          property.location.area.toLowerCase().includes(searchFilters.location.toLowerCase());
        if (!locationMatch) return false;
      }

      // Listing type filter (rent/sale)
      if (searchFilters.listingType !== 'all' && property.type !== searchFilters.listingType) {
        return false;
      }

      // Price filters
      if (searchFilters.minPrice) {
        const minPrice = parseFloat(searchFilters.minPrice);
        if (property.price < minPrice) return false;
      }
      if (searchFilters.maxPrice) {
        const maxPrice = parseFloat(searchFilters.maxPrice);
        if (property.price > maxPrice) return false;
      }

      // Bedroom filter
      if (filters.bedrooms !== 'Any') {
        const bedroomCount = filters.bedrooms === '5+' ? 5 : parseInt(filters.bedrooms);
        if (filters.bedrooms === '5+') {
          if (property.bedrooms < bedroomCount) return false;
        } else {
          if (property.bedrooms !== bedroomCount) return false;
        }
      }

      // Bathroom filter
      if (filters.bathrooms !== 'Any') {
        const bathroomCount = filters.bathrooms === '4+' ? 4 : parseInt(filters.bathrooms);
        if (filters.bathrooms === '4+') {
          if (property.bathrooms < bathroomCount) return false;
        } else {
          if (property.bathrooms !== bathroomCount) return false;
        }
      }

      // Size filter
      if (filters.sizeRange.min > 0 || filters.sizeRange.max < 10000) {
        if (property.size < filters.sizeRange.min || property.size > filters.sizeRange.max) {
          return false;
        }
      }

      // Features filter
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every(feature => 
          property.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
        );
        if (!hasAllFeatures) return false;
      }

      // Verified filter
      if (filters.verified && !property.isVerified) {
        return false;
      }

      return true;
    });
  }, [activeCategory, searchFilters, filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onSearch={setSearchFilters}
        searchFilters={searchFilters}
      />
      <main className="flex-1">
        <HeroSection 
          onCategoryChange={setActiveCategory} 
          activeCategory={activeCategory}
          onFiltersChange={setFilters}
          filters={filters}
        />
        <FeaturedProperties properties={filteredProperties} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
