import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, LogIn } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-6 text-center">
      <div className="max-w-md p-8 rounded-3xl glass-card border border-rose-500/30 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-rose-400">
            Error 403 / 401
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white mt-1">
            Access Restricted
          </h1>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            This culinary portal is reserved for authorized restaurant personnel or requires an elevated access credential.
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign In with Credentials
          </Link>
          <Link
            to="/customer/home"
            className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs flex items-center gap-2"
          >
            <Home className="w-4 h-4" /> Guest Dining
          </Link>
        </div>
      </div>
    </div>
  );
}
