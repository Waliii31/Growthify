import type React from 'react';
import { Sparkles } from 'lucide-react';

interface BadgeProps {
  status: 'Ready' | 'Draft' | 'Analyzing' | 'success' | 'warning' | 'info';
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  const styles: Record<string, string> = {
    Ready: 'bg-emerald-50 text-emerald-700 border border-emerald-200/50',
    Draft: 'bg-amber-50 text-amber-700 border border-amber-200/50',
    Analyzing: 'bg-purple-50 text-purple-700 border border-purple-200/50 animate-pulse',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/50',
    warning: 'bg-rose-50 text-rose-700 border border-rose-200/50',
    info: 'bg-blue-50 text-blue-700 border border-blue-200/50',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status === 'Analyzing' && <Sparkles className="w-3.5 h-3.5 mr-1 inline animate-spin" />}
      {children || status}
    </span>
  );
};
