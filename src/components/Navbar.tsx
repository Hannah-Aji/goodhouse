import { Link } from 'react-router-dom';
import { Search, Menu, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg viewBox="0 0 32 32" className="h-8 w-8 text-primary" fill="currentColor">
            <path d="M16 1C7.729 1 1 7.729 1 16s6.729 15 15 15 15-6.729 15-15S24.271 1 16 1zm0 28c-7.18 0-13-5.82-13-13S8.82 3 16 3s13 5.82 13 13-5.82 13-13 13z"/>
            <path d="M23 12h-6V6a1 1 0 00-2 0v6H9a1 1 0 000 2h6v6a1 1 0 002 0v-6h6a1 1 0 000-2z"/>
          </svg>
          <span className="text-xl font-bold text-primary">propnaija</span>
        </Link>

        {/* Center Search - Desktop */}
        <div className="hidden md:flex items-center">
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
        <div className="flex items-center gap-2">
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
