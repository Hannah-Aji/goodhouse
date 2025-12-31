import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

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
    <section className="border-b border-border bg-background">
      {/* Category Tabs */}
      <div className="container py-5">
        <div className="flex items-center justify-center gap-10 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange?.(category.id)}
              className={`flex flex-col items-center gap-2 min-w-[64px] pb-3 border-b-2 transition-all ${
                activeCategory === category.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-xs font-medium whitespace-nowrap">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="container py-4 border-t border-border">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {/* Bedrooms Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
                  Beds: {localFilters.bedrooms}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 bg-background z-50">
                <div className="flex flex-col gap-1">
                  {bedroomOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFilter('bedrooms', option);
                        onFiltersChange?.({ ...localFilters, bedrooms: option });
                      }}
                      className={`px-3 py-2 text-left rounded-lg text-sm transition-colors ${
                        localFilters.bedrooms === option
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {option === 'Any' ? 'Any' : `${option} Bedroom${option === '1' ? '' : 's'}`}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Bathrooms Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
                  Baths: {localFilters.bathrooms}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 bg-background z-50">
                <div className="flex flex-col gap-1">
                  {bathroomOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        updateFilter('bathrooms', option);
                        onFiltersChange?.({ ...localFilters, bathrooms: option });
                      }}
                      className={`px-3 py-2 text-left rounded-lg text-sm transition-colors ${
                        localFilters.bathrooms === option
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {option === 'Any' ? 'Any' : `${option} Bathroom${option === '1' ? '' : 's'}`}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Min Price Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
                  Min: {localFilters.minPrice === 0 ? 'Any' : `₦${(localFilters.minPrice / 1000000).toFixed(0)}M`}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 bg-background z-50">
                <div className="flex flex-col gap-1">
                  {minPriceOptions.map((option, index) => (
                    <button
                      key={`min-${option.value}-${index}`}
                      onClick={() => {
                        updateFilter('minPrice', option.value);
                        onFiltersChange?.({ ...localFilters, minPrice: option.value });
                      }}
                      className={`px-3 py-2 text-left rounded-lg text-sm transition-colors ${
                        localFilters.minPrice === option.value
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Max Price Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
                  Max: {localFilters.maxPrice === Infinity ? 'Any' : `₦${(localFilters.maxPrice / 1000000).toFixed(0)}M`}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 bg-background z-50">
                <div className="flex flex-col gap-1">
                  {maxPriceOptions.map((option, index) => (
                    <button
                      key={`max-${option.value}-${index}`}
                      onClick={() => {
                        updateFilter('maxPrice', option.value);
                        onFiltersChange?.({ ...localFilters, maxPrice: option.value });
                      }}
                      className={`px-3 py-2 text-left rounded-lg text-sm transition-colors ${
                        localFilters.maxPrice === option.value
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* All Filters Button - Using Modal */}
          <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center justify-between">
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
    </section>
  );
};