import { useState, useRef, useCallback, useEffect } from 'react';
import { TOAST_DURATION_MS } from '@/lib/constants';

/**
 * Custom hook to manage toast notifications with proper timer cleanup.
 * Prevents memory leaks by clearing timers on unmount or rapid re-trigger.
 */
export function useToast(duration = TOAST_DURATION_MS) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback((msg: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessage(msg);
    setIsOpen(true);
    timerRef.current = setTimeout(() => setIsOpen(false), duration);
  }, [duration]);

  const close = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { isOpen, message, show, close };
}
