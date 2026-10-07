import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Check,
  X,
  Bike,
  Store,
  Utensils,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import EmptyState from '../../components/common/EmptyState';
import { INITIAL_OFFERS } from '../../data/mockData';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    orderType,
    setOrderType,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    bill
  } = useCart();

  const { addToast } = useNotification();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (codeToApply) => {
    setCouponError('');
    try {
      const code = codeToApply || couponInput;
      applyCoupon(code);
      addToast({
        type: 'success',
        title: 'Coupon Applied',
        message: `Royal voucher ${code.toUpperCase()} applied successfully!`
      });
      setCouponInput('');
    } catch (err) {
      setCouponError(err.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Culinary Cart is Empty"
          description="You haven't selected any charcoal delicacies yet. Explore our handcrafted royal menu to begin your feast."
          actionLabel="Explore Menu"
          actionLink="/customer/menu"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-ember-400">
            Selected Gastronomy
          </span>
          <h1 className="font-serif-brand font-bold text-2xl sm:text-3xl text-white">
            Your Gourmet Feast ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items)
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items & Order Type */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Type Tabs */}
          <div className="p-1 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-3 gap-1">
            {[
              { id: 'delivery', label: 'Delivery', icon: Bike, desc: '35 mins' },
              { id: 'takeaway', label: 'Self Pickup', icon: Store, desc: 'Ready in 20m' },
              { id: 'dine-in', label: 'Dine-In Table', icon: Utensils, desc: 'Serve at Table' }
            ].map((t) => {
              const active = orderType === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setOrderType(t.id)}
                  className={`py-2.5 px-2 rounded-xl text-center flex flex-col items-center gap-1 transition-all ${
                    active
                      ? 'bg-gradient-to-r from-ember-600 to-amber-600 text-white shadow-glow-ember font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{t.label}</span>
                  </div>
                  <span className="text-[10px] opacity-75">{t.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Cart Item Cards List */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.cartItemId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 sm:p-5 rounded-3xl glass-card border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-500'}`}
                      />
                      <h4 className="font-serif-brand font-semibold text-sm text-white">
                        {item.name}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-1.5 text-[10px] text-zinc-400 pt-1">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300">
                        {item.portion}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase">
                        {item.spiceLevel}
                      </span>
                      {item.addOns?.map((a) => (
                        <span key={a} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-ember-300">
                          +{a}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-zinc-400 font-mono pt-1">₹{item.unitPrice} each</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-0 border-white/5">
                  {/* Quantity Changer */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-white w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-serif-brand font-bold text-base text-white">
                      ₹{item.totalPrice}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-[10px] text-rose-400/80 hover:text-rose-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-start">
            <Link
              to="/customer/menu"
              className="text-xs text-ember-400 hover:text-ember-300 flex items-center gap-1 font-semibold"
            >
              + Add More Dishes from Menu
            </Link>
          </div>
        </div>

        {/* Right Column: Voucher & Bill Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coupon / Voucher Section */}
          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-ember-400" /> Apply Royal Voucher
            </h4>

            {appliedCoupon ? (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-emerald-400 font-mono">
                    {appliedCoupon.code} APPLIED
                  </p>
                  <p className="text-[11px] text-zinc-300">{appliedCoupon.description}</p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-ember-500"
                  />
                  <button
                    onClick={() => handleApplyCoupon(couponInput)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {couponError && (
                  <p className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {couponError}
                  </p>
                )}

                {/* Quick select coupons */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {INITIAL_OFFERS.map((o) => (
                    <button
                      key={o.code}
                      onClick={() => handleApplyCoupon(o.code)}
                      className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[10px] text-amber-300 hover:border-amber-400/40"
                    >
                      {o.code} ({o.discount})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Grand Bill Calculation Card */}
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 shadow-xl">
            <h4 className="font-serif-brand font-bold text-base text-white pb-3 border-b border-white/10">
              Bill Breakdown
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-zinc-300">
                <span>Items Subtotal</span>
                <span>₹{bill.subtotal}</span>
              </div>

              {bill.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Voucher Discount</span>
                  <span>-₹{bill.discount}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-300">
                <span>GST Tax (5%)</span>
                <span>₹{bill.tax}</span>
              </div>

              {bill.packagingFee > 0 && (
                <div className="flex justify-between text-zinc-300">
                  <span>Eco-Thermal Handi Packaging</span>
                  <span>₹{bill.packagingFee}</span>
                </div>
              )}

              {bill.deliveryFee > 0 && (
                <div className="flex justify-between text-zinc-300">
                  <span>Valet Delivery Distance Fee</span>
                  <span>₹{bill.deliveryFee}</span>
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="font-serif-brand font-bold text-sm text-white">Grand Total</span>
                <span className="font-serif-brand font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-ember-400 to-amber-300">
                  ₹{bill.total}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigate('/customer/checkout')}
              className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-ember-600 via-amber-600 to-rose-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <span>Proceed to Delivery & Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
