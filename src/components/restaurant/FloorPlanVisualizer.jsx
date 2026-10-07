import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, CheckCircle2, Sparkles, Compass, Eye, Flame, Wine, Trees, ArrowRight } from 'lucide-react';

export default function FloorPlanVisualizer({
  tables = [],
  selectedTableId = null,
  onSelectTable,
  isManagementMode = false,
  onStatusChange = null
}) {
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'top'

  const statusStyles = {
    available: {
      border: 'border-emerald-500/60 hover:border-emerald-400',
      bg: 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300',
      indicator: 'bg-emerald-400 shadow-[0_0_10px_#34d399]',
      glow: 'hover:shadow-[0_15px_30px_rgba(16,185,129,0.3)]',
      label: 'Available'
    },
    reserved: {
      border: 'border-amber-500/60 hover:border-amber-400',
      bg: 'bg-amber-950/40 text-amber-300',
      indicator: 'bg-amber-400 shadow-[0_0_10px_#fbbf24]',
      glow: '',
      label: 'Reserved'
    },
    occupied: {
      border: 'border-rose-500/60 hover:border-rose-400',
      bg: 'bg-rose-950/40 text-rose-300',
      indicator: 'bg-rose-500 shadow-[0_0_10px_#f43f5e]',
      glow: '',
      label: 'Occupied'
    },
    maintenance: {
      border: 'border-zinc-600/50',
      bg: 'bg-zinc-900/60 text-zinc-500',
      indicator: 'bg-zinc-500',
      glow: '',
      label: 'Maintenance'
    }
  };

  const handleTableClick = (table) => {
    if (!isManagementMode && table.status !== 'available') {
      return;
    }
    if (onSelectTable) {
      onSelectTable(table);
    }
  };

  const selectedTable = tables.find((t) => t.id === selectedTableId);

  return (
    <div className="w-full rounded-3xl glass-card border border-white/10 p-6 md:p-8 relative overflow-hidden">
      {/* Ambient Floor Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Floor Architecture</span>
          </div>
          <h3 className="font-serif-brand font-bold text-xl text-white">
            Grand Sanctuary Seating Layout
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            {isManagementMode
              ? 'Click any table to update occupancy or view live seating.'
              : 'Select your preferred table experience: window courtyard, main hall, or live charcoal bar.'}
          </p>
        </div>

        {/* View Switcher & Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-xl bg-black/60 p-1 border border-white/15 shadow-inner">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === '3d'
                  ? 'bg-gradient-to-r from-ember-600 to-amber-600 text-white shadow-glow-ember'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>3D Spatial View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('top')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'top'
                  ? 'bg-gradient-to-r from-ember-600 to-amber-600 text-white shadow-glow-ember'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Architectural Top</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs pl-2">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              Available
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
              Reserved
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
              Occupied
            </span>
          </div>
        </div>
      </div>

      {/* Visual Architectural Floor Grid with 3D Spatial Perspective */}
      <div
        className="my-8 relative rounded-3xl bg-gradient-to-b from-zinc-950/95 via-charcoal-950 to-black border border-white/10 p-6 md:p-10 overflow-x-auto transition-all"
        style={
          viewMode === '3d'
            ? {
                perspective: '1300px',
                perspectiveOrigin: '50% 25%'
              }
            : {}
        }
      >
        <div
          style={
            viewMode === '3d'
              ? {
                  transform: 'rotateX(20deg)',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }
              : {
                  transition: 'transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }
          }
          className="space-y-12"
        >
          {/* Architectural Zone 1: French Window Garden Courtyard */}
          <div className="relative">
            <div className="w-full text-center py-2.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-sky-900/40 to-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-serif-brand uppercase tracking-widest mb-6 shadow-lg flex items-center justify-center gap-2">
              <Trees className="w-4 h-4 text-emerald-400" />
              <span>Scenic French Glass Window Garden Courtyard</span>
              <Trees className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-12 max-w-lg mx-auto">
              {tables.slice(0, 2).map((table) => renderTable3D(table))}
            </div>
          </div>

          {/* Architectural Zone 2: Main Royal Dining Hall */}
          <div className="relative">
            <div className="relative my-6 py-2">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-white/15" />
              <span className="relative z-10 px-5 py-1.5 bg-zinc-900 border border-amber-500/30 rounded-full text-[11px] text-amber-300 font-serif-brand mx-auto block w-max uppercase tracking-widest shadow-md">
                ✦ Grand Central Dining Hallway ✦
              </span>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-12 max-w-lg mx-auto">
              {tables.slice(2, 4).map((table) => renderTable3D(table))}
            </div>
          </div>

          {/* Architectural Zone 3: Live Charcoal Hearth & Cocktail Lounge */}
          <div className="relative">
            <div className="w-full text-center py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-950/50 via-ember-900/50 to-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-serif-brand uppercase tracking-widest mb-6 shadow-lg flex items-center justify-center gap-2">
              <Flame className="w-4 h-4 text-ember-400 animate-pulse" />
              <span>Live Charcoal Hearth & Artisan Mixology Lounge</span>
              <Wine className="w-4 h-4 text-amber-400" />
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-12 max-w-lg mx-auto">
              {tables.slice(4, 6).map((table) => renderTable3D(table))}
            </div>
          </div>

          {/* Architectural Zone 4: Starlight Terrace */}
          {tables.length > 6 && (
            <div>
              <div className="text-center text-[11px] uppercase text-zinc-400 font-serif-brand tracking-widest mb-4">
                ✨ Starlight Open Hearth Terrace ✨
              </div>
              <div className="max-w-xs mx-auto">
                {renderTable3D(tables[6])}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Table Floating HUD Summary Card */}
      <AnimatePresence>
        {selectedTable && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="p-5 rounded-2xl bg-gradient-to-r from-ember-950/90 via-zinc-900 to-black border border-amber-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-glow-ember"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-ember-600 via-amber-600 to-rose-600 text-white flex items-center justify-center font-bold text-xl shadow-lg border border-amber-400/40">
                {selectedTable.id}
              </div>
              <div>
                <p className="text-lg font-bold text-white font-serif-brand">
                  {selectedTable.name}
                </p>
                <p className="text-xs text-zinc-300">
                  Capacity: <span className="font-semibold text-amber-300">{selectedTable.capacity} Guests</span> • Section: <span className="text-white font-medium">{selectedTable.section}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Selected for Reservation
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  function renderTable3D(table) {
    if (!table) return null;
    const isSelected = selectedTableId === table.id;
    const style = statusStyles[table.status] || statusStyles.available;
    const isSelectable = isManagementMode || table.status === 'available';

    const chairCount = table.capacity || 4;

    return (
      <div
        key={table.id}
        className="relative flex items-center justify-center p-3"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Render Chairs Around Table */}
        {chairCount >= 2 && (
          <>
            <div
              className={`absolute -top-1.5 w-9 h-3 rounded-t-md border transition-all duration-300 ${
                isSelected ? 'bg-amber-400/70 border-amber-300 shadow-[0_0_12px_#fbbf24]' : 'bg-zinc-800/90 border-white/10'
              }`}
              style={{ transform: viewMode === '3d' ? 'translateZ(12px)' : 'none' }}
            />
            <div
              className={`absolute -bottom-1.5 w-9 h-3 rounded-b-md border transition-all duration-300 ${
                isSelected ? 'bg-amber-400/70 border-amber-300 shadow-[0_0_12px_#fbbf24]' : 'bg-zinc-800/90 border-white/10'
              }`}
              style={{ transform: viewMode === '3d' ? 'translateZ(12px)' : 'none' }}
            />
          </>
        )}
        {chairCount >= 4 && (
          <>
            <div
              className={`absolute -left-1.5 w-3 h-9 rounded-l-md border transition-all duration-300 ${
                isSelected ? 'bg-amber-400/70 border-amber-300 shadow-[0_0_12px_#fbbf24]' : 'bg-zinc-800/90 border-white/10'
              }`}
              style={{ transform: viewMode === '3d' ? 'translateZ(12px)' : 'none' }}
            />
            <div
              className={`absolute -right-1.5 w-3 h-9 rounded-r-md border transition-all duration-300 ${
                isSelected ? 'bg-amber-400/70 border-amber-300 shadow-[0_0_12px_#fbbf24]' : 'bg-zinc-800/90 border-white/10'
              }`}
              style={{ transform: viewMode === '3d' ? 'translateZ(12px)' : 'none' }}
            />
          </>
        )}

        {/* 3D Elevated Tabletop Button */}
        <motion.button
          type="button"
          whileHover={isSelectable ? { scale: 1.05, y: -4 } : {}}
          whileTap={isSelectable ? { scale: 0.95 } : {}}
          onClick={() => handleTableClick(table)}
          disabled={!isSelectable}
          style={{
            transform:
              viewMode === '3d'
                ? isSelected
                  ? 'translateZ(40px)'
                  : 'translateZ(18px)'
                : 'none',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out'
          }}
          className={`relative w-full p-5 sm:p-6 rounded-2xl border text-center flex flex-col items-center justify-center gap-1.5 shadow-2xl ${
            isSelected
              ? 'border-amber-400 bg-gradient-to-b from-ember-900/80 via-amber-950/60 to-zinc-950 text-white shadow-[0_20px_45px_rgba(249,115,22,0.6)] ring-2 ring-amber-400'
              : `${style.border} ${style.bg} ${style.glow}`
          } ${!isSelectable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {/* Tabletop Inlay Geometric Border */}
          <div className="absolute inset-1.5 rounded-xl border border-white/10 pointer-events-none" />

          {/* Table Number Identifier */}
          <span className="font-serif-brand font-extrabold text-base sm:text-lg text-white drop-shadow">
            {table.id}
          </span>
          <span className="text-xs font-semibold text-zinc-300 line-clamp-1">{table.name}</span>

          {/* Capacity badge */}
          <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-1">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>{table.capacity} Seats</span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`w-2 h-2 rounded-full ${style.indicator}`} />
            <span className="text-[10px] uppercase tracking-wider font-bold">
              {isSelected ? 'Selected' : style.label}
            </span>
          </div>

          {/* Admin quick toggle */}
          {isManagementMode && onStatusChange && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-2 pt-2 border-t border-white/10 w-full flex justify-center gap-1"
            >
              {['available', 'reserved', 'occupied'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onStatusChange(table.id, st)}
                  className={`text-[9px] px-2 py-0.5 rounded capitalize ${
                    table.status === st ? 'bg-white/20 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {st.slice(0, 3)}
                </button>
              ))}
            </div>
          )}
        </motion.button>
      </div>
    );
  }
}
