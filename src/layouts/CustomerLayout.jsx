import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import GlobalSearchModal from '../components/common/GlobalSearchModal';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Utensils, Calendar, User, Home } from 'lucide-react';

export default function CustomerLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItemsCount, bill } = useCart();
  const location = useLocation();

  const mobileNavItems = [
    { label: 'Home', path: '/customer/home', icon: Home },
    { label: 'Menu', path: '/customer/menu', icon: Utensils },
    { label: 'Book', path: '/customer/book-table', icon: Calendar },
    { label: 'Cart', path: '/customer/cart', icon: ShoppingBag, badge: totalItemsCount },
    { label: 'Profile', path: '/customer/profile', icon: User }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d11] text-zinc-100 transition-colors">
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      <Footer />

      {/* Global Search Dialog */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Sticky Mobile Cart Bar if cart has items and not currently on cart/checkout */}
      {totalItemsCount > 0 && !location.pathname.includes('/cart') && !location.pathname.includes('/checkout') && (
        <div className="fixed bottom-16 md:bottom-6 inset-x-4 md:inset-x-auto md:right-8 z-30">
          <Link
            to="/customer/cart"
            className="flex items-center justify-between px-5 py-3 rounded-2xl bg-gradient-to-r from-ember-600 via-amber-600 to-rose-600 text-white font-semibold text-sm shadow-2xl border border-white/20 hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-black/30 flex items-center justify-center font-bold text-xs">
                {totalItemsCount}
              </div>
              <span className="text-xs">Feast in Cart</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-serif-brand font-bold">₹{bill.total}</span>
              <span className="text-xs uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                Checkout →
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (< 768px) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 glass-panel border-t border-white/10 px-3 py-2 flex items-center justify-around bg-zinc-950/90 backdrop-blur-xl">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center py-1 px-2.5 transition-colors ${
                isActive ? 'text-ember-400 font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
