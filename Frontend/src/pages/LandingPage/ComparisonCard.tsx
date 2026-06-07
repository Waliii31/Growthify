import {
  Sparkles,
  Check,
  TrendingUp,
  ThumbsUp,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';
import { Avatar } from '@/components/ui';
import { DEFAULT_AVATAR_URL } from '@/lib/constants';

/**
 * Before/After comparison card showing the value of AI optimization.
 * Only used on the Landing Page.
 */
export const ComparisonCard: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-4 md:p-6 shadow-xl border border-outline-variant/40 flex flex-col lg:flex-row gap-4 md:gap-6 max-w-5xl mx-auto bg-surface-lowest">
      {/* Before */}
      <div className="flex-1 p-4 sm:p-6 rounded-xl bg-surface-low border border-outline-variant/30 flex flex-col gap-4 opacity-75 grayscale-[15%] min-w-0">
        <div className="flex justify-between items-center mb-1 gap-2">
          <span className="text-xs font-bold text-outline uppercase tracking-wider whitespace-nowrap">Before LinkedIn Draft</span>
          <span className="inline-flex items-center text-xs font-semibold text-on-surface-variant/75 bg-slate-200/50 px-2 py-0.5 rounded gap-1 shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Low Reach
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse shrink-0" />
          <div className="space-y-1.5 min-w-0">
            <div className="h-3 w-28 bg-slate-200 rounded animate-pulse" />
            <div className="h-2 w-16 bg-slate-200/70 rounded animate-pulse" />
          </div>
        </div>
        <p className="text-sm text-on-surface-variant font-sans leading-relaxed">
          Just wanted to say we released our new dashboard today. It is really cool and took some sleepless nights. Thanks team, happy writing code. #release #software
        </p>
        <div className="mt-auto border-t border-slate-200/50 pt-3 flex gap-4 text-outline/65 text-xs">
          <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> 8 likes</span>
          <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> 1 comment</span>
        </div>
      </div>

      {/* Connection arrow — hidden on mobile, shown as horizontal divider */}
      <div className="hidden lg:flex flex-col items-center justify-center relative shrink-0">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-outline-variant/50 to-transparent" />
        <div className="w-12 h-12 rounded-full ai-gradient-bg flex items-center justify-center text-white shadow-lg absolute">
          <Sparkles className="w-5 h-5 animate-spin" />
        </div>
      </div>

      {/* Mobile divider */}
      <div className="flex lg:hidden items-center justify-center py-1">
        <div className="w-10 h-10 rounded-full ai-gradient-bg flex items-center justify-center text-white shadow-lg">
          <Sparkles className="w-4 h-4 animate-spin" />
        </div>
      </div>

      {/* After */}
      <div className="flex-1 p-4 sm:p-6 rounded-xl bg-surface-lowest border-2 border-secondary/20 shadow-xl relative overflow-hidden flex flex-col gap-4 min-w-0">
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-secondary/15 to-transparent rounded-full blur-xl" />

        <div className="flex justify-between items-center mb-1 gap-2">
          <span className="text-xs font-bold text-secondary flex items-center gap-1 tracking-wider uppercase whitespace-nowrap">
            <Check className="w-4 h-4 stroke-[3px]" /> AI Optimized
          </span>
          <span className="inline-flex items-center text-xs font-bold text-secondary bg-secondary-purple/10 px-2 py-0.5 rounded border border-secondary/20 gap-1 shrink-0">
            <TrendingUp className="w-3.5 h-3.5" /> 94%
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Avatar src={DEFAULT_AVATAR_URL} name="Sarah Jenkins" size="md" />
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-on-surface font-display leading-tight">Sarah Jenkins</h4>
            <p className="text-[11px] text-on-surface-variant leading-none">VP Growth • Top LinkedIn Voice</p>
          </div>
        </div>

        <div className="text-sm text-on-surface space-y-3 leading-relaxed">
          <p className="font-bold text-primary">The best dashboards don't show info. They drive action.</p>
          <p>This week our design team solved a massive UX bottleneck by implementing 3 simple psychological cues that drove user signups up by 32%:</p>
          <ul className="list-disc pl-4 space-y-1 text-on-surface-variant">
            <li>Replaced raw tables with predictive progress rings.</li>
            <li>Embedded quick inline filter chips to bypass clutter.</li>
            <li>Staggered animations so crucial content loaded first.</li>
          </ul>
          <p className="text-xs font-semibold text-secondary flex gap-2 flex-wrap">
            <span>#SaaSProduct</span> <span>#GrowthHacking</span> <span>#UXDesign</span>
          </p>
        </div>

        <div className="mt-auto border-t border-outline-variant/30 pt-3 flex justify-between items-center text-[11px] text-on-surface-variant gap-2 flex-wrap">
          <div className="flex gap-4">
            <span className="font-bold text-primary-linkedin flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> 342 likes</span>
            <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> 78 comments</span>
          </div>
          <span className="italic">11,200 impressions</span>
        </div>
      </div>
    </div>
  );
};
