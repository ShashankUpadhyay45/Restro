import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

const GALLERY_ITEMS = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    title: 'The Charcoal Hearth',
    caption: 'Ancient clay handis cooking over gentle acacia wood coals for 6 hours uninterrupted.'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
    title: 'Dum Pukht Saffron Pot',
    caption: 'Layered aged basmati rice infused with milk, whole saffron threads, and farm chicken.'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=85',
    title: 'Bhatti Chargrilled Kebabs',
    caption: 'Boneless chicken morsels steeped overnight in roasted mustard oil and Kashmiri chili.'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=85',
    title: 'Artisan Smoked Mixology',
    caption: 'Handcrafted botanical coolers and smoked infusions crafted by our resident mixologist.'
  }
];

export default function Gallery3D() {
  const [activeItem, setActiveItem] = useState(null); // active image object for lightbox

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeItem) return;
      if (e.key === 'Escape') setActiveItem(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setActiveItem(GALLERY_ITEMS[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex((item) => item.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setActiveItem(GALLERY_ITEMS[prevIndex]);
  };

  return (
    <section className="relative w-full py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-400 flex items-center gap-1.5 mb-1.5">
            <Instagram className="w-3.5 h-3.5 text-rose-400" />
            @EmberAndSpiceBlr • Live Hearth Feed
          </span>
          <h2 className="font-serif-brand font-bold text-2xl sm:text-4xl text-white">
            Moments from the Hearth
          </h2>
        </div>
        <p className="text-xs text-zinc-400 max-w-md">
          A glimpse into the living kitchen of charcoal, clay, and sovereign hospitality. Click any frame for cinematic inspection.
        </p>
      </div>

      {/* 3D Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {GALLERY_ITEMS.map((item) => (
          <TiltCard
            key={item.id}
            maxTilt={12}
            perspective={1000}
            scaleOnHover={1.05}
            glare={true}
            onClick={() => setActiveItem(item)}
            className="cursor-pointer group rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-amber-400/50 shadow-xl transition-all duration-300"
          >
            <div
              className="relative h-64 overflow-hidden rounded-2xl"
              style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d' }}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
              />

              {/* Gradient Shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Expand Icon */}
              <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 shadow-lg">
                <Maximize2 className="w-4 h-4 text-amber-300" />
              </div>

              {/* Caption Overlay */}
              <div
                className="absolute bottom-4 left-4 right-4 text-left"
                style={{ transform: 'translateZ(35px)' }}
              >
                <h4 className="font-serif-brand font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-300 line-clamp-1 mt-0.5">
                  {item.caption}
                </p>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveItem(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 z-50 shadow-2xl"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous Image"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 z-50 shadow-2xl"
            >
              <ChevronLeft className="w-6 h-6 text-amber-400" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next Image"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 z-50 shadow-2xl"
            >
              <ChevronRight className="w-6 h-6 text-amber-400" />
            </button>

            {/* Modal Stage Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] bg-zinc-950/90"
            >
              <div className="relative max-h-[70vh] overflow-hidden">
                <img
                  src={activeItem.url}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Bottom Caption Bar */}
              <div className="p-6 sm:p-8 bg-zinc-950/95 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ember & Spice Archival Gallery</span>
                  </div>
                  <h3 className="font-serif-brand font-bold text-xl sm:text-2xl text-white">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
                    {activeItem.caption}
                  </p>
                </div>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ember-600 to-rose-600 text-white text-xs font-semibold flex items-center gap-2 hover:scale-105 transition-all shadow-glow-ember w-max"
                >
                  <Instagram className="w-4 h-4" /> View on Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
