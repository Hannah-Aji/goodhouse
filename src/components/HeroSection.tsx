import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import lagosBackground from '@/assets/lagos-background.jpg';

const categories = [
  { id: 'house', label: 'Houses', icon: '🏡' },
  { id: 'apartment', label: 'Apartments', icon: '🏢' },
];

const bedroomOptions = ['Any', '1', '2', '3', '4', '5+'];
const bathroomOptions = ['Any', '1', '2', '3', '4+'];
const sizeRanges = [
  { label: 'Any', min: 0, max: 10000 },
  { label: '< 100 sqm', min: 0, max: 100 },
  { label: '100 - 200 sqm', min: 100, max: 200 },
  { label: '200 - 300 sqm', min: 200, max: 300 },
  { label: '300 - 500 sqm', min: 300, max: 500 },
  { label: '> 500 sqm', min: 500, max: 10000 },
];
const featuresList = [
  'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 
  'Smart Home', 'Generator', 'BQ', 'Elevator', '24/7 Power'
];

export interface Filters {
  bedrooms: string;
  bathrooms: string;
  sizeRange: { min: number; max: number };
  features: string[];
  verified: boolean;
  serviced: 'any' | 'serviced' | 'unserviced';
  furnished: 'any' | 'furnished' | 'unfurnished';
  minPrice: number;
  maxPrice: number;
}

const minPriceOptions = [
  { label: 'Any', value: 0 },
  { label: '₦5M', value: 5000000 },
  { label: '₦20M', value: 20000000 },
  { label: '₦50M', value: 50000000 },
  { label: '₦100M', value: 100000000 },
  { label: '₦500M', value: 500000000 },
];

const maxPriceOptions = [
  { label: 'Any', value: Infinity },
  { label: '₦5M', value: 5000000 },
  { label: '₦20M', value: 20000000 },
  { label: '₦50M', value: 50000000 },
  { label: '₦100M', value: 100000000 },
  { label: '₦500M', value: 500000000 },
  { label: '₦1B+', value: 1000000000 },
];

interface HeroSectionProps {
  onCategoryChange?: (category: string) => void;
  activeCategory?: string;
  onFiltersChange?: (filters: Filters) => void;
  filters?: Filters;
}

const defaultFilters: Filters = {
  bedrooms: 'Any',
  bathrooms: 'Any',
  sizeRange: { min: 0, max: 10000 },
  features: [],
  verified: false,
  serviced: 'any',
  furnished: 'any',
  minPrice: 0,
  maxPrice: Infinity,
};

