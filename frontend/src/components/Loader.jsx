import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullPage = false }) => {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-premium-accent/20 rounded-full"
        />
        {/* Active Arc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 border-t-2 border-premium-accent rounded-full"
        />
        {/* Inner Dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 bg-premium-dark rounded-full"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-premium-dark">
          LUXE<span className="text-premium-accent">EATS</span>
        </span>
        <span className="text-[8px] uppercase tracking-widest text-premium-dark/30 mt-1">
          Preparing Excellence
        </span>
      </motion.div>
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
