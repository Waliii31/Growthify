export const ShimmerLoader: React.FC = () => {
  return (
    <div className="space-y-4 w-full p-4 border border-outline-variant/40 rounded-xl bg-surface-lowest">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse" />
          <div className="h-3 bg-slate-200/70 rounded w-1/3 animate-pulse" />
        </div>
      </div>
      <div className="space-y-2.5 pt-4">
        <div className="h-3 bg-slate-200 rounded animate-pulse" />
        <div className="h-3 bg-slate-200 rounded animate-pulse" />
        <div className="h-3 bg-slate-200 rounded w-5/6 animate-pulse" />
      </div>
      <div className="pt-2 flex gap-2">
        <div className="h-6 bg-slate-200 rounded-full w-16 animate-pulse" />
        <div className="h-6 bg-slate-200 rounded-full w-16 animate-pulse" />
      </div>
    </div>
  );
};
