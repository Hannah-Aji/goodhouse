import { mockProperties, Property } from '@/data/properties';
import { PropertyCard } from './PropertyCard';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface FeaturedPropertiesProps {
  categoryFilter?: string;
  typeFilter?: 'all' | 'sale' | 'rent';
  properties?: Property[];
  isLoading?: boolean;
}

export const FeaturedProperties = ({ 
  categoryFilter = 'all', 
  typeFilter = 'all',
  properties,
  isLoading = false
}: FeaturedPropertiesProps) => {
  const displayProperties = properties || mockProperties;
  
  const filteredProperties = displayProperties.filter((property) => {
    const matchesCategory = categoryFilter === 'all' || property.propertyType === categoryFilter;
    const matchesType = typeFilter === 'all' || property.type === typeFilter;
    return matchesCategory && matchesType;
  });

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No properties found matching your criteria.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {filteredProperties.length} properties found
            </p>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
