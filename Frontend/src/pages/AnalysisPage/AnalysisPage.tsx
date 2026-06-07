import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Lightbulb, CheckCircle, Loader2 } from 'lucide-react';
import { Button, Select } from '@/components/ui';
import { useAnalysis } from '@/hooks/useAnalysis';
import { PostPreview } from './PostPreview';

export const AnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { analyzeDraft, isLoading } = useAnalysis();

  const [draftText, setDraftText] = useState('');
  const [tone, setTone] = useState('Professional & Authoritative');
  const [audience, setAudience] = useState('Industry Peers (B2B)');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const trimmed = draftText.trim();
    setWordCount(trimmed === '' ? 0 : trimmed.split(/\s+/).length);
  }, [draftText]);

  const handleRunAnalysis = async () => {
    if (draftText.trim().length === 0) return;
    await analyzeDraft(draftText, tone, audience);
    navigate('/results');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      {/* Title */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-on-surface">
          Content Analysis Workspace
        </h1>
        <p className="font-sans text-sm md:text-base text-on-surface-variant mt-1.5">
          Draft, refine, and predict the performance of your next professional update.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* Editor column */}
        <div className="flex-1 w-full space-y-6 min-w-0">
          {/* Tone & audience selectors */}
          <div className="glass-panel p-4 sm:p-5 rounded-xl border border-outline-variant/50 shadow-xs flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 items-end justify-between">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 w-full sm:w-auto">
              <Select
                label="Tone of Voice"
                value={tone}
                onChange={(value) => setTone(value)}
                options={[
                  { value: 'Professional & Authoritative', label: 'Professional & Authoritative' },
                  { value: 'Casual & Approachable', label: 'Casual & Approachable' },
                  { value: 'Visionary & Bold', label: 'Visionary & Bold' },
                  { value: 'Educational & Helpful', label: 'Educational & Helpful' },
                ]}
              />
              <Select
                label="Target Audience"
                value={audience}
                onChange={(value) => setAudience(value)}
                options={[
                  { value: 'Industry Peers (B2B)', label: 'Industry Peers (B2B)' },
                  { value: 'Potential Clients', label: 'Potential Clients' },
                  { value: 'Recruiters & HR', label: 'Recruiters & HR' },
                  { value: 'General Tech Community', label: 'General Tech Community' },
                ]}
              />
            </div>
            <Button
              variant="ai"
              size="lg"
              disabled={isLoading || draftText.trim().length === 0}
              onClick={handleRunAnalysis}
              icon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              {isLoading ? 'Processing...' : 'Analyze with AI'}
            </Button>
          </div>

          {/* Text editor */}
          <div className="bg-surface-lowest rounded-xl border border-outline-variant focus-within:ring-2 focus-within:ring-primary/20 transition-all flex flex-col min-h-95 shadow-xs">
            <div className="flex items-center justify-between border-b border-outline-variant/30 px-4 py-2.5 bg-surface-low rounded-t-xl">
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
                Original Draft
              </span>
              <div className="text-xs font-semibold text-on-surface-variant bg-white px-2 py-1 rounded shadow-xs border border-outline-variant/30">
                {wordCount} words
              </div>
            </div>
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder="Paste your rough LinkedIn draft here to optimize alignment, click probability, readability, and scroll hooks..."
              className="grow w-full p-4 sm:p-6 text-on-surface text-base bg-transparent border-none focus:outline-hidden focus:ring-0 resize-none min-h-80 leading-relaxed placeholder-outline"
            />
          </div>
        </div>

        {/* Preview sidebar */}
        <div className="w-full lg:w-95 xl:w-100 space-y-6 shrink-0">
          <PostPreview draftText={draftText} />

          {/* Tips */}
          <div className="glass-panel rounded-xl border border-outline-variant p-4 sm:p-5 ai-glow transition-all duration-300">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-secondary-purple/20 flex items-center justify-center text-secondary shrink-0">
                <Lightbulb className="w-4.5 h-4.5 fill-current" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-on-surface">Optimize Engagement</h3>
                <p className="font-sans text-xs text-on-surface-variant mt-0.5">Keep these LinkedIn tips in mind:</p>
              </div>
            </div>
            <ul className="space-y-3 text-xs text-on-surface-variant leading-relaxed">
              {[
                'The first two lines determine if people skip or expand. Ensure it has a strong curiosity query hook.',
                'Integrate whitespace formatting buffers. Long paragraph blocks look heavy on smartphone displays.',
                'Add 3 or so specific hashtag tags at the footer for discovery routing in corresponding feeds.',
              ].map((tip) => (
                <li key={tip.substring(0, 20)} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
