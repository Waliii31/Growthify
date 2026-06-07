import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-lowest border-t border-outline-variant/30 py-8 select-none">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-bold text-on-surface text-base flex items-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5 text-secondary fill-secondary" /> Growthify
          </span>
          <span className="text-xs text-on-surface-variant font-medium">
            © 2026 Growthify. All rights reserved.
          </span>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-xs font-semibold text-outline">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          <a href="#" className="hover:text-primary transition-colors">API Keys</a>
        </div>
      </div>
    </footer>
  );
};
