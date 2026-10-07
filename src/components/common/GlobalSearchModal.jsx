import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Utensils, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRestaurant } from '../../context/RestaurantContext';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { foods, orders, bookings } = useRestaurant();
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!searchTerm.trim()) return { dishes: [], orderMatches: [], bookingMatches: [] };
    const q = searchTerm.toLowerCase();

    const dishes = foods.filter(
      f => f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
    ).slice(0, 5);

    const orderMatches = orders.filter(
      o => o.orderNumber.toLowerCase().includes(q) || o.customer?.name?.toLowerCase().includes(q)
    ).slice(0, 3);

    const bookingMatches = bookings.filter(
      b => b.bookingNumber.toLowerCase().includes(q) || b.customerName?.toLowerCase().includes(q) || b.tableName?.toLowerCase().includes(q)
    ).slice(0, 3);

    return { dishes, orderMatches, bookingMatches };
  }, [searchTerm, foods, orders, bookings]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Search Modal Panel */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          className="relative w-full max-w-2xl rounded-2xl glass-panel bg-zinc-900/95 border border-white/10 shadow-2xl overflow-hidden z-10"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10">
            <Search className="w-5 h-5 text-ember-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dishes, spicy curries, orders (#ORD-9421), or table bookings..."
              className="w-full bg-transparent px-3 text-sm text-white placeholder-zinc-500 focus:outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="p-1 text-zinc-400 hover:text-white mr-1">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="px-2 py-1 rounded bg-white/10 text-xs text-zinc-400 hover:text-white">
              ESC
            </button>
          </div>

          {/* Results Container */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
            {!searchTerm.trim() ? (
              <div className="text-center py-8 text-zinc-500 text-xs">
                Type something to search our gourmet catalog, past orders, or reservations.
              </div>
            ) : results.dishes.length === 0 && results.orderMatches.length === 0 && results.bookingMatches.length === 0 ? (
              <div className="text-center py-8 text-zinc-400 text-sm">
                No matching dishes or records found for "{searchTerm}".
              </div>
            ) : (
              <>
                {/* Dishes */}
                {results.dishes.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-ember-400 mb-2 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" /> Menu Dishes ({results.dishes.length})
                    </h5>
                    <div className="space-y-1.5">
                      {results.dishes.map((dish) => (
                        <div
                          key={dish.id}
                          onClick={() => {
                            navigate(`/customer/menu/${dish.id}`);
                            onClose();
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img src={dish.image} alt={dish.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="text-sm font-medium text-white group-hover:text-ember-400 transition-colors">
                                {dish.name}
                              </p>
                              <span className="text-xs text-zinc-400">₹{dish.discountPrice || dish.price}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-ember-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Orders */}
                {results.orderMatches.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" /> Orders ({results.orderMatches.length})
                    </h5>
                    <div className="space-y-1.5">
                      {results.orderMatches.map((ord) => (
                        <div
                          key={ord.id}
                          onClick={() => {
                            navigate(`/customer/orders/${ord.id}/track`);
                            onClose();
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors"
                        >
                          <div>
                            <p className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                              Order #{ord.orderNumber}
                            </p>
                            <span className="text-xs text-zinc-400">
                              Status: <span className="text-amber-400 uppercase font-semibold">{ord.status}</span> • ₹{ord.pricing.total}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bookings */}
                {results.bookingMatches.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Bookings ({results.bookingMatches.length})
                    </h5>
                    <div className="space-y-1.5">
                      {results.bookingMatches.map((bkg) => (
                        <div
                          key={bkg.id}
                          onClick={() => {
                            navigate('/customer/book-table');
                            onClose();
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors"
                        >
                          <div>
                            <p className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">
                              Booking #{bkg.bookingNumber} — {bkg.tableName}
                            </p>
                            <span className="text-xs text-zinc-400">
                              {bkg.date} at {bkg.time} • {bkg.guests} Guests
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
