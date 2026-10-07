import React from 'react';

export function FoodCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 animate-pulse">
      <div className="w-full h-48 bg-zinc-800/60" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-800/80 rounded w-3/4" />
        <div className="h-3 bg-zinc-800/50 rounded w-full" />
        <div className="h-3 bg-zinc-800/40 rounded w-5/6" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 bg-zinc-800/80 rounded w-1/4" />
          <div className="h-8 bg-zinc-800/80 rounded-xl w-1/3" />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/5 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-zinc-800/60" />
        <div className="space-y-1.5">
          <div className="w-32 h-3.5 bg-zinc-800/80 rounded" />
          <div className="w-20 h-2.5 bg-zinc-800/40 rounded" />
        </div>
      </div>
      <div className="w-16 h-6 bg-zinc-800/60 rounded-full" />
      <div className="w-20 h-4 bg-zinc-800/80 rounded" />
    </div>
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-zinc-900/60 border border-white/5" />
        ))}
      </div>
      <div className="h-72 rounded-2xl bg-zinc-900/60 border border-white/5" />
    </div>
  );
}
