import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Clock, Award, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import TiltCard from './TiltCard';

const CHAPTERS = [
  {
    year: '1998',
    title: 'The Ancestral Hearth',
    tagline: 'Old Lucknow • Hand-Carved Brass Handis',
    description:
      'In a quiet cobblestone alley of Chowk, Ustad Ali Raza lit a single coal hearth that has never gone dark. Every biryani was sealed under whole wheat dough and cooked over gentle embers for six uninterrupted hours.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    stat: '28 Years',
    statLabel: 'Continuous Hearth Ember'
  },
  {
    year: '2012',
    title: 'The Sacred Masala Vault',
    tagline: '32 Heirloom Hand-Pounded Botanicals',
    description:
      'We partnered with generational spice farmers in Wayanad and Kashmir. We stone-crush cardamom, star anise, saffron threads, and stone flowers daily in small mortar batches, strictly refusing industrial grinding.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80',
    stat: '100% Stone-Pounded',
    statLabel: 'Zero Pre-Ground Powders'
  },
  {
    year: '2026',
    title: 'Sovereign Gastronomy',
    tagline: 'Crafted Fire • Modern Luxury',
    description:
      'Today, Ember & Spice brings authentic royal Awadhi dining into the contemporary era. We honor timeless techniques with modern kitchen precision, farm-to-table traceability, and immersive multi-sensory presentations.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    stat: '500,000+ Guests',
    statLabel: 'Celebrated Diners'
  }
];

export default function RestaurantStory3D() {
  const [activeChapter, setActiveChapter] = useState(0);

  const current = CHAPTERS[activeChapter];

  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* Background Ambient Ember Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-ember-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ember-500/10 border border-ember-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5 text-ember-400 animate-pulse" />
            <span>The Chronicle of Fire</span>
          </div>
          <h2 className="font-serif-brand font-bold text-3xl sm:text-4xl text-white">
            From Sacred Coals to Sovereign Banquets
          </h2>
          <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
            Every dish we serve is forged through the living art of Dum Pukht cooking—where time, pure wood charcoal, and heritage patience create culinary magic.
          </p>
        </div>

        {/* Timeline Stepper Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-10 overflow-x-auto pb-2">
          {CHAPTERS.map((chap, idx) => (
            <button
              key={chap.year}
              onClick={() => setActiveChapter(idx)}
              className={`px-5 py-2.5 rounded-2xl font-serif-brand text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 backdrop-blur-md border ${
                activeChapter === idx
                  ? 'bg-gradient-to-r from-ember-600 to-amber-600 text-white border-amber-400/50 shadow-glow-ember scale-105'
                  : 'bg-black/50 text-zinc-400 hover:text-white border-white/10 hover:border-white/20'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" style={{ display: activeChapter === idx ? 'inline-block' : 'none' }} />
              <span className="font-mono font-bold">{chap.year}</span>
              <span className="hidden sm:inline">• {chap.title}</span>
            </button>
          ))}
        </div>

        {/* 3D Story Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Layered Image Stage */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={10}
              perspective={1100}
              scaleOnHover={1.02}
              glare={true}
              className="relative w-full rounded-3xl overflow-hidden glass-card border border-white/15 p-3 shadow-2xl bg-zinc-950/80"
            >
              <div
                className="relative h-[340px] sm:h-[420px] rounded-2xl overflow-hidden"
                style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.image}
                    src={current.image}
                    alt={current.title}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </AnimatePresence>

                {/* Film grain / dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Floating Metric Badge in 3D Space */}
                <div
                  className="absolute bottom-6 left-6 right-6 flex items-center justify-between backdrop-blur-md bg-black/60 border border-white/15 p-4 rounded-2xl shadow-xl"
                  style={{ transform: 'translateZ(45px)' }}
                >
                  <div>
                    <p className="font-serif-brand font-bold text-lg sm:text-xl text-amber-300">
                      {current.stat}
                    </p>
                    <p className="text-[11px] text-zinc-300 font-medium">
                      {current.statLabel}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-ember-500/20 text-ember-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right: Narrative Description */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.year}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-wider">
                  <Clock className="w-4 h-4 text-ember-400" />
                  <span>CHAPTER {activeChapter + 1} OF 3 • EST. {current.year}</span>
                </div>

                <h3 className="font-serif-brand font-bold text-2xl sm:text-3xl text-white">
                  {current.title}
                </h3>

                <p className="text-xs uppercase font-semibold tracking-wider text-amber-300/90">
                  {current.tagline}
                </p>

                <p className="text-sm text-zinc-300 leading-relaxed pt-2">
                  {current.description}
                </p>

                {/* Heritage Pillars */}
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-zinc-200 font-medium">Aged Basmati</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs text-zinc-200 font-medium">No Preservatives</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => setActiveChapter((prev) => (prev + 1) % CHAPTERS.length)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 hover:from-ember-500 hover:to-amber-500 text-white text-xs font-semibold flex items-center gap-2 shadow-glow-ember transition-all"
                  >
                    <span>Next Chapter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
