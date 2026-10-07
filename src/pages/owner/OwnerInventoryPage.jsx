import React, { useState } from 'react';
import { Boxes, AlertTriangle, CheckCircle2, Plus } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../../components/common/Modal';

export default function OwnerInventoryPage() {
  const { inventory, setInventory } = useRestaurant();
  const { addToast } = useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [stock, setStock] = useState('50 kg');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name) return;
    const item = {
      id: `inv_${Date.now()}`,
      name,
      stock,
      status: 'in-stock',
      unit: 'kg',
      minThreshold: 15
    };
    setInventory((prev) => [...prev, item]);
    setIsModalOpen(false);
    addToast({ type: 'success', title: 'Stock Tracked', message: `${name} registered in pantry.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
            Supply Chain Architecture
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white">
            Pantry & Raw Ingredients Stock
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Track Ingredient
        </button>
      </div>

      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 font-semibold bg-white/5">
                <th className="p-4">Commodity / Ingredient</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Safety Threshold</th>
                <th className="p-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {inventory.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-semibold text-white">{inv.name}</td>
                  <td className="p-4 font-mono font-bold text-zinc-200">{inv.stock}</td>
                  <td className="p-4">
                    {inv.status === 'low-stock' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        <AlertTriangle className="w-3 h-3 text-amber-400" /> Low Stock Warning
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Sufficient
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-zinc-400">{inv.minThreshold} {inv.unit}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => addToast({ type: 'info', title: 'Restock PO Generated', message: `Order PO created for ${inv.name}` })}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 border border-white/10"
                    >
                      Order PO +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Track Raw Ingredient">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Ingredient Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kashmiri Saffron Threads"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Quantity</label>
            <input
              type="text"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="25 kg"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg"
          >
            Track in Stock
          </button>
        </form>
      </Modal>
    </div>
  );
}
