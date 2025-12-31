import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
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
import { getStates, getCities, getLocalities } from '@/data/nigerianLocations';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export interface SearchFilters {
  state: string;
  city: string;
  locality: string;
  listingType: 'all' | 'rent' | 'sale' | 'shortlet';
}

interface NavbarProps {
  onSearch?: (filters: SearchFilters) => void;
  searchFilters?: SearchFilters;
}

export const Navbar = ({ onSearch, searchFilters }: NavbarProps) => {
  const [state, setState] = useState(searchFilters?.state || '');
  const [city, setCity] = useState(searchFilters?.city || '');
  const [locality, setLocality] = useState(searchFilters?.locality || '');
  const [listingType, setListingType] = useState<'all' | 'rent' | 'sale' | 'shortlet'>(searchFilters?.listingType || 'all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const { toast } = useToast();

  // Get available options based on selections
  const states = getStates();
  const cities = getCities(state);
  const localities = getLocalities(state, city);

  // Reset dependent fields when parent changes
  useEffect(() => {
    setCity('');
    setLocality('');
  }, [state]);

  useEffect(() => {
    setLocality('');
  }, [city]);

  // Get display text for mobile search button
  const getLocationDisplayText = () => {
    if (locality && locality !== 'all') return locality;
    if (city && city !== 'all') return city;
    if (state && state !== 'all') return state;
    return 'State · City · Locality';
  };

  const validateAndSearch = async () => {
    setIsAnimatingOut(true);
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    onSearch?.({ state: state || 'all', city: city || 'all', locality: locality || 'all', listingType });
    setIsSearchOpen(false);
    setIsAnimatingOut(false);
    return true;
  };

  const handleDesktopSearch = () => {
    onSearch?.({ state: state || 'all', city: city || 'all', locality: locality || 'all', listingType });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col leading-none">
            <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">good</span>
            <span className="text-xl font-bold text-foreground -mt-0.5">house</span>
          </div>
        </Link>

        {/* Center Search - Desktop */}
        <div className="hidden lg:flex flex-1 justify-center max-w-4xl">
          <div className="flex items-center gap-1 rounded-full border border-border px-2 py-1.5 shadow-sm bg-background">
            {/* State */}
            <div className="px-3">
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="border-0 shadow-none h-auto p-0 min-w-[80px] focus:ring-0">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <span className="h-6 w-px bg-border" />
            
            {/* City */}
            <div className="px-3">
              <Select value={city} onValueChange={setCity} disabled={!state}>
                <SelectTrigger className="border-0 shadow-none h-auto p-0 min-w-[80px] focus:ring-0">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <span className="h-6 w-px bg-border" />
            
            {/* Locality */}
            <div className="px-3">
              <Select value={locality} onValueChange={setLocality} disabled={!city || city === 'all'}>
                <SelectTrigger className="border-0 shadow-none h-auto p-0 min-w-[90px] focus:ring-0">
                  <SelectValue placeholder="Locality" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Areas</SelectItem>
                  {localities.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <span className="h-6 w-px bg-border" />
            
            {/* I'm looking to */}
            <div className="px-3">
              <Select value={listingType} onValueChange={(v) => setListingType(v as 'all' | 'rent' | 'sale' | 'shortlet')}>
                <SelectTrigger className="border-0 shadow-none h-auto p-0 min-w-[100px] focus:ring-0">
                  <SelectValue placeholder="I'm looking to" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sale">Buy</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="shortlet">Shortlet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Button */}
            <Button 
              size="icon" 
              className="rounded-full h-9 w-9 shrink-0"
              onClick={handleDesktopSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Button */}
        <button 
          className="lg:hidden flex items-center gap-3 flex-1 mx-2 rounded-full border border-border px-4 py-2.5 shadow-sm"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5 text-muted-foreground" />
          <div className="text-left">
            <p className="text-sm font-medium">Find your next home</p>
            <p className="text-xs text-muted-foreground">{getLocationDisplayText()}</p>
          </div>
        </button>

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
                Find a Home
              </Link>
              <Link to="/about" className="text-lg font-medium hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/list-property" className="text-lg font-medium hover:text-primary transition-colors">
                List a Property
              </Link>
              <div className="border-t border-border mt-4 pt-4">
                <Link to="/admin" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors">
                  Admin Login
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Search Dropdown with Animation */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsSearchOpen(false)}
            />
            
            {/* Search Panel */}
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={isAnimatingOut 
                ? { y: [0, 15, -100], opacity: [1, 1, 0] } 
                : { y: 0, opacity: 1 }
              }
              exit={{ y: '-100%', opacity: 0 }}
              transition={isAnimatingOut 
                ? { 
                    duration: 0.4,
                    times: [0, 0.3, 1],
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                : { 
                    type: 'spring', 
                    damping: 20, 
                    stiffness: 300,
                  }
              }
              className="fixed top-0 left-0 right-0 bg-background z-50 shadow-xl rounded-b-2xl lg:hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Find your next home</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Search Fields */}
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">State</label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-[60]">
                        {states.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">City</label>
                    <Select value={city} onValueChange={setCity} disabled={!state}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={state ? "Select City" : "Select state first"} />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-[60]">
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Locality</label>
                    <Select value={locality} onValueChange={setLocality} disabled={!city || city === 'all'}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={city && city !== 'all' ? "Select Locality" : "Select city first"} />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-[60]">
                        <SelectItem value="all">All Areas</SelectItem>
                        {localities.map((l) => (
                          <SelectItem key={l} value={l}>{l}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">I'm looking to</label>
                    <Select value={listingType} onValueChange={(v) => setListingType(v as 'all' | 'rent' | 'sale' | 'shortlet')}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Buy, Rent, or Shortlet" />
                      </SelectTrigger>
                      <SelectContent className="bg-background z-[60]">
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="sale">Buy</SelectItem>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="shortlet">Shortlet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={validateAndSearch} 
                    className="w-full mt-2"
                    size="lg"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Properties
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};