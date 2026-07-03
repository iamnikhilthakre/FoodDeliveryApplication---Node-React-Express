import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import foodService from '../../services/foodService';

const Cart = () => {
  const { items, addItem, removeItem, clearAll, subtotal, deliveryFee, total } = useCart();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await foodService.getAllRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error("Failed to load restaurants:", err);
      } finally {
        setLoading(false);
      }
    };
    loadRestaurants();
  }, []);

  // Group items by restaurant
  const groupItemsByRestaurant = () => {
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.restaurantId]) {
        grouped[item.restaurantId] = [];
      }
      grouped[item.restaurantId].push(item);
    });
    return grouped;
  };

  const getRestaurantName = (restaurantId) => {
    const restaurant = restaurants.find(r => r._id === restaurantId);
    return restaurant?.name || 'Restaurant';
  };

  return (
    <MainLayout>
      <section className="section-padding bg-premium-light min-h-[80vh]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0 border-b border-gray-200 pb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
                Your Selection
              </span>
              <h1 className="text-4xl font-serif font-bold text-premium-dark">The Cart</h1>
            </div>
            <div className="flex items-center space-x-8">
              {items.length > 0 && (
                <button 
                  onClick={clearAll}
                  className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-600 font-bold transition-colors"
                >
                  Clear Selection
                </button>
              )}
              <p className="text-[10px] uppercase tracking-widest text-premium-dark/40">
                {items.length} ITEMS SELECTED
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatePresence mode='popLayout'>
                {items.length > 0 ? (
                  Object.entries(groupItemsByRestaurant()).map(([restaurantId, restaurantItems]) => (
                    <div key={restaurantId} className="space-y-4">
                      <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-premium-dark/60 flex items-center">
                        {getRestaurantName(restaurantId)}
                      </h3>
                      {restaurantItems.map((item) => (
                        <motion.div 
                          key={item._id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center space-x-6 bg-white p-6 border border-gray-100 shadow-sm"
                        >
                          <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-serif font-bold text-premium-dark mb-2">{item.name}</h3>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center border border-gray-100">
                                <button 
                                  onClick={() => removeItem(item._id)}
                                  className="p-2 hover:bg-gray-50 transition-colors"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="px-4 text-xs font-bold">{item.quantity}</span>
                                <button 
                                  onClick={() => addItem(item, item.restaurantId)}
                                  className="p-2 hover:bg-gray-50 transition-colors"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <button 
                                onClick={() => {
                                  // Custom logic to remove all of this item
                                  for(let i=0; i<item.quantity; i++) removeItem(item._id);
                                }}
                                className="text-premium-dark/30 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={16} strokeWidth={1.5} />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-serif font-bold text-premium-dark">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-[10px] text-premium-dark/30 uppercase tracking-widest">${item.price} each</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white border border-dashed border-gray-200"
                  >
                    <ShoppingBag size={48} className="mx-auto text-gray-200 mb-6" strokeWidth={1} />
                    <p className="text-sm text-premium-dark/40 uppercase tracking-widest">Your cart is empty</p>
                    <Link to="/restaurants" className="inline-block mt-6 text-[10px] uppercase tracking-widest font-bold text-premium-accent hover:underline">
                      Explore Restaurants
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-premium-dark text-white p-10 sticky top-32">
                <h3 className="text-xl font-serif font-bold mb-8 border-b border-white/10 pb-6 uppercase tracking-widest">Summary</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                    <span>Delivery</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Total</span>
                    <span className="text-3xl font-serif font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  disabled={items.length === 0}
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 bg-white text-premium-dark text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-premium-accent hover:text-white transition-all duration-500 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Checkout Now</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="mt-6 text-[8px] text-center uppercase tracking-[0.2em] text-white/30">
                  Complimentary luxury packaging included
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Cart;
