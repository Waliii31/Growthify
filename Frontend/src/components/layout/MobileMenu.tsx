import { Link, useNavigate } from 'react-router-dom';

interface UsageState {
  limit: number;
  used: number;
  remaining: number;
  resetsAt: string | null;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  usage: UsageState;
}

const menuLinks = [
  { label: 'Landing Overview', path: '/' },
  { label: 'Dashboard Feed', path: '/dashboard' },
  { label: 'Content Creator', path: '/analysis' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, usage }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-outline-variant/40 bg-white/95 backdrop-blur-xl py-4 px-4 sm:px-6 space-y-3 shadow-lg absolute w-full left-0 z-40">
      {menuLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={onClose}
          className="block w-full text-left py-2 font-semibold text-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}

      <div className="border-t border-outline-variant/30 pt-3 flex flex-col gap-2 text-sm">
        <span className="font-semibold text-on-surface">Monthly Free Usage</span>
        <span className="text-xs text-on-surface-variant">{usage.remaining}/{usage.limit} posts remaining</span>
      </div>
    </div>
  );
};
