import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Utensils, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';
import Loader from '../../components/Loader';
import orderService from '../../services/orderService';
import userService from '../../services/userService';
import foodService from '../../services/foodService';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRestaurants: 0,
    recentOrders: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [orders, users, restaurants] = await Promise.all([
          orderService.getUserOrders(),
          userService.getAllUsers(),
          foodService.getAllRestaurants()
        ]);

        const totalRevenue = orders
          .filter(order => order.status === 'Delivered')
          .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

        // Sort orders by createdAt descending
        const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setData({
          totalRevenue,
          totalOrders: orders.length,
          totalUsers: users.length,
          totalRestaurants: restaurants.length,
          recentOrders: sortedOrders.slice(0, 5)
        });
      } catch (error) {
        console.error("Failed to load admin dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const stats = [
    { label: "Total Revenue", value: `$${data.totalRevenue.toFixed(2)}`, icon: DollarSign, trend: "+100% Live" },
    { label: "Total Orders", value: String(data.totalOrders), icon: ShoppingBag, trend: "Real-time" },
    { label: "Active Users", value: String(data.totalUsers), icon: Users, trend: "Registered" },
    { label: "Establishments", value: String(data.totalRestaurants), icon: Utensils, trend: "Partnered" },
  ];

  return (
    <section className="bg-premium-light min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-premium-accent mb-4 block">
            Administration
          </span>
          <h1 className="text-4xl font-serif font-bold text-premium-dark">The Grand Console</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 bg-premium-dark/5 flex items-center justify-center text-premium-dark">
                  <stat.icon size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold text-premium-accent">{stat.trend}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-premium-dark/40 font-bold mb-2">{stat.label}</p>
              <p className="text-2xl font-serif font-bold text-premium-dark">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-100 p-10">
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-50">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-premium-dark">Recent Transactions</h3>
            <TrendingUp size={16} className="text-premium-dark/20" />
          </div>
          <div className="space-y-6">
            {data.recentOrders.length === 0 ? (
              <p className="text-xs uppercase tracking-widest text-premium-dark/30 text-center py-6">No transactions recorded yet.</p>
            ) : (
              data.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center space-x-6">
                    <div className={`w-2 h-2 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-500' : 'bg-premium-accent'
                    }`} />
                    <div>
                      <p className="text-xs font-bold text-premium-dark uppercase tracking-widest">Order #{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-[10px] text-premium-dark/30 uppercase tracking-widest mt-1">
                        Client: {order.user?.name || "Anonymous"} • {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-premium-dark">${(order.totalPrice || 0).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
