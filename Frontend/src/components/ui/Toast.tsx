import type React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          role="alert"
          className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 z-50 text-sm font-semibold border border-slate-700"
        >
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="flex-1">{message}</span>
          <button onClick={onClose} aria-label="Dismiss notification" className="p-1 hover:bg-white/15 rounded-full cursor-pointer ml-1 shrink-0">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
