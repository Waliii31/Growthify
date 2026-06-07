import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Layers, BookOpen, Award, Plus, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui';

import { useAuth } from '@/hooks/useAuth';

const mainNav = [
  { label: 'Home', path: '/dashboard', icon: Home },
  { label: 'Workspace', path: '/analysis', icon: Layers },
  { label: 'Library Archive', path: '/dashboard', icon: BookOpen },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const activePath = location.pathname;

  return (
    <aside className="w-64 bg-white border-r border-outline-variant/50 p-5 xl:p-6 hidden lg:flex flex-col gap-6 shrink-0 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto z-40 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.05)]">
      <nav className="flex flex-col gap-1 w-full" aria-label="Sidebar navigation">
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all font-semibold text-sm cursor-pointer ${
                isActive
                  ? 'bg-secondary/10 text-secondary'
                  : 'text-on-surface-variant hover:text-primary hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <Button
          variant="ai"
          onClick={() => navigate('/analysis')}
          className="w-full flex items-center justify-center gap-1.5 focus:scale-95"
        >
          <Plus className="w-4 h-4" /> New Analysis
        </Button>

        <div className="border-t border-outline-variant/30 pt-3 flex flex-col gap-1 text-xs">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 px-3 py-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" /> Profile & Settings
          </button>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="flex items-center gap-2 px-3 py-2 text-rose-600 hover:text-rose-700 transition-colors hover:bg-rose-50/30 rounded-lg cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};
