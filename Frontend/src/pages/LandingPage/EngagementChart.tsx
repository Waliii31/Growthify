import { motion } from 'motion/react';

/**
 * Engagement forecast bar chart. Page-specific to LandingPage.
 */
export const EngagementChart: React.FC = () => {
  const data = [
    { label: '8 AM', value: 35, active: false },
    { label: '11 AM', value: 60, active: false },
    { label: '2 PM', value: 92, active: true },
    { label: '5 PM', value: 74, active: false },
    { label: '8 PM', value: 45, active: false },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-baseline mb-1 gap-2 flex-wrap">
        <span className="text-xs font-bold text-outline tracking-wider uppercase">Engagement Forecast</span>
        <span className="text-xs font-bold text-secondary">Optimal: 2:00 PM</span>
      </div>
      <div className="h-32 bg-surface-low rounded-xl border border-outline-variant/30 flex items-end justify-around px-3 sm:px-4 py-3 gap-1.5 sm:gap-2">
        {data.map((item) => (
          <div key={item.label} className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative">
            {/* Hover tooltip */}
            <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-0.5 px-2 rounded-sm whitespace-nowrap shadow-xs z-10">
              {item.value}% Probability
            </div>

            {/* Bar */}
            <div className="w-full text-center">
              <motion.div
                className={`w-full rounded-t-sm ${
                  item.active
                    ? 'ai-gradient-bg shadow-sm'
                    : 'bg-primary/20 group-hover:bg-primary/45 transition-colors'
                }`}
                initial={{ height: 0 }}
                animate={{ height: `${item.value}%` }}
                transition={{ duration: 0.8, delay: data.indexOf(item) * 0.1 }}
                style={{ maxHeight: '100px', minHeight: '8px' }}
              />
            </div>
            <span className="text-[10px] text-outline font-semibold mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
