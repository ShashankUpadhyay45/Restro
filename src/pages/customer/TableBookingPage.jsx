import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Sparkles,
  Heart,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import FloorPlanVisualizer from '../../components/restaurant/FloorPlanVisualizer';
import { useRestaurant } from '../../context/RestaurantContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { bookingService } from '../../services/bookingService';

export default function TableBookingPage() {
  const { tables, createBooking } = useRestaurant();
  const { user } = useAuth();
  const { addToast } = useNotification();

  // Booking Form State
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState('Casual Dining');
  const [specialRequest, setSpecialRequest] = useState('');
  const [selectedTable, setSelectedTable] = useState(tables[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const timeSlots = [
    '12:30', '13:00', '13:30', '14:00',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const handleConfirmReservation = async (e) => {
    e.preventDefault();
    if (!selectedTable) {
      addToast({
        type: 'warning',
        title: 'Table Required',
        message: 'Please pick an available table on the floor plan.'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const newBooking = await createBooking({
        customerName: user?.name || 'Aarav Sharma',
        customerEmail: user?.email || 'customer@demo.com',
        customerPhone: user?.phone || '+91 98765 43210',
        tableId: selectedTable.id,
        tableName: selectedTable.name,
        guests: Number(guests),
        date,
        time,
        occasion,
        specialRequest
      });

      setConfirmedBooking(newBooking);
      addToast({
        type: 'success',
        title: 'Table Reserved',
        message: `Your table ${selectedTable.name} has been confirmed for ${date} at ${time}.`
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Booking Error',
        message: err.message || 'Unable to confirm reservation.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
          Royal Hospitality
        </span>
        <h1 className="font-serif-brand font-bold text-3xl sm:text-4xl text-white">
          Reserve an Artisanal Table
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Select your date, guest party, and preferred view on our live interactive restaurant floor layout.
        </p>
      </div>

      {confirmedBooking ? (
        /* Confirmation Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto glass-card rounded-3xl p-8 border border-emerald-500/30 text-center space-y-6 shadow-2xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Reservation Confirmed
            </span>
            <h2 className="font-serif-brand font-bold text-2xl text-white mt-1">
              Table #{confirmedBooking.bookingNumber} is Prepared for You
            </h2>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-left">
            <div>
              <p className="text-zinc-500 font-semibold uppercase">Date</p>
              <p className="font-semibold text-white mt-0.5">{confirmedBooking.date}</p>
            </div>
            <div>
              <p className="text-zinc-500 font-semibold uppercase">Time</p>
              <p className="font-semibold text-white mt-0.5">{confirmedBooking.time}</p>
            </div>
            <div>
              <p className="text-zinc-500 font-semibold uppercase">Party</p>
              <p className="font-semibold text-white mt-0.5">{confirmedBooking.guests} Guests</p>
            </div>
            <div>
              <p className="text-zinc-500 font-semibold uppercase">Table</p>
              <p className="font-semibold text-amber-400 mt-0.5">{confirmedBooking.tableName}</p>
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember"
            >
              Book Another Table
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleConfirmReservation} className="space-y-8">
          {/* Top Parameters Bar */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
                <CalendarIcon className="w-3.5 h-3.5 text-ember-400" /> Dining Date
              </label>
              <input
                type="date"
                required
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-ember-500"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
                <Users className="w-3.5 h-3.5 text-amber-400" /> Guest Count
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-ember-500 cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> Arrival Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-ember-500 cursor-pointer"
              >
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot} ({Number(slot.split(':')[0]) < 16 ? 'Lunch' : 'Dinner'})
                  </option>
                ))}
              </select>
            </div>

            {/* Occasion */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" /> Occasion
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-ember-500 cursor-pointer"
              >
                <option value="Casual Dining">Casual Dining</option>
                <option value="Anniversary">Anniversary Celebration</option>
                <option value="Birthday">Birthday Gathering</option>
                <option value="Business Meeting">Executive Dinner</option>
                <option value="Date Night">Candlelight Date Night</option>
              </select>
            </div>
          </div>

          {/* Interactive Floor Plan Selection Component */}
          <div>
            <div className="mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Interactive Seating Selection
              </span>
              <p className="text-xs text-zinc-500">
                Click any available green table in the layout below to reserve it for your party.
              </p>
            </div>

            <FloorPlanVisualizer
              tables={tables}
              selectedTableId={selectedTable?.id}
              onSelectTable={(table) => setSelectedTable(table)}
            />
          </div>

          {/* Special Dietary / Arrangement Requests */}
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <h4 className="font-serif-brand font-bold text-sm text-white">
              Bespoke Culinary & Seating Requests (Optional)
            </h4>
            <textarea
              rows={3}
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="e.g. Please arrange quiet corner with candlelight, high chair for infant, celebration cake sparkler..."
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-ember-500"
            />

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-zinc-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero reservation fee • Instant confirmation SMS & WhatsApp</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-ember-600 via-amber-600 to-rose-600 text-white font-semibold text-xs shadow-glow-ember hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Confirm Table Reservation ({selectedTable?.name || 'T-01'})</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
