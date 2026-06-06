import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import RestaurantCard from '../../components/RestaurantCard';
import { useLocation } from 'react-router-dom';

const Restaurants = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location]);
  
  const categories = ['All', 'Italian', 'Japanese', 'French', 'Modern Indian', 'Mediterranean'];
  
  // Mock data for restaurants
  const allRestaurants = [
    {
      id: 1,
      name: "L'Atelier de Cuisine",
      cuisine: "French",
      rating: 4.9,
      deliveryTime: "25-35",
      location: "Mayfair, London",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      name: "Sora Sushi",
      cuisine: "Japanese",
      rating: 4.8,
      deliveryTime: "20-30",
      location: "Soho, London",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      name: "Trattoria Milano",
      cuisine: "Italian",
      rating: 4.7,
      deliveryTime: "30-45",
      location: "Chelsea, London",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      name: "The Gilded Saffron",
      cuisine: "Modern Indian",
      rating: 4.9,
      deliveryTime: "40-55",
      location: "Belgravia, London",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      name: "Azur Mediterranean",
      cuisine: "Mediterranean",
      rating: 4.6,
      deliveryTime: "25-40",
      location: "Kensington, London",
      image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      name: "Luxe Grill",
      cuisine: "French",
      rating: 4.8,
      deliveryTime: "35-50",
      location: "Marylebone, London",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const filteredRestaurants = allRestaurants.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         res.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || res.cuisine.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <section className="section-padding bg-premium-light min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
                The Selection
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-premium-dark">Our Establishments</h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-premium-dark/30 group-focus-within:text-premium-accent transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search establishment..."
                  className="bg-white border border-gray-100 pl-12 pr-6 py-3 text-[10px] uppercase tracking-widest font-bold outline-none focus:border-premium-accent transition-all w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center justify-center space-x-3 bg-white border border-gray-100 px-6 py-3 text-[10px] uppercase tracking-widest font-bold text-premium-dark hover:border-premium-accent transition-all">
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </button>
            </motion.div>
          </div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex overflow-x-auto pb-8 mb-12 scrollbar-hide space-x-8 border-b border-gray-200"
          >
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap pb-4 relative transition-colors ${
                  selectedCategory === cat ? 'text-premium-dark' : 'text-premium-dark/30 hover:text-premium-dark'
                }`}
              >
                {cat}
                {selectedCategory === cat && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-premium-accent"
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode='popLayout'>
              {filteredRestaurants.map((res, idx) => (
                <motion.div
                  key={res.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: 0.05 * idx }}
                >
                  <RestaurantCard restaurant={res} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More */}
          <div className="mt-20 text-center">
            <button className="group flex flex-col items-center mx-auto space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark/40 group-hover:text-premium-dark transition-colors">
                View More Establishments
              </span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown size={20} className="text-premium-accent" />
              </motion.div>
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Restaurants;
