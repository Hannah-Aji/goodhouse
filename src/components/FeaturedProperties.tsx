import { mockProperties } from '@/data/properties';
import { PropertyCard } from './PropertyCard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Home, LandPlot, Store } from 'lucide-react';

type FilterType = 'all' | 'sale' | 'rent';
type PropertyType = 'all' | 'house' | 'apartment' | 'land' | 'commercial';

const filterButtons: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All Properties' },
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' },
];

const propertyTypes: { value: PropertyType; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'All', icon: null },
  { value: 'house', label: 'Houses', icon: <Home className="h-4 w-4" /> },
  { value: 'apartment', label: 'Apartments', icon: <Building2 className="h-4 w-4" /> },
  { value: 'land', label: 'Land', icon: <LandPlot className="h-4 w-4" /> },
  { value: 'commercial', label: 'Commercial', icon: <Store className="h-4 w-4" /> },
];

export const FeaturedProperties = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [propertyType, setPropertyType] = useState<PropertyType>('all');

  const filteredProperties = mockProperties.filter((property) => {
    const matchesFilter = filter === 'all' || property.type === filter;
    const matchesType = propertyType === 'all' || property.propertyType === propertyType;
    return matchesFilter && matchesType;
  });

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Explore Properties
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Featured Listings
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Discover our handpicked selection of premium properties across Nigeria's most sought-after locations.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === btn.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Property Type Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setPropertyType(type.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                propertyType === type.value
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground'
              }`}
            >
              {type.icon}
              {type.label}
            </button>
          ))}
        </motion.div>

        {/* Properties Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties found matching your criteria.</p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" className="group">
            View All Properties
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
