import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Clock, Flame, Plus, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import TiltCard from '../3d/TiltCard';
import SteamEffect from '../3d/SteamEffect';
import CustomizationModal from './CustomizationModal';

export default function FoodCard({ food }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useRestaurant();
  const { addToast } = useNotification();

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  const favorite = isFavorite(food.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    // If food has portions or add-ons, open customize modal
    if (food.customizations?.portions?.length > 1 || food.customizations?.addOns?.length > 0) {
      setIsCustomizeOpen(true);
      return;
    }

    addToCart({ food, quantity: 1 });
    setJustAdded(true);
    setShowSparkle(true);
    addToast({
      type: 'success',
      title: 'Added to Feast',
      message: `${food.name} has been added to your cart.`
    });

    setTimeout(() => setShowSparkle(false), 900);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleToggleFav = (e) => {
    e.stopPropagation();
    toggleFavorite(food.id);
    addToast({
      type: 'info',
      title: favorite ? 'Removed Favorite' : 'Saved to Favorites',
      message: `${food.name} ${favorite ? 'removed from' : 'saved to'} your favorites.`
    });
  };

  const isHotDish = food.spiceLevel === 'hot' || food.spiceLevel === 'extra-hot' || food.category === 'main-course' || food.category === 'biryani-rice';

  return (
    <>
      <TiltCard
        maxTilt={12}
        perspective={1000}
        scaleOnHover={1.04}
        glare={true}
        onClick={() => navigate(`/customer/menu/${food.id}`)}
        className="group relative rounded-3xl glass-card border border-white/10 flex flex-col justify-between cursor-pointer hover:border-ember-500/50 hover:shadow-glow-ember transition-all duration-300 pt-3"
      >
        {/* Layer 1: Food Media with Boundary-Breaking 3D Pop-Out */}
        <div
          className="relative w-full px-3 -mt-5"
          style={{ transform: 'translateZ(38px)', transformStyle: 'preserve-3d' }}
        >
          <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.85)] border border-white/15">
            <img
              src={food.image}
              alt={food.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />

            {/* Rising Heat Steam Wisps for Hot Curries & Dum Biryanis */}
            {isHotDish && <SteamEffect />}

            {/* Floating Garnish Accent (Highest Z-depth: 55px) */}
            <div
              className="absolute top-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
              style={{ transform: 'translateZ(55px)' }}
            >
              <span className="px-2.5 py-0.5 rounded-full bg-ember-500/90 backdrop-blur-md border border-amber-300/50 text-[9px] font-bold uppercase tracking-widest text-white shadow-glow-ember flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-200 animate-spin" /> Dum Sealed
              </span>
            </div>

            {/* Veg / Non-Veg Indicator */}
            <div
              className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{ transform: 'translateZ(48px)' }}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  food.isVeg ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_8px_#ef4444]'
                }`}
              />
              <span className="text-[10px] uppercase font-bold tracking-wider text-white">
                {food.isVeg ? 'Veg' : 'Non-Veg'}
              </span>
            </div>

            {/* Bestseller Badge */}
            {food.isBestseller && (
              <div
                className="absolute top-3 right-12 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-ember-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg"
                style={{ transform: 'translateZ(48px)' }}
              >
                <Flame className="w-3 h-3 fill-current" />
                Crown Jewel
              </div>
            )}

            {/* Favorite Button */}
            <button
              onClick={handleToggleFav}
              aria-label="Add to favorites"
              style={{ transform: 'translateZ(48px)' }}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                favorite
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-500 shadow-glow-gold'
                  : 'bg-black/60 border-white/15 text-zinc-300 hover:text-white hover:bg-black/80 hover:scale-110'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
            </button>

            {/* Prep Time & Calories Overlay */}
            <div
              className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300"
              style={{ transform: 'translateZ(38px)' }}
            >
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10">
                <Clock className="w-3 h-3 text-amber-400" />
                {food.prepTime}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/10">
                {food.calories}
              </span>
            </div>
          </div>
        </div>

        {/* Layer 2: Card Content Body (translateZ: 20px) */}
        <div
          className="p-5 pt-3 flex-1 flex flex-col justify-between"
          style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
        >
          <div>
            {/* Title & Rating */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-serif-brand font-bold text-base text-white group-hover:text-ember-400 transition-colors line-clamp-1">
                {food.name}
              </h3>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold shrink-0">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{food.rating}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
              {food.description}
            </p>
          </div>

          {/* Layer 3: Price & Action CTA (translateZ: 25px) */}
          <div
            className="pt-3 border-t border-white/10 flex items-center justify-between"
            style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
          >
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-white font-serif-brand">
                  ₹{food.discountPrice || food.price}
                </span>
                {food.discountPrice && food.discountPrice < food.price && (
                  <span className="text-xs text-zinc-500 line-through">
                    ₹{food.price}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-zinc-400">Customizable</span>
            </div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleQuickAdd}
                aria-label="Add to cart"
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md overflow-hidden ${
                  justAdded
                    ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-r from-ember-600 to-amber-600 hover:from-ember-500 hover:to-amber-500 text-white shadow-glow-ember'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Add
                  </>
                )}
              </motion.button>

              {/* Sparkle burst on Add */}
              <AnimatePresence>
                {showSparkle && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-xl border-2 border-amber-400 pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </TiltCard>

      {/* Food Customization Modal */}
      <CustomizationModal
        food={food}
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
      />
    </>
  );
}
