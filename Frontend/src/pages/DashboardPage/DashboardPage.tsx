import { useNavigate } from 'react-router-dom';
import {
  Plus,
  TrendingUp,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  Search,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Card, StatCard, Badge, Button } from '@/components/ui';
import { useAnalysis } from '@/hooks/useAnalysis';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { analyses, selectAnalysis, deleteAnalysis } = useAnalysis();

  const postsAnalyzedCount = analyses.length;
  const averageEngagementScore =
    analyses.length > 0
      ? Math.round(analyses.reduce((acc, cur) => acc + cur.score, 0) / analyses.length)
      : 0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-on-surface leading-tight">
            Good morning, Alex.
          </h1>
          <p className="font-sans text-sm md:text-base text-on-surface-variant mt-1.5">
            Ready to go viral? Here's how your premium content is performing today.
          </p>
        </div>
        <Button variant="ai" icon={<Plus className="w-4 h-4" />} onClick={() => navigate('/analysis')}>
          New Analysis
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <StatCard title="Posts Analyzed" value={postsAnalyzedCount.toString()} change="12%" trend="up" icon={<BookOpen className="w-5 h-5" />} />
        <StatCard title="Avg. Content Score" value={`${averageEngagementScore}/100`} change="4.2%" trend="up" icon={<Award className="w-5 h-5" />} />
        <StatCard title="Total Reach Est." value="0" change="0" trend="up" icon={<TrendingUp className="w-5 h-5" />} />
      </div>

      {/* Analysis table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-outline-variant/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-bg-base/30">
          <div>
            <h3 className="font-display font-bold text-lg text-on-surface">Recent Post Analyses</h3>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">Edit, clone, or publish optimized post drafts</p>
          </div>
          <div className="relative w-full sm:w-48">
            <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full bg-surface-lowest border border-outline-variant text-xs p-2 pl-9 rounded-lg outline-hidden"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-outline-variant/40 text-xs font-bold text-outline uppercase bg-bg-base/20">
                <th className="py-4 px-4 sm:px-6">Post Preview</th>
                <th className="py-4 px-4 sm:px-6 hidden sm:table-cell">Date Created</th>
                <th className="py-4 px-4 sm:px-6 text-center">Score</th>
                <th className="py-4 px-4 sm:px-6">Status</th>
                <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/35">
              {analyses.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-surface-low/30 transition-colors group cursor-pointer"
                  onClick={() => {
                    selectAnalysis(item);
                    navigate('/results');
                  }}
                >
                  <td className="py-4 px-4 sm:px-6 max-w-xs md:max-w-md">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/15 transition-colors mt-0.5 shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden min-w-0">
                        <p className="font-display font-semibold text-on-surface truncate group-hover:text-primary transition-colors text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-on-surface-variant truncate mt-0.5 max-w-sm">
                          {item.originalText}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-on-surface-variant text-xs font-medium hidden sm:table-cell">
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5 text-outline" /> {item.dateStr}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-center">
                    <span
                      className={`inline-flex items-center justify-center font-display font-bold text-xs w-8 h-8 rounded-full border ${
                        item.score >= 85
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : item.score >= 70
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {item.score}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <Badge status={item.status} />
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right text-xs">
                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2"
                        aria-label={`View ${item.title}`}
                        onClick={() => {
                          selectAnalysis(item);
                          navigate('/results');
                        }}
                      >
                        <ExternalLink className="w-4 h-4 text-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:text-rose-700 p-2"
                        onClick={() => deleteAnalysis(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {analyses.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-on-surface-variant font-medium">
                    No analyses recorded yet. Drop high-converting ideas inside the Analysis workspace!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pro tip */}
      <div className="glass-panel p-4 sm:p-5 rounded-xl border border-outline-variant/40 flex items-start gap-3 sm:gap-4">
        <Sparkles className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
        <div>
          <h4 className="font-display font-bold text-sm text-on-surface">Pro tip of the day</h4>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            The LinkedIn algorithm prioritizes posts containing custom micro bullet points and active industry debates. Aim to structure your draft so the first two lines terminate in a curiosity click loop. Open the <strong>Analysis Workspace</strong> to get custom generated alternatives.
          </p>
        </div>
      </div>
    </div>
  );
};
