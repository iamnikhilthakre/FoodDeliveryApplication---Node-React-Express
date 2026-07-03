import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />
          
          {/* Dialog */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white max-w-md w-full p-8 border border-gray-100 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-premium-dark">{title}</h3>
              <button onClick={onClose} className="text-premium-dark/40 hover:text-premium-dark">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-premium-dark/60 mb-8">{message}</p>
            <div className="flex items-center justify-end space-x-4">
              <button 
                onClick={onClose}
                className="px-6 py-2 text-[10px] uppercase tracking-widest font-bold text-premium-dark/60 hover:text-premium-dark"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                className="px-6 py-2 bg-premium-dark text-white text-[10px] uppercase tracking-widest font-bold hover:bg-premium-accent"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
