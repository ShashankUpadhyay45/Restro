import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard,
  QrCode,
  Banknote,
  Wallet,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Plus,
  CheckCircle2,
  Utensils
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import { paymentService } from '../../services/paymentService';
import { Modal } from '../../components/common/Modal';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, bill, orderType, setOrderType, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder, tables } = useRestaurant();
  const { addToast } = useNotification();

  // Saved Addresses State
  const [addresses, setAddresses] = useState([
    {
      id: 'addr_1',
      label: 'Home',
      street: 'Flat 402, Embassy Habitat, 80ft Road',
      city: 'Indiranagar, Bengaluru',
      pincode: '560038'
    },
    {
      id: 'addr_2',
      label: 'Office',
      street: 'WeWork Galaxy, 43 Residency Road',
      city: 'Ashok Nagar, Bengaluru',
      pincode: '560025'
    }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState('addr_1');
  const [deliveryNotes, setDeliveryNotes] = useState('Please do not ring the bell if after 10 PM. Leave with security.');
  const [selectedDineInTable, setSelectedDineInTable] = useState('T-01');

  // Contact State
  const [contactName, setContactName] = useState(user?.name || 'Aarav Sharma');
  const [contactPhone, setContactPhone] = useState(user?.phone || '+91 98765 43210');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'CARD' | 'NET_BANKING' | 'COD' | 'WALLET'
  const [isProcessing, setIsProcessing] = useState(false);

  // Address Modal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Home');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Bengaluru');
  const [newAddrPincode, setNewAddrPincode] = useState('');

  if (cartItems.length === 0) {
    navigate('/customer/cart');
    return null;
  }

  const handleAddNewAddress = (e) => {
    e.preventDefault();
    if (!newAddrStreet || !newAddrPincode) return;
    const newAddr = {
      id: `addr_${Date.now()}`,
      label: newAddrLabel,
      street: newAddrStreet,
      city: newAddrCity,
      pincode: newAddrPincode
    };
    setAddresses((prev) => [...prev, newAddr]);
    setSelectedAddressId(newAddr.id);
    setIsAddressModalOpen(false);
    addToast({ type: 'success', title: 'Address Saved', message: 'New delivery address added.' });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const selectedAddr = addresses.find((a) => a.id === selectedAddressId);

      // Simulate payment processing via service abstraction
      await paymentService.processPayment({
        method: paymentMethod,
        amount: bill.total,
        orderDetails: { itemsCount: cartItems.length }
      });

      // Construct Order Object
      const newOrder = createOrder({
        orderType,
        customer: {
          name: contactName,
          email: user?.email || 'customer@demo.com',
          phone: contactPhone
        },
        items: cartItems,
        pricing: bill,
        deliveryAddress: orderType === 'delivery' ? selectedAddr : null,
        deliveryNotes: orderType === 'delivery' ? deliveryNotes : null,
        tableId: orderType === 'dine-in' ? selectedDineInTable : null,
        paymentMethod,
        paymentStatus: 'paid'
      });

      clearCart();
      addToast({
        type: 'success',
        title: 'Order Placed & Confirmed',
        message: `Order #${newOrder.orderNumber} is dispatched to the royal kitchen!`
      });

      navigate(`/customer/order-success/${newOrder.id}`);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Payment Issue',
        message: err.message || 'Unable to complete transaction.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <span className="text-xs uppercase tracking-widest font-bold text-ember-400">
          Final Destination
        </span>
        <h1 className="font-serif-brand font-bold text-2xl sm:text-3xl text-white">
          Complete Your Order
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery Details & Payment Selection */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order Type Confirmation */}
          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-3">
            <h3 className="font-serif-brand font-bold text-sm text-white">
              Dining Fulfillment Mode
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {['delivery', 'takeaway', 'dine-in'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`py-2 px-3 rounded-xl border text-xs capitalize transition-all ${
                    orderType === type
                      ? 'border-ember-500 bg-ember-500/20 text-white font-bold shadow-glow-ember'
                      : 'border-white/10 bg-white/5 text-zinc-400'
                  }`}
                >
                  {type === 'dine-in' ? 'Table Dine-In' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Address Section (Only for delivery) */}
          {orderType === 'delivery' && (
            <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-brand font-bold text-sm text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-ember-400" /> Delivery Address
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(true)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New Address
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-ember-500 bg-ember-500/10 text-white shadow-glow-ember'
                          : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white uppercase">{addr.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-ember-400" />}
                      </div>
                      <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">{addr.street}</p>
                      <p className="text-[11px] text-zinc-400 mt-1">{addr.city} • {addr.pincode}</p>
                    </div>
                  );
                })}
              </div>

              {/* Delivery Notes */}
              <div>
                <label className="block text-[11px] font-semibold uppercase text-zinc-400 mb-1">
                  Delivery Valet Instructions
                </label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Ring doorbell twice, leave at reception..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-ember-500"
                />
              </div>
            </div>
          )}

          {/* Dine-In Table Picker if dine-in is selected */}
          {orderType === 'dine-in' && (
            <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-3">
              <h3 className="font-serif-brand font-bold text-sm text-white flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-ember-400" /> Select Table for Table Service
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {tables.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedDineInTable(t.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold ${
                      selectedDineInTable === t.id
                        ? 'border-ember-500 bg-ember-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-zinc-400'
                    }`}
                  >
                    {t.id} ({t.capacity}s)
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-3">
            <h3 className="font-serif-brand font-bold text-sm text-white">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-ember-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-ember-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-3">
            <h3 className="font-serif-brand font-bold text-sm text-white flex items-center justify-between">
              <span>Payment Gateway</span>
              <span className="text-[10px] text-zinc-500 font-normal">256-Bit SSL Encrypted</span>
            </h3>

            <div className="space-y-2">
              {[
                { id: 'UPI', label: 'UPI Instant (Google Pay, PhonePe, Paytm)', icon: QrCode },
                { id: 'CARD', label: 'Credit / Debit Card (Visa, Mastercard, RuPay)', icon: CreditCard },
                { id: 'WALLET', label: 'Digital Wallets & Net Banking', icon: Wallet },
                { id: 'COD', label: 'Cash / Pay on Handover', icon: Banknote }
              ].map((p) => {
                const isSelected = paymentMethod === p.id;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-ember-500 bg-ember-500/10 text-white shadow-glow-ember ring-1 ring-ember-400'
                        : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-ember-400' : 'text-zinc-500'}`} />
                      <span className="text-xs font-semibold">{p.label}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-ember-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-4">
            <h3 className="font-serif-brand font-bold text-base text-white pb-3 border-b border-white/10">
              Order Review ({cartItems.length} Dishes)
            </h3>

            {/* Quick item list */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex justify-between items-center text-xs">
                  <div>
                    <span className="text-white font-medium">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">{item.portion}</span>
                  </div>
                  <span className="font-mono text-zinc-300">₹{item.totalPrice}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>₹{bill.subtotal}</span>
              </div>
              {bill.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount ({bill.couponCode})</span>
                  <span>-₹{bill.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Tax (5%)</span>
                <span>₹{bill.tax}</span>
              </div>
              {bill.deliveryFee > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery Distance Fee</span>
                  <span>₹{bill.deliveryFee}</span>
                </div>
              )}
              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="font-serif-brand font-bold text-sm text-white">Amount Due</span>
                <span className="font-serif-brand font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-ember-400 to-amber-300">
                  ₹{bill.total}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-ember-600 via-amber-600 to-rose-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authorize & Place Order (₹{bill.total})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Add Address Modal */}
      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title="Add New Delivery Address"
      >
        <form onSubmit={handleAddNewAddress} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Address Label</label>
            <div className="flex gap-2">
              {['Home', 'Office', 'Other'].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setNewAddrLabel(l)}
                  className={`px-3 py-1.5 rounded-lg text-xs capitalize ${
                    newAddrLabel === l ? 'bg-ember-500 text-white font-bold' : 'bg-white/5 text-zinc-400'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Street Address</label>
            <textarea
              rows={2}
              required
              value={newAddrStreet}
              onChange={(e) => setNewAddrStreet(e.target.value)}
              placeholder="Apartment, building, street..."
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-ember-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">City</label>
              <input
                type="text"
                required
                value={newAddrCity}
                onChange={(e) => setNewAddrCity(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Pincode</label>
              <input
                type="text"
                required
                value={newAddrPincode}
                onChange={(e) => setNewAddrPincode(e.target.value)}
                placeholder="560038"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember"
          >
            Save Address
          </button>
        </form>
      </Modal>
    </div>
  );
}
