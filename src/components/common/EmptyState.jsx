import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink,
  onAction
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-10 text-center max-w-md mx-auto my-12 border border-white/10"
    >
      <div className="w-16 h-16 rounded-2xl bg-ember-500/10 border border-ember-500/20 text-ember-400 mx-auto flex items-center justify-center mb-5">
        {Icon ? <Icon className="w-8 h-8" /> : null}
      </div>
      <h3 className="font-serif-brand font-bold text-xl text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-xs leading-relaxed mb-6">{description}</p>
      {actionLabel && (
        actionLink ? (
          <Link
            to={actionLink}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-90 transition-opacity"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-ember-600 to-amber-600 text-white font-semibold text-xs shadow-glow-ember hover:opacity-90 transition-opacity"
          >
            {actionLabel}
          </button>
        )
      )}
    </motion.div>
  );
}
