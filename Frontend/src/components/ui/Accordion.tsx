import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AccordionProps {
  items: Array<{ question: string; answer: string }>;
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 w-full">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.question}
            className={`border rounded-xl bg-surface-lowest overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-primary shadow-xs' : 'border-outline-variant/60 hover:border-outline'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full flex justify-between items-center p-5 text-left font-display font-semibold text-on-surface hover:text-primary transition-colors cursor-pointer"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-outline-variant transition-transform duration-300 shrink-0 ml-3 ${
                  isOpen ? 'transform rotate-180 text-primary' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5 pt-1 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/30 bg-bg-base/30">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
