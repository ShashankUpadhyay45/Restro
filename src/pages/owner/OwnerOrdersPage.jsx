import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Flame,
  Utensils,
  Bike,
  XCircle,
  Eye,
  ChevronDown
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import { Drawer } from '../../components/common/Modal';

export default function OwnerOrdersPage() {
  const { orders, updateOrderStatus } = useRestaurant();
  const { addToast } = useNotification();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectOrder, setInspectOrder] = useState(null);

  const statuses = [
    { id: 'all', label: 'All Orders' },
    { id: 'placed', label: 'Placed' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'preparing', label: 'Preparing' },
    { id: 'ready', label: 'Ready' },
    { id: 'out_for_delivery', label: 'Out for Delivery' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = o.orderNumber.toLowerCase().includes(q);
      const matchCust = o.customer?.name?.toLowerCase().includes(q);
      if (!matchId && !matchCust) return false;
    }
    return true;
  });

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    addToast({
      type: 'success',
      title: 'Status Updated',
      message: `Order #${orderId} moved to ${newStatus.replace(/_/g, ' ').toUpperCase()}`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
            Real-Time Logistics
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white">
            Order Fulfillment Command
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search #ORD or diner name..."
              className="pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Status Filter Badges Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {statuses.map((st) => (
          <button
            key={st.id}
            onClick={() => setStatusFilter(st.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              statusFilter === st.id
                ? 'bg-purple-600 text-white border-purple-400 shadow-lg'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Orders List Table */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 font-semibold bg-white/5">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer & Contact</th>
                <th className="p-4">Type</th>
                <th className="p-4">Dishes</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Current Status</th>
                <th className="p-4">Change Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-white">#{ord.orderNumber}</td>
                  <td className="p-4">
                    <p className="font-semibold text-white">{ord.customer?.name}</p>
                    <p className="text-[11px] text-zinc-400">{ord.customer?.phone}</p>
                  </td>
                  <td className="p-4 capitalize text-zinc-300">
                    {ord.orderType === 'dine-in' ? `Table ${ord.tableId}` : ord.orderType}
                  </td>
                  <td className="p-4 text-zinc-300">
                    <p className="font-medium text-white">{ord.items?.length} Items</p>
                    <p className="text-[10px] text-zinc-500 truncate max-w-[160px]">
                      {ord.items?.map((i) => i.name).join(', ')}
                    </p>
                  </td>
                  <td className="p-4 font-serif-brand font-bold text-sm text-white">
                    ₹{ord.pricing?.total}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className="bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
                    >
                      <option value="placed">Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setInspectOrder(ord)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                      title="Inspect Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Inspection Drawer */}
      <Drawer
        isOpen={!!inspectOrder}
        onClose={() => setInspectOrder(null)}
        title={`Order Dossier #${inspectOrder?.orderNumber}`}
      >
        {inspectOrder && (
          <div className="space-y-6 text-xs text-zinc-300">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Customer</span>
                <span className="text-white font-semibold">{inspectOrder.customer?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Phone</span>
                <span>{inspectOrder.customer?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Fulfillment Mode</span>
                <span className="capitalize">{inspectOrder.orderType}</span>
              </div>
              {inspectOrder.deliveryAddress && (
                <div className="flex justify-between">
                  <span className="text-zinc-500">Address</span>
                  <span className="text-right max-w-[200px]">{inspectOrder.deliveryAddress.street}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h5 className="font-bold uppercase tracking-wider text-white">Dish Tickets</h5>
              {inspectOrder.items?.map((it, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/5 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-white">{it.quantity}x {it.name}</p>
                    <p className="text-[10px] text-zinc-500">{it.portion} • {it.spiceLevel}</p>
                  </div>
                  <span className="font-mono text-zinc-300">₹{it.totalPrice}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between font-bold text-white text-sm">
                <span>Total Amount Paid</span>
                <span className="text-purple-400">₹{inspectOrder.pricing?.total}</span>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
