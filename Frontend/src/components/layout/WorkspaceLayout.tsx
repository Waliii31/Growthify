import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { ShimmerLoader } from '@/components/ui';
import { useAnalysis } from '@/hooks/useAnalysis';

export const WorkspaceLayout: React.FC = () => {
  const { isLoading } = useAnalysis();

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Header stretches full width in workspace mode */}
      <Header fluid={true} />
      
      {/* The container for sidebar and main content */}
      <div className="flex-grow flex w-full relative">
        {/* Full-height sidebar anchored to left edge */}
        <Sidebar />
        
        {/* Main fluid content area */}
        <main className="flex-1 w-full min-w-0 flex flex-col relative px-4 sm:px-6 lg:px-10 py-6 sm:py-8 h-[calc(100vh-64px)] overflow-y-auto">
          {isLoading ? (
            <div className="space-y-6 max-w-4xl mx-auto py-12 w-full mt-10">
              <div className="text-center space-y-2">
                <Sparkles className="w-10 h-10 text-secondary animate-bounce mx-auto" />
                <h3 className="font-display font-black text-xl text-on-surface">
                  Predicting viral probability...
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Our NLP draft evaluation model is auditing hook metrics and sentence pacing keys.
                </p>
              </div>
              <ShimmerLoader />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};
