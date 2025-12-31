import { Home, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Terms', href: '/terms' },
  ];

  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="container px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>© {currentYear} Good House</span>
            {footerLinks.map((link) => (
              <span key={link.href} className="flex items-center gap-4">
                <span>·</span>
                <Link to={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm">
            <button className="flex items-center gap-2 font-medium hover:underline">
              <Globe className="h-4 w-4" />
              English (NG)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
