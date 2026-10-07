import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Flame, UtensilsCrossed, LogOut, ExternalLink, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function StaffLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#07090c] text-zinc-100 flex flex-col">
      {/* High-visibility Kitchen/Staff Header */}
      <header className="h-16 px-4 sm:px-6 bg-zinc-950 border-b border-emerald-500/20 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif-brand font-bold text-sm sm:text-base text-white flex items-center gap-2">
              EMBER & SPICE — KITCHEN & SERVICE POS
            </h1>
            <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">
              Live Station Terminal • Active Shift
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/customer/home"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white bg-white/5"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Customer View
          </Link>
          <Link
            to="/owner/dashboard"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-purple-400 hover:text-purple-300 bg-purple-500/10 border border-purple-500/20"
          >
            <Shield className="w-3.5 h-3.5" /> Owner Portal
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 border border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" /> Exit
          </button>
        </div>
      </header>

      {/* Main Staff Screen */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}
