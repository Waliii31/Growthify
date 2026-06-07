import type React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon }) => {
  return (
    <div className="bg-surface-lowest border border-outline-variant/60 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-outline uppercase tracking-wider">{title}</span>
        <div className="p-2 bg-surface-low rounded-lg text-primary">{icon}</div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display font-bold text-2xl sm:text-3xl text-on-surface">{value}</span>
        <span
          className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
            trend === 'up'
              ? 'text-emerald-700 bg-emerald-50'
              : trend === 'down'
                ? 'text-rose-700 bg-rose-50'
                : 'text-slate-600 bg-slate-50'
          }`}
        >
          {trend === 'up' ? '+' : ''}
          {change}
        </span>
      </div>
      <p className="text-[10px] text-outline mt-1 font-semibold uppercase tracking-wider">vs. Last 30 Days</p>
    </div>
  );
};
