import React, { useState } from 'react';
import { Settings, Save, Shield, Clock, MapPin, IndianRupee, Bell, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import { RESTAURANT_INFO } from '../../data/mockData';

export default function OwnerSettingsPage() {
  const { restaurantInfo, setRestaurantInfo } = useRestaurant();
  const { addToast } = useNotification();

  const [name, setName] = useState(restaurantInfo.name);
  const [tagline, setTagline] = useState(restaurantInfo.tagline);
  const [phone, setPhone] = useState(restaurantInfo.phone);
  const [email, setEmail] = useState(restaurantInfo.email);
  const [address, setAddress] = useState(restaurantInfo.address);
  const [hours, setHours] = useState(restaurantInfo.hours);
  const [deliveryFee, setDeliveryFee] = useState(restaurantInfo.deliveryFee);
  const [taxRate, setTaxRate] = useState(restaurantInfo.taxRate * 100);

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...restaurantInfo,
      name,
      tagline,
      phone,
      email,
      address,
      hours,
      deliveryFee: Number(deliveryFee),
      taxRate: Number(taxRate) / 100
    };
    setRestaurantInfo(updated);
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Restaurant configuration and operations updated.'
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
          Global Enterprise Configuration
        </span>
        <h1 className="font-serif-brand font-bold text-2xl text-white">
          Restaurant Settings & Operating Controls
        </h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Identity */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <h3 className="font-serif-brand font-bold text-base text-white pb-3 border-b border-white/10 flex items-center gap-2">
            <Settings className="w-4 h-4 text-purple-400" />
            General Restaurant Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Establishment Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Tagline</label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Concierge Phone</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Concierge Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Physical Location</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Operating Hours</label>
            <input
              type="text"
              required
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
        </div>

        {/* Financial & Delivery Parameters */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <h3 className="font-serif-brand font-bold text-base text-white pb-3 border-b border-white/10 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            Pricing, Taxation & Logistics Rates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Valet Delivery Fee (₹)</label>
              <input
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">GST Tax Percentage (%)</label>
              <input
                type="number"
                step="0.5"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Enterprise Settings
          </button>
        </div>
      </form>
    </div>
  );
}
