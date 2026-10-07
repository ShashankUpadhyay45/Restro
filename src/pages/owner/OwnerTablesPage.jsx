import React, { useState } from 'react';
import { Grid, Plus, Users, CheckCircle2, ShieldAlert, Edit, Trash2 } from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useNotification } from '../../context/NotificationContext';
import FloorPlanVisualizer from '../../components/restaurant/FloorPlanVisualizer';
import { Modal } from '../../components/common/Modal';

export default function OwnerTablesPage() {
  const { tables, updateTableStatus } = useRestaurant();
  const { addToast } = useNotification();

  const [selectedTable, setSelectedTable] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCapacity, setEditingCapacity] = useState(4);
  const [editingSection, setEditingSection] = useState('Main Dining Hall');

  const handleStatusChange = (tableId, newStatus) => {
    updateTableStatus(tableId, newStatus);
    addToast({
      type: 'info',
      title: 'Table Status Synchronized',
      message: `Table ${tableId} is now marked ${newStatus.toUpperCase()}.`
    });
  };

  const handleOpenEdit = (table) => {
    setSelectedTable(table);
    setEditingCapacity(table.capacity);
    setEditingSection(table.section);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">
            Dine-In Architecture
          </span>
          <h1 className="font-serif-brand font-bold text-2xl text-white">
            Table & Seating Management
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>Total Tables: <strong className="text-white">{tables.length}</strong></span>
          <span>•</span>
          <span>
            Occupied:{' '}
            <strong className="text-rose-400">
              {tables.filter((t) => t.status === 'occupied').length}
            </strong>
          </span>
        </div>
      </div>

      {/* Interactive Visual Floor Layout Component in Management Mode */}
      <FloorPlanVisualizer
        tables={tables}
        selectedTableId={selectedTable?.id}
        isManagementMode={true}
        onSelectTable={(table) => handleOpenEdit(table)}
        onStatusChange={handleStatusChange}
      />

      {/* Tables Table Grid for granular control */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-serif-brand font-bold text-sm text-white">Table Roster Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 font-semibold bg-white/5">
                <th className="p-4">Table Code</th>
                <th className="p-4">Name</th>
                <th className="p-4">Section</th>
                <th className="p-4">Capacity</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Quick Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tables.map((table) => (
                <tr key={table.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-purple-400">{table.id}</td>
                  <td className="p-4 text-white font-semibold">{table.name}</td>
                  <td className="p-4 text-zinc-300">{table.section}</td>
                  <td className="p-4 text-zinc-300">{table.capacity} Persons</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        table.status === 'available'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : table.status === 'reserved'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {table.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={table.status}
                      onChange={(e) => handleStatusChange(table.id, e.target.value)}
                      className="bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-white"
                    >
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                      <option value="occupied">Occupied</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
