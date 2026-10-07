import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Clock,
  ArrowRight,
  Download,
  RotateCcw,
  CheckCircle2,
  Eye,
  Filter
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { Drawer } from '../../components/common/Modal';
import EmptyState from '../../components/common/EmptyState';

export default function OrderHistoryPage() {
  const navigate = useNavigate();
  const { orders } = useRestaurant();
  const { addToCart } = useCart();
  const { addToast } = useNotification();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'active' | 'completed'
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'active') {
      return ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(o.status);
    }
    if (activeTab === 'completed') {
      return ['delivered', 'completed'].includes(o.status);
    }
    return true;
  });

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart({
        food: {
          id: item.foodId,
          name: item.name,
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
          price: item.unitPrice,
          isVeg: true
        },
        quantity: item.quantity,
        portion: item.portion,
        spiceLevel: item.spiceLevel
      });
    });

    addToast({
      type: 'success',
      title: 'Dishes Added to Feast',
      message: `Reordered ${order.items.length} items from #${order.orderNumber}.`
    });

    navigate('/customer/cart');
  };

  const handleDownloadInvoice = (orderNumber) => {
    addToast({
      type: 'info',
      title: 'Invoice Generated',
      message: `Simulated PDF Tax Invoice for #${orderNumber} downloaded.`
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-ember-400">
            Dining Memoirs
          </span>
          <h1 className="font-serif-brand font-bold text-2xl sm:text-3xl text-white">
            Order Archive & Past Feasts
          </h1>
        </div>

        {/* Tab Filters */}
        <div className="flex rounded-2xl bg-white/5 p-1 border border-white/10 text-xs">
          {[
            { id: 'all', label: `All (${orders.length})` },
            {
              id: 'active',
              label: `Active (${orders.filter((o) => ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery'].includes(o.status)).length})`
            },
            {
              id: 'completed',
              label: `Delivered (${orders.filter((o) => ['delivered', 'completed'].includes(o.status)).length})`
            }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-xl font-semibold transition-colors ${
                activeTab === tab.id ? 'bg-ember-500 text-white shadow-glow-ember' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No Orders Located"
          description="You do not have any orders matching the selected status filter."
          actionLabel="Order Delicious Food"
          actionLink="/customer/menu"
        />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const isDelivered = order.status === 'delivered';
            return (
              <div
                key={order.id}
                className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="font-serif-brand font-bold text-base text-white">
                      #{order.orderNumber}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isDelivered
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <span className="font-serif-brand font-bold text-lg text-white">
                    ₹{order.pricing?.total}
                  </span>
                </div>

                {/* Items summary */}
                <div className="text-xs text-zinc-300 space-y-1">
                  {order.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        {it.quantity}x {it.name}{' '}
                        <span className="text-[10px] text-zinc-500">({it.portion})</span>
                      </span>
                      <span className="font-mono text-zinc-400">₹{it.totalPrice}</span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/customer/orders/${order.id}/track`}
                      className="px-4 py-2 rounded-xl bg-ember-500/10 hover:bg-ember-500/20 text-ember-400 border border-ember-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Live Tracker</span>
                    </Link>

                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-xs text-zinc-400 hover:text-white underline"
                    >
                      View Receipt
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownloadInvoice(order.orderNumber)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                      title="Download Tax Invoice"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleReorder(order)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-90 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder Feast</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Details Drawer */}
      <Drawer
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order Details #${selectedOrder?.orderNumber}`}
      >
        {selectedOrder && (
          <div className="space-y-6 text-xs text-zinc-300">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Order Placed</span>
                <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Fulfillment</span>
                <span className="capitalize">{selectedOrder.orderType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Payment</span>
                <span>{selectedOrder.paymentMethod} (Paid)</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold uppercase tracking-wider text-white">Dishes Breakdown</h5>
              {selectedOrder.items?.map((it, idx) => (
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
              <div className="flex justify-between">
                <span className="text-zinc-400">Subtotal</span>
                <span>₹{selectedOrder.pricing?.subtotal}</span>
              </div>
              {selectedOrder.pricing?.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-₹{selectedOrder.pricing?.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-400">Taxes</span>
                <span>₹{selectedOrder.pricing?.tax}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white text-sm">
                <span>Grand Total</span>
                <span className="text-ember-400">₹{selectedOrder.pricing?.total}</span>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
