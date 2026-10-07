import React from 'react';
import { Bell, CheckCheck, Clock, Sparkles, ShoppingBag, Calendar, Tag } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import EmptyState from '../../components/common/EmptyState';

export default function CustomerNotificationsPage() {
  const { notifications, markAllNotificationsRead } = useRestaurant();

  const getIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-400" />;
      case 'booking':
        return <Calendar className="w-4 h-4 text-sky-400" />;
      case 'offer':
        return <Tag className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-ember-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
            Dispatch Center
          </span>
          <h1 className="font-serif-brand font-bold text-2xl sm:text-3xl text-white">
            Notifications & Announcements
          </h1>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-xs text-ember-400 hover:text-ember-300 flex items-center gap-1 font-semibold"
          >
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No Notifications Yet"
          description="You are caught up! When you place orders, reserve tables, or receive exclusive offers, they will appear here."
          actionLabel="Explore Menu"
          actionLink="/customer/menu"
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-2xl glass-card border transition-all flex items-start gap-4 ${
                notif.read ? 'border-white/5 opacity-70' : 'border-amber-500/30 bg-amber-500/5'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-serif-brand font-semibold text-sm text-white">{notif.title}</h4>
                  <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {notif.time}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
