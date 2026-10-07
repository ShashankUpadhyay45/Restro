import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, MapPin, ArrowRight, ShoppingBag, Eye } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { RESTAURANT_INFO } from '../../data/mockData';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const { orders } = useRestaurant();

  const order = orders.find((o) => o.id === orderId || o.orderNumber === orderId) || orders[0];

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#fbbf24', '#10b981', '#ffffff']
      });
    } catch (e) {
      // Ignored if canvas not supported
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Animated Success Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="text-center space-y-3"
      >
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          Payment & Order Confirmed
        </span>
        <h1 className="font-serif-brand font-bold text-3xl sm:text-4xl text-white">
          The Hearth Has Acknowledged Your Feast
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
          Order <span className="font-mono text-white font-bold">#{order?.orderNumber || orderId}</span> is being prepared with charcoal-fired perfection.
        </p>
      </motion.div>

      {/* Main Order Receipt Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        {/* Timing & Delivery Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 uppercase font-semibold">Estimated Arrival</p>
              <p className="font-serif-brand font-bold text-sm text-white">
                {order?.estimatedDeliveryTime || '30-40 mins'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ember-500/10 text-ember-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-zinc-400 uppercase font-semibold">Destination</p>
              <p className="text-xs text-white line-clamp-1">
                {order?.orderType === 'dine-in'
                  ? `Table ${order.tableId || 'T-01'} (Dine-In)`
                  : order?.deliveryAddress?.street || 'Indiranagar, Bengaluru'}
              </p>
            </div>
          </div>
        </div>

        {/* Ordered Dishes List */}
        <div className="space-y-3">
          <h4 className="font-serif-brand font-bold text-sm text-white">
            Curated Dishes ({order?.items?.length || 0})
          </h4>
          <div className="space-y-2">
            {order?.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-white/5">
                <div>
                  <span className="text-white font-medium">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-[10px] text-zinc-400 ml-2">({item.portion})</span>
                </div>
                <span className="font-mono text-zinc-300">₹{item.totalPrice}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Payment Method */}
        <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
          <div>
            <span className="text-xs text-zinc-400">Total Paid via {order?.paymentMethod || 'UPI'}</span>
            <span className="ml-2 px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400">
              {order?.paymentStatus || 'PAID'}
            </span>
          </div>
          <span className="font-serif-brand font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-ember-400 to-amber-300">
            ₹{order?.pricing?.total || 0}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link
            to={`/customer/orders/${order?.id || orderId}/track`}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-ember-600 via-amber-600 to-rose-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>Track Kitchen Progress Live</span>
          </Link>

          <Link
            to="/customer/menu"
            className="px-5 py-3.5 rounded-xl glass-panel bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore More</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
