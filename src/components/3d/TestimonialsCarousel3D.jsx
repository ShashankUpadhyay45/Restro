import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsCarousel3D({ reviews = [], autoSlideInterval = 3600 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide loop every 3.6 seconds (resumes smoothly on mouse leave)
  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [isPaused, reviews.length, autoSlideInterval]);

  if (!reviews || reviews.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div
      className="relative w-full py-8 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
    >
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 z-30">
        <button
          onClick={handlePrev}
          aria-label="Previous Review"
          className="p-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-amber-400" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-2 z-30">
        <button
          onClick={handleNext}
          aria-label="Next Review"
          className="p-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronRight className="w-5 h-5 text-amber-400" />
        </button>
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="w-full flex items-center justify-center min-h-[320px] sm:min-h-[360px]"
        style={{ perspective: '1100px' }}
      >
        <div
          className="relative w-full max-w-4xl h-[280px] sm:h-[320px] flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {reviews.map((rev, index) => {
            const count = reviews.length;
            let offset = index - activeIndex;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            const rotateY = offset * -20;
            const translateX = offset * 260;
            const translateZ = isCenter ? 50 : -60;
            const scale = isCenter ? 1.04 : 0.88;
            const opacity = isCenter ? 1 : 0.45;
            const zIndex = isCenter ? 20 : 10;

            return (
              <motion.div
                key={rev.id || index}
                onClick={() => setActiveIndex(index)}
                animate={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex
                }}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 24
                }}
                className={`absolute w-[300px] sm:w-[380px] p-6 sm:p-8 rounded-3xl glass-card border cursor-pointer transition-all flex flex-col justify-between shadow-2xl ${
                  isCenter
                    ? 'border-amber-500/50 bg-zinc-950/90 shadow-[0_20px_50px_rgba(249,115,22,0.3)]'
                    : 'border-white/10 bg-zinc-950/60 hover:border-white/20'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity'
                }}
              >
                <div>
                  {/* Top Quote Icon & Stars */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-amber-500/30" />
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed italic line-clamp-4">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Avatar & Info */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3.5">
                  <img
                    src={rev.userAvatar}
                    alt={rev.userName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/40 shadow"
                  />
                  <div>
                    <h5 className="font-serif-brand font-bold text-sm text-white">
                      {rev.userName}
                    </h5>
                    <span className="text-[11px] text-zinc-400">{rev.date} • Verified Patron</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to review ${idx + 1}`}
            className={`transition-all rounded-full ${
              idx === activeIndex
                ? 'w-6 h-2 bg-gradient-to-r from-ember-500 to-amber-500 shadow-glow-ember'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
