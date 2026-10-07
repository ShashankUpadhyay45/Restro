import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Heart,
  Clock,
  Flame,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Sparkles,
  Layers,
  MessageSquare
} from 'lucide-react';
import FoodViewer3D from '../../components/3d/FoodViewer3D';
import { useRestaurant } from '../../context/RestaurantContext';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

export default function FoodDetailPage() {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const { foods, isFavorite, toggleFavorite, reviews } = useRestaurant();
  const { addToCart } = useCart();
  const { addToast } = useNotification();

  const food = foods.find((f) => f.id === foodId) || foods[0];
  const favorite = isFavorite(food.id);

  // Customization States
  const portions = food.customizations?.portions || [{ name: 'Regular Portion', priceDelta: 0 }];
  const availableAddOns = food.customizations?.addOns || [];

  const [selectedPortion, setSelectedPortion] = useState(portions[0]);
  const [spiceLevel, setSpiceLevel] = useState(food.spiceLevel || 'medium');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeMediaTab, setActiveMediaTab] = useState('3d'); // '3d' | 'image'

  const toggleAddOn = (addOn) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.name === addOn.name);
      return exists ? prev.filter((a) => a.name !== addOn.name) : [...prev, addOn];
    });
  };

  const basePrice = food.discountPrice || food.price;
  const portionDelta = selectedPortion.priceDelta || 0;
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + (item.price || 0), 0);
  const unitPrice = basePrice + portionDelta + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = (redirectCheckout = false) => {
    addToCart({
      food,
      quantity,
      portion: selectedPortion.name,
      portionDelta,
      spiceLevel,
      selectedAddOns
    });

    addToast({
      type: 'success',
      title: 'Added to Feast',
      message: `${quantity}x ${food.name} added to cart.`
    });

    if (redirectCheckout) {
      navigate('/customer/checkout');
    }
  };

  const foodReviews = reviews.filter((r) => r.foodId === food.id || r.foodId === 'food_09');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl glass-panel bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Link to="/customer/home" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/customer/menu" className="hover:text-white">Menu</Link>
          <span>/</span>
          <span className="text-ember-400 font-semibold">{food.name}</span>
        </div>
      </div>

      {/* Main Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: 3D Pedestal & Visuals */}
        <div className="lg:col-span-6 space-y-4">
          {/* Tab Selector between 3D Pedestal and High-Res Photo */}
          <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 w-max">
            <button
              onClick={() => setActiveMediaTab('3d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeMediaTab === '3d' ? 'bg-ember-500 text-white shadow-glow-ember' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> 3D Interactive View
            </button>
            <button
              onClick={() => setActiveMediaTab('image')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeMediaTab === 'image' ? 'bg-ember-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              High-Res Photograph
            </button>
          </div>

          {activeMediaTab === '3d' ? (
            <FoodViewer3D isVeg={food.isVeg} spiceLevel={spiceLevel} />
          ) : (
            <div className="w-full h-80 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
              <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Nutritional Breakdown Ribbon */}
          {food.nutritionalInfo && (
            <div className="p-4 rounded-2xl glass-card border border-white/10 grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400">Calories</p>
                <p className="font-serif-brand font-bold text-sm text-white mt-0.5">{food.calories}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400">Protein</p>
                <p className="font-serif-brand font-bold text-sm text-emerald-400 mt-0.5">{food.nutritionalInfo.protein}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400">Carbs</p>
                <p className="font-serif-brand font-bold text-sm text-amber-400 mt-0.5">{food.nutritionalInfo.carbs}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400">Fats</p>
                <p className="font-serif-brand font-bold text-sm text-rose-400 mt-0.5">{food.nutritionalInfo.fat}</p>
              </div>
            </div>
          )}

          {/* Ingredients & Allergens */}
          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
              Heirloom Ingredients
            </h4>
            <div className="flex flex-wrap gap-2">
              {food.ingredients?.map((ing) => (
                <span key={ing} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300">
                  {ing}
                </span>
              ))}
            </div>

            {food.allergens?.length > 0 && (
              <div className="pt-2 flex items-center gap-2 text-xs text-amber-400/90">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Allergen Notice: Contains {food.allergens.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Culinary Details, Customizations & Pricing */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                food.isVeg ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {food.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
              </span>

              <button
                onClick={() => toggleFavorite(food.id)}
                className={`p-2.5 rounded-full border transition-all ${
                  favorite ? 'bg-rose-500/20 text-rose-500 border-rose-500/40' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h1 className="font-serif-brand font-extrabold text-3xl sm:text-4xl text-white">
              {food.name}
            </h1>

            {/* Rating & Prep Time */}
            <div className="flex items-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{food.rating} ({food.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-zinc-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{food.prepTime}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-4">
              {food.description}
            </p>
          </div>

          {/* Portion Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
              Choose Portion Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              {portions.map((portion) => {
                const isSelected = selectedPortion.name === portion.name;
                return (
                  <button
                    key={portion.name}
                    type="button"
                    onClick={() => setSelectedPortion(portion)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-ember-500 bg-ember-500/10 text-white shadow-glow-ember ring-1 ring-ember-400'
                        : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">{portion.name}</p>
                      <span className="text-[11px] text-ember-400">
                        {portion.priceDelta > 0 ? `+₹${portion.priceDelta}` : 'Standard Base'}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-ember-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spice Heat Selection */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-ember-400" /> Spice Heat Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'mild', label: 'Mild' },
                { id: 'medium', label: 'Medium' },
                { id: 'hot', label: 'Hot' },
                { id: 'extra-hot', label: 'Fiery 24K' }
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSpiceLevel(s.id)}
                  className={`py-2 px-1 rounded-xl text-center border text-xs font-semibold transition-all ${
                    spiceLevel === s.id
                      ? 'border-ember-500 bg-ember-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-zinc-400'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gourmet Add-ons */}
          {availableAddOns.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Royal Accompaniments & Add-ons
              </label>
              <div className="space-y-2">
                {availableAddOns.map((addOn) => {
                  const isChecked = selectedAddOns.some((a) => a.name === addOn.name);
                  return (
                    <button
                      key={addOn.name}
                      type="button"
                      onClick={() => toggleAddOn(addOn)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                        isChecked ? 'border-ember-500 bg-ember-500/10 text-white' : 'border-white/10 bg-white/5 text-zinc-400'
                      }`}
                    >
                      <span className="text-xs font-medium">{addOn.name}</span>
                      <span className="text-xs font-bold text-ember-400">+₹{addOn.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing Calculation & Quantity Bar */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-400">Total Price</p>
                <p className="font-serif-brand font-extrabold text-2xl text-white">₹{totalPrice}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-base font-bold text-white w-6 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleAddToCart(false)}
                className="py-3.5 rounded-2xl glass-panel bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add to Feast
              </button>

              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                className="py-3.5 rounded-2xl bg-gradient-to-r from-ember-600 via-amber-600 to-rose-600 text-white font-semibold text-xs shadow-glow-ember hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                Order Now • ₹{totalPrice}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Reviews Section */}
      <div className="pt-10 border-t border-white/10 space-y-6">
        <h3 className="font-serif-brand font-bold text-xl text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-400" />
          Diner Reviews ({foodReviews.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foodReviews.map((rev) => (
            <div key={rev.id} className="p-5 rounded-2xl glass-card border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={rev.userAvatar} alt={rev.userName} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h5 className="font-serif-brand font-semibold text-xs text-white">{rev.userName}</h5>
                    <span className="text-[10px] text-zinc-500">{rev.date}</span>
                  </div>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-300 italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
