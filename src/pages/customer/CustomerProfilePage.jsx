import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Heart,
  Shield,
  Save,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';

export default function CustomerProfilePage() {
  const { user, updateProfile } = useAuth();
  const { orders, bookings, favorites } = useRestaurant();
  const { addToast } = useNotification();

  const [name, setName] = useState(user?.name || 'Aarav Sharma');
  const [email, setEmail] = useState(user?.email || 'customer@demo.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [dietaryPreference, setDietaryPreference] = useState('Non-Vegetarian');
  const [spicePreference, setSpicePreference] = useState('Medium Spiced');

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile({ name, phone, dietaryPreference, spicePreference });
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your dining preferences and details have been saved.'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <span className="text-xs uppercase tracking-widest font-bold text-ember-400">
          VIP Diner Profile
        </span>
        <h1 className="font-serif-brand font-bold text-2xl sm:text-3xl text-white">
          Sovereign Account & Dining Preferences
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar & Quick Stats Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl glass-card border border-white/10 text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                alt="Avatar"
                className="w-full h-full rounded-2xl object-cover border-2 border-ember-500/50 shadow-glow-ember"
              />
            </div>

            <div>
              <h3 className="font-serif-brand font-bold text-lg text-white">{name}</h3>
              <p className="text-xs text-zinc-400">{email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-gradient-to-r from-ember-500/20 to-amber-500/20 text-amber-300 border border-amber-500/30">
                Gold Tier Member
              </span>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="font-serif-brand font-bold text-base text-white">{orders.length}</p>
                <p className="text-[10px] text-zinc-500">Orders</p>
              </div>
              <div>
                <p className="font-serif-brand font-bold text-base text-white">{bookings.length}</p>
                <p className="text-[10px] text-zinc-500">Tables</p>
              </div>
              <div>
                <p className="font-serif-brand font-bold text-base text-white">{favorites.length}</p>
                <p className="text-[10px] text-zinc-500">Favorites</p>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-2">
            <Link
              to="/customer/orders"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-xs text-zinc-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-ember-400" />
                Active & Past Orders
              </span>
              <span className="font-mono text-zinc-500">({orders.length})</span>
            </Link>

            <Link
              to="/customer/favorites"
              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-xs text-zinc-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-rose-400" />
                Saved Dishes
              </span>
              <span className="font-mono text-zinc-500">({favorites.length})</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Edit Profile Form & Preferences */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 space-y-6">
            <h3 className="font-serif-brand font-bold text-base text-white pb-3 border-b border-white/10">
              Personal Credentials & Palate Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-ember-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-zinc-400 mb-1.5">
                  Default Dietary Palate
                </label>
                <select
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-ember-500 cursor-pointer"
                >
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Pure Vegetarian">Pure Vegetarian</option>
                  <option value="Jain Friendly">Jain Style (No Onion/Garlic)</option>
                  <option value="Vegan">Vegan</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-90 flex items-center gap-2"
              >
                <Save className="w-4 h-4" /> Save Profile
              </button>
            </div>
          </form>

          {/* Security & Password Placeholder */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white">Password & Security</h4>
                <p className="text-xs text-zinc-400">Encrypted JWT sessions with 2FA protection</p>
              </div>
            </div>
            <button
              onClick={() => alert("Password reset token dispatched to your email (simulated).")}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
