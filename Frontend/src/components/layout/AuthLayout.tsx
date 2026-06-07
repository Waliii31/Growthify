import { Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface-lowest flex flex-col md:flex-row">
      {/* Left side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 py-12 lg:py-24 max-w-2xl mx-auto md:mx-0 w-full md:w-1/2 shrink-0 relative">
        <div className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2 select-none">
          <Sparkles className="w-5.5 h-5.5 text-secondary fill-secondary" />
          <span className="font-display font-black text-xl text-primary leading-none">Growthify</span>
        </div>
        <div className="w-full max-w-md mx-auto">
          <Outlet />
        </div>
      </div>

      {/* Right side - Visual/Branding (hidden on mobile) */}
      <div className="hidden md:flex flex-1 bg-surface-low relative overflow-hidden flex-col justify-between p-12 lg:p-20 border-l border-outline-variant/30">
        <div className="absolute top-0 right-0 w-125 h-125 bg-secondary-purple/20 blur-[100px] rounded-full -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-primary/10 blur-[120px] rounded-full -z-10 -translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-lg mt-auto mb-auto">
          <h2 className="font-display font-black text-3xl lg:text-5xl text-on-surface leading-tight mb-6">
            Write content that <span className="ai-gradient-text">commands attention.</span>
          </h2>
          <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
            Join thousands of founders, creators, and executives who use Growthify to scale their professional brand with predictable, high-impact engagement.
          </p>

          <div className="mt-12 glass-panel p-6 rounded-2xl border border-outline-variant/40 shadow-xl max-w-md bg-white/60">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop"
                alt="Alex Mercer"
                className="w-12 h-12 rounded-full border-2 border-primary object-cover"
              />
              <div>
                <h5 className="font-display font-bold text-sm text-on-surface">Alex Mercer</h5>
                <p className="text-xs text-on-surface-variant">Founder • Top Voice</p>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-700 italic leading-relaxed">
              "My inbound leads tripled in 30 days. The hook optimizer alone is worth the yearly subscription."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
