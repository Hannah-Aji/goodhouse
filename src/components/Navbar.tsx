import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-20 items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex flex-col leading-none">
            <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">good</span>
            <span className="text-xl font-bold text-foreground -mt-0.5">houses</span>
          </div>
        </Link>

        {/* Center Search - Desktop */}
        <div className="hidden md:flex flex-1 justify-center max-w-xl">
          <button className="flex items-center gap-4 rounded-full border border-border px-5 py-2.5 shadow-sm hover:shadow-md transition-shadow bg-background">
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

        {/* Mobile Search Button */}
        <button className="md:hidden flex items-center gap-3 flex-1 mx-4 rounded-full border border-border px-4 py-2.5 shadow-sm">
          <Search className="h-5 w-5 text-muted-foreground" />
          <div className="text-left">
            <p className="text-sm font-medium">Search</p>
            <p className="text-xs text-muted-foreground">Anywhere · Any type</p>
          </div>
        </button>

        {/* Right Spacer for balance */}
        <div className="hidden md:block w-24 shrink-0" />
      </div>
    </header>
  );
};
