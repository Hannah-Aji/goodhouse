import { Navbar, SearchFilters } from '@/components/Navbar';
import { HeroSection, Filters } from '@/components/HeroSection';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { Footer } from '@/components/Footer';
import { useState, useMemo } from 'react';
import { mockProperties, Property } from '@/data/properties';

const defaultFilters: Filters = {
  bedrooms: 'Any',
  bathrooms: 'Any',
  sizeRange: { min: 0, max: 10000 },
  features: [],
  verified: false,
  serviced: 'any',
  furnished: 'any',
};

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    state: '',
    city: '',
    locality: '',
    listingType: 'all',
    minPrice: '',
    maxPrice: '',
  });
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      // Category filter (house/apartment/shortlet)
      if (activeCategory !== 'all' && property.propertyType !== activeCategory) {
        return false;
      }

      // State filter
      if (searchFilters.state && searchFilters.state !== 'all') {
        if (property.location.state.toLowerCase() !== searchFilters.state.toLowerCase()) {
          return false;
        }
      }

      // City filter
      if (searchFilters.city && searchFilters.city !== 'all') {
        // Match against city or area since our data structure uses city differently
        const cityMatch = 
          property.location.city.toLowerCase() === searchFilters.city.toLowerCase();
        if (!cityMatch) return false;
      }

      // Locality (area) filter
      if (searchFilters.locality && searchFilters.locality !== 'all') {
        if (property.location.area.toLowerCase() !== searchFilters.locality.toLowerCase()) {
          return false;
        }
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

      // Serviced filter
      if (filters.serviced !== 'any') {
        const isServiced = property.isServiced ?? false;
        if (filters.serviced === 'serviced' && !isServiced) return false;
        if (filters.serviced === 'unserviced' && isServiced) return false;
      }

      // Furnished filter
      if (filters.furnished !== 'any') {
        const isFurnished = property.isFurnished ?? false;
        if (filters.furnished === 'furnished' && !isFurnished) return false;
        if (filters.furnished === 'unfurnished' && isFurnished) return false;
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