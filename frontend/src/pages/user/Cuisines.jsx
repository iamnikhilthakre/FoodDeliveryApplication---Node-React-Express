import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Cuisines = () => {
  const navigate = useNavigate();

  const cuisines = [
    { name: 'Italian', image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Japanese', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800' },
    { name: 'French', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800' },
    { name: 'Modern Indian', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
    { name: 'Mediterranean', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800' },
    { name: 'Chinese', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Thai', image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800' },
    { name: 'American', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <MainLayout>
      <section className="section-padding pt-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
              Explore Flavors
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-premium-dark mb-4">
              Cuisines
            </h1>
            <p className="text-premium-dark/60 max-w-2xl mx-auto">
              Discover restaurants by your favorite cuisines
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cuisines.map((cuisine, index) => (
              <motion.div 
                key={cuisine.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/restaurants?category=${cuisine.name}`)}
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-6 relative">
                  <img 
                    src={cuisine.image} 
                    alt={cuisine.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h3 className="text-sm font-serif font-bold text-premium-dark uppercase tracking-widest text-center">
                  {cuisine.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Cuisines;
