import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IndianRupee,
  ShoppingBag,
  Flame,
  CalendarCheck,
  Users,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import { useRestaurant } from '../../context/RestaurantContext';
import { Link } from 'react-router-dom';
import TiltCard from '../../components/3d/TiltCard';

const REVENUE_DATA_7D = [
  { day: 'Mon', revenue: 42000, orders: 32 },
  { day: 'Tue', revenue: 38500, orders: 28 },
  { day: 'Wed', revenue: 49000, orders: 41 },
  { day: 'Thu', revenue: 52000, orders: 44 },
  { day: 'Fri', revenue: 78500, orders: 68 },
  { day: 'Sat', revenue: 94000, orders: 82 },
  { day: 'Sun', revenue: 89000, orders: 76 }
];

const POPULAR_DISHES_METRICS = [
  { name: 'Dum Murgh Biryani', sales: 184, revenue: 86480 },
  { name: 'Dal Bukhara 24H', sales: 142, revenue: 56090 },
  { name: 'Truffle Garlic Naan', sales: 260, revenue: 36400 },
  { name: 'Murgh Makhani Royale', sales: 118, revenue: 57820 },
  { name: 'Galouti Kebab', sales: 94, revenue: 48880 }
];

export default function OwnerDashboardOverview() {
  const { orders, bookings, tables, updateOrderStatus } = useRestaurant();
  const [timeFilter, setTimeFilter] = useState('7D');

  const pendingOrders = orders.filter((o) => ['placed', 'confirmed', 'preparing'].includes(o.status));
  const totalRevenue = orders.reduce((sum, o) => sum + (o.pricing?.total || 0), 45290);

  const kpis = [
    {
      title: "Today's Gross Revenue",
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      trend: '+18.4% vs last week',
      icon: IndianRupee,
      color: 'from-purple-600 to-indigo-600'
    },
    {
      title: "Total Orders Today",
      value: orders.length + 34,
      trend: '+12% new diners',
      icon: ShoppingBag,
      color: 'from-ember-600 to-amber-600'
    },
    {
      title: "Active In-Kitchen",
      value: pendingOrders.length,
      trend: 'Avg turnaround: 22m',
      icon: Flame,
      color: 'from-rose-600 to-orange-600'
    },
    {
      title: "Table Occupancy",
      value: `${tables.filter((t) => t.status === 'occupied').length} / ${tables.length}`,
      trend: '4 upcoming bookings',
      icon: CalendarCheck,
      color: 'from-emerald-600 to-teal-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
            Real-Time Operations Telemetry
          </span>
          <h1 className="font-serif-brand font-bold text-2xl sm:text-3xl text-white">
            Proprietor Command Dashboard
          </h1>
        </div>

        {/* Time filters */}
        <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 text-xs">
          {['Today', 'Yesterday', '7D', '30D'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFilter(tf)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                timeFilter === tf ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Live Restaurant Telemetry HUD */}
      <div className="p-4 sm:p-5 rounded-3xl glass-card border border-white/15 bg-gradient-to-r from-purple-950/40 via-zinc-950 to-charcoal-950 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider shadow">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Hearth Status: Open & Firing</span>
          </div>
          <span className="text-xs text-zinc-400 hidden sm:inline">• 4 Master Chefs On Duty</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-300">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">Kitchen Load</span>
            <span className="text-amber-400 font-mono font-bold">{pendingOrders.length} Active Orders</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">Occupied Tables</span>
            <span className="text-emerald-400 font-mono font-bold">{tables.filter(t => t.status === 'occupied').length} / {tables.length} Seated</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">Bookings Today</span>
            <span className="text-purple-300 font-mono font-bold">{bookings.length} Guests</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid with 3D Depth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <TiltCard
              key={idx}
              maxTilt={10}
              perspective={1000}
              scaleOnHover={1.03}
              glare={true}
              className="p-5 rounded-3xl glass-card border border-white/10 relative overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-colors shadow-xl"
            >
              <div
                className="flex items-center justify-between"
                style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
              >
                <span className="text-xs font-semibold text-zinc-400">{kpi.title}</span>
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${kpi.color} flex items-center justify-center text-white shadow-lg`}
                  style={{ transform: 'translateZ(28px)' }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p
                className="font-serif-brand font-extrabold text-2xl text-white mt-3"
                style={{ transform: 'translateZ(22px)' }}
              >
                {kpi.value}
              </p>
              <div
                className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-400 font-medium"
                style={{ transform: 'translateZ(14px)' }}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{kpi.trend}</span>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Velocity Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="font-serif-brand font-bold text-base text-white">
                Revenue & Sales Trajectory
              </h3>
              <p className="text-xs text-zinc-400">Weekly charcoal kitchen output in INR (₹)</p>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA_7D}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(value) => [`₹${value}`, 'Revenue']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#a855f7"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Delicacies Revenue Bar (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-3xl glass-card border border-white/10 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-serif-brand font-bold text-base text-white">Top Dish Turnover</h3>
            <p className="text-xs text-zinc-400">Volume sold across handis & grills</p>

            <div className="h-60 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={POPULAR_DISHES_METRICS} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={110} stroke="#a1a1aa" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px'
                    }}
                  />
                  <Bar dataKey="sales" fill="#f97316" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Link
            to="/owner/analytics"
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center justify-between pt-2 border-t border-white/5"
          >
            <span>View Complete Breakdown</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Live Active Kitchen Queue Table */}
      <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="font-serif-brand font-bold text-base text-white">
              Live Kitchen & Dining Queue
            </h3>
            <p className="text-xs text-zinc-400">Active orders demanding immediate station attention</p>
          </div>
          <Link
            to="/owner/orders"
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
          >
            View All ({orders.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 font-semibold">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Fulfillment</th>
                <th className="pb-3">Dishes</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Quick Advance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.slice(0, 4).map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-mono font-bold text-white">#{ord.orderNumber}</td>
                  <td className="py-3 text-zinc-200">{ord.customer?.name}</td>
                  <td className="py-3 capitalize text-zinc-400">
                    {ord.orderType === 'dine-in' ? `Table ${ord.tableId}` : ord.orderType}
                  </td>
                  <td className="py-3 text-zinc-300">{ord.items?.length} items</td>
                  <td className="py-3 font-bold text-white">₹{ord.pricing?.total}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        const next = ord.status === 'placed' ? 'preparing' : ord.status === 'preparing' ? 'ready' : 'delivered';
                        updateOrderStatus(ord.id, next);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 text-[11px] font-semibold"
                    >
                      Advance →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
