import React, { useState } from 'react';
import { CalendarCheck, Search, Users, CheckCircle2, XCircle, Clock, Check } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';

export default function OwnerBookingsPage() {
  const { bookings, updateBookingStatus, updateTableStatus } = useRestaurant();
  const { addToast } = useNotification();
  const [filter, setFilter] = useState('all');

  const filtered = bookings.filter((b) => (filter === 'all' ? true : b.status === filter));

  const handleUpdate = (bookingId, tableId, newStatus) => {
    updateBookingStatus(bookingId, newStatus);
    if (newStatus === 'completed' || newStatus === 'cancelled') {
      updateTableStatus(tableId, 'available');
    } else if (newStatus === 'arrived') {
      updateTableStatus(tableId, 'occupied');
    }
    addToast({
      type: 'info',
      title: 'Booking Synchronized',
      message: `Booking #${bookingId} is now ${newStatus.toUpperCase()}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
            Diner Reservations
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white">
            Booking & Table Roster ({bookings.length})
          </h1>
        </div>

        <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 text-xs">
          {['all', 'confirmed', 'arrived', 'completed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-colors ${
                filter === tab ? 'bg-purple-600 text-white shadow-lg' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 font-semibold bg-white/5">
                <th className="p-4">Reservation #</th>
                <th className="p-4">Guest Name</th>
                <th className="p-4">Table</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Party Size</th>
                <th className="p-4">Occasion & Requests</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((bkg) => (
                <tr key={bkg.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-white">#{bkg.bookingNumber}</td>
                  <td className="p-4">
                    <p className="font-semibold text-white">{bkg.customerName}</p>
                    <p className="text-[11px] text-zinc-400">{bkg.customerPhone}</p>
                  </td>
                  <td className="p-4 font-semibold text-purple-400">{bkg.tableName}</td>
                  <td className="p-4 text-zinc-300">
                    {bkg.date} at <strong className="text-white">{bkg.time}</strong>
                  </td>
                  <td className="p-4 text-zinc-300">{bkg.guests} Guests</td>
                  <td className="p-4 text-zinc-400 max-w-[180px] truncate">
                    <span className="text-white font-medium">{bkg.occasion}</span>
                    {bkg.specialRequest && ` — ${bkg.specialRequest}`}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        bkg.status === 'confirmed'
                          ? 'bg-amber-500/20 text-amber-300'
                          : bkg.status === 'arrived'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {bkg.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {bkg.status === 'confirmed' && (
                        <button
                          onClick={() => handleUpdate(bkg.id, bkg.tableId, 'arrived')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-semibold"
                        >
                          Mark Arrived
                        </button>
                      )}
                      {bkg.status === 'arrived' && (
                        <button
                          onClick={() => handleUpdate(bkg.id, bkg.tableId, 'completed')}
                          className="px-2.5 py-1 rounded-lg bg-sky-600/30 text-sky-300 border border-sky-500/40 text-[10px] font-semibold"
                        >
                          Completed
                        </button>
                      )}
                      {bkg.status !== 'cancelled' && bkg.status !== 'completed' && (
                        <button
                          onClick={() => handleUpdate(bkg.id, bkg.tableId, 'cancelled')}
                          className="px-2 py-1 rounded-lg bg-rose-600/20 text-rose-300 hover:bg-rose-600/30 text-[10px]"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
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
