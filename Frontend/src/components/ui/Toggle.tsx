import type React from 'react';
import { motion } from 'motion/react';

interface ToggleProps {
  isAnnual: boolean;
  onChange: (isAnnual: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ isAnnual, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
      <span
        className={`text-sm font-semibold transition-colors duration-200 ${
          !isAnnual ? 'text-on-surface' : 'text-on-surface-variant'
        }`}
      >
        Monthly
      </span>
      <button
        onClick={() => onChange(!isAnnual)}
        role="switch"
        aria-checked={isAnnual}
        aria-label="Toggle annual billing"
        className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer ${
          isAnnual ? 'bg-primary' : 'bg-outline-variant'
        }`}
      >
        <motion.div
          className="w-6 h-6 bg-white rounded-full shadow-sm"
          animate={{ x: isAnnual ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      <div className="flex items-center gap-1.5">
        <span
          className={`text-sm font-semibold transition-colors duration-200 ${
            isAnnual ? 'text-on-surface' : 'text-on-surface-variant'
          }`}
        >
          Annually
        </span>
        <span className="bg-secondary-purple/10 text-secondary text-[11px] font-bold px-2 py-0.5 rounded-full border border-secondary/20">
          Save 20%
        </span>
      </div>
    </div>
  );
};
