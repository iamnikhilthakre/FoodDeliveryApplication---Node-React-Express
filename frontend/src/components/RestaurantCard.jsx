import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  // Fallback data if none provided
  const data = restaurant || {
    id: 1,
    name: "L'Atelier de Cuisine",
    cuisine: "French Contemporary",
    rating: 4.9,
    deliveryTime: "25-35",
    location: "Mayfair, London",
    image: "https://images.unsplash.com/photo-1514933651103-319053092b3b?auto=format&fit=crop&q=80&w=800"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white group border border-gray-100 overflow-hidden"
    >
      <Link to={`/restaurant/${data.id}`}>
        <div className="aspect-[16/9] overflow-hidden relative">
          <img 
            src={data.image} 
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-premium-dark">
            {data.cuisine}
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-serif font-bold text-premium-dark group-hover:text-premium-accent transition-colors">
              {data.name}
            </h3>
            <div className="flex items-center text-premium-accent">
              <Star fill="currentColor" size={12} />
              <span className="ml-1 text-[10px] font-bold">{data.rating}</span>
            </div>
          </div>

          <div className="flex items-center text-premium-dark/40 text-[10px] uppercase tracking-widest space-x-4 mb-8">
            <span className="flex items-center"><Clock size={12} className="mr-1" /> {data.deliveryTime} min</span>
            <span className="flex items-center"><MapPin size={12} className="mr-1" /> {data.location}</span>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark/30 group-hover:text-premium-dark transition-colors">
              View Menu
            </span>
            <ArrowRight size={14} className="text-premium-dark/20 group-hover:text-premium-accent group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
