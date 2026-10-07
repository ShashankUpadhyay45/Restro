import React, { useState } from 'react';
import { Layers, Plus, Edit, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../../components/common/Modal';

export default function OwnerCategoriesPage() {
  const [categories, setCategories] = useState(CATEGORIES.filter((c) => c.id !== 'all'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [catName, setCatName] = useState('');
  const [icon, setIcon] = useState('Flame');
  const { addToast } = useNotification();

  const handleOpenAdd = () => {
    setEditingId(null);
    setCatName('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingId(cat.id);
    setCatName(cat.name);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!catName) return;

    if (editingId) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, name: catName } : c))
      );
      addToast({ type: 'success', title: 'Category Updated', message: `${catName} saved.` });
    } else {
      const newCat = {
        id: catName.toLowerCase().replace(/\s+/g, '-'),
        name: catName,
        icon: 'Flame',
        count: 0
      };
      setCategories((prev) => [...prev, newCat]);
      addToast({ type: 'success', title: 'Category Added', message: `${catName} added.` });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      addToast({ type: 'info', title: 'Category Removed', message: `${name} deleted.` });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
            Taxonomy Architecture
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white">
            Menu Category Chapters ({categories.length})
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg hover:opacity-90 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-3xl glass-card border border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif-brand font-bold text-sm text-white">{cat.name}</h4>
                <p className="text-[11px] text-zinc-400">{cat.count || 0} active dishes</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenEdit(cat)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(cat.id, cat.name)}
                className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? 'Edit Category' : 'Create New Menu Chapter'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Category Title</label>
            <input
              type="text"
              required
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              placeholder="e.g. Awadhi Grills"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg"
          >
            Save Category
          </button>
        </form>
      </Modal>
    </div>
  );
}
