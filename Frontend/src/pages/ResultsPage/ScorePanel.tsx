import { ProgressRing } from '@/components/ui';
import { Hash, Flame, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import type { PostAnalysis } from '@/types';
import { useState } from 'react';

interface ScorePanelProps {
  analysis: PostAnalysis;
}

export const ScorePanel: React.FC<ScorePanelProps> = ({ analysis }) => {
  const [hashtagsList, setHashtagsList] = useState<string[]>(analysis.tags);

  const handleAddTag = (tag: string) => {
    if (!hashtagsList.includes(tag)) {
      setHashtagsList([...hashtagsList, tag]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Score ring */}
      <div className="bg-surface-lowest border border-outline-variant rounded-xl p-5 sm:p-6 shadow-sm flex flex-col items-center justify-center text-center">
        <h3 className="font-display font-bold text-base text-on-surface text-left w-full mb-4">
          AI Content Score
        </h3>
        <ProgressRing score={analysis.score} size={130} />
        <p className="text-xs text-on-surface-variant font-medium mt-4">
          {analysis.score >= 85
            ? 'Exceptional reach potential. Optimized for newsfeeds.'
            : 'Solid draft. Applying AI feedback will improve score.'}
        </p>
      </div>

      {/* Metric bars */}
      <div className="bg-surface-lowest border border-outline-variant rounded-xl p-5 shadow-xs space-y-4">
        <MetricBar label="Hook Strength" value={analysis.hookStrength} color="bg-secondary-purple" width={analysis.hookStrength === 'Excellent' ? 'w-[95%]' : 'w-[75%]'} valueColor="text-secondary" />
        <div>
          <MetricBar label="Readability Level" value={analysis.readability} color="bg-primary" width="w-[85%]" valueColor="text-primary" />
          <p className="text-[10px] text-outline mt-1 font-semibold leading-relaxed">
            Optimal grade limits reading friction for executives on mobile apps.
          </p>
        </div>
        <MetricBar label="Engagement Prob." value={analysis.engagementProbability} color="bg-emerald-600" width="w-[90%]" valueColor="text-emerald-700" />
      </div>

      {/* Hashtags */}
      <div className="bg-surface-lowest border border-outline-variant rounded-xl p-5 shadow-xs">
        <h3 className="font-display font-bold text-xs uppercase text-outline tracking-wider flex items-center gap-2 mb-3">
          <Hash className="w-4 h-4 text-primary" /> Hashtags Selection
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {hashtagsList.map((tag) => (
            <span key={tag} className="bg-primary/5 text-primary font-semibold text-xs border border-primary/10 px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
          <button
            onClick={() => handleAddTag('#PersonalBrand')}
            className="text-xs bg-surface-lowest text-outline hover:text-secondary hover:bg-slate-50 border border-dashed border-outline-variant rounded-full px-2.5 py-1 flex items-center gap-1 transition-all cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-orange-500" /> + Add #PersonalBrand
          </button>
        </div>
      </div>

      {/* AI Feedback */}
      <div className="bg-surface-lowest border border-outline-variant rounded-xl p-5 shadow-xs">
        <h3 className="font-display font-bold text-xs uppercase text-outline tracking-wider mb-3">
          AI Critique Feedback
        </h3>
        <ul className="space-y-3.5 text-xs text-on-surface-variant">
          {analysis.aiFeedback.map((fb) => (
            <li key={fb.text} className="flex items-start gap-2 leading-relaxed">
              {fb.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
              {fb.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
              {fb.type === 'info' && <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
              <span>{fb.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ---------- Internal helper ---------- */
function MetricBar({ label, value, color, width, valueColor }: {
  label: string;
  value: string;
  color: string;
  width: string;
  valueColor: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5 text-xs font-semibold">
        <span className="text-on-surface">{label}</span>
        <span className={`${valueColor} font-bold`}>{value}</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full ${width}`} />
      </div>
    </div>
  );
}
