import { Property, formatPrice } from '@/data/properties';
import { MapPin, Bed, Bath, Maximize, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group cursor-pointer"
    >
      <Link to={`/property/${property.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
          <div className={`absolute inset-0 bg-muted ${imageLoaded ? 'hidden' : ''}`} />
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 p-1.5 transition-transform hover:scale-110"
          >
            <Heart 
              className={`h-6 w-6 drop-shadow-md transition-colors ${
                isLiked ? 'fill-primary text-primary' : 'fill-foreground/30 text-background'
              }`} 
            />
          </button>

          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-md">
              For {property.type === 'sale' ? 'Sale' : 'Rent'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-foreground">
              {property.location.area}, {property.location.city}
            </p>
            {property.isVerified && (
              <div className="flex items-center gap-1 shrink-0">
                <Star className="h-4 w-4 fill-foreground text-foreground" />
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
