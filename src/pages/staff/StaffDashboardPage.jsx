import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Flame,
  Clock,
  CheckCircle2,
  Users,
  Grid,
  Receipt,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import FloorPlanVisualizer from '../../components/restaurant/FloorPlanVisualizer';

export default function StaffDashboardPage() {
  const { orders, tables, updateOrderStatus, updateTableStatus } = useRestaurant();
  const { addToast } = useNotification();

  const [activeStation, setActiveStation] = useState('kitchen'); // 'kitchen' | 'waiter' | 'cashier'

  const kitchenOrders = orders.filter((o) => ['placed', 'confirmed', 'preparing'].includes(o.status));
  const readyOrders = orders.filter((o) => o.status === 'ready');

  const handleAdvanceKitchen = (orderId, currentStatus) => {
    const nextStatus = currentStatus === 'placed' || currentStatus === 'confirmed' ? 'preparing' : 'ready';
    updateOrderStatus(orderId, nextStatus);
    addToast({
      type: 'success',
      title: 'Kitchen KOT Updated',
      message: `Order #${orderId} moved to ${nextStatus.toUpperCase()}`
    });
  };

  const handleWaiterServe = (orderId) => {
    updateOrderStatus(orderId, 'delivered');
    addToast({
      type: 'success',
      title: 'Dishes Served',
      message: `Order #${orderId} served to table / dispatch.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Sub-Role Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
            Active Station Terminal
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white">
            Floor Operations & Kitchen Display System (KDS)
          </h1>
        </div>

        <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10 text-xs">
          {[
            { id: 'kitchen', label: 'Chef KDS (KOT)', icon: Flame, badge: kitchenOrders.length },
            { id: 'waiter', label: 'Waiter & Tables', icon: Users, badge: tables.filter((t) => t.status === 'occupied').length },
            { id: 'cashier', label: 'Cashier POS & Bills', icon: Receipt }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeStation === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveStation(tab.id)}
                className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                  active
                    ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-black/40 text-white text-[10px]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. KITCHEN KDS VIEW */}
      {activeStation === 'kitchen' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-brand font-bold text-lg text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
              Live Kitchen Tickets (KOT)
            </h3>
            <span className="text-xs text-zinc-400">Station: Charcoal Hearth & Tandoor</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {kitchenOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-3xl glass-card border border-amber-500/30 flex flex-col justify-between space-y-4 bg-zinc-950/80"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-base text-white">#{ord.orderNumber}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300">
                      {ord.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Fulfillment: <strong className="text-white capitalize">{ord.orderType}</strong></span>
                    {ord.tableId && <span className="text-amber-400 font-bold">({ord.tableId})</span>}
                  </div>

                  {/* Dishes in ticket */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    {ord.items?.map((it, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/5 flex items-start justify-between">
                        <div>
                          <p className="font-bold text-white text-xs">
                            {it.quantity}x {it.name}
                          </p>
                          <span className="text-[10px] text-amber-400 font-semibold">{it.portion}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-white/10 text-zinc-300">
                          {it.spiceLevel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleAdvanceKitchen(ord.id, ord.status)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs shadow-lg hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <span>{ord.status === 'preparing' ? 'Mark Plated & Ready' : 'Start Cooking (Dum Hearth)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {kitchenOrders.length === 0 && (
            <div className="text-center py-16 text-zinc-500 text-sm">
              All kitchen tickets are currently cleared! Ready for new orders.
            </div>
          )}
        </div>
      )}

      {/* 2. WAITER FLOOR VIEW */}
      {activeStation === 'waiter' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-brand font-bold text-lg text-white">
              Waiter Seating & Floor Service
            </h3>
            <span className="text-xs text-zinc-400">Click table to toggle occupancy</span>
          </div>

          {/* Table Floor visualizer */}
          <FloorPlanVisualizer
            tables={tables}
            isManagementMode={true}
            onStatusChange={(tableId, newStatus) => updateTableStatus(tableId, newStatus)}
          />

          {/* Ready to serve dishes */}
          {readyOrders.length > 0 && (
            <div className="p-6 rounded-3xl glass-card border border-emerald-500/30 space-y-4">
              <h4 className="font-serif-brand font-bold text-sm text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Hot Dishes Ready for Floor Serving / Handover ({readyOrders.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {readyOrders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white text-xs">#{ord.orderNumber}</p>
                      <p className="text-[11px] text-zinc-400">
                        {ord.orderType === 'dine-in' ? `Serve at Table ${ord.tableId}` : 'Valet Dispatch'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleWaiterServe(ord.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs"
                    >
                      Served ✓
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. CASHIER POS VIEW */}
      {activeStation === 'cashier' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-brand font-bold text-lg text-white">
              Billing Ledger & Settled Receipts
            </h3>
            <span className="text-xs text-zinc-400">Terminal #01 (Front Desk)</span>
          </div>

          <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 font-semibold bg-white/5">
                  <th className="p-4">Bill #</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-white/5">
                    <td className="p-4 font-mono font-bold text-white">#{ord.orderNumber}</td>
                    <td className="p-4 text-zinc-200">{ord.customer?.name}</td>
                    <td className="p-4 font-semibold text-purple-400">{ord.paymentMethod}</td>
                    <td className="p-4 font-serif-brand font-bold text-sm text-white">₹{ord.pricing?.total}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400">
                        Paid (Settled)
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => addToast({ type: 'info', title: 'Tax Receipt Printed', message: `Printed thermal bill for #${ord.orderNumber}` })}
                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs"
                      >
                        Print Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
