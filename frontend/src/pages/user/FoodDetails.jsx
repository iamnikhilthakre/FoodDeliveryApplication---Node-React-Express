import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Share2, Heart, Info } from 'lucide-react';
import FoodCard from '../../components/FoodCard';
import ConfirmDialog from '../../components/ConfirmDialog';
import useCart from '../../hooks/useCart';
import { useParams } from 'react-router-dom';
import foodService from '../../services/foodService';

const FoodDetails = () => {
  const { addItem, restaurantId: cartRestaurantId, items } = useCart();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingFood, setPendingFood] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        const [restaurantData, menuData] = await Promise.all([
          foodService.getRestaurantDetails(id),
          foodService.getFoodsByRestaurant(id)
        ]);
        setRestaurant(restaurantData);
        setMenu(menuData);
      } catch (err) {
        console.error('Failed to load restaurant:', err);
      } finally {
        setLoading(false);
      }
    };
    loadRestaurant();
  }, [id]);

  const handleAddToCart = (food) => {
    // Check if cart has items from different restaurant
    const allowMultiRestaurant = JSON.parse(localStorage.getItem('allowMultiRestaurant')) || false;
    
    if (!allowMultiRestaurant && cartRestaurantId && cartRestaurantId !== restaurant._id && items.length > 0) {
      setPendingFood(food);
      setShowDialog(true);
    } else {
      addItem(food, restaurant._id);
    }
  };

  const confirmAdd = () => {
    if (pendingFood) {
      addItem(pendingFood, restaurant._id);
      setPendingFood(null);
      setShowDialog(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="section-padding pt-32 flex items-center justify-center min-h-screen">
          <div className="text-premium-dark/50">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (!restaurant) {
    return (
      <MainLayout>
        <div className="section-padding pt-32 flex items-center justify-center min-h-screen">
          <div className="text-premium-dark/50">Restaurant not found</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Restaurant Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-premium-dark/40 backdrop-blur-[2px]" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-premium-accent mb-6 block">
              {restaurant.cuisine}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-8 text-[10px] uppercase tracking-widest text-white/70 font-bold">
              <span className="flex items-center"><Star fill="currentColor" size={14} className="text-premium-accent mr-2" /> {restaurant.rating} ({restaurant.reviews} Reviews)</span>
              <span className="flex items-center"><Clock size={14} className="mr-2" /> {restaurant.deliveryTime} Min</span>
              <span className="flex items-center"><MapPin size={14} className="mr-2" /> {restaurant.address}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info & Menu */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
            {/* Sidebar Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark mb-6">About</h4>
                  <p className="text-xs text-premium-dark/50 leading-relaxed italic">
                    "{restaurant.description}"
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark mb-6">Details</h4>
                  <ul className="space-y-4">
                    <li className="flex items-center text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold">
                      <Info size={14} className="mr-3 text-premium-accent" />
                      Allergens Information
                    </li>
                    <li className="flex items-center text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold">
                      <Share2 size={14} className="mr-3 text-premium-accent" />
                      Share Experience
                    </li>
                    <li className="flex items-center text-[10px] uppercase tracking-widest text-premium-dark/60 font-bold">
                      <Heart size={14} className="mr-3 text-premium-accent" />
                      Add to Favorites
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Menu Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-16 border-b border-gray-100 pb-8">
                <h2 className="text-3xl font-serif font-bold text-premium-dark">Signature Menu</h2>
                <span className="text-[10px] uppercase tracking-widest text-premium-dark/30 font-bold">
                  {menu.length} CURATED DISHES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {menu.map((item, idx) => (
                  <FoodCard key={item._id} food={item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConfirmDialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false);
          setPendingFood(null);
        }}
        onConfirm={confirmAdd}
        title="Replace Cart?"
        message="You have items from another restaurant in your cart. Adding this item will replace your current cart. Do you want to continue?"
      />
    </MainLayout>
  );
};

export default FoodDetails;
