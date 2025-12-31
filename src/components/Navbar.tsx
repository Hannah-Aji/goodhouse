import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { nigerianStates, formatPrice } from '@/data/properties';

const priceOptions = [
  { value: '', label: 'Any' },
  { value: '500000', label: '₦500K' },
  { value: '1000000', label: '₦1M' },
  { value: '2000000', label: '₦2M' },
  { value: '5000000', label: '₦5M' },
  { value: '10000000', label: '₦10M' },
  { value: '20000000', label: '₦20M' },
  { value: '50000000', label: '₦50M' },
  { value: '100000000', label: '₦100M' },
  { value: '200000000', label: '₦200M' },
  { value: '500000000', label: '₦500M' },
  { value: '1000000000', label: '₦1B' },
];

interface SearchFilters {
  location: string;
  listingType: 'all' | 'rent' | 'sale';
  minPrice: string;
  maxPrice: string;
}

interface NavbarProps {
  onSearch?: (filters: SearchFilters) => void;
  searchFilters?: SearchFilters;
}

export const Navbar = ({ onSearch, searchFilters }: NavbarProps) => {
  const [location, setLocation] = useState(searchFilters?.location || '');
  const [listingType, setListingType] = useState<'all' | 'rent' | 'sale'>(searchFilters?.listingType || 'all');
  const [minPrice, setMinPrice] = useState(searchFilters?.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(searchFilters?.maxPrice || '');

  const handleSearch = () => {
    const minVal = minPrice === 'any' ? '' : minPrice;
    const maxVal = maxPrice === 'any' ? '' : maxPrice;
    onSearch?.({ location, listingType, minPrice: minVal, maxPrice: maxVal });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col leading-none">
            <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">good</span>
            <span className="text-xl font-bold text-foreground -mt-0.5">houses</span>
          </div>
        </Link>

        {/* Center Search - Desktop */}
        <div className="hidden lg:flex flex-1 justify-center max-w-3xl">
          <div className="flex items-center gap-1 rounded-full border border-border px-2 py-1.5 shadow-sm bg-background">
            {/* Location */}
            <div className="px-3">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="border-0 shadow-none h-auto p-0 min-w-[100px] focus:ring-0">
                  <SelectValue placeholder="Where" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Locations</SelectItem>
                  {nigerianStates.map((state) => (
                    <SelectItem key={state} value={state.toLowerCase()}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <span className="h-6 w-px bg-border" />
            
            {/* Rent/Sale */}
            <div className="px-3">
              <Select value={listingType} onValueChange={(v) => setListingType(v as 'all' | 'rent' | 'sale')}>
                <SelectTrigger className="border-0 shadow-none h-auto p-0 min-w-[80px] focus:ring-0">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <span className="h-6 w-px bg-border" />
            
            {/* Min Price */}
            <div className="px-3">
              <Select value={minPrice} onValueChange={setMinPrice}>
                <SelectTrigger className="border-0 shadow-none h-auto p-0 min-w-[70px] focus:ring-0">
                  <SelectValue placeholder="Min ₦" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {priceOptions.map((option) => (
                    <SelectItem key={`min-${option.value}`} value={option.value || 'any'}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <span className="h-6 w-px bg-border" />
            
            {/* Max Price */}
            <div className="px-3">
              <Select value={maxPrice} onValueChange={setMaxPrice}>
                <SelectTrigger className="border-0 shadow-none h-auto p-0 min-w-[70px] focus:ring-0">
                  <SelectValue placeholder="Max ₦" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {priceOptions.map((option) => (
                    <SelectItem key={`max-${option.value}`} value={option.value || 'any'}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Button */}
            <Button 
              size="icon" 
              className="rounded-full h-9 w-9 shrink-0"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Button */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden flex items-center gap-3 flex-1 mx-2 rounded-full border border-border px-4 py-2.5 shadow-sm">
              <Search className="h-5 w-5 text-muted-foreground" />
              <div className="text-left">
                <p className="text-sm font-medium">Search</p>
                <p className="text-xs text-muted-foreground">Location · Type · Price</p>
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="h-auto">
            <SheetHeader>
              <SheetTitle>Search Properties</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-4">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Locations</SelectItem>
                  {nigerianStates.map((state) => (
                    <SelectItem key={state} value={state.toLowerCase()}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={listingType} onValueChange={(v) => setListingType(v as 'all' | 'rent' | 'sale')}>
                <SelectTrigger>
                  <SelectValue placeholder="Rent or Sale" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Select value={minPrice} onValueChange={setMinPrice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Min Price" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {priceOptions.map((option) => (
                      <SelectItem key={`mob-min-${option.value}`} value={option.value || 'any'}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={maxPrice} onValueChange={setMaxPrice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Max Price" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {priceOptions.map((option) => (
                      <SelectItem key={`mob-max-${option.value}`} value={option.value || 'any'}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSearch} className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Menu Icon */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
                Properties
              </Link>
              <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/" className="text-lg font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
