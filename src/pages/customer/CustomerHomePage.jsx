import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  Calendar,
  Utensils,
  Sparkles,
  ArrowRight,
  Clock,
  Star,
  Tag,
  Copy,
  CheckCircle2,
  Award
} from 'lucide-react';
import Hero3D from '../../components/3d/Hero3D';
import FoodCard from '../../components/restaurant/FoodCard';
import TiltCard from '../../components/3d/TiltCard';
import CategoryCarousel3D from '../../components/3d/CategoryCarousel3D';
import FoodShowcase3D from '../../components/3d/FoodShowcase3D';
import RestaurantStory3D from '../../components/3d/RestaurantStory3D';
import TestimonialsCarousel3D from '../../components/3d/TestimonialsCarousel3D';
import Gallery3D from '../../components/3d/Gallery3D';
import MagneticButton from '../../components/3d/MagneticButton';
import FloatingIngredients from '../../components/3d/FloatingIngredients';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import { CATEGORIES } from '../../data/mockData';

export default function CustomerHomePage() {
  const { foods, offers, reviews } = useRestaurant();
  const { addToast } = useNotification();

  const popularDishes = foods.filter((f) => f.isBestseller || f.isFeatured).slice(0, 4);
  const [heroMediaMode, setHeroMediaMode] = useState('3d');

  const handleCopyCoupon = (code) => {
    navigator.clipboard?.writeText(code);
    addToast({
      type: 'success',
      title: 'Coupon Copied',
      message: `Code "${code}" copied to clipboard. Apply at checkout!`
    });
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 relative overflow-hidden">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-14 lg:pt-14 lg:pb-24 border-b border-white/10">
        {/* Floating Botanicals & Spices in Hero Canvas */}
        <FloatingIngredients />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Brand Story & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ember-500/10 border border-ember-500/30 text-amber-300 text-xs font-semibold shadow-inner">
                <Flame className="w-3.5 h-3.5 text-ember-400 fill-current animate-pulse" />
                <span>Ancient Awadhi Dum • Wood Charcoal Embers</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
                CRAFTED FIRE.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember-400 via-amber-300 to-rose-500 drop-shadow-md">
                  AUTHENTIC
                </span>{' '}
                FLAVOR.
              </h1>

              <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed">
                Step into Bengaluru's sanctuary of charcoal gastronomy. From 24-hour slow-simmered Dal Bukhara to saffron-sealed handi biryanis, experience fine Indian dining reimagined in rich 3D.
              </p>

              {/* Action Buttons with Magnetic Pull */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <MagneticButton strength={12}>
                  <Link
                    to="/customer/menu"
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-ember-600 via-amber-600 to-rose-600 text-white font-bold text-sm shadow-glow-ember hover:scale-105 transition-all flex items-center gap-2.5"
                  >
                    <Utensils className="w-4 h-4" /> Order Feast Online
                  </Link>
                </MagneticButton>

                <MagneticButton strength={12}>
                  <Link
                    to="/customer/book-table"
                    className="px-8 py-4 rounded-2xl glass-panel bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 hover:border-amber-400 transition-all flex items-center gap-2.5"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" /> Reserve a Table
                  </Link>
                </MagneticButton>
              </div>

              {/* Trust Metrics */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <p className="font-serif-brand font-extrabold text-2xl text-white">4.9 ★</p>
                  <p className="text-[11px] text-zinc-400">1,400+ Diners</p>
                </div>
                <div>
                  <p className="font-serif-brand font-extrabold text-2xl text-white">24H</p>
                  <p className="text-[11px] text-zinc-400">Slow Charcoal Dum</p>
                </div>
                <div>
                  <p className="font-serif-brand font-extrabold text-2xl text-white">100%</p>
                  <p className="text-[11px] text-zinc-400">Pure Desi Ghee</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Grand Visual Showcase (Interactive 3D / Ultra-HD Photo) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="lg:col-span-6 relative w-full flex flex-col items-center justify-center"
            >
              {/* Radial Glowing Aura Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-ember-600/30 via-amber-500/20 to-rose-600/10 rounded-full blur-[110px] pointer-events-none transform -translate-y-4" />

              {/* Showcase Wrapper Card */}
              <div className="relative w-full rounded-3xl glass-card border border-white/15 p-2 sm:p-4 overflow-hidden shadow-2xl bg-zinc-950/70 backdrop-blur-2xl">
                {/* View Switcher Header Pill */}
                <div className="absolute top-4 right-4 z-20 flex rounded-full bg-black/75 backdrop-blur-md p-1 border border-white/15 shadow-xl">
                  <button
                    type="button"
                    onClick={() => setHeroMediaMode('3d')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1.5 transition-all ${
                      heroMediaMode === '3d'
                        ? 'bg-gradient-to-r from-ember-600 to-amber-600 text-white shadow-glow-ember'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>3D Handi Model</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroMediaMode('photo')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                      heroMediaMode === 'photo'
                        ? 'bg-gradient-to-r from-ember-600 to-amber-600 text-white shadow-glow-ember'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>Royal Feast Platter</span>
                  </button>
                </div>

                {/* Main Media Stage */}
                <div className="w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden relative flex items-center justify-center">
                  {heroMediaMode === '3d' ? (
                    <Hero3D />
                  ) : (
                    <div className="w-full h-full relative group">
                      <img
                        src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85"
                        alt="Dum Pukht Handi Feast"
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-2xl" />
                      <div className="absolute bottom-6 left-6 right-6 text-left">
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider inline-block mb-2">
                          Chef's Crown Signature
                        </span>
                        <h3 className="font-serif-brand font-bold text-xl text-white">
                          Dum Pukht Lucknowi Handi Biryani
                        </h3>
                        <p className="text-xs text-zinc-300 mt-1 max-w-md">
                          Layered aged Dehradun basmati rice with farm-fresh chicken, steeped in saffron milk and sealed under dough on glowing charcoal.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Floating Micro-Badge Top Left */}
                  <div className="hidden sm:flex absolute top-4 left-4 z-20 px-3 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 items-center gap-2.5 shadow-xl">
                    <div className="w-7 h-7 rounded-xl bg-ember-500/20 text-ember-400 flex items-center justify-center font-bold">
                      <Flame className="w-4 h-4 fill-current animate-pulse" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white">Dum Pukht Seal</p>
                      <p className="text-[9px] text-zinc-400">24H Charcoal Coals</p>
                    </div>
                  </div>

                  {/* Floating Micro-Badge Bottom Right */}
                  <div className="hidden sm:flex absolute bottom-5 right-5 z-20 px-3.5 py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 items-center gap-2.5 shadow-xl">
                    <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white">4.9 Crown Rating</p>
                      <p className="text-[9px] text-amber-300 font-medium">100% Desi Cow Ghee</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. QUICK ACTIONS BAR WITH 3D TILT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { title: 'Order Online', desc: 'Direct delivery in 35 mins', icon: Utensils, link: '/customer/menu', color: 'from-amber-500 to-ember-600' },
            { title: 'Book a Table', desc: 'Interactive 3D floor plan', icon: Calendar, link: '/customer/book-table', color: 'from-purple-600 to-indigo-600' },
            { title: 'View Menu', desc: '16+ royal heirloom recipes', icon: Sparkles, link: '/customer/menu', color: 'from-emerald-500 to-teal-600' },
            { title: 'Track Order', desc: 'Real-time kitchen timeline', icon: Clock, link: '/customer/orders', color: 'from-rose-500 to-orange-600' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <TiltCard key={item.title} maxTilt={10} scaleOnHover={1.03} glare={false}>
                <Link
                  to={item.link}
                  className="group p-5 rounded-3xl glass-card border border-white/10 hover:border-amber-400/40 transition-all flex items-start gap-4 block h-full shadow-lg hover:shadow-glow-ember"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-brand font-semibold text-sm sm:text-base text-white group-hover:text-ember-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</p>
                  </div>
                </Link>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE SIGNATURE FOOD SHOWCASE (DIGITAL FOOD CATALOG) */}
      <FoodShowcase3D foods={foods} />

      {/* 4. 3D MENU CATEGORY CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-ember-400">
              Heirloom Repertoire
            </span>
            <h2 className="font-serif-brand font-bold text-2xl sm:text-4xl text-white mt-1">
              Curated Gastronomic Chapters
            </h2>
          </div>
          <Link
            to="/customer/menu"
            className="text-xs font-semibold text-ember-400 hover:text-ember-300 flex items-center gap-1"
          >
            Explore Full Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3D Category Perspective Stage */}
        <CategoryCarousel3D
          categories={CATEGORIES.filter((c) => c.id !== 'all')}
          navigateOnSelect={true}
        />
      </section>

      {/* 5. POPULAR DISHES (BOUNDARY-BREAKING 3D FOOD CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-ember-400">
              Crown Jewels
            </span>
            <h2 className="font-serif-brand font-bold text-2xl sm:text-4xl text-white mt-1">
              Popular Royal Dishes
            </h2>
          </div>
          <Link
            to="/customer/menu"
            className="text-xs font-semibold text-ember-400 hover:text-ember-300 flex items-center gap-1"
          >
            View All ({foods.length}) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularDishes.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </section>

      {/* 6. CINEMATIC RESTAURANT STORY & HERITAGE (1998 -> TODAY) */}
      <RestaurantStory3D />

      {/* 7. HOLOGRAPHIC 3D OFFERS & COUPONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
            Royal Privileges
          </span>
          <h2 className="font-serif-brand font-bold text-2xl sm:text-4xl text-white mt-1">
            Active Gastronomic Vouchers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <TiltCard key={offer.code} maxTilt={12} scaleOnHover={1.03} glare={true}>
              <div className="holographic-card p-6 rounded-3xl glass-card border border-white/15 flex flex-col justify-between hover:border-amber-400/50 transition-colors h-full shadow-2xl">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/40 shadow-sm">
                      {offer.discount}
                    </span>
                    <Tag className="w-4 h-4 text-zinc-400" />
                  </div>
                  <h4 className="font-serif-brand font-bold text-lg text-white">{offer.title}</h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{offer.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-amber-400 tracking-wider">
                    {offer.code}
                  </span>
                  <button
                    onClick={() => handleCopyCoupon(offer.code)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shadow"
                  >
                    <Copy className="w-3.5 h-3.5 text-amber-300" /> Copy
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 8. 3D TESTIMONIALS PERSPECTIVE CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-ember-400">
            Diner Acclaim
          </span>
          <h2 className="font-serif-brand font-bold text-2xl sm:text-4xl text-white mt-1">
            Words from Sovereign Diners
          </h2>
        </div>

        <TestimonialsCarousel3D reviews={reviews} />
      </section>

      {/* 9. INTERACTIVE 3D RESTAURANT GALLERY WITH LIGHTBOX */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Gallery3D />
      </div>

      {/* 10. FINAL GRAND ROYAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard maxTilt={6} scaleOnHover={1.01} glare={true}>
          <div className="rounded-3xl relative overflow-hidden glass-panel border border-ember-500/40 p-8 sm:p-14 bg-gradient-to-r from-ember-950/95 via-zinc-950 to-charcoal-950 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-center max-w-5xl mx-auto">
            <div className="relative z-10 space-y-5 max-w-2xl mx-auto">
              <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest inline-block shadow">
                ✦ An Unmatched Culinary Reverie ✦
              </span>

              <h2 className="font-serif-brand font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
                Experience Crafted Fire Tonight
              </h2>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Whether savored under candlelit chandeliers in our sanctuary or delivered piping hot to your residence, Ember & Spice invites you to partake in royal gastronomy.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <MagneticButton strength={12}>
                  <Link
                    to="/customer/book-table"
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-ember-600 via-amber-600 to-rose-600 text-white font-bold text-sm shadow-glow-ember hover:scale-105 transition-all inline-flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-white" /> Reserve Your Table
                  </Link>
                </MagneticButton>

                <MagneticButton strength={12}>
                  <Link
                    to="/customer/menu"
                    className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 hover:border-amber-400 transition-all inline-flex items-center gap-2"
                  >
                    <Utensils className="w-4 h-4 text-amber-300" /> Order Online Delivery
                  </Link>
                </MagneticButton>
              </div>
            </div>

            {/* Radial background aura */}
            <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </TiltCard>
      </section>
    </div>
  );
}
