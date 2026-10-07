import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  ShoppingBag,
  Heart,
  Calendar,
  Clock,
  User,
  Menu as MenuIcon,
  X,
  LogOut,
  Shield,
  UtensilsCrossed,
  Search,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useRestaurant } from '../../context/RestaurantContext';

export default function Navbar({ onOpenSearch }) {
  const { user, role, logout } = useAuth();
  const { totalItemsCount } = useCart();
  const { notifications } = useRestaurant();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { label: 'Home', path: '/customer/home' },
    { label: 'Menu', path: '/customer/menu' },
    { label: 'Book Table', path: '/customer/book-table' },
    { label: 'My Orders', path: '/customer/orders' },
    { label: 'Favorites', path: '/customer/favorites' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header
      className={`sticky z-40 w-full transition-all duration-500 ${
        isScrolled
          ? 'top-2 sm:top-3 px-3 sm:px-6'
          : 'top-0 px-0'
      }`}
    >
      <div
        className={`mx-auto transition-all duration-500 ${
          isScrolled
            ? 'max-w-6xl rounded-2xl glass-panel bg-zinc-950/85 backdrop-blur-xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] px-4 sm:px-6'
            : 'max-w-7xl px-4 sm:px-6 lg:px-8 bg-transparent border-b border-white/10'
        }`}
      >
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          {/* Brand Logo */}
          <Link to="/customer/home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ember-600 via-amber-500 to-rose-600 flex items-center justify-center shadow-glow-ember transition-transform group-hover:scale-105">
              <Flame className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-display font-bold text-lg md:text-xl tracking-wider text-white dark:text-white text-zinc-900 block leading-tight">
                EMBER & SPICE
              </span>
              <span className="text-[10px] tracking-widest uppercase text-ember-400 font-semibold">
                Crafted Fire • Authentic
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-ember-400 font-semibold'
                      : 'text-zinc-300 dark:text-zinc-300 text-zinc-700 hover:text-white dark:hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-ember-500 to-amber-400 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                aria-label="Search food catalog"
                className="p-2.5 rounded-xl hover:bg-white/10 dark:hover:bg-white/10 hover:bg-black/5 text-zinc-300 dark:text-zinc-300 text-zinc-700 hover:text-ember-400 transition-colors"
                title="Search Food, Orders & Tables"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Cart Button */}
            <Link
              to="/customer/cart"
              className="relative p-2.5 rounded-xl bg-ember-500/10 hover:bg-ember-500/20 text-ember-400 border border-ember-500/20 hover:border-ember-500/40 transition-all flex items-center justify-center group"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-ember-500 to-rose-600 text-white text-[11px] font-bold flex items-center justify-center shadow-lg animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            {/* User Profile / Portal Switcher Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 border border-transparent hover:border-white/10 transition-colors"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover border border-ember-500/40"
                  />
                  <span className="hidden lg:block text-xs font-medium text-zinc-200">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden lg:block" />
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel bg-zinc-900/95 border border-white/10 shadow-2xl p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-white/10">
                        <p className="text-xs text-zinc-400">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-ember-500/20 text-ember-400">
                          {user.role}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/customer/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4 text-ember-400" />
                          My Profile
                        </Link>
                        <Link
                          to="/customer/notifications"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <span className="flex items-center gap-2.5">
                            <Clock className="w-4 h-4 text-amber-400" />
                            Notifications
                          </span>
                          {unreadNotifsCount > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                              {unreadNotifsCount}
                            </span>
                          )}
                        </Link>

                        {/* Quick switch to Owner or Staff dashboard if role permitted */}
                        <div className="my-1 border-t border-white/5"></div>
                        <Link
                          to="/owner/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 rounded-lg transition-colors"
                        >
                          <Shield className="w-4 h-4 text-purple-400" />
                          Owner Portal
                        </Link>
                        <Link
                          to="/staff/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs text-emerald-300 hover:text-emerald-200 hover:bg-emerald-500/10 rounded-lg transition-colors"
                        >
                          <UtensilsCrossed className="w-4 h-4 text-emerald-400" />
                          Kitchen & Staff POS
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-white/10">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-ember-500 to-amber-500 text-white text-xs font-semibold shadow-glow-ember hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/10 px-4 pt-3 pb-6 space-y-1 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                  location.pathname === link.path
                    ? 'bg-ember-500/20 text-ember-400 font-semibold'
                    : 'text-zinc-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                to="/owner/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-purple-300 bg-purple-950/40 border border-purple-500/20"
              >
                Switch to Restaurant Owner Portal
              </Link>
              <Link
                to="/staff/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-500/20"
              >
                Switch to Kitchen & Staff POS
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
