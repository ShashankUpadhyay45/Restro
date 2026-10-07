import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { Plus, Minus, Check, Flame } from 'lucide-react';

export default function CustomizationModal({ food, isOpen, onClose }) {
  if (!food) return null;

  const { addToCart } = useCart();
  const { addToast } = useNotification();

  const portions = food.customizations?.portions || [{ name: 'Regular Portion', priceDelta: 0 }];
  const availableAddOns = food.customizations?.addOns || [];

  const [selectedPortion, setSelectedPortion] = useState(portions[0]);
  const [spiceLevel, setSpiceLevel] = useState(food.spiceLevel || 'medium');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const toggleAddOn = (addOn) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((a) => a.name === addOn.name);
      if (exists) {
        return prev.filter((a) => a.name !== addOn.name);
      } else {
        return [...prev, addOn];
      }
    });
  };

  const basePrice = food.discountPrice || food.price;
  const portionDelta = selectedPortion.priceDelta || 0;
  const addOnsTotal = selectedAddOns.reduce((acc, curr) => acc + (curr.price || 0), 0);
  const unitPrice = basePrice + portionDelta + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
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
      title: 'Crafted & Added to Cart',
      message: `${quantity}x ${food.name} (${selectedPortion.name}) added successfully.`
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Customize ${food.name}`} maxWidth="max-w-lg">
      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
        {/* Item Header Snapshot */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/5">
          <img src={food.image} alt={food.name} className="w-16 h-16 rounded-xl object-cover" />
          <div className="flex-1">
            <h4 className="font-serif-brand font-semibold text-sm text-white">{food.name}</h4>
            <p className="text-xs text-zinc-400">Base Price: ₹{basePrice}</p>
          </div>
        </div>

        {/* Portion Selection */}
        {portions.length > 0 && (
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2.5">
              Select Portion / Size
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {portions.map((portion) => {
                const isSelected = selectedPortion.name === portion.name;
                return (
                  <button
                    key={portion.name}
                    type="button"
                    onClick={() => setSelectedPortion(portion)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-ember-500 bg-ember-500/10 text-white shadow-glow-ember'
                        : 'border-white/10 hover:border-white/20 bg-white/5 text-zinc-400'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-semibold">{portion.name}</p>
                      {portion.priceDelta > 0 ? (
                        <span className="text-[11px] text-ember-400">+₹{portion.priceDelta}</span>
                      ) : (
                        <span className="text-[11px] text-zinc-500">Standard</span>
                      )}
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-ember-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Spice Level */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2.5 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-ember-400" /> Spice Heat Level
          </h5>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'mild', label: 'Mild', color: 'text-emerald-400' },
              { id: 'medium', label: 'Medium', color: 'text-amber-400' },
              { id: 'hot', label: 'Hot', color: 'text-orange-400' },
              { id: 'extra-hot', label: 'Fiery', color: 'text-rose-500' }
            ].map((s) => {
              const active = spiceLevel === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSpiceLevel(s.id)}
                  className={`py-2 px-1 rounded-xl text-center border text-xs font-medium transition-all ${
                    active
                      ? 'border-ember-500 bg-ember-500/20 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <span className={active ? 'text-white' : s.color}>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add-ons */}
        {availableAddOns.length > 0 && (
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2.5">
              Gourmet Add-ons & Sides
            </h5>
            <div className="space-y-2">
              {availableAddOns.map((addOn) => {
                const isSelected = selectedAddOns.some((a) => a.name === addOn.name);
                return (
                  <button
                    key={addOn.name}
                    type="button"
                    onClick={() => toggleAddOn(addOn)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-ember-500 bg-ember-500/10 text-white'
                        : 'border-white/10 hover:border-white/20 bg-white/5 text-zinc-400'
                    }`}
                  >
                    <span className="text-xs font-medium">{addOn.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-ember-400">+₹{addOn.price}</span>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-ember-500 border-ember-500 text-white' : 'border-white/20'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity & Total */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-white w-6 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Item Total</p>
            <p className="font-serif-brand font-bold text-lg text-white">₹{totalPrice}</p>
          </div>
        </div>

        {/* Add to Feast CTA */}
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-sm shadow-glow-ember hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          Add to Feast • ₹{totalPrice}
        </button>
      </div>
    </Modal>
  );
}
