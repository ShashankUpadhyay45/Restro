import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState(null); // 'VIEW' | 'CLICK' | 'DRAG' | null
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices, disabled for touch and reduced-motion
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;

      // Determine contextual cursor state
      if (target.closest('.cursor-grab') || target.closest('canvas')) {
        setCursorText('DRAG');
      } else if (target.closest('.glass-card') || target.closest('[data-cursor="view"]')) {
        if (target.closest('button') || target.closest('a')) {
          setCursorText('CLICK');
        } else {
          setCursorText('VIEW');
        }
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('select')
      ) {
        setCursorText('CLICK');
      } else {
        setCursorText(null);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isEnabled || !isVisible) return null;

  const isExpanded = !!cursorText;

  return (
    <>
      {/* Precision Center Ember Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-amber-400 pointer-events-none z-[9999] shadow-[0_0_8px_#fbbf24]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isExpanded ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Fluid Trailing Aura Ring / Contextual HUD Pill */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] transition-colors duration-200 flex items-center justify-center overflow-hidden ${
          isExpanded
            ? 'w-14 h-14 border-ember-500/80 bg-black/80 backdrop-blur-sm shadow-[0_0_20px_rgba(249,115,22,0.45)]'
            : 'w-7 h-7 border-white/30 bg-transparent'
        }`}
        animate={{
          x: mousePosition.x - (isExpanded ? 28 : 14),
          y: mousePosition.y - (isExpanded ? 28 : 14),
          scale: isExpanded ? 1.05 : 1
        }}
        transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.2 }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="text-[9px] font-extrabold uppercase tracking-widest text-amber-300 font-mono select-none"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
