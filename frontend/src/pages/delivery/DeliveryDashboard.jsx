import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { Navigation, Package, CheckCircle2, MapPin, Phone } from 'lucide-react';
import Loader from '../../components/Loader';
import orderService from '../../services/orderService';

const DeliveryDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getUserOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load delivery orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(prev => 
        prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o)
      );
      alert(`Order status updated to: ${newStatus}`);
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  // Active delivery is the first order that is Preparing or Out For Delivery
  const activeAssignment = orders.find(o => o.status === 'Preparing' || o.status === 'Out For Delivery');
  const completedDeliveries = orders.filter(o => o.status === 'Delivered');
  const todayEarnings = completedDeliveries.length * 15.00;

  return (
    <MainLayout>
      <section className="section-padding bg-premium-light min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0 border-b border-gray-200 pb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
                Logistics
              </span>
              <h1 className="text-4xl font-serif font-bold text-premium-dark">The Courier Deck</h1>
            </div>
            <div className="flex items-center space-x-2 bg-green-500/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-green-600">Active Duty</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Active Task */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark/40">Current Assignment</h3>
              {activeAssignment ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-gray-100 p-10 shadow-xl"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-premium-accent block mb-2">
                        ORDER #{activeAssignment._id.slice(-6).toUpperCase()}
                      </span>
                      <h2 className="text-2xl font-serif font-bold text-premium-dark">
                        {activeAssignment.items?.[0]?.food?.restaurant?.name || "LuxeEats Partner"}
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 block mb-2">Status</span>
                      <span className="text-xs uppercase tracking-widest font-bold text-premium-accent px-2 py-1 bg-premium-accent/5">
                        {activeAssignment.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-premium-dark/5 flex items-center justify-center text-premium-dark">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-premium-dark/30 font-bold block mb-1">Destination</span>
                        <p className="text-[10px] uppercase tracking-wider text-premium-dark/60 font-bold">
                          {activeAssignment.user?.name || "Anonymous Client"}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-premium-dark/40 mt-1">
                          {activeAssignment.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-premium-dark/5 flex items-center justify-center text-premium-dark">
                        <Package size={16} />
                      </div>
                      <div>
                        <span className="text-[8px] uppercase tracking-widest text-premium-dark/30 font-bold block mb-1">Manifest</span>
                        <p className="text-[10px] uppercase tracking-wider text-premium-dark/60 font-bold">
                          {activeAssignment.items?.map(i => `${i.food?.name || 'Dish'} (x${i.quantity})`).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-50 flex flex-col sm:flex-row gap-4">
                    {activeAssignment.status === 'Preparing' ? (
                      <button 
                        onClick={() => handleUpdateStatus(activeAssignment._id, 'Out For Delivery')}
                        disabled={updatingId === activeAssignment._id}
                        className="btn-premium flex-grow flex items-center justify-center space-x-3"
                      >
                        <Navigation size={14} />
                        <span>Start Transit</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleUpdateStatus(activeAssignment._id, 'Delivered')}
                        disabled={updatingId === activeAssignment._id}
                        className="btn-premium flex-grow flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle2 size={14} />
                        <span>Confirm Delivered</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white border border-dashed border-gray-200 p-12 text-center">
                  <Package size={36} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-xs uppercase tracking-widest text-premium-dark/40 font-bold">No active assignments on deck.</p>
                </div>
              )}
            </div>

            {/* Performance Stats */}
            <div className="lg:col-span-1 space-y-8">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark/40">Duty Stats</h3>
              <div className="bg-premium-dark text-white p-10 space-y-10">
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-white/40 font-bold mb-2">Today's Earnings</p>
                  <p className="text-3xl font-serif font-bold">${todayEarnings.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-white/40 font-bold mb-2">Completed Tasks</p>
                  <p className="text-3xl font-serif font-bold">{completedDeliveries.length}</p>
                </div>
                <div className="pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Rating</span>
                    <span className="text-xs font-bold text-premium-accent">5.0 / 5.0</span>
                  </div>
                  <div className="w-full bg-white/10 h-[2px]">
                    <div className="w-[100%] bg-premium-accent h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DeliveryDashboard;
