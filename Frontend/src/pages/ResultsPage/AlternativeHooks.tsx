import { Lightbulb } from 'lucide-react';
import type { PostAnalysis } from '@/types';

interface AlternativeHooksProps {
  hooks: PostAnalysis['alternativeHooks'];
  onApplyHook: (hookText: string) => void;
}

export const AlternativeHooks: React.FC<AlternativeHooksProps> = ({ hooks, onApplyHook }) => {
  return (
    <div className="bg-surface-lowest border border-outline-variant rounded-xl p-5 shadow-xs">
      <h3 className="font-display font-bold text-base text-on-surface mb-3 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" /> Alternative Hooks
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hooks.map((h) => (
          <button
            key={h.type}
            onClick={() => onApplyHook(h.text)}
            className="bg-bg-base/40 hover:bg-slate-100 border border-outline-variant/60 hover:border-secondary-purple/40 rounded-lg p-3.5 flex flex-col gap-1 cursor-pointer transition-all group text-left"
            title="Click to apply hook"
          >
            <span className="text-[10px] uppercase font-bold text-outline-variant group-hover:text-secondary transition-colors">
              {h.type}
            </span>
            <p className="text-xs text-on-surface italic mt-1 line-clamp-3">{h.text}</p>
          </button>
        ))}
      </div>

      <p className="text-[10px] text-outline mt-3 font-semibold uppercase tracking-wider">
        💡 Pro tip: Click any hook above to insert it as the first line of your draft!
      </p>
    </div>
  );
};
