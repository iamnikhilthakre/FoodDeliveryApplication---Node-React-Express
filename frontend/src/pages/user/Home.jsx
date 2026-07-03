import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../../components/RestaurantCard';
import foodService from '../../services/foodService';

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await foodService.getAllRestaurants();
        setRestaurants(data.slice(0, 3)); // show first 3 as featured
      } catch (err) {
        console.error("Failed to load restaurants:", err);
      } finally {
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);

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

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-premium-dark/50">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
