import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Flame, Utensils, Bike, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function OrderTimeline({ currentStatus = 'preparing', orderType = 'delivery' }) {
  const deliverySteps = [
    { key: 'placed', label: 'Order Placed', desc: 'Received & sent to hearth', icon: Clock },
    { key: 'confirmed', label: 'Confirmed', desc: 'Accepted by Head Chef', icon: Check },
    { key: 'preparing', label: 'Slow-Cooking', desc: 'Cooking over fragrant embers', icon: Flame },
    { key: 'ready', label: 'Plated & Packed', desc: 'Gourmet sealed in thermal handis', icon: Utensils },
    { key: 'out_for_delivery', label: 'Out for Delivery', desc: 'Valet rider en route to your door', icon: Bike },
    { key: 'delivered', label: 'Delivered', desc: 'Feast ready to savor', icon: CheckCircle2 }
  ];

  const takeawaySteps = [
    { key: 'placed', label: 'Order Placed', desc: 'Received at front desk', icon: Clock },
    { key: 'confirmed', label: 'Confirmed', desc: 'Master kitchen notified', icon: Check },
    { key: 'preparing', label: 'Simmering', desc: 'Prepared fresh to order', icon: Flame },
    { key: 'ready', label: 'Ready for Pickup', desc: 'Awaiting your arrival at counter', icon: ShoppingBag },
    { key: 'delivered', label: 'Picked Up', desc: 'Enjoy your handcrafted feast', icon: CheckCircle2 }
  ];

  const steps = orderType === 'takeaway' || orderType === 'dine-in' ? takeawaySteps : deliverySteps;
  const statusIndexMap = steps.reduce((acc, step, idx) => {
    acc[step.key] = idx;
    return acc;
  }, {});

  const currentIndex = statusIndexMap[currentStatus] ?? 2;

  return (
    <div className="w-full py-6">
      <div className="relative">
        {/* Horizontal Connector Line for Desktop */}
        <div className="hidden md:block absolute top-7 left-8 right-8 h-1.5 bg-white/10 -translate-y-1/2 z-0 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-ember-500 via-amber-400 to-emerald-400 rounded-full shadow-glow-ember"
          />

          {/* Animated Moving Royal Dispatch Carrier Beacon */}
          <motion.div
            className="absolute -top-7 z-20 flex flex-col items-center -ml-4"
            animate={{ left: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            transition={{ type: 'spring', stiffness: 160, damping: 20 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-ember-500 to-rose-600 text-white flex items-center justify-center shadow-[0_0_20px_#f97316] ring-2 ring-amber-300">
              <Flame className="w-4 h-4 fill-current animate-pulse" />
            </div>
            <div className="w-2 h-2 bg-ember-500 rotate-45 -mt-1 shadow" />
          </motion.div>
        </div>

        {/* Desktop Step Flow */}
        <div className="hidden md:grid grid-cols-6 gap-2 relative z-10">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex flex-col items-center text-center px-1">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.15 : 1,
                    backgroundColor: isCurrent ? '#f97316' : isCompleted ? '#10b981' : '#181a20'
                  }}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all shadow-lg ${
                    isCurrent
                      ? 'border-amber-300 shadow-glow-ember ring-4 ring-ember-500/20 text-white'
                      : isCompleted
                      ? 'border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'border-white/10 text-zinc-500'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <p className={`mt-3 text-xs font-semibold ${isCurrent ? 'text-ember-400' : isCompleted ? 'text-zinc-200' : 'text-zinc-500'}`}>
                  {step.label}
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-2 leading-tight">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Stepper (< 768px) */}
        <div className="md:hidden space-y-6 relative pl-6 border-l-2 border-white/10 ml-4">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const Icon = step.icon;

            return (
              <div key={step.key} className="relative flex items-start gap-4">
                <div
                  className={`absolute -left-[35px] top-0 w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                    isCurrent
                      ? 'bg-ember-500 border-amber-300 text-white shadow-glow-ember ring-2 ring-ember-400'
                      : isCompleted
                      ? 'bg-emerald-600 border-emerald-400 text-white'
                      : 'bg-zinc-900 border-white/10 text-zinc-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-sm font-semibold ${isCurrent ? 'text-ember-400' : isCompleted ? 'text-white' : 'text-zinc-500'}`}>
                    {step.label}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
