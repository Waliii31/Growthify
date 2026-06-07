import { Bold, Italic, List, ListOrdered } from 'lucide-react';

interface FormattingToolbarProps {
  wordCount: number;
  onFormat: (type: 'bold' | 'italic' | 'bullet' | 'number') => void;
}

export const FormattingToolbar: React.FC<FormattingToolbarProps> = ({ wordCount, onFormat }) => {
  const buttons = [
    { type: 'bold' as const, icon: Bold, title: 'Insert bold text', group: 1 },
    { type: 'italic' as const, icon: Italic, title: 'Insert italic text', group: 1 },
    { type: 'bullet' as const, icon: List, title: 'Insert bullet list', group: 2 },
    { type: 'number' as const, icon: ListOrdered, title: 'Insert numbered list', group: 2 },
  ];

  return (
    <div className="border-b border-outline-variant/30 p-2.5 flex items-center justify-between bg-surface-low/30 rounded-t-xl select-none">
      <div className="flex items-center gap-1">
        {buttons.map((btn, idx) => {
          const Icon = btn.icon;
          const showDivider = idx === 1; // divider after italic
          return (
            <div key={btn.type} className="flex items-center">
              <button
                onClick={() => onFormat(btn.type)}
                className="p-2 hover:bg-surface-high rounded-lg text-on-surface-variant transition-colors hover:text-on-surface cursor-pointer"
                title={btn.title}
                aria-label={btn.title}
              >
                <Icon className="w-4 h-4" />
              </button>
              {showDivider && <div className="w-px h-6 bg-outline-variant/40 mx-2" />}
            </div>
          );
        })}
      </div>

      <span className="text-xs font-semibold text-outline bg-surface-low px-3 py-1.5 rounded-full">
        {wordCount} words
      </span>
    </div>
  );
};
