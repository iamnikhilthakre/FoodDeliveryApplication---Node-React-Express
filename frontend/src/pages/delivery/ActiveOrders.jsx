import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { MapPin, Phone, Package, Navigation, CheckCircle2 } from 'lucide-react';
import Loader from '../../components/Loader';
import orderService from '../../services/orderService';

const ActiveOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getUserOrders();
      // Only keep orders that are Preparing or Out For Delivery
      const active = data.filter(o => o.status === 'Preparing' || o.status === 'Out For Delivery');
      setOrders(active);
    } catch (err) {
      console.error("Failed to fetch active orders:", err);
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
      setOrders(prev => prev.filter(o => {
        if (o._id === orderId) {
          if (newStatus === 'Delivered') {
            // Remove from active list
            return false;
          }
          o.status = newStatus;
        }
        return true;
      }));
      alert(`Order updated to: ${newStatus}`);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <section className="section-padding bg-premium-light min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
              Fleet Operations
            </span>
            <h1 className="text-4xl font-serif font-bold text-premium-dark">Active Assignments</h1>
          </div>

          <div className="space-y-8">
            {orders.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-200 p-12 text-center">
                <Package size={36} className="mx-auto text-gray-200 mb-4" />
                <p className="text-xs uppercase tracking-widest text-premium-dark/40 font-bold">No active delivery assignments found.</p>
              </div>
            ) : (
              orders.map((order, idx) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white border border-gray-100 p-10 shadow-sm group hover:border-premium-accent transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-10">
                    <div className="flex-grow space-y-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest font-bold text-premium-accent block mb-2">
                            ORDER #{order._id.slice(-6).toUpperCase()}
                          </span>
                          <h3 className="text-xl font-serif font-bold text-premium-dark">
                            {order.items?.[0]?.food?.restaurant?.name || "LuxeEats Partner"}
                          </h3>
                        </div>
                        <span className="px-3 py-1 bg-premium-dark text-white text-[8px] uppercase tracking-widest font-bold">
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex items-start space-x-4">
                          <MapPin size={16} className="text-premium-dark/20 mt-1" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 mb-1">Destination</p>
                            <p className="text-xs font-bold text-premium-dark">{order.user?.name || "Anonymous Client"}</p>
                            <p className="text-[10px] text-premium-dark/40 mt-1 uppercase tracking-wider">{order.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4">
                          <Package size={16} className="text-premium-dark/20 mt-1" />
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/40 mb-1">Manifest</p>
                            <p className="text-[10px] uppercase tracking-wider text-premium-dark/60 font-bold">
                              {order.items?.map(i => `${i.food?.name || 'Dish'} (x${i.quantity})`).join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-4 md:border-l border-gray-50 md:pl-10">
                      {order.status === 'Preparing' ? (
                        <button 
                          onClick={() => handleUpdateStatus(order._id, 'Out For Delivery')}
                          disabled={updatingId === order._id}
                          className="flex items-center justify-center space-x-3 bg-premium-dark text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-premium-accent transition-colors"
                        >
                          <Navigation size={14} />
                          <span>Start Transit</span>
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleUpdateStatus(order._id, 'Delivered')}
                          disabled={updatingId === order._id}
                          className="flex items-center justify-center space-x-3 bg-green-600 text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle2 size={14} />
                          <span>Complete Assignment</span>
                        </button>
                      )}
                      {order.user?.phone && (
                        <a 
                          href={`tel:${order.user.phone}`}
                          className="text-[10px] uppercase tracking-widest font-bold text-premium-dark/20 hover:text-premium-dark transition-colors flex items-center justify-center space-x-2"
                        >
                          <Phone size={12} />
                          <span>Contact Client ({order.user.phone})</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ActiveOrders;
