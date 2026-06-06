import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ShoppingBag } from 'lucide-react';

const FoodCard = ({ food, onAddToCart }) => {
  const data = food || {
    id: 1,
    name: "Truffle Tagliatelle",
    description: "Hand-rolled pasta, seasonal black truffle, 36-month aged Parmigiano Reggiano.",
    price: 45,
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white group border border-gray-100 flex flex-col h-full"
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={data.image} 
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            onAddToCart && onAddToCart(data);
          }}
          className="absolute bottom-4 right-4 bg-premium-dark text-white p-3 hover:bg-premium-accent transition-colors shadow-xl active:scale-90"
        >
          <Plus size={18} strokeWidth={2} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-base font-serif font-bold text-premium-dark uppercase tracking-wide">
            {data.name}
          </h3>
          <span className="text-sm font-bold text-premium-dark">${data.price}</span>
        </div>
        
        <p className="text-[10px] text-premium-dark/40 leading-relaxed uppercase tracking-widest mb-6 flex-grow">
          {data.description}
        </p>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-premium-accent">
            Chef's Selection
          </span>
          <ShoppingBag size={12} className="text-premium-dark/20" />
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
