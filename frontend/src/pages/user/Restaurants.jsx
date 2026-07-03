import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import RestaurantCard from '../../components/RestaurantCard';
import { useLocation } from 'react-router-dom';
import foodService from '../../services/foodService';

const Restaurants = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');
    if (category) {
      setSelectedCategory(category);
    }
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await foodService.getAllRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error('Failed to load restaurants:', err);
      } finally {
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);
  
  const categories = ['All', 'Italian', 'Japanese', 'French', 'Modern Indian', 'Mediterranean'];
  
  const filteredRestaurants = restaurants.filter(res => {
    if (!res) return false;
    const resCuisine = res.cuisine ? res.cuisine.toLowerCase() : '';
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resCuisine.includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resCuisine === selectedCategory.toLowerCase();
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
              {/* <button className="flex items-center justify-center space-x-3 bg-white border border-gray-100 px-6 py-3 text-[10px] uppercase tracking-widest font-bold text-premium-dark hover:border-premium-accent transition-all">
                <SlidersHorizontal size={14} />
                <span>Filters</span>
              </button> */}
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
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-premium-dark/50">Loading...</p>
            </div>
          ) : filteredRestaurants.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm text-premium-dark/40 uppercase tracking-widest mb-6">No restaurants found</p>
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-[10px] uppercase tracking-widest font-bold text-premium-accent hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <AnimatePresence mode='popLayout'>
                {filteredRestaurants.map((res, idx) => (
                  <motion.div
                    key={res._id}
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
          )}

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
