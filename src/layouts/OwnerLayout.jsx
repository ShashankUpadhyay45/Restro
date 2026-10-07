import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Layers,
  Grid,
  CalendarCheck,
  Users,
  UserCheck,
  Tag,
  Boxes,
  BarChart3,
  MessageSquare,
  Settings,
  Flame,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRestaurant } from '../context/RestaurantContext';

export default function OwnerLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const { user, logout } = useAuth();
  const { orders, bookings } = useRestaurant();
  const location = useLocation();
  const navigate = useNavigate();

  const pendingOrdersCount = orders.filter(o => o.status === 'placed' || o.status === 'confirmed').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  const navItems = [
    { label: 'Overview', path: '/owner/dashboard', icon: LayoutDashboard },
    { label: 'Live Orders', path: '/owner/orders', icon: ShoppingBag, badge: pendingOrdersCount },
    { label: 'Menu Catalog', path: '/owner/menu', icon: UtensilsCrossed },
    { label: 'Categories', path: '/owner/categories', icon: Layers },
    { label: 'Floor Tables', path: '/owner/tables', icon: Grid },
    { label: 'Reservations', path: '/owner/bookings', icon: CalendarCheck, badge: pendingBookingsCount },
    { label: 'Customers', path: '/owner/customers', icon: Users },
    { label: 'Staff Roster', path: '/owner/staff', icon: UserCheck },
    { label: 'Offers & Coupons', path: '/owner/offers', icon: Tag },
    { label: 'Raw Inventory', path: '/owner/inventory', icon: Boxes },
    { label: 'Analytics & Trends', path: '/owner/analytics', icon: BarChart3 },
    { label: 'Guest Reviews', path: '/owner/reviews', icon: MessageSquare },
    { label: 'Settings', path: '/owner/settings', icon: Settings }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#090b0e] text-zinc-100 flex flex-col md:flex-row transition-colors">
      {/* Desktop / Tablet Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-white/10 glass-panel bg-zinc-950/95 transition-all duration-300 z-30 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
          <Link to="/owner/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-amber-500 to-rose-600 flex items-center justify-center shrink-0 shadow-lg">
              <Flame className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <span className="font-display font-bold text-sm text-white tracking-wider block leading-tight">
                  EMBER OWNER
                </span>
                <span className="text-[10px] uppercase tracking-widest text-purple-400 font-semibold">
                  Executive Suite
                </span>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-400 font-semibold border border-purple-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-400' : 'text-zinc-400 group-hover:text-white'}`} />
                {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                {!collapsed && item.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-purple-500 text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 space-y-2">
          <Link
            to="/customer/home"
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {!collapsed && <span>View Customer App</span>}
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-white/10 glass-panel bg-zinc-950/70 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              aria-label="Open mobile navigation drawer"
              className="md:hidden p-2 rounded-xl hover:bg-white/10 text-zinc-300"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <h2 className="font-serif-brand font-bold text-base sm:text-lg text-white">
              {navItems.find((i) => i.path === location.pathname)?.label || 'Owner Console'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                alt="Owner Avatar"
                className="w-8 h-8 rounded-lg object-cover border border-purple-500/40"
              />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-white leading-tight">{user?.name || 'Owner'}</p>
                <p className="text-[10px] text-purple-400">Managing Partner</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Navigation for Owner */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-72 h-full glass-panel bg-zinc-950 p-4 flex flex-col z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <span className="font-serif-brand font-bold text-sm text-white">Owner Portal</span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  aria-label="Close navigation drawer"
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium ${
                      location.pathname === item.path
                        ? 'bg-purple-600/20 text-purple-400 font-semibold'
                        : 'text-zinc-400 hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    {item.badge > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-purple-500 text-white text-[10px]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link
                  to="/customer/home"
                  onClick={() => setMobileDrawerOpen(false)}
                  className="block px-3 py-2 text-xs text-amber-400"
                >
                  Switch to Customer App
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-xs text-rose-400"
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
