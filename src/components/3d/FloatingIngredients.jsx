import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingIngredients({ density = 'medium', className = '' }) {
  const items = [
    // 1. Fresh Mint / Coriander Leaf (Emerald green)
    {
      id: 'leaf-1',
      svg: (
        <svg viewBox="0 0 40 40" className="w-7 h-7 drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]">
          <path
            d="M20 5 C30 10 35 22 25 32 C15 35 8 26 12 16 C14 10 18 6 20 5 Z"
            fill="#10b981"
            fillOpacity="0.85"
            stroke="#059669"
            strokeWidth="1.5"
          />
          <path d="M18 12 Q22 22 23 30" stroke="#047857" strokeWidth="1" fill="none" />
        </svg>
      ),
      initialPos: { top: '15%', left: '8%' },
      floatRange: [-18, 14],
      rotateRange: [-12, 18],
      duration: 6.2
    },
    // 2. Kashmiri Red Chili
    {
      id: 'chili-1',
      svg: (
        <svg viewBox="0 0 50 30" className="w-8 h-8 drop-shadow-[0_8px_15px_rgba(239,68,68,0.35)]">
          <path
            d="M5 25 C12 28 28 24 38 14 C44 8 46 4 45 3 C43 2 40 5 34 10 C24 18 12 20 5 25 Z"
            fill="#ef4444"
            stroke="#b91c1c"
            strokeWidth="1.5"
          />
          <path d="M44 4 Q48 2 49 1" stroke="#15803d" strokeWidth="2" fill="none" />
        </svg>
      ),
      initialPos: { top: '70%', left: '10%' },
      floatRange: [-15, 12],
      rotateRange: [20, -15],
      duration: 5.4
    },
    // 3. Star Anise (Warm roasted spice)
    {
      id: 'anise-1',
      svg: (
        <svg viewBox="0 0 40 40" className="w-8 h-8 drop-shadow-[0_10px_16px_rgba(0,0,0,0.7)]">
          <polygon
            points="20,2 24,14 36,12 28,21 34,32 21,27 15,37 13,25 2,21 12,14"
            fill="#854d0e"
            fillOpacity="0.9"
            stroke="#a16207"
            strokeWidth="1"
          />
          <circle cx="20" cy="20" r="3.5" fill="#ca8a04" />
        </svg>
      ),
      initialPos: { top: '22%', right: '12%' },
      floatRange: [-14, 16],
      rotateRange: [0, 45],
      duration: 7.5
    },
    // 4. Green Cardamom Pod
    {
      id: 'cardamom-1',
      svg: (
        <svg viewBox="0 0 30 40" className="w-6 h-6 drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)]">
          <ellipse cx="15" cy="20" rx="9" ry="15" fill="#65a30d" stroke="#4d7c0f" strokeWidth="1.2" />
          <path d="M15 6 L15 34" stroke="#365314" strokeWidth="0.8" strokeDasharray="2,2" />
          <path d="M15 5 L17 2" stroke="#84cc16" strokeWidth="1.5" />
        </svg>
      ),
      initialPos: { top: '78%', right: '9%' },
      floatRange: [-12, 15],
      rotateRange: [-25, 20],
      duration: 5.8
    }
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-10 ${className}`}>
      {items.map((item) => (
        <motion.div
          key={item.id}
          style={{ position: 'absolute', ...item.initialPos }}
          animate={{
            y: item.floatRange,
            rotate: item.rotateRange
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
          }}
          className="opacity-75 hover:opacity-100 transition-opacity"
        >
          {item.svg}
        </motion.div>
      ))}
    </div>
  );
}
