import React from 'react';

export default function SteamEffect({ className = '', color = 'rgba(255, 255, 255, 0.45)' }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 bottom-6 flex justify-center items-center gap-3 overflow-visible z-20 ${className}`}>
      <div
        className="w-3 h-12 rounded-full blur-[3px] animate-steam-1"
        style={{ background: `linear-gradient(to top, transparent, ${color}, transparent)` }}
      />
      <div
        className="w-4 h-16 rounded-full blur-[4px] animate-steam-2"
        style={{ background: `linear-gradient(to top, transparent, ${color}, transparent)` }}
      />
      <div
        className="w-3 h-14 rounded-full blur-[3px] animate-steam-3"
        style={{ background: `linear-gradient(to top, transparent, ${color}, transparent)` }}
      />
    </div>
  );
}
