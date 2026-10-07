import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/mockData';
import { useNotification } from '../../context/NotificationContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useNotification();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addToast({
      type: 'success',
      title: 'Joined the Royal Club',
      message: 'You have been enrolled for secret tastings and chef previews!'
    });
    setEmail('');
  };

  return (
    <footer className="bg-charcoal-950 border-t border-white/10 text-zinc-400 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ember-600 to-amber-500 flex items-center justify-center shadow-glow-ember">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wider">
                EMBER & SPICE
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              {RESTAURANT_INFO.tagline} An immersive culinary sanctuary honoring time-honored charcoal embers, Awadhi dum gastronomy, and modern avant-garde Indian fine dining.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-ember-500/20 hover:text-ember-400 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-ember-500/20 hover:text-ember-400 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" aria-label="Twitter" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-ember-500/20 hover:text-ember-400 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-serif-brand font-semibold text-sm tracking-wider uppercase">
              Culinary Journey
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/customer/menu" className="hover:text-ember-400 transition-colors">A La Carte Menu</Link></li>
              <li><Link to="/customer/book-table" className="hover:text-ember-400 transition-colors">Reserve a Table</Link></li>
              <li><Link to="/customer/orders" className="hover:text-ember-400 transition-colors">Track Active Orders</Link></li>
              <li><Link to="/customer/favorites" className="hover:text-ember-400 transition-colors">Curated Favorites</Link></li>
              <li><Link to="/customer/profile" className="hover:text-ember-400 transition-colors">VIP Dining Profile</Link></li>
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div className="space-y-3">
            <h4 className="text-white font-serif-brand font-semibold text-sm tracking-wider uppercase">
              Visit & Reserve
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-ember-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-serif-brand font-semibold text-sm tracking-wider uppercase">
              Private Tastings & Offers
            </h4>
            <p className="text-xs leading-relaxed text-zinc-400">
              Receive secret weekend tasting menus, festive vouchers, and invitations to masterclass dinners.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-ember-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-90 transition-opacity"
              >
                Join Sovereign Circle
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Ember & Spice Gourmet Enterprises. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-400 cursor-pointer">FSSAI License #11223344556677</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
