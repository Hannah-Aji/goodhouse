import { Property } from '@/data/properties';
import { PropertyCard } from './PropertyCard';
import { Loader2 } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
  isLoading?: boolean;
}

export const FeaturedProperties = ({ 
  properties,
  isLoading = false
}: FeaturedPropertiesProps) => {

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
        {properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No properties found matching your criteria.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {properties.length} properties found
            </p>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