export const HeroSection = ({ 
  onCategoryChange, 
  activeCategory = 'house',
  onFiltersChange,
  filters = defaultFilters
}: HeroSectionProps) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isBedsOpen, setIsBedsOpen] = useState(false);
  const [isBathsOpen, setIsBathsOpen] = useState(false);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange?.(localFilters);
    setIsFiltersOpen(false);
  };

  const clearFilters = () => {
    setLocalFilters(defaultFilters);
    onFiltersChange?.(defaultFilters);
  };

  const activeFilterCount = [
    localFilters.bedrooms !== 'Any',
    localFilters.bathrooms !== 'Any',
    localFilters.sizeRange.min > 0 || localFilters.sizeRange.max < 10000,
    localFilters.features.length > 0,
    localFilters.verified,
    localFilters.serviced !== 'any',
    localFilters.furnished !== 'any',
    localFilters.minPrice > 0 || localFilters.maxPrice < Infinity,
  ].filter(Boolean).length;

  const toggleFeature = (feature: string) => {
    const newFeatures = localFilters.features.includes(feature)
      ? localFilters.features.filter(f => f !== feature)
      : [...localFilters.features, feature];
    updateFilter('features', newFeatures);
  };

  return (
    <section className="border-b border-border">
      {/* Category Tabs with Lagos Background */}
      <div className="relative overflow-hidden">
        {/* Blurred Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-[2px] scale-105"
          style={{ backgroundImage: `url(${lagosBackground})` }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="container py-6 relative z-10">
          <div className="flex items-center justify-center gap-12 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange?.(category.id)}
                className={`flex flex-col items-center gap-2 min-w-[64px] pb-3 border-b-2 transition-all ${
                  activeCategory === category.id
                    ? 'border-white text-white'
                    : 'border-transparent text-white/70 hover:text-white hover:border-white/30'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Filters Bar - sticks below navbar when scrolling */}
      <div className="sticky top-[64px] z-40 bg-background border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {/* Bedrooms Filter - Modal */}
            <Dialog open={isBedsOpen} onOpenChange={setIsBedsOpen}>
              <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
                  Beds: {localFilters.bedrooms}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xs">
                <DialogHeader>
                  <DialogTitle>Bedrooms</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-1 pt-4">
                  {bedroomOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFilter('bedrooms', option);
                        onFiltersChange?.({ ...localFilters, bedrooms: option });
                        setIsBedsOpen(false);
                      }}
                      className={`px-4 py-3 text-left rounded-lg text-sm transition-colors ${
                        localFilters.bedrooms === option
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {option === 'Any' ? 'Any' : `${option} Bedroom${option === '1' ? '' : 's'}`}
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* Bathrooms Filter - Modal */}
            <Dialog open={isBathsOpen} onOpenChange={setIsBathsOpen}>
              <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
                  Baths: {localFilters.bathrooms}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xs">
                <DialogHeader>
                  <DialogTitle>Bathrooms</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-1 pt-4">
                  {bathroomOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFilter('bathrooms', option);
                        onFiltersChange?.({ ...localFilters, bathrooms: option });
                        setIsBathsOpen(false);
                      }}
                      className={`px-4 py-3 text-left rounded-lg text-sm transition-colors ${
                        localFilters.bathrooms === option
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {option === 'Any' ? 'Any' : `${option} Bathroom${option === '1' ? '' : 's'}`}
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* Price Filter - Modal */}
            <Dialog open={isPriceOpen} onOpenChange={setIsPriceOpen}>
              <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
                  Price: {localFilters.minPrice === 0 && localFilters.maxPrice === Infinity 
                    ? 'Any' 
                    : `${localFilters.minPrice === 0 ? 'Any' : `₦${(localFilters.minPrice / 1000000).toFixed(0)}M`} - ${localFilters.maxPrice === Infinity ? 'Any' : `₦${(localFilters.maxPrice / 1000000).toFixed(0)}M`}`
                  }
                  <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Price Range</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Min Price */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Minimum</label>
                      <div className="flex flex-col gap-1 max-h-48 overflow-y-auto border border-border rounded-lg p-1">
                        {minPriceOptions.map((option, index) => (
                          <button
                            key={`min-${option.value}-${index}`}
                            onClick={() => {
                              updateFilter('minPrice', option.value);
                              onFiltersChange?.({ ...localFilters, minPrice: option.value });
                            }}
                            className={`px-3 py-2 text-left rounded-md text-sm transition-colors ${
                              localFilters.minPrice === option.value
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Max Price */}
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Maximum</label>
                      <div className="flex flex-col gap-1 max-h-48 overflow-y-auto border border-border rounded-lg p-1">
                        {maxPriceOptions.map((option, index) => (
                          <button
                            key={`max-${option.value}-${index}`}
                            onClick={() => {
                              updateFilter('maxPrice', option.value);
                              onFiltersChange?.({ ...localFilters, maxPrice: option.value });
                            }}
                            className={`px-3 py-2 text-left rounded-md text-sm transition-colors ${
                              localFilters.maxPrice === option.value
                                ? 'bg-primary text-primary-foreground'
                                : 'hover:bg-muted'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setIsPriceOpen(false)} 
                    className="w-full"
                  >
                    Apply
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* All Filters Button - Modal */}
            <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
                  <SlidersHorizontal className="h-4 w-4" strokeWidth={2.5} />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center justify-between pr-6">
                  <DialogTitle>All Filters</DialogTitle>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </button>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 pt-4">
                {/* Size Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Size</h4>
                  <div className="flex flex-col gap-1">
                    {sizeRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {
                          updateFilter('sizeRange', { min: range.min, max: range.max });
                        }}
                        className={`px-3 py-2 text-left rounded-lg text-sm transition-colors ${
                          localFilters.sizeRange.min === range.min && localFilters.sizeRange.max === range.max
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Serviced Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Serviced</h4>
                  <div className="flex flex-wrap gap-2">
                    {(['any', 'serviced', 'unserviced'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => updateFilter('serviced', option)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
                          localFilters.serviced === option
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {option === 'any' ? 'Any' : option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Furnished Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Furnished</h4>
                  <div className="flex flex-wrap gap-2">
                    {(['any', 'furnished', 'unfurnished'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => updateFilter('furnished', option)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize ${
                          localFilters.furnished === option
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {option === 'any' ? 'Any' : option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {featuresList.map((feature) => (
                      <button
                        key={feature}
                        onClick={() => toggleFeature(feature)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          localFilters.features.includes(feature)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {feature}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <Button onClick={applyFilters} className="w-full" size="lg">
                  Apply Filters
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
};