import React from 'react';
import { Heart } from 'lucide-react';
import FoodCard from '../../components/restaurant/FoodCard';
import EmptyState from '../../components/common/EmptyState';
import { useRestaurant } from '../../context/RestaurantContext';

export default function FavoritesPage() {
  const { foods, favorites } = useRestaurant();

  const favoriteDishes = foods.filter((f) => favorites.includes(f.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <span className="text-xs uppercase tracking-widest font-bold text-rose-400">
          Saved Gastronomy
        </span>
        <h1 className="font-serif-brand font-bold text-2xl sm:text-3xl text-white">
          Your Treasured Dishes ({favoriteDishes.length})
        </h1>
      </div>

      {favoriteDishes.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No Favorite Dishes Saved"
          description="Click the heart icon on any charcoal curry, biryani, or dessert to bookmark it for fast ordering."
          actionLabel="Browse Menu"
          actionLink="/customer/menu"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteDishes.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}
