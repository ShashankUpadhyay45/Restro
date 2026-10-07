import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  UtensilsCrossed,
  User,
  Sparkles,
  Phone,
  CheckCircle2
} from 'lucide-react';
import LoginScene3D from '../../components/3d/LoginScene3D';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, loading } = useAuth();
  const { addToast } = useNotification();

  const [role, setRole] = useState('customer'); // 'customer' | 'owner' | 'staff'
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('customer@demo.com');
  const [password, setPassword] = useState('password123');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [formError, setFormError] = useState('');

  // Role taglines and titles
  const roleMeta = {
    customer: {
      title: 'Welcome Back, Food Lover',
      subtitle: 'Indulge in charcoal-fired flavors, 3D handi dishes & starlight reservations.',
      badge: 'Gourmet Patron',
      badgeColor: 'from-ember-500 to-amber-500 text-white',
      accentColor: 'text-ember-400',
      demoEmail: 'customer@demo.com',
      redirect: '/customer/home'
    },
    owner: {
      title: 'Executive Suite, Proprietor',
      subtitle: 'Command live table turnover, kitchen throughput, menus & culinary analytics.',
      badge: 'Restaurant Owner & GM',
      badgeColor: 'from-purple-600 to-indigo-600 text-white',
      accentColor: 'text-purple-400',
      demoEmail: 'owner@demo.com',
      redirect: '/owner/dashboard'
    },
    staff: {
      title: 'Kitchen & Service Terminal',
      subtitle: 'Real-time kitchen order tickets (KOT), tandoor prep line & floor seating.',
      badge: 'Head Chef & Floor Crew',
      badgeColor: 'from-emerald-600 to-teal-600 text-white',
      accentColor: 'text-emerald-400',
      demoEmail: 'staff@demo.com',
      redirect: '/staff/dashboard'
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setEmail(roleMeta[selectedRole].demoEmail);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    try {
      if (isRegisterMode) {
        await register({ name: name || 'Valued Guest', email, password, phone, role });
        addToast({
          type: 'success',
          title: 'Account Created',
          message: `Welcome to Ember & Spice, ${name || 'Guest'}!`
        });
      } else {
        await login({ email, password, role });
        addToast({
          type: 'success',
          title: 'Authenticated Successfully',
          message: `Logged in as ${roleMeta[role].badge}.`
        });
      }

      const destination = location.state?.from?.pathname || roleMeta[role].redirect;
      navigate(destination, { replace: true });
    } catch (err) {
      setFormError(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleGuestContinue = async () => {
    await login({ email: 'guest@emberandspice.com', password: 'guest', role: 'customer' });
    navigate('/customer/home');
  };

  return (
    <main role="main" aria-label="Authentication portal" className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#07090c]">
      {/* 3D Immersive Canvas Environment */}
      <LoginScene3D role={role} />

      {/* Ambient Radial Gradient Backdrops */}
      <div aria-hidden="true" className="absolute top-1/4 -left-32 w-96 h-96 bg-ember-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Glass Authentication Container */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md rounded-3xl glass-panel bg-zinc-950/80 border border-white/15 shadow-2xl p-6 sm:p-8 backdrop-blur-2xl"
      >
        {/* Brand Logo & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-ember-600 via-amber-500 to-rose-600 shadow-glow-ember mb-3">
            <Flame className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display font-extrabold text-2xl tracking-wider text-white">
            EMBER & SPICE
          </h1>
          <p className="text-[11px] tracking-widest uppercase font-semibold text-ember-400 mt-0.5">
            Crafted Fire • Authentic Flavor
          </p>
        </div>

        {/* Role Selection Switcher */}
        <div className="mb-6 p-1 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-3 gap-1">
          {[
            { id: 'customer', label: 'Customer', icon: User },
            { id: 'owner', label: 'Owner', icon: Shield },
            { id: 'staff', label: 'Staff', icon: UtensilsCrossed }
          ].map((item) => {
            const isActive = role === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleRoleChange(item.id)}
                aria-label={`Select ${item.label} role`}
                aria-pressed={isActive}
                className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-ember-600 to-amber-600 text-white shadow-lg'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Welcome Heading based on selected Role */}
        <div className="mb-6 text-center">
          <h2 className="font-serif-brand font-bold text-lg text-white">
            {isRegisterMode ? 'Create Sovereign Account' : roleMeta[role].title}
          </h2>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            {roleMeta[role].subtitle}
          </p>
        </div>

        {/* Error Alert */}
        {formError && (
          <div role="alert" className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
            {formError}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} aria-label="Account authentication" className="space-y-3.5">
          {isRegisterMode && (
            <div>
              <label htmlFor="auth-name" className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@emberandspice.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-ember-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="auth-password" className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Password
              </label>
              {!isRegisterMode && (
                <button
                  type="button"
                  onClick={() => alert("For this demonstration, use any password or click 1-Click Demo Login below.")}
                  aria-label="Forgot password help"
                  className="text-[11px] text-ember-400 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-ember-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="p-1.5 text-zinc-400 hover:text-white absolute right-2.5 top-1/2 -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label htmlFor="remember-station" className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400">
              <input
                id="remember-station"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-white/20 bg-white/10 text-ember-500 focus:ring-0"
              />
              <span>Remember this station</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            aria-label={isRegisterMode ? 'Register & Enter' : `Sign In as ${roleMeta[role].badge.split(' ')[0]}`}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-ember-600 via-amber-600 to-rose-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isRegisterMode ? 'Register & Enter' : `Sign In as ${roleMeta[role].badge.split(' ')[0]}`}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Access Credentials */}
        <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-center">
          <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-2">
            1-Click Instant Demo Credentials:
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => { handleRoleChange('customer'); }}
              aria-label="Use Customer demo credentials"
              className={`text-[10px] px-2.5 py-1 rounded-lg border ${
                role === 'customer' ? 'border-ember-500 bg-ember-500/20 text-ember-300' : 'border-white/10 text-zinc-400'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => { handleRoleChange('owner'); }}
              aria-label="Use Owner demo credentials"
              className={`text-[10px] px-2.5 py-1 rounded-lg border ${
                role === 'owner' ? 'border-purple-500 bg-purple-500/20 text-purple-300' : 'border-white/10 text-zinc-400'
              }`}
            >
              Owner
            </button>
            <button
              type="button"
              onClick={() => { handleRoleChange('staff'); }}
              aria-label="Use Staff demo credentials"
              className={`text-[10px] px-2.5 py-1 rounded-lg border ${
                role === 'staff' ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' : 'border-white/10 text-zinc-400'
              }`}
            >
              Staff
            </button>
          </div>
        </div>

        {/* Toggle Login / Register & Guest */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            {isRegisterMode ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>

          <button
            type="button"
            onClick={handleGuestContinue}
            className="text-[11px] text-amber-400/80 hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Continue as Guest Diner
          </button>
        </div>
      </motion.div>
    </main>
  );
}
