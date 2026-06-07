import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useAuth } from '@/hooks/useAuth';
import { MobileMenu } from './MobileMenu';
import { DEFAULT_AVATAR_URL } from '@/lib/constants';

interface HeaderProps {
  fluid?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ fluid = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { usage } = useAnalysis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activePath = location.pathname;

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'Contact', path: '/#contact' },
  ];

  if (user) {
    navLinks.splice(1, 0, { label: 'Dashboard', path: '/dashboard' });
  }

  return (
    <header className="bg-white border-b border-outline-variant/50 sticky top-0 z-50 shadow-sm">
      <div className={`flex justify-between items-center w-full px-4 sm:px-6 lg:px-8 h-16 mx-auto ${fluid ? 'max-w-none' : 'max-w-7xl'}`}>
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform duration-100 select-none hover:scale-102 shrink-0"
        >
          <Sparkles className="w-5.5 h-5.5 text-secondary fill-secondary" />
          <span className="font-display font-black text-xl text-primary leading-none">Growthify</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                activePath === link.path ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4 shrink-0">
          {user ? (
            // Authenticated Mode
            <>
              <Button variant="secondary" size="sm" disabled>
                <span className="hidden lg:inline">Monthly Credits: </span>
                <span className="text-secondary ml-1 font-bold">{usage.remaining}/{usage.limit}</span>
              </Button>
              <Button variant="ai" size="sm" onClick={() => navigate('/analysis')}>
                Analyze Post
              </Button>
              <Link to="/profile">
                {/* Fallback avatar generator using name initials */}
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm ml-1 shadow-xs border border-primary/20 hover:scale-105 transition-transform">
                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
              </Link>
            </>
          ) : (
            // Public Mode
            <>
              <Link to="/login" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors px-2">
                Log In
              </Link>
              <Button variant="ai" size="sm" onClick={() => navigate('/signup')}>
                Sign Up Free
              </Button>
            </>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2.5 md:hidden">
          <Button variant="ai" size="sm" onClick={() => navigate('/analysis')} className="px-3 py-1.5 text-xs">
            Work
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-low rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        usage={usage}
      />
    </header>
  );
};
