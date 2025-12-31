import { Button } from '@/components/ui/button';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: '🏠' },
  { id: 'house', label: 'Houses', icon: '🏡' },
  { id: 'apartment', label: 'Apartments', icon: '🏢' },
];

interface HeroSectionProps {
  onCategoryChange?: (category: string) => void;
  activeCategory?: string;
}

export const HeroSection = ({ onCategoryChange, activeCategory = 'all' }: HeroSectionProps) => {
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
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
              Price
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
              For Sale
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
              Beds
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium whitespace-nowrap">
              Baths
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors text-sm font-medium shrink-0">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>
    </section>
  );
};
