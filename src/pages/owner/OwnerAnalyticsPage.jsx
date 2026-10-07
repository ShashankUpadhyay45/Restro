import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  PieChart as PieIcon,
  IndianRupee,
  Users
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const HOURLY_PEAK_DATA = [
  { hour: '12 PM', orders: 18 },
  { hour: '1 PM', orders: 38 },
  { hour: '2 PM', orders: 42 },
  { hour: '3 PM', orders: 14 },
  { hour: '7 PM', orders: 26 },
  { hour: '8 PM', orders: 68 },
  { hour: '9 PM', orders: 84 },
  { hour: '10 PM', orders: 72 },
  { hour: '11 PM', orders: 24 }
];

const CATEGORY_SHARE = [
  { name: 'Biryani & Rice', value: 38, color: '#f97316' },
  { name: 'Curries & Mains', value: 28, color: '#a855f7' },
  { name: 'Smoky Starters', value: 20, color: '#ef4444' },
  { name: 'Tandoor Breads', value: 8, color: '#fbbf24' },
  { name: 'Desserts & Beverages', value: 6, color: '#10b981' }
];

export default function OwnerAnalyticsPage() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
          Executive Intelligence
        </span>
        <h1 className="font-serif-brand font-bold text-2xl text-white">
          Culinary Analytics & Peak Demand Trends
        </h1>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl glass-card border border-white/10">
          <p className="text-xs text-zinc-400">Peak Dining Window</p>
          <p className="font-serif-brand font-bold text-2xl text-white mt-1">8:30 PM – 10:15 PM</p>
          <span className="text-[11px] text-amber-400">Avg Table Wait: 14 mins</span>
        </div>
        <div className="p-5 rounded-3xl glass-card border border-white/10">
          <p className="text-xs text-zinc-400">Average Spend Per Cover (AOV)</p>
          <p className="font-serif-brand font-bold text-2xl text-purple-400 mt-1">₹1,480</p>
          <span className="text-[11px] text-emerald-400">+14% higher on weekends</span>
        </div>
        <div className="p-5 rounded-3xl glass-card border border-white/10">
          <p className="text-xs text-zinc-400">Customer Repeat Rate</p>
          <p className="font-serif-brand font-bold text-2xl text-white mt-1">68.4%</p>
          <span className="text-[11px] text-emerald-400">Top 5% in Indiranagar</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly Peak Rush Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <h3 className="font-serif-brand font-bold text-base text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Kitchen Load & Order Rush by Hour
          </h3>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HOURLY_PEAK_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="orders" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut / Pie */}
        <div className="lg:col-span-4 p-6 rounded-3xl glass-card border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-serif-brand font-bold text-base text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-amber-400" />
              Sales Distribution
            </h3>
            <p className="text-xs text-zinc-400">Breakdown by culinary section</p>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_SHARE}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                  >
                    {CATEGORY_SHARE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px'
                    }}
                    formatter={(val) => [`${val}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/5 text-[11px]">
            {CATEGORY_SHARE.map((c) => (
              <div key={c.name} className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-zinc-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
                <span className="font-mono text-white font-bold">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
