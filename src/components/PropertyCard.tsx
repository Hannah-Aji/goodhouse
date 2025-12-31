import { Property, formatPrice } from '@/data/properties';
import { MapPin, Bed, Bath, Maximize, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getSizeDisplay = () => {
    if (property.sizeUnit === 'plots') {
      return `${property.size} ${property.size > 1 ? 'Plots' : 'Plot'}`;
    }
    return `${property.size} ${property.sizeUnit}`;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={`absolute inset-0 bg-muted animate-pulse ${imageLoaded ? 'hidden' : ''}`} />
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge 
            variant={property.type === 'sale' ? 'default' : 'secondary'}
            className={property.type === 'sale' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-accent text-accent-foreground'}
          >
            For {property.type === 'sale' ? 'Sale' : 'Rent'}
          </Badge>
          {property.isFeatured && (
            <Badge className="bg-gold text-gold-foreground">
              Featured
            </Badge>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              isLiked ? 'fill-accent text-accent' : 'text-muted-foreground'
            }`} 
          />
        </button>

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3">
          <p className="text-xl font-bold text-primary-foreground">
            {formatPrice(property.price)}
            {property.priceUnit && (
              <span className="text-sm font-normal opacity-80">/{property.priceUnit}</span>
            )}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          {property.isVerified && (
            <CheckCircle className="h-5 w-5 text-primary shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="text-sm truncate">
            {property.location.area}, {property.location.city}
          </span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 pt-2 border-t border-border">
          {property.bedrooms !== undefined && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Maximize className="h-4 w-4" />
            <span className="text-sm">{getSizeDisplay()}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
