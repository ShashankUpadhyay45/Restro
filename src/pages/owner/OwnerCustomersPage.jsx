import React, { useState } from 'react';
import { Users, Search, Phone, Mail, Award, ArrowUpRight } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';

export default function OwnerCustomersPage() {
  const { customers } = useRestaurant();
  const [query, setQuery] = useState('');

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
            Diner CRM
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white">
            Guest Registry & Spending Portfolio
          </h1>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patron..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((cust) => (
          <div
            key={cust.id}
            className="p-5 rounded-3xl glass-card border border-white/10 space-y-4 hover:border-purple-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                  {cust.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-serif-brand font-semibold text-sm text-white">{cust.name}</h4>
                  <span className="text-[10px] text-zinc-400">{cust.email}</span>
                </div>
              </div>

              {cust.status === 'vip' && (
                <span className="px-2 py-0.5 rounded-full text-[9px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  VIP Patron
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-semibold">Total Orders</p>
                <p className="font-serif-brand font-bold text-sm text-white mt-0.5">{cust.ordersCount} Feasts</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-semibold">Lifetime Spend</p>
                <p className="font-serif-brand font-bold text-sm text-purple-400 mt-0.5">₹{cust.totalSpent.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Last Visited: {cust.lastOrderDate}</span>
              <a href={`tel:${cust.phone}`} className="text-purple-400 hover:underline">
                {cust.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
