import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Bookmark, Copy, Check, ChevronLeft, Bold, Italic, List, ListOrdered, Rocket } from 'lucide-react';
import { Button, Badge, Toast } from '@/components/ui';
import { useAnalysis } from '@/hooks/useAnalysis';
import { useToast } from '@/hooks/useToast';
import { ScorePanel } from './ScorePanel';
import { AlternativeHooks } from './AlternativeHooks';

type FormatType = 'bold' | 'italic' | 'bullet' | 'number' | 'rocket';

const toUnicodeStyle = (text: string, style: 'bold' | 'italic') => {
  const upperStart = style === 'bold' ? 0x1d5d4 : 0x1d608;
  const lowerStart = style === 'bold' ? 0x1d5ee : 0x1d622;
  const digitStart = 0x1d7ec;

  return Array.from(text)
    .map((char) => {
      const code = char.codePointAt(0);
      if (!code) return char;
      if (code >= 65 && code <= 90) return String.fromCodePoint(upperStart + code - 65);
      if (code >= 97 && code <= 122) return String.fromCodePoint(lowerStart + code - 97);
      if (style === 'bold' && code >= 48 && code <= 57) return String.fromCodePoint(digitStart + code - 48);
      return char;
    })
    .join('');
};

const prefixLines = (text: string, type: 'bullet' | 'number') => {
  let item = 0;
  return text
    .split('\n')
    .map((line) => {
      if (!line.trim()) return line;
      item += 1;
      const prefix = type === 'bullet' ? `${String.fromCodePoint(0x2022)} ` : `${item}. `;
      return `${prefix}${line.replace(/^(\s*(?:[0-9]+\.|[-*•])\s+)/u, '')}`;
    })
    .join('\n');
};

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedAnalysis, saveToLibrary } = useAnalysis();
  const copyToast = useToast();
  const saveToast = useToast();
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const [editableText, setEditableText] = useState(selectedAnalysis?.optimizedText || '');

  useEffect(() => {
    setEditableText(selectedAnalysis?.optimizedText || '');
  }, [selectedAnalysis?.id, selectedAnalysis?.optimizedText]);

  if (!selectedAnalysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold text-on-surface mb-4">No Analysis Selected</h2>
        <p className="text-on-surface-variant mb-6">Go to the dashboard to select a draft or analyze a new one.</p>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editableText);
      copyToast.show('Optimized LinkedIn draft copied to clipboard!');
    } catch {
      copyToast.show('Failed to copy — please try again.');
    }
  };

  const handleSave = () => {
    saveToLibrary({ ...selectedAnalysis, optimizedText: editableText });
    saveToast.show('Post draft stored successfully in library!');
  };

  const handleApplyHook = (hookText: string) => {
    const lines = editableText.split('\n');
    lines[0] = hookText;
    setEditableText(lines.join('\n'));
  };

  const handleFormat = (type: FormatType) => {
    const editor = editorRef.current;
    if (!editor) return;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selected = editableText.slice(start, end);
    const fallbackText =
      type === 'bold'
        ? 'bold text'
        : type === 'italic'
          ? 'italic text'
          : type === 'bullet' || type === 'number'
            ? 'List item'
            : '';

    let replacement = selected || fallbackText;

    if (type === 'bold') replacement = toUnicodeStyle(replacement, 'bold');
    if (type === 'italic') replacement = toUnicodeStyle(replacement, 'italic');
    if (type === 'bullet') replacement = selected ? prefixLines(selected, 'bullet') : `${String.fromCodePoint(0x2022)} ${fallbackText}`;
    if (type === 'number') replacement = selected ? prefixLines(selected, 'number') : `1. ${fallbackText}`;
    if (type === 'rocket') replacement = selected ? `${selected} ${String.fromCodePoint(0x1f680)}` : String.fromCodePoint(0x1f680);

    const nextText = `${editableText.slice(0, start)}${replacement}${editableText.slice(end)}`;
    setEditableText(nextText);

    window.requestAnimationFrame(() => {
      editor.focus();
      const cursorEnd = start + replacement.length;
      editor.setSelectionRange(cursorEnd, cursorEnd);
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-outline hover:text-primary mb-3 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <h1 className="font-display text-2xl md:text-3xl font-black text-on-surface">Analysis Results</h1>
          <p className="font-sans text-sm text-on-surface-variant mt-1">
            Here is your optimized post, parsed &amp; formatted for maximum professional authority.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          <Button variant="secondary" size="sm" onClick={handleSave} icon={<Bookmark className="w-4 h-4 text-primary" />}>
            Save Draft
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopyToClipboard} icon={<Copy className="w-4 h-4" />}>
            Copy Text
          </Button>
          <Button variant="primary" size="sm" onClick={handleCopyToClipboard} icon={<Check className="w-4 h-4" />}>
            Publish Now
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Middle: Editor Side-by-Side */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6 min-w-0">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Original Draft */}
            <div className="bg-surface-low border border-outline-variant/50 rounded-xl p-4 sm:p-5 flex flex-col shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
                  Original Draft
                </span>
              </div>
              <textarea
                value={selectedAnalysis.originalText}
                readOnly
                className="w-full bg-transparent border-none outline-hidden resize-none text-sm text-on-surface-variant leading-relaxed min-h-75 sm:min-h-87.5 font-sans"
              />
            </div>

            {/* Optimized Editor */}
            <div className="bg-surface-lowest border border-primary/30 rounded-xl p-4 sm:p-5 card-ai-hover shadow-sm flex flex-col focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                  <h3 className="font-display font-bold text-base text-on-surface">Optimized Post</h3>
                </div>
                <Badge status="Ready" />
              </div>

              {/* Formatting Toolbar moved from AnalysisPage */}
              <div className="flex items-center gap-1 sm:gap-2 mb-3 pb-3 border-b border-outline-variant/30 text-on-surface-variant">
                <button
                  onClick={() => handleFormat('bold')}
                  className="p-1.5 hover:bg-surface-low rounded transition-colors text-xs font-bold cursor-pointer"
                  title="Bold selected text"
                  aria-label="Bold selected text"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleFormat('italic')}
                  className="p-1.5 hover:bg-surface-low rounded transition-colors text-xs italic font-serif cursor-pointer"
                  title="Italicize selected text"
                  aria-label="Italicize selected text"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <div className="w-px h-4 bg-outline-variant/50 mx-1"></div>
                <button
                  onClick={() => handleFormat('bullet')}
                  className="p-1.5 hover:bg-surface-low rounded transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Turn selected lines into bullets"
                  aria-label="Turn selected lines into bullets"
                >
                  <List className="w-4 h-4" />
                  List
                </button>
                <button
                  onClick={() => handleFormat('number')}
                  className="p-1.5 hover:bg-surface-low rounded transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Turn selected lines into a numbered list"
                  aria-label="Turn selected lines into a numbered list"
                >
                  <ListOrdered className="w-4 h-4" />
                  Number
                </button>
                <button
                  onClick={() => handleFormat('rocket')}
                  className="p-1.5 hover:bg-surface-low rounded transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Insert rocket"
                  aria-label="Insert rocket"
                >
                  <Rocket className="w-4 h-4" />
                  Rocket
                </button>
              </div>

              <textarea
                ref={editorRef}
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
                className="w-full bg-slate-50 border border-transparent focus:border-primary/50 focus:ring-1 focus:ring-primary/50 rounded-lg p-3 sm:p-4 outline-hidden resize-none text-sm text-slate-800 leading-relaxed min-h-75 font-sans transition-all grow"
                spellCheck={false}
              />
            </div>
          </div>

          <AlternativeHooks hooks={selectedAnalysis.alternativeHooks} onApplyHook={handleApplyHook} />
        </div>

        {/* Right: score panel */}
        <div className="lg:col-span-4 xl:col-span-3">
          <ScorePanel analysis={selectedAnalysis} />
        </div>
      </div>

      {/* Toasts */}
      <Toast message={copyToast.message} isOpen={copyToast.isOpen} onClose={copyToast.close} />
      <Toast message={saveToast.message} isOpen={saveToast.isOpen} onClose={saveToast.close} />
    </div>
  );
};
