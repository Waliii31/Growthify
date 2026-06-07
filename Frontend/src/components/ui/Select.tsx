import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ label, value, onChange, options, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="flex flex-col gap-1.5 min-w-55 relative" ref={containerRef}>
      <label className="text-[10px] font-black text-outline uppercase tracking-widest">{label}</label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-surface-lowest border ${isOpen ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-outline'} text-on-surface text-sm font-semibold rounded-lg p-3 flex items-center justify-between transition-all outline-hidden cursor-pointer ${className}`}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-surface-lowest border border-outline-variant/50 shadow-xl rounded-xl overflow-hidden z-50 py-1 animate-fade-in">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected 
                    ? 'bg-primary text-white font-bold' 
                    : 'text-on-surface hover:bg-surface-low font-medium'
                }`}
              >
                {opt.label}
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
