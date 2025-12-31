import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <section className="border-b border-border">
      {/* Category Tabs */}
      <div className="container py-4">
        <div className="flex items-center justify-center gap-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange?.(category.id)}
              className={`flex flex-col items-center gap-2 min-w-[56px] py-2 border-b-2 transition-colors ${
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
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-xl gap-2">
              <span>Price</span>
            </Button>
            <Button variant="outline" className="rounded-xl gap-2">
              <span>Type</span>
            </Button>
            <Button variant="outline" className="rounded-xl gap-2 hidden sm:flex">
              <span>Beds & Baths</span>
            </Button>
          </div>
          <Button variant="outline" className="rounded-xl">
            Filters
          </Button>
        </div>
      </div>
    </section>
  );
};
