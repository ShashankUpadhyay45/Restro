import React, { useState } from 'react';
import { Tag, Plus, Trash2, Calendar, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../../components/common/Modal';

export default function OwnerOffersPage() {
  const { offers, setOffers } = useRestaurant();
  const { addToast } = useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [discount, setDiscount] = useState('25% OFF');
  const [percentage, setPercentage] = useState(25);
  const [minOrder, setMinOrder] = useState(500);
  const [description, setDescription] = useState('');

  const handleAddOffer = (e) => {
    e.preventDefault();
    if (!code || !title) return;

    const newOffer = {
      code: code.toUpperCase(),
      title,
      discount,
      percentage: Number(percentage),
      minOrder: Number(minOrder),
      description: description || 'Special seasonal dining discount voucher.'
    };

    setOffers((prev) => [newOffer, ...prev]);
    setIsModalOpen(false);
    addToast({ type: 'success', title: 'Voucher Active', message: `Coupon ${newOffer.code} is now live.` });
  };

  const handleDelete = (codeToDelete) => {
    setOffers((prev) => prev.filter((o) => o.code !== codeToDelete));
    addToast({ type: 'info', title: 'Coupon Revoked', message: `Code ${codeToDelete} removed.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
            Promotional Engine
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white">
            Offers & Discount Vouchers ({offers.length})
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg hover:opacity-90 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.code}
            className="p-6 rounded-3xl glass-card border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold font-mono">
                  {offer.code}
                </span>
                <button
                  onClick={() => handleDelete(offer.code)}
                  className="p-1 rounded text-zinc-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h4 className="font-serif-brand font-bold text-base text-white">{offer.title}</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{offer.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Min Order: ₹{offer.minOrder || 0}</span>
              <span className="font-bold text-emerald-400">{offer.discount}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generate Promotional Voucher">
        <form onSubmit={handleAddOffer} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Coupon Code</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ROYAL25"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white uppercase"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Badge Text</label>
              <input
                type="text"
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="25% OFF"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Campaign Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Weekend Charcoal Indulgence"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Discount %</label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-zinc-400 block mb-1">Min Order (₹)</label>
              <input
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg"
          >
            Launch Campaign
          </button>
        </form>
      </Modal>
    </div>
  );
}
