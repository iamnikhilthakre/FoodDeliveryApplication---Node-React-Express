import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';

const Home = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleAddToCart = (food) => {
    // For featured restaurants on home, we use a mock restaurant ID
    addItem(food, 1);
  };
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070" 
            alt="Premium Food" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-6">
              Exquisite Flavors Delivered
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-premium-dark leading-[1.1] mb-8">
              The Art of <br /> 
              <span className="italic">Fine Dining</span> at <br />
              Your Doorstep.
            </h1>
            <p className="text-base text-premium-dark/60 leading-relaxed mb-10 max-w-md">
              Discover a curated selection of the city's most prestigious restaurants, 
              bringing world-class culinary excellence to your private residence.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => navigate('/restaurants')}
                className="btn-premium flex items-center justify-center space-x-2"
              >
                <span>Explore Restaurants</span>
                <ArrowRight size={14} />
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="px-8 py-3 border border-premium-dark/10 text-premium-dark text-[10px] uppercase tracking-widest hover:bg-premium-dark hover:text-white transition-all duration-300"
              >
                Our Selection
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Element */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 right-12 hidden lg:block bg-white/40 backdrop-blur-xl p-6 border border-white/50 shadow-2xl"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-premium-accent/10 flex items-center justify-center text-premium-accent">
              <Star fill="currentColor" size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-premium-dark">Top Rated</p>
              <p className="text-xs text-premium-dark/60 italic">"The gold standard of delivery"</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl font-serif font-bold text-premium-dark mb-4">Curated Selections</h2>
              <div className="h-1 w-20 bg-premium-accent" />
            </div>
            <p className="text-xs text-premium-dark/50 uppercase tracking-widest max-w-xs md:text-right">
              Explore by cuisine, meticulously prepared for the discerning palate.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Italian', image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&q=80&w=800' },
              { name: 'Japanese', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800' },
              { name: 'French', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800' },
              { name: 'Modern Indian', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' }
            ].map((cuisine) => (
              <motion.div 
                key={cuisine.name}
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

      {/* Featured Restaurants */}
      <section className="section-padding bg-premium-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
              The Establishment
            </span>
            <h2 className="text-4xl font-serif font-bold text-premium-dark">Featured Partners</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { id: 1, name: "L'Atelier de Cuisine", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" },
              { id: 2, name: "Sora Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800" },
              { id: 3, name: "Trattoria Milano", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800" }
            ].map((restaurant) => (
              <motion.div 
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white group cursor-pointer"
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              >
                <div className="aspect-video overflow-hidden relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-premium-dark">
                    Featured
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-serif font-bold text-premium-dark">{restaurant.name}</h3>
                    <div className="flex items-center text-premium-accent">
                      <Star fill="currentColor" size={12} />
                      <span className="ml-1 text-[10px] font-bold">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center text-premium-dark/40 text-[10px] uppercase tracking-widest space-x-4 mb-6">
                    <span className="flex items-center"><Clock size={12} className="mr-1" /> 25-35 min</span>
                    <span className="flex items-center"><MapPin size={12} className="mr-1" /> Mayfair, London</span>
                  </div>
                  <div className="w-full py-4 border-t border-gray-100 text-[10px] uppercase tracking-[0.2em] font-bold text-premium-dark group-hover:text-premium-accent transition-colors flex items-center justify-center space-x-2">
                    <span>View Menu</span>
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
