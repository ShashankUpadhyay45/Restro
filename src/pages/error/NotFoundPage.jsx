import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-6 text-center">
      <div className="max-w-md p-8 rounded-3xl glass-card border border-white/10 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-ember-500/20 text-ember-400 mx-auto flex items-center justify-center shadow-glow-ember">
          <Flame className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-ember-400">
            Error 404
          </span>
          <h1 className="font-serif-brand font-bold text-3xl text-white mt-1">
            Dish Not on the Menu
          </h1>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            The culinary destination or page you are requesting could not be located in our royal registry.
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/customer/home"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember flex items-center gap-2"
          >
            <Home className="w-4 h-4" /> Return to Dining Room
          </Link>
        </div>
      </div>
    </div>
  );
}
