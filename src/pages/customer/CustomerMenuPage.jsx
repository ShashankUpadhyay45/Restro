import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Star,
  Check,
  X,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import FoodCard from '../../components/restaurant/FoodCard';
import EmptyState from '../../components/common/EmptyState';
import { useRestaurant } from '../../context/RestaurantContext';
import { CATEGORIES } from '../../data/mockData';

import CategoryCarousel3D from '../../components/3d/CategoryCarousel3D';

export default function CustomerMenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { foods } = useRestaurant();

  const initialCat = searchParams.get('category') || 'all';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [show3DCategories, setShow3DCategories] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietary, setDietary] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [selectedSpice, setSelectedSpice] = useState('all'); // 'all' | 'mild' | 'medium' | 'hot' | 'extra-hot'
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high' | 'rating'
  const [maxPrice, setMaxPrice] = useState(800);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter & Sort Logic
  const filteredDishes = useMemo(() => {
    return foods
      .filter((food) => {
        // Category
        if (selectedCategory !== 'all' && food.category !== selectedCategory) return false;
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = food.name.toLowerCase().includes(q);
          const matchDesc = food.description.toLowerCase().includes(q);
          if (!matchName && !matchDesc) return false;
        }
        // Dietary
        if (dietary === 'veg' && !food.isVeg) return false;
        if (dietary === 'non-veg' && food.isVeg) return false;
        // Spice
        if (selectedSpice !== 'all' && food.spiceLevel !== selectedSpice) return false;
        // Bestseller
        if (bestsellerOnly && !food.isBestseller) return false;
        // Price
        const effectivePrice = food.discountPrice || food.price;
        if (effectivePrice > maxPrice) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Popular / Default
        return b.reviewsCount - a.reviewsCount;
      });
  }, [foods, selectedCategory, searchQuery, dietary, selectedSpice, bestsellerOnly, maxPrice, sortBy]);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setDietary('all');
    setSelectedSpice('all');
    setBestsellerOnly(false);
    setMaxPrice(800);
    setSortBy('popular');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-ember-400">
          The Grand Feast
        </span>
        <h1 className="font-serif-brand font-bold text-3xl sm:text-4xl text-white">
          A La Carte Menu Repertoire
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Charcoal-braised curries, hand-stretched tandoori rotis, and fragrant Lucknowi dum biryanis cooked to your preference.
        </p>

        {/* View Mode Toggle Pill */}
        <div className="pt-2 flex justify-center">
          <button
            type="button"
            onClick={() => setShow3DCategories((prev) => !prev)}
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-[11px] font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{show3DCategories ? 'Hide 3D Stage' : 'Show 3D Category Carousel'}</span>
          </button>
        </div>
      </div>

      {/* 3D Category Carousel (if toggled) */}
      {show3DCategories && (
        <div className="relative">
          <CategoryCarousel3D
            categories={CATEGORIES}
            activeId={selectedCategory}
            onSelectCategory={handleCategoryClick}
          />
        </div>
      )}

      {/* Horizontal Category Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-gradient-to-r from-ember-600 to-amber-600 text-white border-amber-400/40 shadow-glow-ember'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${isSelected ? 'fill-current' : 'text-ember-400'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish or spice notes..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-ember-500 transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Quick Toggles */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Veg / Non-Veg Buttons */}
          <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 text-xs">
            {['all', 'veg', 'non-veg'].map((d) => (
              <button
                key={d}
                onClick={() => setDietary(d)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  dietary === d ? 'bg-ember-500 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {d === 'veg' ? 'Veg Only' : d === 'non-veg' ? 'Non-Veg' : 'All Diets'}
              </button>
            ))}
          </div>

          {/* Bestseller Checkbox */}
          <button
            onClick={() => setBestsellerOnly(!bestsellerOnly)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              bestsellerOnly ? 'border-amber-400 bg-amber-500/20 text-amber-300' : 'border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Bestsellers Only
          </button>
        </div>

        {/* Sort Dropdown & Mobile Filter Toggle */}
        <div className="w-full md:w-auto flex items-center justify-between gap-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 flex items-center gap-2"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-ember-400" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-ember-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated (★)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expandable Filter Drawer for Mobile & Detailed Filter Settings */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-2xl p-5 border border-white/10 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Dietary */}
              <div>
                <label className="text-xs font-bold uppercase text-zinc-300 mb-2 block">
                  Dietary Preference
                </label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'veg', 'non-veg'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDietary(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs capitalize ${
                        dietary === d ? 'bg-ember-500 text-white font-bold' : 'bg-white/5 text-zinc-400'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spice Heat */}
              <div>
                <label className="text-xs font-bold uppercase text-zinc-300 mb-2 block">
                  Spice Heat
                </label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'mild', 'medium', 'hot', 'extra-hot'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSpice(s)}
                      className={`px-2.5 py-1 rounded-lg text-xs capitalize ${
                        selectedSpice === s ? 'bg-amber-500 text-white font-bold' : 'bg-white/5 text-zinc-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-zinc-300 mb-2">
                  <span>Max Price</span>
                  <span className="text-ember-400 font-serif-brand">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="800"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-ember-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={resetFilters}
                className="text-xs text-rose-400 hover:underline"
              >
                Reset all filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Food Grid / Empty State */}
      {filteredDishes.length === 0 ? (
        <EmptyState
          icon={Flame}
          title="No Dishes Match Your Selection"
          description="We couldn't locate dishes matching your current filter criteria. Try expanding your price range or resetting spice filters."
          actionLabel="Reset Filters"
          onAction={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}
