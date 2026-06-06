import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { Package, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../../features/orders/orderApi';
import Loader from '../../components/Loader';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-500';
      case 'Preparing': return 'text-premium-accent';
      case 'Out For Delivery': return 'text-blue-400';
      case 'Cancelled': return 'text-red-400';
      default: return 'text-premium-dark/40';
    }
  };

  if (loading && orders.length === 0) return <Loader />;

  return (
    <MainLayout>
      <section className="section-padding bg-premium-light min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0 border-b border-gray-200 pb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
                Order History
              </span>
              <h1 className="text-4xl font-serif font-bold text-premium-dark">The Archives</h1>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-premium-dark/40">
              {orders.length} TOTAL TRANSACTIONS
            </p>
          </div>

          <div className="space-y-8">
            {orders.length > 0 ? (
              orders.map((order, idx) => (
                <motion.div 
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="bg-white border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-10">
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-50 overflow-hidden flex items-center justify-center">
                        {order.items[0]?.food?.image ? (
                          <img src={order.items[0].food.image} alt="Order" className="w-full h-full object-cover grayscale" />
                        ) : (
                          <Package size={32} className="text-premium-dark/10" />
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-premium-accent block mb-1">
                              #{order._id.slice(-6).toUpperCase()}
                            </span>
                            <h3 className="text-xl font-serif font-bold text-premium-dark">Order from LuxeEats</h3>
                          </div>
                          <div className="text-right">
                            <span className={`text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-end ${getStatusColor(order.status)}`}>
                              <CheckCircle2 size={12} className="mr-2" />
                              {order.status}
                            </span>
                            <span className="text-xs text-premium-dark/40 font-bold block mt-1">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-x-8 gap-y-4 border-t border-gray-50 pt-6">
                          <div>
                            <span className="text-[8px] uppercase tracking-widest text-premium-dark/30 font-bold block mb-2">Items</span>
                            <p className="text-[10px] uppercase tracking-wider text-premium-dark/60">
                              {order.items.map(i => `${i.food?.name || 'Item'} (x${i.quantity})`).join(", ")}
                            </p>
                          </div>
                          <div>
                            <span className="text-[8px] uppercase tracking-widest text-premium-dark/30 font-bold block mb-2">Total Amount</span>
                            <p className="text-sm font-bold text-premium-dark">${order.totalPrice?.toFixed(2) || '0.00'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-white border border-dashed border-gray-200">
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-6" strokeWidth={1} />
                <p className="text-sm text-premium-dark/40 uppercase tracking-widest">No orders found</p>
                <Link to="/restaurants" className="inline-block mt-6 text-[10px] uppercase tracking-widest font-bold text-premium-accent hover:underline">
                  Start Your Journey
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Orders;
