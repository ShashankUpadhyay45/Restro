import React, { useState } from 'react';
import { UserCheck, Plus, Phone, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../../components/common/Modal';

export default function OwnerStaffPage() {
  const { staffList, setStaffList } = useRestaurant();
  const { addToast } = useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Line Chef');
  const [station, setStation] = useState('Tandoor & Hearth');
  const [phone, setPhone] = useState('+91 98200 11999');

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!name) return;
    const newStaff = {
      id: `stf_${Date.now()}`,
      name,
      role,
      station,
      phone,
      status: 'on-duty'
    };
    setStaffList((prev) => [...prev, newStaff]);
    setIsModalOpen(false);
    addToast({ type: 'success', title: 'Crew Member Added', message: `${name} has been enrolled.` });
  };

  const toggleStatus = (id) => {
    setStaffList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: s.status === 'on-duty' ? 'break' : 'on-duty' } : s))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
            Crew Management
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white">
            Staff & Kitchen Stations Roster ({staffList.length})
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg hover:opacity-90 flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Crew Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {staffList.map((stf) => (
          <div
            key={stf.id}
            className="p-5 rounded-3xl glass-card border border-white/10 space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                  stf.status === 'on-duty'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {stf.status === 'on-duty' ? 'Active Shift' : 'On Break'}
              </span>

              <button onClick={() => toggleStatus(stf.id)} className="text-zinc-400 hover:text-white">
                {stf.status === 'on-duty' ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5" />}
              </button>
            </div>

            <div>
              <h4 className="font-serif-brand font-semibold text-sm text-white">{stf.name}</h4>
              <p className="text-xs text-purple-400 font-medium">{stf.role}</p>
              <p className="text-[11px] text-zinc-400 mt-1">{stf.station}</p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-xs text-zinc-400">
              <Phone className="w-3.5 h-3.5" />
              <span>{stf.phone}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Enlist Staff Member">
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chef Tarun"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Role Designation</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
            >
              <option value="Head Chef">Head Chef</option>
              <option value="Sous Chef">Sous Chef</option>
              <option value="Line Chef">Line Chef</option>
              <option value="Captain">Captain / Floor Host</option>
              <option value="Cashier">Cashier</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-zinc-400 block mb-1">Assigned Station</label>
            <input
              type="text"
              required
              value={station}
              onChange={(e) => setStation(e.target.value)}
              placeholder="e.g. Clay Tandoor & Starters"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg"
          >
            Save Crew Member
          </button>
        </form>
      </Modal>
    </div>
  );
}
