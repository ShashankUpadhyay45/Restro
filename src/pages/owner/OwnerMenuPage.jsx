import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Flame,
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../../components/common/Modal';

export default function OwnerMenuPage() {
  const { foods, addFood, updateFood, deleteFood, toggleFoodStock } = useRestaurant();
  const { addToast } = useNotification();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State for Add / Edit Food
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFoodId, setEditingFoodId] = useState(null);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('starters');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [spiceLevel, setSpiceLevel] = useState('medium');
  const [isBestseller, setIsBestseller] = useState(false);
  const [prepTime, setPrepTime] = useState('20-25 mins');
  const [calories, setCalories] = useState('450 kcal');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const openAddModal = () => {
    setEditingFoodId(null);
    setName('');
    setCategory('starters');
    setPrice('450');
    setDiscountPrice('395');
    setIsVeg(true);
    setSpiceLevel('medium');
    setIsBestseller(false);
    setPrepTime('20 mins');
    setCalories('420 kcal');
    setImage('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80');
    setDescription('');
    setIsModalOpen(true);
  };

  const openEditModal = (food) => {
    setEditingFoodId(food.id);
    setName(food.name);
    setCategory(food.category);
    setPrice(food.price);
    setDiscountPrice(food.discountPrice || '');
    setIsVeg(food.isVeg);
    setSpiceLevel(food.spiceLevel);
    setIsBestseller(food.isBestseller);
    setPrepTime(food.prepTime);
    setCalories(food.calories);
    setImage(food.image);
    setDescription(food.description);
    setIsModalOpen(true);
  };

  const handleSaveFood = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const payload = {
      name,
      category,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : Number(price),
      isVeg,
      spiceLevel,
      isBestseller,
      prepTime,
      calories,
      image: image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: description || 'Crafted with premium spices in our charcoal hearth oven.'
    };

    if (editingFoodId) {
      updateFood(editingFoodId, payload);
      addToast({ type: 'success', title: 'Dish Updated', message: `${name} has been modified.` });
    } else {
      addFood(payload);
      addToast({ type: 'success', title: 'Dish Added', message: `${name} added to the royal menu.` });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id, foodName) => {
    if (window.confirm(`Are you sure you want to remove "${foodName}" from the menu?`)) {
      deleteFood(id);
      addToast({ type: 'info', title: 'Dish Removed', message: `${foodName} was deleted.` });
    }
  };

  const filteredFoods = foods.filter((f) => {
    if (categoryFilter !== 'all' && f.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!f.name.toLowerCase().includes(q) && !f.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
            Culinary Repertoire Control
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white">
            Menu Catalog Management ({foods.length} Dishes)
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg hover:opacity-90 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="glass-card rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu items..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {['all', 'starters', 'main-course', 'biryani-rice', 'breads', 'desserts', 'beverages'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs capitalize whitespace-nowrap transition-colors ${
                categoryFilter === cat ? 'bg-purple-600 text-white font-semibold' : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Food Items Table */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 font-semibold bg-white/5">
                <th className="p-4">Dish</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Diet & Heat</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Inventory Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFoods.map((food) => (
                <tr key={food.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={food.image} alt={food.name} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                    <div>
                      <p className="font-semibold text-white">{food.name}</p>
                      {food.isBestseller && (
                        <span className="text-[9px] uppercase font-bold text-amber-400">
                          ★ Bestseller
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 capitalize text-zinc-300">
                    {food.category.replace('-', ' ')}
                  </td>
                  <td className="p-4 font-serif-brand font-bold text-white">
                    ₹{food.discountPrice || food.price}
                    {food.discountPrice && food.discountPrice < food.price && (
                      <span className="text-[10px] text-zinc-500 line-through ml-1.5">
                        ₹{food.price}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${food.isVeg ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                      <span className="capitalize text-zinc-300">{food.spiceLevel}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" /> {food.rating}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleFoodStock(food.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                        food.inStock
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {food.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(food)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
                        title="Edit Dish"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(food.id, food.name)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Food Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFoodId ? 'Modify Delicacy' : 'Add New Gourmet Creation'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSaveFood} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Dish Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kakori Lamb Kebab"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500 cursor-pointer"
              >
                <option value="starters">Starters & Kebabs</option>
                <option value="main-course">Main Course Curries</option>
                <option value="biryani-rice">Dum Biryani & Rice</option>
                <option value="breads">Tandoori Breads</option>
                <option value="desserts">Decadent Desserts</option>
                <option value="beverages">Artisan Beverages</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Base Price (₹)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Discounted Price (₹)</label>
              <input
                type="number"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Dietary Classification</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsVeg(true)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border ${
                    isVeg ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500' : 'bg-white/5 border-white/10 text-zinc-400'
                  }`}
                >
                  Vegetarian
                </button>
                <button
                  type="button"
                  onClick={() => setIsVeg(false)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border ${
                    !isVeg ? 'bg-rose-500/20 text-rose-400 border-rose-500' : 'bg-white/5 border-white/10 text-zinc-400'
                  }`}
                >
                  Non-Vegetarian
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Spice Heat</label>
              <select
                value={spiceLevel}
                onChange={(e) => setSpiceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white cursor-pointer"
              >
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="hot">Hot</option>
                <option value="extra-hot">Fiery 24K</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Image URL</label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Culinary Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Elaborate on the smoking woods, marinades, or royal Awadhi technique..."
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={isBestseller}
                onChange={(e) => setIsBestseller(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600"
              />
              <span>Mark as Royal Bestseller Badge</span>
            </label>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-white/10 text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg hover:opacity-90"
            >
              Save Delicacy
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
