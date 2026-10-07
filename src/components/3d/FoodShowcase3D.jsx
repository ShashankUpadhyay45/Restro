import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Plus, Check, Clock, ShieldCheck, ArrowRight, Utensils, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';
import SteamEffect from './SteamEffect';
import MagneticButton from './MagneticButton';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

export default function FoodShowcase3D({ foods = [] }) {
  const { addToCart } = useCart();
  const { addToast } = useNotification();

  // Pick top 4 signature crown dishes
  const signatureDishes = foods.filter(f => f.isBestseller || f.isFeatured).slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  if (!signatureDishes || signatureDishes.length === 0) return null;

  const currentDish = signatureDishes[activeIndex] || signatureDishes[0];

  const handleQuickAdd = () => {
    addToCart({ food: currentDish, quantity: 1 });
    setJustAdded(true);
    addToast({
      type: 'success',
      title: 'Added to Feast',
      message: `${currentDish.name} has been added to your cart.`
    });
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Dynamic Background Ember Mesh Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-ember-600/15 via-amber-500/10 to-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Grand Masterpiece Catalog</span>
          </div>
          <h2 className="font-serif-brand font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            The Sovereign Showcase
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Inspect our most celebrated heirloom preparations. Each delicacy is simmered in cast iron, sealed with whole wheat dough, and scented with hand-crushed whole botanicals.
          </p>
        </div>

        {/* Dish Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 overflow-x-auto pb-3 no-scrollbar">
          {signatureDishes.map((dish, idx) => (
            <button
              key={dish.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-4 sm:px-6 py-3 rounded-2xl font-serif-brand text-xs sm:text-sm font-semibold flex items-center gap-3 transition-all duration-300 backdrop-blur-md border ${
                activeIndex === idx
                  ? 'bg-gradient-to-r from-ember-600 to-amber-600 text-white border-amber-400/50 shadow-glow-ember scale-105'
                  : 'bg-zinc-950/70 text-zinc-400 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-7 h-7 rounded-full object-cover border border-white/20"
              />
              <span className="line-clamp-1">{dish.name}</span>
            </button>
          ))}
        </div>

        {/* Main 3D Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive 3D Food Stage with Steam & Escaping Boundary */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={10}
              perspective={1200}
              scaleOnHover={1.02}
              glare={true}
              className="relative w-full rounded-3xl glass-card border border-white/15 p-4 sm:p-6 bg-zinc-950/80 shadow-2xl overflow-visible"
            >
              {/* Media Container with 3D Pop-out */}
              <div
                className="relative h-[360px] sm:h-[440px] rounded-2xl overflow-hidden bg-zinc-900 flex items-center justify-center"
                style={{ transform: 'translateZ(35px)', transformStyle: 'preserve-3d' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDish.id}
                    initial={{ opacity: 0, scale: 0.92, rotateY: 15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 1.05, rotateY: -15 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={currentDish.image}
                      alt={currentDish.name}
                      className="w-full h-full object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
                    />

                    {/* Dark Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none rounded-2xl" />

                    {/* Rising Steam Effect */}
                    <SteamEffect color="rgba(255, 237, 213, 0.45)" />

                    {/* Bestseller Badge */}
                    <div
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-ember-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xl"
                      style={{ transform: 'translateZ(50px)' }}
                    >
                      <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
                      Chef's Crown Signature
                    </div>

                    {/* Veg Indicator */}
                    <div
                      className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg flex items-center gap-1.5"
                      style={{ transform: 'translateZ(50px)' }}
                    >
                      <span className={`w-2 h-2 rounded-full ${currentDish.isVeg ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                      {currentDish.isVeg ? 'Vegetarian' : 'Non-Veg'}
                    </div>

                    {/* Bottom Specs Bar */}
                    <div
                      className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300 backdrop-blur-md bg-black/60 p-3 rounded-xl border border-white/10 shadow-lg"
                      style={{ transform: 'translateZ(45px)' }}
                    >
                      <span className="flex items-center gap-1 text-amber-300 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {currentDish.prepTime || '25 mins'}
                      </span>
                      <span className="text-zinc-300 font-medium">
                        {currentDish.calories || '540 kcal'}
                      </span>
                      <span className="text-amber-400 font-bold">
                        ★ {currentDish.rating} ({currentDish.reviewsCount} reviews)
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Culinary Breakdown & Interactive Ordering */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-ember-400 font-bold">
                    Chapter 0{activeIndex + 1} • {currentDish.category?.toUpperCase() || 'SIGNATURE'}
                  </span>
                  <h3 className="font-serif-brand font-bold text-2xl sm:text-4xl text-white mt-1">
                    {currentDish.name}
                  </h3>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {currentDish.description}
                </p>

                {/* Hand-Pounded Heirloom Ingredients Cloud */}
                {currentDish.ingredients && currentDish.ingredients.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80 mb-2">
                      Stone-Crushed Botanical Notes:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {currentDish.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-zinc-300 font-medium"
                        >
                          ✦ {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing & CTA Controls */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Royal Portion</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-white font-serif-brand">
                        ₹{currentDish.discountPrice || currentDish.price}
                      </span>
                      {currentDish.discountPrice && (
                        <span className="text-sm text-zinc-500 line-through">
                          ₹{currentDish.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MagneticButton strength={10}>
                      <button
                        onClick={handleQuickAdd}
                        className={`px-6 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg ${
                          justAdded
                            ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                            : 'bg-gradient-to-r from-ember-600 via-amber-600 to-rose-600 text-white shadow-glow-ember hover:scale-105'
                        }`}
                      >
                        {justAdded ? (
                          <>
                            <Check className="w-4 h-4" /> Added to Feast
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" /> Add to Feast
                          </>
                        )}
                      </button>
                    </MagneticButton>

                    <Link
                      to={`/customer/menu/${currentDish.id}`}
                      className="px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-white font-semibold transition-all hover:border-amber-400"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
