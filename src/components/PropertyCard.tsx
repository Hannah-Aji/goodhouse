import { Property, formatPrice, mockProperties } from '@/data/properties';
import { Star, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Calculate price comparison
  const priceInsight = useMemo(() => {
    // Find similar properties in the same area with same type + property type
    const similarProperties = mockProperties.filter(
      (p) =>
        p.location.area === property.location.area &&
        p.location.city === property.location.city &&
        p.location.state === property.location.state &&
        p.type === property.type &&
        p.propertyType === property.propertyType &&
        p.id !== property.id
    );

    // Broaden progressively so every card gets an insight (even if we lack perfect comps)
    let comparisonSet: Property[] =
      similarProperties.length > 0
        ? similarProperties
        : mockProperties.filter(
            (p) =>
              p.location.city === property.location.city &&
              p.location.state === property.location.state &&
              p.type === property.type &&
              p.propertyType === property.propertyType &&
              p.id !== property.id
          );

    if (comparisonSet.length === 0) {
      comparisonSet = mockProperties.filter(
        (p) =>
          p.location.state === property.location.state &&
          p.type === property.type &&
          p.propertyType === property.propertyType &&
          p.id !== property.id
      );
    }

    if (comparisonSet.length === 0) {
      // Last fallback: compare against all listings of the same listing type (rent vs sale)
      comparisonSet = mockProperties.filter((p) => p.type === property.type && p.id !== property.id);
    }

    if (comparisonSet.length === 0) return null;

    // Calculate average price per sqm for comparison
    const avgPricePerSqm =
      comparisonSet.reduce((sum, p) => sum + p.price / p.size, 0) / comparisonSet.length;
    const propertyPricePerSqm = property.price / property.size;

    const percentageDiff = ((propertyPricePerSqm - avgPricePerSqm) / avgPricePerSqm) * 100;

    return {
      percentage: Math.abs(Math.round(percentageDiff)),
      isHigher: percentageDiff > 0,
      isEqual: Math.abs(percentageDiff) < 5,
      isGreatDeal: percentageDiff <= -15,
    };
  }, [property]);

  const images = property.images.length > 0 ? property.images : [property.image];

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group cursor-pointer"
    >
      {/* Image Container with Carousel */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
        <div ref={emblaRef} className="overflow-hidden h-full">
          <div className="flex h-full">
            {images.map((image, imgIndex) => (
              <div key={imgIndex} className="flex-[0_0_100%] min-w-0 h-full relative">
                <div className={`absolute inset-0 bg-muted ${imageLoaded && imgIndex === 0 ? 'hidden' : ''}`} />
                <Link to={`/property/${property.id}`}>
                  <img
                    src={image}
                    alt={`${property.title} ${imgIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onLoad={() => imgIndex === 0 && setImageLoaded(true)}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2.5 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-md">
            For {property.type === 'sale' ? 'Sale' : 'Rent'}
          </span>
        </div>

        {/* Price Insight Badge */}
        {priceInsight && (
          <div className="absolute top-3 right-3 z-10">
            {priceInsight.isEqual ? (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md backdrop-blur-sm bg-muted/90 text-foreground">
                <Minus className="h-3 w-3" strokeWidth={2.5} />
                Around avg
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md backdrop-blur-sm ${
                  priceInsight.isHigher ? 'bg-amber-500/90 text-white' : 'bg-emerald-500/90 text-white'
                }`}
              >
                {priceInsight.isHigher ? (
                  <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
                ) : (
                  <TrendingDown className="h-3 w-3" strokeWidth={2.5} />
                )}
                {priceInsight.percentage}% {priceInsight.isHigher ? 'above' : 'below'}
              </span>
            )}
          </div>
        )}

        {/* Carousel Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  emblaApi?.scrollTo(dotIndex);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  selectedIndex === dotIndex
                    ? 'bg-background w-3'
                    : 'bg-background/60 hover:bg-background/80'
                }`}
                aria-label={`Go to image ${dotIndex + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <Link to={`/property/${property.id}`}>
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-foreground">
              {property.location.area}, {property.location.city}
            </p>
            {property.isVerified && (
              <div className="flex items-center gap-1 shrink-0">
                <Star className="h-4 w-4 fill-foreground text-foreground" strokeWidth={2.5} />
                <span className="text-sm font-medium">Verified</span>
              </div>
            )}
          </div>

          <p className="text-muted-foreground text-sm line-clamp-1">
            {property.title}
          </p>

          {/* Property Details */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{property.bedrooms} beds</span>
            <span>· {property.bathrooms} baths</span>
            <span>· {property.size} {property.sizeUnit}</span>
          </div>

          {/* Price */}
          <p className="pt-1">
            <span className="font-semibold">{formatPrice(property.price)}</span>
            {property.priceUnit && (
              <span className="text-muted-foreground font-normal"> / {property.priceUnit}</span>
            )}
          </p>
        </div>
      </Link>
    </motion.article>
  );
};