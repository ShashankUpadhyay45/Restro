import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Flame,
  Bike,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import OrderTimeline from '../../components/restaurant/OrderTimeline';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const { orders, updateOrderStatus } = useRestaurant();
  const { addToast } = useNotification();

  const order = orders.find((o) => o.id === orderId || o.orderNumber === orderId) || orders[0];
  const [currentStatus, setCurrentStatus] = useState(order?.status || 'preparing');

  useEffect(() => {
    if (order?.status) {
      setCurrentStatus(order.status);
    }
  }, [order?.status]);

  // Simulation Stages Array
  const stages = ['placed', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'];

  const handleAdvanceStatus = () => {
    const currentIndex = stages.indexOf(currentStatus);
    if (currentIndex < stages.length - 1) {
      const nextStatus = stages[currentIndex + 1];
      setCurrentStatus(nextStatus);
      updateOrderStatus(order.id, nextStatus);
      addToast({
        type: 'info',
        title: 'Status Advanced',
        message: `Order #${order.orderNumber} updated to ${nextStatus.replace('_', ' ').toUpperCase()}`
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Link
            to="/customer/orders"
            className="p-2 rounded-xl glass-panel bg-white/5 hover:bg-white/10 text-zinc-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-ember-400">
              Live Kitchen Radar
            </span>
            <h1 className="font-serif-brand font-bold text-2xl text-white">
              Order #{order?.orderNumber || orderId}
            </h1>
          </div>
        </div>

        {/* Live Simulation Control Button */}
        <button
          onClick={handleAdvanceStatus}
          disabled={currentStatus === 'delivered'}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-90 flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simulate Next Stage →</span>
        </button>
      </div>

      {/* Main Animated Timeline Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-brand font-bold text-lg text-white">
              Current Status:{' '}
              <span className="text-ember-400 uppercase tracking-wider font-extrabold">
                {currentStatus.replace(/_/g, ' ')}
              </span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Estimated Delivery: {order?.estimatedDeliveryTime || '25-35 mins'}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Kitchen Feed Active
          </span>
        </div>

        {/* Timeline Visualization */}
        <OrderTimeline currentStatus={currentStatus} orderType={order?.orderType} />
      </div>

      {/* Valet Rider & Restaurant Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Valet Delivery Rider Info */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
          <h4 className="font-serif-brand font-bold text-sm text-white flex items-center gap-2">
            <Bike className="w-4 h-4 text-ember-400" />
            Assigned Valet Executive
          </h4>

          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
              alt="Rider"
              className="w-14 h-14 rounded-2xl object-cover border border-ember-500/30"
            />
            <div className="space-y-1">
              <p className="font-semibold text-sm text-white">Vikram Singh</p>
              <p className="text-xs text-zinc-400">Royal Valet • Royal Enfield Meteor (KA-01-EQ-4491)</p>
              <p className="text-[11px] text-emerald-400 font-medium">Verified Vaccinated & Thermal Checked</p>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/10"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call Rider
            </a>
          </div>
        </div>

        {/* Order Contents Overview */}
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
          <h4 className="font-serif-brand font-bold text-sm text-white">
            Order Composition ({order?.items?.length} Dishes)
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {order?.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-zinc-200">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-mono text-zinc-400">₹{item.totalPrice}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-between text-xs font-bold text-white">
            <span>Total Value</span>
            <span className="font-serif-brand text-amber-400">₹{order?.pricing?.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
