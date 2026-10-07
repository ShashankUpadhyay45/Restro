import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Flame, Sparkles, Soup, Utensils, Wheat, Cake, Coffee, CircleDot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CATEGORY_IMAGES = {
  all: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
  starters: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
  'main-course': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
  'biryani-rice': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
  breads: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  desserts: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
  beverages: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
};

const ICON_MAP = {
  Sparkles,
  Flame,
  Soup,
  Wheat,
  CircleDot,
  Cake,
  Coffee,
  Utensils
};

export default function CategoryCarousel3D({
  categories = [],
  activeId = null,
  onSelectCategory = null,
  navigateOnSelect = false,
  autoSlideInterval = 3800
}) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  // Sync active index with activeId prop if provided
  useEffect(() => {
    if (activeId && categories.length > 0) {
      const idx = categories.findIndex((c) => c.id === activeId);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [activeId, categories]);

  // Automatic Smooth Auto-Slide Loop
  useEffect(() => {
    if (isPaused || categories.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [isPaused, categories.length, autoSlideInterval]);

  if (!categories || categories.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const handleCardClick = (cat, index) => {
    setActiveIndex(index);
    if (onSelectCategory) {
      onSelectCategory(cat.id);
    }
    if (navigateOnSelect) {
      navigate(`/customer/menu?category=${cat.id}`);
    }
  };

  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <div
      className="relative w-full py-6 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 z-30">
        <button
          onClick={handlePrev}
          aria-label="Previous Category"
          className="p-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-amber-400" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 z-30">
        <button
          onClick={handleNext}
          aria-label="Next Category"
          className="p-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-amber-400" />
        </button>
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="w-full flex items-center justify-center min-h-[300px] sm:min-h-[340px]"
        style={{ perspective: '1200px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative w-full max-w-4xl h-[280px] sm:h-[320px] flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {categories.map((cat, index) => {
            const count = categories.length;
            // Calculate distance from activeIndex with wrapping
            let offset = index - activeIndex;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2; // only render within 2 slots

            if (!isVisible) return null;

            const rotateY = offset * -22; // Inverted rotation for natural convex arc
            const translateX = offset * 220; // Horizontal separation
            const translateZ = isCenter ? 60 : -Math.abs(offset) * 80;
            const scale = isCenter ? 1.05 : 0.88;
            const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.75 : 0.35;
            const zIndex = 20 - Math.abs(offset);

            const IconComponent = ICON_MAP[cat.icon] || Flame;
            const bgImage = CATEGORY_IMAGES[cat.id] || CATEGORY_IMAGES.all;

            return (
              <motion.div
                key={cat.id}
                onClick={() => handleCardClick(cat, index)}
                animate={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 24
                }}
                className={`absolute w-56 sm:w-64 h-[250px] sm:h-[280px] rounded-3xl overflow-hidden cursor-pointer border transition-colors shadow-2xl ${
                  isCenter
                    ? 'border-amber-400/80 shadow-[0_20px_50px_rgba(249,115,22,0.4)]'
                    : 'border-white/10 hover:border-white/30'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity'
                }}
              >
                {/* Background Image with Parallax Vibe */}
                <img
                  src={bgImage}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />

                {/* Dark Charcoal Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity ${
                    isCenter
                      ? 'bg-gradient-to-t from-black via-black/40 to-transparent'
                      : 'bg-black/60 group-hover:bg-black/40'
                  }`}
                />

                {/* Center Badge if Active */}
                {isCenter && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-ember-600 to-amber-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    Viewing Chapter
                  </div>
                )}

                {/* Bottom Content Card */}
                <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col items-center text-center">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2.5 shadow-lg backdrop-blur-md transition-all ${
                      isCenter
                        ? 'bg-amber-500/30 border border-amber-400/50 text-amber-300 scale-110'
                        : 'bg-black/50 border border-white/15 text-zinc-300'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif-brand font-bold text-base sm:text-lg text-white drop-shadow-md">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-amber-200/80 mt-1 font-medium">
                    {cat.count} Royal Delicacies
                  </p>

                  {isCenter && (
                    <span className="mt-2 text-[10px] uppercase font-bold tracking-widest text-ember-400 underline decoration-amber-400 underline-offset-4">
                      Explore Delicacies →
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to category ${cat.name}`}
            className={`transition-all rounded-full ${
              idx === activeIndex
                ? 'w-7 h-2 bg-gradient-to-r from-ember-500 to-amber-500 shadow-glow-ember'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
