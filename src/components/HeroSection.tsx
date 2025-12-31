import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', label: 'All', icon: '🏠' },
  { id: 'house', label: 'Houses', icon: '🏡' },
  { id: 'apartment', label: 'Apartments', icon: '🏢' },
  { id: 'shortlet', label: 'Shortlets', icon: '🏨' },
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
}

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
};

export const HeroSection = ({ 
  onCategoryChange, 
  activeCategory = 'all',
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

            {/* Size Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
                  Size
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2 bg-background z-50">
                <div className="flex flex-col gap-1">
                  {sizeRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => {
                        updateFilter('sizeRange', { min: range.min, max: range.max });
                        onFiltersChange?.({ ...localFilters, sizeRange: { min: range.min, max: range.max } });
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
              </PopoverContent>
            </Popover>
          </div>

          {/* All Filters Button */}
          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium shrink-0">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-background z-50" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">All Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Clear all
                  </button>
                </div>

                {/* Serviced Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Serviced</h4>
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
                  <h4 className="text-sm font-medium mb-2">Furnished</h4>
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
                  <h4 className="text-sm font-medium mb-2">Features</h4>
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
                <Button onClick={applyFilters} className="w-full">
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
};