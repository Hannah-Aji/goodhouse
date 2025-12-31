import { Link } from 'react-router-dom';
import { Search, Menu, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-20 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col leading-none">
            <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">good</span>
            <span className="text-xl font-bold text-foreground -mt-0.5">houses</span>
          </div>
        </Link>

        {/* Center Search - Desktop (truly centered) */}
        <div className="hidden md:flex flex-1 justify-center">
          <button className="flex items-center gap-4 rounded-full border border-border px-4 py-2 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-sm font-medium">Anywhere</span>
            <span className="h-6 w-px bg-border" />
            <span className="text-sm font-medium">Any type</span>
            <span className="h-6 w-px bg-border" />
            <span className="text-sm text-muted-foreground">Search</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Search className="h-4 w-4 text-primary-foreground" />
            </div>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          <Button variant="ghost" className="hidden md:flex text-sm font-medium rounded-full">
            List your property
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex rounded-full">
            <Globe className="h-5 w-5" />
          </Button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 rounded-full border border-border p-2 pl-3 hover:shadow-md transition-shadow"
          >
            <Menu className="h-4 w-4" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-[72px] w-60 rounded-xl bg-background border border-border shadow-elevated p-2"
          >
            <div className="space-y-1">
              <Link to="/" className="block px-4 py-3 text-sm font-medium hover:bg-secondary rounded-lg">
                Home
              </Link>
              <Link to="/properties?type=sale" className="block px-4 py-3 text-sm hover:bg-secondary rounded-lg">
                Buy property
              </Link>
              <Link to="/properties?type=rent" className="block px-4 py-3 text-sm hover:bg-secondary rounded-lg">
                Rent property
              </Link>
              <div className="my-2 h-px bg-border" />
              <button className="w-full text-left px-4 py-3 text-sm hover:bg-secondary rounded-lg">
                Sign up
              </button>
              <button className="w-full text-left px-4 py-3 text-sm hover:bg-secondary rounded-lg">
                Log in
              </button>
              <div className="my-2 h-px bg-border" />
              <button className="w-full text-left px-4 py-3 text-sm hover:bg-secondary rounded-lg">
                List your property
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
