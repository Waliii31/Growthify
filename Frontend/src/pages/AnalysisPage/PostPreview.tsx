import { Smartphone, Tv } from 'lucide-react';
import { useState } from 'react';
import { Card } from '@/components/ui';
import { POST_PREVIEW_CHAR_LIMIT } from '@/lib/constants';

interface PostPreviewProps {
  draftText: string;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ draftText }) => {
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <Card className="p-0 overflow-hidden shadow-md">
      <div className="bg-surface-low border-b border-outline-variant/40 p-3 flex justify-between items-center">
        <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-primary" /> Live preview
        </span>

        <div className="flex bg-surface-high rounded-lg p-0.5">
          <button
            onClick={() => setPreviewMode('mobile')}
            aria-label="Mobile preview"
            className={`px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
              previewMode === 'mobile'
                ? 'bg-surface-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
          <button
            onClick={() => setPreviewMode('desktop')}
            aria-label="Desktop preview"
            className={`px-3 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all ${
              previewMode === 'desktop'
                ? 'bg-surface-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Tv className="w-3.5 h-3.5" /> Desktop
          </button>
        </div>
      </div>

      <div className={`p-4 bg-slate-100 flex justify-center transition-all ${
        previewMode === 'mobile' ? 'min-h-85' : 'min-h-75'
      }`}>
        <div className={`bg-white rounded-lg p-4 shadow-xs border border-slate-200 text-left h-fit ${
          previewMode === 'mobile' ? 'max-w-81.25 w-full' : 'max-w-full w-full'
        }`}>
          {/* Profile header */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-primary-linkedin font-display font-black flex items-center justify-center text-xs shrink-0">
              You
            </div>
            <div className="min-w-0">
              <h5 className="font-bold text-xs text-on-surface font-sans">Alex Mercer</h5>
              <p className="text-[10px] text-outline leading-tight truncate">Senior Product Manager | AI Specialist</p>
              <div className="flex items-center gap-1 text-[9px] text-outline mt-0.5 font-medium">
                <span>Just now</span>
                <span>•</span>
                <Smartphone className="w-2.5 h-2.5 inline" />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed min-h-35 wrap-break-word">
            {draftText.substring(0, POST_PREVIEW_CHAR_LIMIT) || (
              <span className="italic text-outline">
                Your high-impact LinkedIn preview will update here in real-time as you write...
              </span>
            )}
            {draftText.length > POST_PREVIEW_CHAR_LIMIT && (
              <span className="text-primary-linkedin font-bold cursor-pointer"> ...see more</span>
            )}
          </div>

          {/* Mock reactions */}
          <div className="border-t border-slate-100 mt-4 pt-3 flex justify-between items-center text-outline text-[10px]">
            <div className="flex gap-3">
              <span className="flex items-center gap-1"><Smartphone className="w-3 h-3 text-primary-linkedin" /> Like</span>
              <span className="flex items-center gap-1"><Smartphone className="w-3 h-3" /> Comment</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
