import { Property } from '@/data/properties';
import { PropertyCard } from './PropertyCard';
import { Skeleton } from '@/components/ui/skeleton';

interface FeaturedPropertiesProps {
  properties: Property[];
  isLoading?: boolean;
}

const PropertySkeleton = () => (
  <div className="rounded-xl overflow-hidden border border-border bg-card">
    {/* Image skeleton */}
    <Skeleton className="aspect-[4/3] w-full" />
    
    {/* Content skeleton */}
    <div className="p-4 space-y-3">
      {/* Badge skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      
      {/* Title skeleton */}
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-3/4" />
      
      {/* Location skeleton */}
      <Skeleton className="h-4 w-1/2" />
      
      {/* Details skeleton */}
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
      </div>
      
      {/* Price skeleton */}
      <div className="pt-2 border-t border-border">
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  </div>
);

export const FeaturedProperties = ({ 
  properties,
  isLoading = false
}: FeaturedPropertiesProps) => {

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container">
          <Skeleton className="h-4 w-32 mb-6" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))}
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
            <p className="text-muted-foreground">We couldn't quite find homes that fit your current needs. Check back later 😊</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              We found {properties.length} good options
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
