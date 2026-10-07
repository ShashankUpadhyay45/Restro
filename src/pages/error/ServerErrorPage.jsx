import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ServerErrorPage() {
  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-6 text-center">
      <div className="max-w-md p-8 rounded-3xl glass-card border border-amber-500/30 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
            Error 500
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white mt-1">
            Hearth Fire Interrupted
          </h1>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            The culinary backend encountered an internal thermal overload. Please try refreshing.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reheat Engine
          </button>
        </div>
      </div>
    </div>
  );
}
